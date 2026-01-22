<!--
  Projekt-Dokumentation
  Stand: 2026-01-22
-->

# Portfolio-Projekt – Technische Dokumentation

Diese Dokumentation beschreibt den Tech-Stack, die Architektur, das Zusammenspiel der Komponenten und den Datenfluss im Portfolio-Projekt. Ziel ist eine verständliche, aber detaillierte Übersicht für die Projektdokumentation.

## 1) Projektüberblick

Das Projekt besteht aus zwei klar getrennten Teilen:

- **`web/`**: Next.js App (App Router) für die öffentliche Portfolio-Website.
- **`studio/`**: Sanity Studio als CMS zur Pflege der Inhalte (Phasen, Methoden, Impressions, Projekte, About/Home).

Die Website bezieht Inhalte zur Laufzeit über GROQ-Queries aus Sanity und rendert Seiten serverseitig (Server Components) mit deaktiviertem Caching, damit Drafts direkt sichtbar sind.

## 2) Tech-Stack (Kurzfassung)

**Frontend (web)**
- Next.js `16.1.1` (App Router)
- React `19.2.3`
- TypeScript `^5`
- Tailwind CSS `^4` (neuer `@import 'tailwindcss'` Workflow)
- Framer Motion `^12` (Animationen / UI-Interaktionen)
- Sanity Client + Next Sanity (`@sanity/client`, `next-sanity`)

**CMS (studio)**
- Sanity Studio `^5`
- React `^19`
- Sanity Vision Plugin
- Styled Components (für Studio UI)

**Tooling**
- ESLint (Next + Studio configs)
- Prettier (inkl. Tailwind Plugin)

## 3) Repository-Struktur (wichtigste Teile)

```
menx-portfolio/
  web/                      # Next.js Frontend
    src/
      app/                  # App Router Seiten
      components/           # Atomic Design (atoms/molecules/organisms)
      lib/                  # Sanity Client + Queries + Utils
      types/                # Sanity TypeScript Modelle
  studio/                   # Sanity Studio (CMS)
    schemaTypes/            # Content-Schemas
  fix-method-references.mjs # Daten-Reparatur Script (Sanity)
```

## 4) Architektur & Rendering-Konzept (web/)

### App Router & Server Components
Die Pages unter `web/src/app/` sind überwiegend **Server Components** (kein `use client`). Die Datenabfragen zu Sanity erfolgen serverseitig. Für dynamische Inhalte ist überall Caching deaktiviert:

- `export const dynamic = 'force-dynamic'`
- `export const revalidate = 0`

Dadurch werden **Drafts** aus Sanity zuverlässig geladen (z.B. während der Bearbeitung).

### Layout-Grundstruktur
`web/src/app/layout.tsx` legt globale Fonts, Metadaten und den Header fest. Die Seiten bauen sich modular aus Komponenten im `components/` Ordner auf (Atomic Design).

## 5) Datenfluss (Sanity → Web)

### Sanity Client
In `web/src/lib/sanity.client.ts` wird der Sanity Client initialisiert:

- `projectId` + `dataset` kommen aus `NEXT_PUBLIC_SANITY_PROJECT_ID` und `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_READ_TOKEN` ist optional, aber nötig für Drafts in manchen Umgebungen (z.B. Vercel)
- `perspective: 'raw'` und `useCdn: false` stellen Drafts sicher

### Queries
Alle GROQ-Queries liegen in `web/src/lib/sanity.queries.ts`. Beispielhafte Funktionen:

- `getSelectedProjects()` → Selected Work
- `getRelevantWorkProjects()` / `getLabProjects()` → Archive-Seiten
- `getWorkflowAtlasData()` → komplexe, zusammengeführte Daten für die Workflow-Visualisierung
- `getCaseStudyBySlug()` → Case Study Content Blocks
- `getAboutData()` / `getHomeData()` → About & Home

### Rendering-Flow (Beispiel)
1. Page (z.B. `app/page.tsx`) lädt Daten serverseitig via `getWorkflowAtlasData()`, `getSelectedProjects()`, `getHomeData()`, `getAboutData()`.
2. Daten werden als Props an Organism-Komponenten übergeben.
3. Komponenten rendern UI-Module und nutzen ggf. clientseitige Logik (z.B. Workflow Atlas).

## 6) Content-Modell (Sanity Studio)

Die CMS-Datenmodelle sind in `studio/schemaTypes/` definiert:

### Hauptdokumenttypen
- **`phase`**: Name, Order, Slug, Color
- **`method`**: Name, Order, Slug, Referenz auf `phase`
- **`impression`**: Bild, Headline, Description, Order, Referenzen auf `method` und `project`
- **`project`**: Title, Slug, Year, Rolle, Context, Card-Infos, Case-Study Content Blocks
- **`about`**: Texte, Portrait, Content Blocks, Footer CTA
- **`home`**: Rollen/Segments für die Hero-Interaktion (Headline oder Code-Modus)

### Content Blocks (Case Study & About)
`project` und `about` besitzen flexible Content Blocks:

- `fullImage`
- `imageGallery`
- `sectionBlock`
- `textBlock`
- `twoColumn`
- `video`

Diese Blöcke werden im Frontend über den `ContentBlocksRenderer` gerendert.

## 7) UI-Architektur & Komponenten

### Atomic Design
Die Komponentenstruktur folgt grob Atomic Design:

- `atoms/` – kleinste UI-Bausteine (Button, Pill, etc.)
- `molecules/` – kombinierte Bausteine (Cards, Section Blöcke)
- `organisms/` – größere Sektionen (Hero, Archive, Workflow Atlas)

### ContentBlocksRenderer
`web/src/components/organisms/ContentBlocksRenderer.tsx` mappt `_type` aus Sanity auf die passenden React-Komponenten und rendert diese in Reihenfolge.

## 8) Layout- & Styling-System

Das Styling basiert auf Tailwind CSS v4 **plus** einem eigenen Layout-Token-System in `globals.css`.

Wichtige Konzepte:
- CSS Custom Properties für Grid-Spalten, Gutter, Margin
- Utility-Klassen wie `.layout-container` und `.layout-grid`
- Responsive Anpassungen für spezielle Layout-Szenarien (z.B. About Hero, InfoColumns, Two Column Blocks)

## 9) Bilder & Medien

### Sanity Images
In `sanity.client.ts` wird eine `urlForImage()` Helper-Funktion verwendet:

- generiert optimierte CDN-URLs
- unterstützt Fallbacks, wenn `@sanity/image-url` nicht installiert ist

### Next Image Config
In `next.config.ts` ist `cdn.sanity.io` als Remote Pattern erlaubt.

## 10) API-Route

Es gibt eine serverseitige API in `web/src/app/api/project-category/route.ts`:

- `/api/project-category?slug=...`
- liefert die Kategorie (`relevant-work` oder `lab`)
- wird für Routing/Filtering genutzt

## 11) Debug & Wartung

### Debug-Seiten
Unter `web/src/app/debug/` existieren Debug-Pages, um Sanity-Daten zu prüfen:

- `debug/sanity` → detaillierte Übersicht
- `debug/sanity-test` → simpler API-Test

### Reparatur-Skript
`fix-method-references.mjs` behebt Referenzen von Draft-Methoden → Published-Methoden (mit Sanity Token).

## 12) Environment Variablen

Benötigte Umgebungsvariablen (in `web/.env.local`):

```
NEXT_PUBLIC_SANITY_PROJECT_ID=dn63o2e7
NEXT_PUBLIC_SANITY_DATASET=development
SANITY_API_READ_TOKEN=... (optional aber empfohlen)
```

## 13) Build & Dev Scripts

### Web
- `npm run dev` – Development Server
- `npm run build` – Production Build
- `npm run start` – Production Server
- `npm run lint` / `npm run typecheck`

### Studio
- `npm run dev` – Sanity Studio lokal
- `npm run deploy` – Studio deployen

## 14) Deployment Hinweise

- **Frontend**: Ideal für Vercel
- **Sanity Studio**: Separater Deploy (Sanity CLI)
- Bei Vercel unbedingt `SANITY_API_READ_TOKEN` setzen, wenn Drafts benötigt werden

## 15) Erweiterbarkeit

**Neue Content Blocks hinzufügen**
1. Neuen Schema-Typ unter `studio/schemaTypes/blocks/` anlegen
2. In `studio/schemaTypes/blocks/index.ts` exportieren
3. In `web/src/components/molecules/contentBlocks/` neue Komponente bauen
4. `ContentBlocksRenderer` erweitern
5. Query in `sanity.queries.ts` um Block-Fields ergänzen

---

Wenn du möchtest, kann ich die Dokumentation noch um **UML/Diagramme**, **Datenfluss-Grafiken** oder **Schema-Tabellen** ergänzen (z.B. für eine Bachelor-/Semesterarbeit).
