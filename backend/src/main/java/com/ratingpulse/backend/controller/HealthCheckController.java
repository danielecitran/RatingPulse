package com.ratingpulse.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/api/health/db")
    public String checkDatabaseConnection() {
        try {
            jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            return "Datenbankverbindung erfolgreich!";
        } catch (Exception e) {
            return "Fehler bei der Datenbankverbindung: " + e.getMessage();
        }
    }
} 