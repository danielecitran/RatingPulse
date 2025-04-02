package com.ratingpulse.backend.service;

import com.ratingpulse.backend.model.User;
import com.ratingpulse.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.dao.DataIntegrityViolationException;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(String email, String password) {
        validateEmail(email);
        validatePassword(password);
        
        String normalizedEmail = normalizeEmail(email);
        if (userRepository.existsByEmail(normalizedEmail)) {
            throw new RuntimeException("Benutzer mit dieser E-Mail existiert bereits");
        }

        try {
            User user = new User();
            user.setEmail(normalizedEmail);
            user.setPassword(passwordEncoder.encode(password));
            return userRepository.save(user);
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("Benutzer mit dieser E-Mail existiert bereits");
        }
    }

    public User loginUser(String email, String password) {
        validateEmail(email);
        validatePassword(password);

        String normalizedEmail = normalizeEmail(email);
        User user = userRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> new RuntimeException("Benutzer nicht gefunden"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Ungültiges Passwort");
        }

        return user;
    }

    private String normalizeEmail(String email) {
        if (email == null) {
            throw new RuntimeException("E-Mail darf nicht null sein");
        }
        return email.toLowerCase().trim();
    }

    private void validateEmail(String email) {
        if (email == null || email.trim().isEmpty()) {
            throw new RuntimeException("E-Mail darf nicht leer sein");
        }
        
        String trimmedEmail = email.trim();
        
        // Grundlegende E-Mail-Format-Validierung
        if (!trimmedEmail.contains("@")) {
            throw new RuntimeException("Ungültiges E-Mail-Format: '@' fehlt");
        }
        
        // Prüfe auf gefährliche Zeichen
        if (trimmedEmail.contains("<") || trimmedEmail.contains(">") || 
            trimmedEmail.contains("'") || trimmedEmail.contains("\"") ||
            trimmedEmail.contains(";") || trimmedEmail.contains("--")) {
            throw new RuntimeException("E-Mail enthält ungültige Zeichen");
        }
        
        // RFC 5322 kompatibles E-Mail-Format
        String emailPattern = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$";
        if (!trimmedEmail.matches(emailPattern)) {
            throw new RuntimeException("Ungültiges E-Mail-Format. Erlaubte Zeichen sind: a-z, A-Z, 0-9, und !#$%&'*+/=?`{|}~^.-");
        }
        
        if (trimmedEmail.length() > 254) {
            throw new RuntimeException("E-Mail-Adresse ist zu lang (maximal 254 Zeichen erlaubt)");
        }
    }

    private void validatePassword(String password) {
        if (password == null || password.trim().isEmpty()) {
            throw new RuntimeException("Passwort darf nicht leer sein");
        }
        
        String trimmedPassword = password.trim();
        
        // Prüfe auf gefährliche Zeichen
        if (trimmedPassword.contains("<") || trimmedPassword.contains(">") || 
            trimmedPassword.contains("'") || trimmedPassword.contains("\"") ||
            trimmedPassword.contains(";") || trimmedPassword.contains("--")) {
            throw new RuntimeException("Passwort enthält ungültige Zeichen");
        }
        
        if (trimmedPassword.length() < 6) {
            throw new RuntimeException("Passwort muss mindestens 6 Zeichen lang sein");
        }
        
        if (trimmedPassword.length() > 72) {
            throw new RuntimeException("Passwort ist zu lang (maximal 72 Zeichen erlaubt)");
        }
    }
} 