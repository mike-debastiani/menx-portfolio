# Vercel Token Fix - Token wird nicht erkannt

## Problem identifiziert ✅

- **Lokal:** Token gesetzt → 131 Impressions gefunden
- **Vercel:** Token NICHT gesetzt → Nur 1 Impression gefunden

Die Debug-Seite zeigt auf Vercel: `Token: ✗ Not set`

## Lösung: Token in Vercel korrekt setzen

### Schritt 1: Vercel Dashboard öffnen

1. Gehe zu: https://vercel.com/dashboard
2. Wähle dein Projekt: `menx-portfolio`
3. Klicke auf **Settings** (oben im Menü)
4. Klicke auf **Environment Variables** (linkes Menü)

### Schritt 2: Prüfe den bestehenden Token

1. Suche nach `SANITY_API_READ_TOKEN` in der Liste
2. **WICHTIG:** Klicke auf den Token, um die Details zu sehen
3. Prüfe die **Environment** Checkboxen:
   - ✅ Ist **Production** angehakt?
   - ✅ Ist **Preview** angehakt?
   - ✅ Ist **Development** angehakt?

### Schritt 3: Token korrigieren (falls nötig)

**Falls der Token nicht existiert oder nicht für Production aktiviert ist:**

1. **Falls Token nicht existiert:**
   - Klicke auf "Add New"
   - Name: `SANITY_API_READ_TOKEN`
   - Value: `sky0iTrAgfwjwGLCIIBihM8ywdOes3DrlLSRWxhi39O0s9G1FkpBjzJVM9ODdBCqKbDeQwo1ETqK0G60JsfSXpGftBplLlQMK62UKtShNefbednhH5PMLz2ED1wSUsv0KciD5bxoTOLis5IImKctg10sQd5kNBGlnZ1gZz8x5HZrg7fEn1RC`
   - **WICHTIG:** Wähle ALLE drei Environments:
     - ✅ Production
     - ✅ Preview
     - ✅ Development
   - Klicke "Save"

2. **Falls Token existiert, aber Production nicht aktiviert:**
   - Klicke auf den Token
   - Klicke auf "Edit"
   - Stelle sicher, dass **Production** angehakt ist
   - Klicke "Save"

### Schritt 4: Token-Wert prüfen

**WICHTIG:** Stelle sicher, dass der Token-Wert exakt ist:

```
sky0iTrAgfwjwGLCIIBihM8ywdOes3DrlLSRWxhi39O0s9G1FkpBjzJVM9ODdBCqKbDeQwo1ETqK0G60JsfSXpGftBplLlQMK62UKtShNefbednhH5PMLz2ED1wSUsv0KciD5bxoTOLis5IImKctg10sQd5kNBGlnZ1gZz8x5HZrg7fEn1RC
```

- Keine Leerzeichen am Anfang oder Ende
- Keine Zeilenumbrüche
- Exakt dieser Wert

### Schritt 5: Neues Deployment starten

**KRITISCH:** Nach dem Hinzufügen/Ändern des Tokens MUSS ein neues Deployment gestartet werden!

1. Gehe zu **Deployments** (oben im Menü)
2. Klicke auf die drei Punkte (⋯) beim letzten Deployment
3. Wähle **"Redeploy"**
4. **WICHTIG:** Deaktiviere **"Use existing Build Cache"**
5. Klicke **"Redeploy"**

### Schritt 6: Prüfen

1. **Warte bis das Deployment fertig ist** (kann 2-5 Minuten dauern)

2. **Öffne die Debug-Seite:**
   - `https://deine-domain.vercel.app/debug/sanity-test`
   - Prüfe: `Token: ✓ Set` sollte jetzt angezeigt werden
   - Prüfe: `Total Count: 131` sollte jetzt angezeigt werden

3. **Öffne die Homepage:**
   - Alle Impressions sollten jetzt geladen werden

## Häufige Fehler

### Fehler 1: Token nur für Preview/Development gesetzt
**Symptom:** Token existiert, aber Production ist nicht angehakt
**Lösung:** Siehe Schritt 3.2

### Fehler 2: Neues Deployment nicht gestartet
**Symptom:** Token ist gesetzt, aber wird immer noch nicht erkannt
**Lösung:** Siehe Schritt 5 - MUSS ein neues Deployment gestartet werden!

### Fehler 3: Token hat Leerzeichen
**Symptom:** Token ist gesetzt, aber funktioniert nicht
**Lösung:** Kopiere den Token nochmal genau, ohne Leerzeichen

### Fehler 4: Falscher Token-Name
**Symptom:** Token wird nicht erkannt
**Lösung:** Stelle sicher, dass der Name exakt ist: `SANITY_API_READ_TOKEN` (großgeschrieben, mit Unterstrichen)

## Verifikation

Nach dem Fix sollte die Debug-Seite auf Vercel zeigen:

```
Configuration:
- Project ID: dn63o2e7
- Dataset: development
- Token: ✓ Set  ← WICHTIG: Muss jetzt "Set" sein!
- Environment: production
- Vercel: ✓ Yes

Query Results:
- Total Count: 131  ← WICHTIG: Sollte 131 sein, nicht 1!
- Drafts: 49
- Published: 82
```

## Falls es immer noch nicht funktioniert

1. **Prüfe die Vercel Logs:**
   - Deployments → Neuestes Deployment → Functions → Logs
   - Suche nach: `[getWorkflowAtlasData] Token present: true/false`

2. **Prüfe die Environment Variables nochmal:**
   - Settings → Environment Variables
   - Stelle sicher, dass `SANITY_API_READ_TOKEN` existiert
   - Stelle sicher, dass Production aktiviert ist
   - Prüfe den Token-Wert (kopiere ihn nochmal)

3. **Lösche und füge den Token neu hinzu:**
   - Lösche den bestehenden Token
   - Füge ihn neu hinzu (siehe Schritt 3.1)
   - Starte ein neues Deployment
