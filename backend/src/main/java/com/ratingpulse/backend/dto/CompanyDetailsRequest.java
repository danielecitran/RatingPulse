package com.ratingpulse.backend.dto;

public class CompanyDetailsRequest {
    private String street;
    private String postalCode;
    private String city;
    private String website;

    public CompanyDetailsRequest() {}

    public CompanyDetailsRequest(String street, String postalCode, String city, String website) {
        this.street = street;
        this.postalCode = postalCode;
        this.city = city;
        this.website = website;
    }

    public String getStreet() { return street; }
    public void setStreet(String street) { this.street = street; }
    public String getPostalCode() { return postalCode; }
    public void setPostalCode(String postalCode) { this.postalCode = postalCode; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }
} 