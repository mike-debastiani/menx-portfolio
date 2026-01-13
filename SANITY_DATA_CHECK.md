# Sanity Daten-Prüfung - Wo sind die 130+ Impressions?

## Problem
Lokal funktioniert alles, aber auf Vercel wird nur 1 Impression geladen. Das Dashboard zeigt "No apps found".

## Wichtige Erkenntnis
**Sanity CMS läuft immer in der Cloud** - das Studio ist nur die UI zum Bearbeiten. Die Daten sollten über die API abrufbar sein, unabhängig davon, ob das Studio deployed ist.

## Schritt 1: Prüfe im Sanity Studio lokal

1. **Studio starten:**
   ```bash
   cd studio
   npm run dev
   ```

2. **Öffne:** http://localhost:3333

3. **Prüfe die Impressions:**
   - Klicke auf "Impression" in der Sidebar
   - **WICHTIG:** Siehst du 130+ Impressions?
   - Oder nur 1?

4. **Prüfe das Dataset:**
   - Oben rechts im Studio siehst du das aktuelle Dataset
   - Ist es "development"?
   - Oder vielleicht "production"?

## Schritt 2: Prüfe die Projekt-ID

1. **Im Sanity Studio:**
   - Gehe zu: Settings (Zahnrad-Icon) → API
   - Prüfe die **Project ID**: Sollte `dn63o2e7` sein
   - Prüfe das **Dataset**: Sollte `development` sein

2. **Im Code:**
   - `studio/sanity.config.ts` → `projectId: 'dn63o2e7'`
   - `studio/sanity.config.ts` → `dataset: 'development'`

## Schritt 3: Prüfe direkt die API

1. **Öffne die Test-Seite:**
   - Lokal: http://localhost:3000/debug/sanity-test
   - Auf Vercel: https://deine-domain.vercel.app/debug/sanity-test

2. **Klicke auf "Test Direct API Call"**

3. **Prüfe die Ergebnisse:**
   - Wie viele Impressions werden ohne Token gefunden?
   - Wie viele mit Token?
   - Gibt es Fehler?

## Schritt 4: Mögliche Probleme und Lösungen

### Problem 1: Daten sind in einem anderen Dataset

**Symptom:** Im Studio siehst du 130+ Impressions, aber die API findet nur 1

**Lösung:**
1. Prüfe im Studio, welches Dataset aktiv ist (oben rechts)
2. Falls es "production" ist:
   - Ändere in Vercel: `NEXT_PUBLIC_SANITY_DATASET=production`
   - Oder: Publish die Daten im Studio (dann sind sie in beiden Datasets)

### Problem 2: Daten sind in einem anderen Projekt

**Symptom:** Im Studio siehst du keine Impressions oder ein anderes Projekt

**Lösung:**
1. Prüfe die Project ID im Studio (Settings → API)
2. Falls sie anders ist:
   - Ändere in Vercel: `NEXT_PUBLIC_SANITY_PROJECT_ID=richtige-id`
   - Oder: Ändere in `studio/sanity.config.ts`

### Problem 3: Daten sind nur lokal (nicht synchronisiert)

**Symptom:** Im Studio siehst du 130+ Impressions, aber die API findet nichts

**Lösung:**
1. **Das sollte eigentlich nicht passieren** - Sanity speichert immer in der Cloud
2. Prüfe, ob du vielleicht offline arbeitest
3. Prüfe, ob die Daten wirklich gespeichert wurden (nicht nur im Browser-Cache)

### Problem 4: Daten sind als Drafts und Token funktioniert nicht

**Symptom:** Debug-Seite zeigt "Token: ✓ Set", aber nur 1 Impression

**Lösung:**
1. Prüfe die Vercel Logs:
   - Deployments → Neuestes Deployment → Functions → Logs
   - Suche nach: `[getWorkflowAtlasData] Token present: true/false`

2. Prüfe, ob der Token korrekt ist:
   - Vercel Dashboard → Settings → Environment Variables
   - Prüfe, dass `SANITY_API_READ_TOKEN` exakt kopiert wurde (keine Leerzeichen)

3. **Alternative:** Publish die wichtigsten Impressions im Studio:
   - Öffne jede Impression
   - Klicke auf "Publish"
   - Dann sind sie auch ohne Token abrufbar

## Schritt 5: Daten im Sanity Manage Dashboard prüfen

1. **Gehe zu:** https://www.sanity.io/manage

2. **Wähle dein Projekt:** `dn63o2e7`

3. **Prüfe die Datasets:**
   - Klicke auf "Datasets" im linken Menü
   - Siehst du "development"?
   - Wie viele Dokumente sind darin?

4. **Prüfe die API:**
   - Klicke auf "API" im linken Menü
   - Prüfe die Tokens
   - Prüfe die CORS-Einstellungen

## Schritt 6: Direkte API-Abfrage testen

Öffne diese URL im Browser (ersetze PROJECT_ID und DATASET):

```
https://dn63o2e7.api.sanity.io/v2025-01-01/data/query/development?query=*[_type == "impression"] { _id, headline }
```

**Mit Token:**
```
https://dn63o2e7.api.sanity.io/v2025-01-01/data/query/development?query=*[_type == "impression"] { _id, headline }&perspective=raw
```

Falls du einen Token hast, füge ihn als Header hinzu (mit einem Tool wie Postman oder curl).

## Nächste Schritte

Nach der Prüfung solltest du wissen:
1. ✅ Wo die Daten wirklich sind (welches Projekt/Dataset)
2. ✅ Ob die Daten als Drafts oder Published gespeichert sind
3. ✅ Ob der Token korrekt funktioniert
4. ✅ Ob die Konfiguration in Vercel stimmt

Basierend auf den Ergebnissen kannst du dann:
- Die Environment Variables in Vercel anpassen
- Die Daten im richtigen Dataset/Dataset publishen
- Den Token korrigieren
- Oder die Projekt-ID/Dataset anpassen
