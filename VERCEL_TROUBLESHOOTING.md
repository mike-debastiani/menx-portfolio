# Vercel Troubleshooting - Nur 1 Impression wird geladen

## Problem
Lokal funktioniert alles, aber auf Vercel wird nur 1 Impression geladen statt 130+.

## Mögliche Ursachen

### 1. API Token fehlt in Vercel (Wahrscheinlichste Ursache)

**Prüfen:**
1. Gehe zu Vercel Dashboard → Dein Projekt → Settings → Environment Variables
2. Prüfe, ob `SANITY_API_READ_TOKEN` gesetzt ist
3. **WICHTIG:** Prüfe, dass der Token für **Production** aktiviert ist (nicht nur Development/Preview)

**Lösung:**
1. Füge `SANITY_API_READ_TOKEN` hinzu (falls nicht vorhanden)
2. Stelle sicher, dass **alle drei Environments** ausgewählt sind:
   - ✅ Production
   - ✅ Preview  
   - ✅ Development
3. Starte ein neues Deployment

### 2. Debug-Seite auf Vercel prüfen

1. Öffne: `https://deine-domain.vercel.app/debug/sanity`
2. Prüfe die "Configuration Info" Sektion:
   - Ist "API Token: ✓ Set" oder "✗ Not set"?
   - Ist "Vercel: ✓ Yes" angezeigt?
3. Prüfe die "Raw Counts":
   - Wie viele Impressions werden direkt abgerufen?

### 3. Vercel Logs prüfen

1. Gehe zu Vercel Dashboard → Dein Projekt → Deployments
2. Klicke auf das neueste Deployment
3. Klicke auf "Functions" Tab
4. Prüfe die Logs nach:
   - `[getWorkflowAtlasData] Raw impressions count: X`
   - `[getWorkflowAtlasData] Token present: true/false`

### 4. Environment Variables nochmal prüfen

**Stelle sicher, dass diese drei Variablen gesetzt sind:**

```
NEXT_PUBLIC_SANITY_PROJECT_ID=dn63o2e7
NEXT_PUBLIC_SANITY_DATASET=development
SANITY_API_READ_TOKEN=sky0iTrAgfwjwGLCIIBihM8ywdOes3DrlLSRWxhi39O0s9G1FkpBjzJVM9ODdBCqKbDeQwo1ETqK0G60JsfSXpGftBplLlQMK62UKtShNefbednhH5PMLz2ED1wSUsv0KciD5bxoTOLis5IImKctg10sQd5kNBGlnZ1gZz8x5HZrg7fEn1RC
```

**Wichtig:**
- `NEXT_PUBLIC_*` Variablen sind öffentlich (können im Client-Code gesehen werden)
- `SANITY_API_READ_TOKEN` ist **nicht** öffentlich (nur Server-Side)
- Alle drei müssen für **Production** gesetzt sein

### 5. Cache-Problem

Vercel cached möglicherweise die Antworten. Versuche:

1. **Hard Refresh:**
   - Öffne die Seite mit `Ctrl+Shift+R` (Windows) oder `Cmd+Shift+R` (Mac)

2. **Neues Deployment:**
   - Gehe zu Deployments → drei Punkte (⋯) → "Redeploy"
   - Wähle "Use existing Build Cache" → **NICHT** auswählen

3. **Cache leeren:**
   - Vercel Dashboard → Settings → General
   - Prüfe, ob Caching aktiviert ist

## Schritt-für-Schritt Lösung

### Schritt 1: Token in Vercel setzen

1. Vercel Dashboard → Projekt → Settings → Environment Variables
2. Füge hinzu:
   - Name: `SANITY_API_READ_TOKEN`
   - Value: `sky0iTrAgfwjwGLCIIBihM8ywdOes3DrlLSRWxhi39O0s9G1FkpBjzJVM9ODdBCqKbDeQwo1ETqK0G60JsfSXpGftBplLlQMK62UKtShNefbednhH5PMLz2ED1wSUsv0KciD5bxoTOLis5IImKctg10sQd5kNBGlnZ1gZz8x5HZrg7fEn1RC`
   - **WICHTIG:** Wähle alle drei Environments aus (Production, Preview, Development)
3. Klicke "Save"

### Schritt 2: Neues Deployment starten

1. Gehe zu "Deployments"
2. Klicke auf die drei Punkte (⋯) beim letzten Deployment
3. Wähle "Redeploy"
4. **WICHTIG:** Deaktiviere "Use existing Build Cache"
5. Klicke "Redeploy"

### Schritt 3: Prüfen

1. Warte bis das Deployment fertig ist
2. Öffne: `https://deine-domain.vercel.app/debug/sanity`
3. Prüfe:
   - "API Token: ✓ Set" sollte angezeigt werden
   - "Raw Counts" sollte mehr als 1 Impression zeigen
4. Öffne die Homepage und prüfe, ob alle Impressions geladen werden

### Schritt 4: Falls es immer noch nicht funktioniert

1. **Prüfe die Vercel Logs:**
   - Deployments → Neuestes Deployment → Functions → Logs
   - Suche nach `[getWorkflowAtlasData]` Logs
   - Prüfe, ob "Token present: true" angezeigt wird

2. **Prüfe die Debug-Seite:**
   - Öffne `/debug/sanity` auf Vercel
   - Prüfe alle Counts und Warnungen

3. **Kontaktiere Support:**
   - Falls alles korrekt konfiguriert ist, aber es immer noch nicht funktioniert
   - Teile die Logs und Debug-Seite Screenshots

## Häufige Fehler

**Fehler:** Token ist nur für Development gesetzt
- **Lösung:** Stelle sicher, dass Production auch ausgewählt ist

**Fehler:** Token hat Leerzeichen am Anfang/Ende
- **Lösung:** Kopiere den Token nochmal genau, ohne Leerzeichen

**Fehler:** Altes Deployment wird noch verwendet
- **Lösung:** Starte ein neues Deployment nach dem Hinzufügen der Variablen

**Fehler:** Cache zeigt alte Daten
- **Lösung:** Hard Refresh im Browser oder warte ein paar Minuten
