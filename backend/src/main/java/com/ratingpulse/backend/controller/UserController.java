package com.ratingpulse.backend.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ratingpulse.backend.model.User;
import com.ratingpulse.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody(required = false) RegisterRequest request) {
        try {
            if (request == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Request-Body darf nicht leer sein"));
            }
            if (request.email() == null || request.password() == null || request.companyName() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("E-Mail, Passwort und Firmenname müssen angegeben werden"));
            }
            
            User user = userService.registerUser(request.email(), request.password(), request.companyName());
            
            // JWT Token generieren
            String token = generateToken(user);
            
            return ResponseEntity.ok(new LoginResponse(user.getId(), user.getEmail(), user.getCompanyName(), token));
        } catch (RuntimeException e) {
            String message = e.getMessage();
            if (message.contains("existiert bereits")) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorResponse(message));
            } else if (message.contains("E-Mail") || message.contains("Passwort")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(message));
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Ein unerwarteter Fehler ist aufgetreten"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Ein unerwarteter Fehler ist aufgetreten"));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody(required = false) LoginRequest request) {
        try {
            if (request == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Request-Body darf nicht leer sein"));
            }
            if (request.email() == null || request.password() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("E-Mail und Passwort müssen angegeben werden"));
            }

            User user = userService.loginUser(request.email(), request.password());
            
            // JWT Token generieren
            String token = generateToken(user);
            
            return ResponseEntity.ok(new LoginResponse(user.getId(), user.getEmail(), user.getCompanyName(), token));
        } catch (RuntimeException e) {
            String message = e.getMessage();
            if (message.contains("nicht gefunden")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(message));
            } else if (message.contains("Ungültiges Passwort")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse(message));
            } else if (message.contains("E-Mail") || message.contains("Passwort")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(message));
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Ein unerwarteter Fehler ist aufgetreten"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Ein unerwarteter Fehler ist aufgetreten"));
        }
    }

    @PostMapping("/company-details")
    public ResponseEntity<?> updateCompanyDetails(
            @RequestBody CompanyDetailsRequest request,
            @RequestHeader("Authorization") String token) {
        try {
            if (request == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Request-Body darf nicht leer sein"));
            }

            // Token validieren und User extrahieren
            String email = extractEmailFromToken(token);
            User user = userService.findByEmail(email);
            
            // Unternehmensdetails aktualisieren
            user.setStreet(request.street());
            user.setPostalCode(request.postalCode());
            user.setCity(request.city());
            user.setWebsite(request.website());
            
            userService.updateUser(user);
            
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Ein unerwarteter Fehler ist aufgetreten"));
        }
    }

    private String extractEmailFromToken(String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            throw new RuntimeException("Ungültiges Token-Format");
        }

        String jwtToken = token.substring(7); // "Bearer " entfernen
        try {
            // Token in Base64 dekodieren
            String[] parts = jwtToken.split("\\.");
            if (parts.length != 3) {
                throw new RuntimeException("Ungültiges Token-Format");
            }

            String payload = new String(java.util.Base64.getUrlDecoder().decode(parts[1]));
            // JSON-Payload parsen
            ObjectMapper mapper = new ObjectMapper();
            JsonNode node = mapper.readTree(payload);
            
            // E-Mail aus dem Token extrahieren
            String email = node.get("email").asText();
            if (email == null || email.isEmpty()) {
                throw new RuntimeException("E-Mail nicht im Token gefunden");
            }
            
            return email;
        } catch (Exception e) {
            throw new RuntimeException("Fehler bei der Token-Verarbeitung: " + e.getMessage());
        }
    }

    private String generateToken(User user) {
        // Token-Header
        Map<String, Object> header = new HashMap<>();
        header.put("typ", "JWT");
        header.put("alg", "HS256");

        // Token-Payload
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", user.getEmail());
        claims.put("userId", user.getId());
        claims.put("companyName", user.getCompanyName());
        claims.put("exp", System.currentTimeMillis() + (7 * 24 * 60 * 60 * 1000)); // 7 Tage

        // Secret Key (in der Produktion sollte dies sicher gespeichert werden)
        String secret = "your-secret-key-here";

        try {
            // Header und Payload in Base64 kodieren
            String headerBase64 = Base64.getUrlEncoder().withoutPadding().encodeToString(
                new ObjectMapper().writeValueAsString(header).getBytes());
            String payloadBase64 = Base64.getUrlEncoder().withoutPadding().encodeToString(
                new ObjectMapper().writeValueAsString(claims).getBytes());

            // Signatur mit dem Secret Key erstellen
            javax.crypto.Mac mac = javax.crypto.Mac.getInstance("HmacSHA256");
            javax.crypto.spec.SecretKeySpec secretKeySpec = new javax.crypto.spec.SecretKeySpec(
                secret.getBytes(), "HmacSHA256");
            mac.init(secretKeySpec);
            String signature = Base64.getUrlEncoder().withoutPadding().encodeToString(
                mac.doFinal((headerBase64 + "." + payloadBase64).getBytes()));

            // Token zusammenbauen
            return headerBase64 + "." + payloadBase64 + "." + signature;
        } catch (Exception e) {
            throw new RuntimeException("Fehler bei der Token-Generierung: " + e.getMessage());
        }
    }

    private record RegisterRequest(String email, String password, String companyName) {}
    private record LoginRequest(String email, String password) {}
    private record LoginResponse(Long id, String email, String companyName, String token) {}
    private record ErrorResponse(String message) {}
    private record CompanyDetailsRequest(String street, String postalCode, String city, String website) {}
} 