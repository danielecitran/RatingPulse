package com.ratingpulse.backend.dto;

public class LoginResponse {
    private Long id;
    private String email;
    private String companyName;
    private String token;

    public LoginResponse() {}

    public LoginResponse(Long id, String email, String companyName, String token) {
        this.id = id;
        this.email = email;
        this.companyName = companyName;
        this.token = token;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
} 