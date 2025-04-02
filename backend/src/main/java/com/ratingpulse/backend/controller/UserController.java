package com.ratingpulse.backend.controller;

import com.ratingpulse.backend.model.User;
import com.ratingpulse.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
            if (request.email() == null || request.password() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("E-Mail und Passwort müssen angegeben werden"));
            }
            
            User user = userService.registerUser(request.email(), request.password());
            return ResponseEntity.ok(new UserResponse(user.getId(), user.getEmail()));
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
            return ResponseEntity.ok(new UserResponse(user.getId(), user.getEmail()));
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

    private record RegisterRequest(String email, String password) {}
    private record LoginRequest(String email, String password) {}
    private record UserResponse(Long id, String email) {}
    private record ErrorResponse(String message) {}
} 