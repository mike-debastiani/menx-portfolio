# Sanity API Token Setup - Schnellanleitung

## Problem
Die Debug-Seite zeigt nur **1 Impression**, obwohl **130+ Impressions** als Testdaten im Sanity CMS angelegt wurden. Die Warnung "API Token fehlt" deutet darauf hin, dass Draft-Dokumente nicht abgerufen werden können.

## Lösung: API Token erstellen und hinzufügen

### Schritt 1: Token in Sanity erstellen

1. **Öffne Sanity Manage:**
   - Gehe zu: https://www.sanity.io/manage
   - Logge dich ein

2. **Wähle dein Projekt:**
   - Projekt ID: `dn63o2e7`
   - Projekt Name: "Portfolio" (oder wie es in deinem Account heißt)

3. **Navigiere zu API → Tokens:**
   - Klicke auf "API" im linken Menü
   - Klicke auf "Tokens" Tab
   - Klicke auf "Add API token" Button

4. **Token konfigurieren:**
   - **Name:** z.B. "Read Token for Development"
   - **Permission:** Wähle **"Read"** (nur Leserechte)
   - **Dataset:** Wähle "development" (oder "All datasets" wenn du mehrere hast)
   - Klicke auf "Save"

5. **Token kopieren:**
   - **WICHTIG:** Kopiere den Token sofort - er wird nur einmal angezeigt!
   - Der Token sieht aus wie: `skAbCdEf1234567890...`

### Schritt 2: Token zur Web-App hinzufügen

1. **Öffne die `.env.local` Datei:**
   ```bash
   cd web
   # Öffne .env.local im Editor
   ```

2. **Füge den Token hinzu:**
   ```env
   # Falls noch nicht vorhanden, füge diese Zeile hinzu:
   SANITY_API_READ_TOKEN=dein_token_hier
   ```
   
   **Beispiel:**
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=dn63o2e7
   NEXT_PUBLIC_SANITY_DATASET=development
   SANITY_API_READ_TOKEN=skAbCdEf1234567890abcdefghijklmnopqrstuvwxyz
   ```

3. **Speichere die Datei**

4. **Starte die Web-App neu:**
   ```bash
   # Stoppe den Dev-Server (Ctrl+C)
   # Starte neu:
   npm run dev
   ```

### Schritt 3: Prüfen

1. **Öffne die Debug-Seite:**
   - http://localhost:3000/debug/sanity

2. **Prüfe die Warnungen:**
   - Die "API Token fehlt" Warnung sollte verschwinden
   - Die "Nur 1 Impression gefunden" Warnung sollte sich ändern, wenn die Drafts jetzt geladen werden

3. **Prüfe die Counts:**
   - "Raw Counts" sollte jetzt mehr Impressions zeigen
   - "All Impression IDs" sollte eine Liste mit vielen IDs zeigen

## Alternative: Daten im Sanity Studio prüfen

Falls der Token nicht hilft, prüfe direkt im Sanity Studio:

1. **Studio starten:**
   ```bash
   cd studio
   npm run dev
   ```

2. **Öffne:** http://localhost:3333

3. **Prüfe die Impressions:**
   - Klicke auf "Impression" in der Sidebar
   - Siehst du 130+ Impressions?
   - Sind sie als "Draft" markiert oder "Published"?

4. **Falls sie als Drafts existieren:**
   - Option A: Füge den API Token hinzu (siehe oben)
   - Option B: Publish die wichtigsten Impressions im Studio (klicke auf "Publish")

## Häufige Probleme

**Problem:** Token wird nicht erkannt
- **Lösung:** Stelle sicher, dass die `.env.local` Datei im `web/` Verzeichnis ist
- Stelle sicher, dass der Dev-Server neu gestartet wurde
- Prüfe, dass keine Leerzeichen vor/nach dem `=` sind

**Problem:** Token hat keine Berechtigung
- **Lösung:** Stelle sicher, dass der Token "Read" Permission hat
- Stelle sicher, dass der Token für das richtige Dataset ("development") konfiguriert ist

**Problem:** Immer noch nur 1 Impression
- **Lösung:** Prüfe im Sanity Studio, ob die Daten wirklich existieren
- Prüfe, ob die Daten im richtigen Dataset ("development") sind
- Prüfe die Console-Logs in der Debug-Seite

## Nächste Schritte

Nach dem Hinzufügen des Tokens sollte die Debug-Seite alle 130+ Impressions anzeigen. Falls nicht, prüfe:
1. Sind die Daten wirklich im Dataset "development"?
2. Sind die Daten als Drafts oder Published gespeichert?
3. Haben die Impressions gültige Referenzen zu Method und Project?
