package com.ratingpulse.backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ratingpulse.backend.model.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {
    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    public String generateToken(User user) {
        Map<String, Object> header = new HashMap<>();
        header.put("typ", "JWT");
        header.put("alg", "HS256");

        Map<String, Object> claims = new HashMap<>();
        claims.put("email", user.getEmail());
        claims.put("userId", user.getId());
        claims.put("companyName", user.getCompanyName());
        claims.put("exp", System.currentTimeMillis() + expiration);

        try {
            String headerBase64 = Base64.getUrlEncoder().withoutPadding().encodeToString(
                new ObjectMapper().writeValueAsString(header).getBytes());
            String payloadBase64 = Base64.getUrlEncoder().withoutPadding().encodeToString(
                new ObjectMapper().writeValueAsString(claims).getBytes());

            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKeySpec = new SecretKeySpec(secret.getBytes(), "HmacSHA256");
            mac.init(secretKeySpec);
            String signature = Base64.getUrlEncoder().withoutPadding().encodeToString(
                mac.doFinal((headerBase64 + "." + payloadBase64).getBytes()));

            return headerBase64 + "." + payloadBase64 + "." + signature;
        } catch (Exception e) {
            throw new RuntimeException("Fehler bei der Token-Generierung: " + e.getMessage());
        }
    }
} 