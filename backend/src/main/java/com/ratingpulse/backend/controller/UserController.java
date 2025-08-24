package com.ratingpulse.backend.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ratingpulse.backend.model.User;
import com.ratingpulse.backend.service.JwtService;
import com.ratingpulse.backend.service.UserService;
import com.ratingpulse.backend.dto.RegisterRequest;
import com.ratingpulse.backend.dto.LoginRequest;
import com.ratingpulse.backend.dto.LoginResponse;
import com.ratingpulse.backend.dto.ErrorResponse;
import com.ratingpulse.backend.dto.CompanyDetailsRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final JwtService jwtService;

    public UserController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<LoginResponse> registerUser(@RequestBody RegisterRequest request) {
        User user = userService.registerUser(request.getEmail(), request.getPassword(), request.getCompanyName());
        String token = jwtService.generateToken(user);
        return ResponseEntity.ok(new LoginResponse(user.getId(), user.getEmail(), user.getCompanyName(), token));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginRequest request) {
        User user = userService.loginUser(request.getEmail(), request.getPassword());
        String token = jwtService.generateToken(user);
        return ResponseEntity.ok(new LoginResponse(user.getId(), user.getEmail(), user.getCompanyName(), token));
    }

    @PostMapping("/company-details")
    public ResponseEntity<Void> updateCompanyDetails(@RequestBody CompanyDetailsRequest request, @RequestHeader("Authorization") String token) {
        String email = extractEmailFromToken(token);
        User user = userService.findByEmail(email);
        user.setStreet(request.getStreet());
        user.setPostalCode(request.getPostalCode());
        user.setCity(request.getCity());
        user.setWebsite(request.getWebsite());
        userService.updateUser(user);
        return ResponseEntity.ok().build();
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
} 