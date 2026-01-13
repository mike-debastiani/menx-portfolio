# Sanity CMS - Anleitung zur Bearbeitung

## Sanity Studio starten

1. **Zum Studio-Verzeichnis navigieren:**
   ```bash
   cd studio
   ```

2. **Dependencies installieren (falls noch nicht geschehen):**
   ```bash
   npm install
   ```

3. **Sanity Studio starten:**
   ```bash
   npm run dev
   ```

4. **Studio öffnen:**
   - Das Studio läuft standardmäßig auf `http://localhost:3333`
   - Öffne diese URL im Browser

## CMS-Einträge bearbeiten

### WorkflowAtlas Datenstruktur

Das CMS enthält folgende Dokumenttypen für den WorkflowAtlas:

1. **Phases (Phasen)**
   - Name, Order, Slug, Color
   - Beispiel: "Research & Discovery", "Ideation & Concept", etc.

2. **Methods (Methoden)**
   - Name, Slug, Order
   - Referenz zu einer Phase
   - Beispiel: "User Interviews", "Prototyping", etc.

3. **Impressions (Anwendungsbeispiele)**
   - Headline, Description, Order
   - Bild (Image)
   - Referenz zu einer Method
   - Referenz zu einem Project

4. **Projects (Projekte)**
   - Title, Slug, Year, Description, etc.
   - Beispiel: "Penda", "ConnectHub", "Adjusto"

### Einträge bearbeiten

1. **Im Sanity Studio:**
   - Nach dem Start siehst du die Sidebar mit allen Dokumenttypen
   - Klicke auf einen Typ (z.B. "Impression", "Method", "Phase", "Project")

2. **Dokumente anzeigen:**
   - Du siehst eine Liste aller Dokumente dieses Typs
   - **Wichtig:** Drafts (Entwürfe) werden mit einem "Draft"-Badge angezeigt
   - Published Dokumente sind normal gelistet

3. **Dokument bearbeiten:**
   - Klicke auf ein Dokument, um es zu öffnen
   - Bearbeite die Felder
   - Klicke auf "Publish" um zu veröffentlichen, oder lasse es als Draft

4. **Neues Dokument erstellen:**
   - Klicke auf "Create new" in der Sidebar
   - Wähle den Dokumenttyp
   - Fülle die Felder aus
   - Speichere (wird automatisch als Draft gespeichert)

### Wichtige Hinweise

- **Drafts vs. Published:**
  - Drafts werden nur mit `perspective: 'raw'` und `useCdn: false` geladen
  - Die Web-App ist so konfiguriert, dass sie Drafts anzeigt
  - Um Drafts zu veröffentlichen: Klicke auf "Publish" im Studio

- **Referenzen:**
  - Wenn du eine Impression erstellst, musst du eine Method und ein Project auswählen
  - Stelle sicher, dass die referenzierten Dokumente existieren

- **Bilder hochladen:**
  - Klicke auf das Bildfeld
  - Wähle "Upload" um ein Bild hochzuladen
  - Oder wähle ein bereits hochgeladenes Bild

## Debug-Seite

Um zu prüfen, welche Daten geladen werden:

1. Starte die Web-App: `cd web && npm run dev`
2. Öffne: `http://localhost:3000/debug/sanity`
3. Hier siehst du:
   - Anzahl der geladenen Impressions
   - Details zu den ersten 10 Impressions
   - Phasen und Methoden mit ihren Impression-Counts

## Projekt-Konfiguration

- **Project ID:** `dn63o2e7`
- **Dataset:** `development`
- Konfiguriert in: `studio/sanity.config.ts`

## Häufige Probleme

**Problem:** Änderungen werden nicht angezeigt
- **Lösung:** Stelle sicher, dass die Web-App mit `dynamic = 'force-dynamic'` läuft (bereits konfiguriert)
- Prüfe die Debug-Seite: `/debug/sanity`

**Problem:** Nur 1 Impression wird angezeigt
- **Lösung:** Prüfe, ob alle Impressions gültige Referenzen zu Method und Project haben
- Prüfe die Console-Logs in der Web-App (Development-Modus)
- Öffne die Debug-Seite um zu sehen, wie viele Impressions geladen werden

**Problem:** Drafts werden nicht geladen / Nur 1 Impression wird angezeigt
- **Lösung 1:** Prüfe, ob die Daten im richtigen Dataset sind (siehe Debug-Seite)
- **Lösung 2:** Erstelle einen API Read Token:
  1. Gehe zu https://www.sanity.io/manage
  2. Wähle dein Projekt (`dn63o2e7`)
  3. Gehe zu "API" → "Tokens"
  4. Klicke auf "Add API token"
  5. Wähle "Read" als Permission
  6. Kopiere den Token
  7. Füge ihn in `web/.env.local` hinzu:
     ```
     SANITY_API_READ_TOKEN=dein_token_hier
     ```
  8. Starte die Web-App neu
- **Lösung 3:** Stelle sicher, dass `perspective: 'raw'` und `useCdn: false` im Sanity Client gesetzt sind (bereits konfiguriert)
- **Lösung 4:** Prüfe die Debug-Seite (`/debug/sanity`) um zu sehen, wie viele Dokumente gefunden werden
