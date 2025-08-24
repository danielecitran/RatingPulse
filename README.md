# RatingPulse (nicht abgeschlossen)

RatingPulse ist eine Webanwendung zur Analyse von Kundenbewertungen aus Google inklusive KI-gestützter Einblicke (Sentiment-Analyse, Keywords) via OpenAI API. Beinhaltet Dashboard & Chatbot.

## Lokale Installation

1. **Voraussetzungen**:

   - Java 11 oder höher
   - Node.js 14 oder höher
   - PostgreSQL

2. **Backend einrichten**:

   - Navigiere in das Backend-Verzeichnis:
     ```bash
     cd backend
     ```
   - Erstelle eine PostgreSQL-Datenbank und aktualisiere die `application.properties` mit den entsprechenden Zugangsdaten.
   - Baue und starte die Anwendung:
     ```bash
     ./mvnw spring-boot:run
     ```

3. **Frontend einrichten**:
   - Navigiere in das Frontend-Verzeichnis:
     ```bash
     cd frontend
     ```
   - Installiere die Abhängigkeiten:
     ```bash
     npm install
     ```
   - Starte die Anwendung:
     ```bash
     npm run dev
     ```

## Status

Dieses Projekt befindet sich noch in der Entwicklung und ist nicht abgeschlossen.

## Mitwirken

Beiträge sind willkommen! Bitte erstelle einen Fork des Repositories und reiche einen Pull-Request ein.

## Lizenz

Dieses Projekt steht unter der MIT-Lizenz.
