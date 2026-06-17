# Design.md — BlogLayout „Bold Retro Display"

> Status: **angenommener Vorschlag** · Stand: 2026-06-17 · Scope: Startseite, Header, visuelles System; Detailseiten erben.
> Dieses Dokument ist die verbindliche Design-Referenz. Implementierung erfolgt separat nach Freigabe.

---

## 1. Design-Prinzipien

1. **Minimal, retro, editorial.** Warmes Papier statt reines Weiß, klassische Display-Serife, viel Weißraum, dünne Hairlines, ein einziger Akzent.
2. **Gute Lesbarkeit zuerst.** Display-Serife nur für große Headlines; Fließtext bleibt in der bewährten, ruhigen Lesetype (Crimson Text). Detail-Lesespalte bleibt schmal.
3. **Adaptieren, nicht kopieren.** Die Vorlagen (SimpleMagazine, Norm Architects, Personal Travel Blog) liefern die Haltung — nicht das Pixel-Layout.
4. **Ein Akzent.** Das vorhandene Rost-Rot ersetzt das generische Blau überall (Links, CTAs, aktive Nav, Sterne).
5. **Struktur der Detailseiten bleibt unverändert** — sie erben ausschließlich die visuelle Sprache.

---

## 2. Farb-Tokens

| Rolle | Hex | Tailwind / Quelle | Notiz |
|---|---|---|---|
| Papier-Hintergrund | `#FBF9F4` | **neu** `paper.DEFAULT` | ersetzt `bg-white` global (Body) |
| Papier vertieft (Wells/Karten) | `#F4F0E8` | **neu** `paper.deep` | optional für BookCard-Hintergrund |
| Text / Ink | `#1C1B19` | **neu** `ink` | warmes Fast-Schwarz statt `gray-900` |
| Akzent | `#A84048` | vorhanden `accent.default` | Links, CTAs, aktive Nav, ⭐ |
| Akzent Hover | `#8D2D34` | vorhanden `accent.600` | |
| Meta / gedämpft | `#5E5E5E` | vorhanden `monochrome.100` | Datum, Genre, Serie, Labels |
| Hairline / Border | `#e5e5e5` | vorhanden `monochrome.600` | Trenner, Spaltenlinien |

**Migrationsregel:** Jedes `text-blue-600` / `border-blue-600` / `hover:text-blue-600` → `accent`. `bg-white` am Body/Layout → `paper`.

`tailwind.config.js`-Ergänzung:
```js
colors: {
  paper: { DEFAULT: '#FBF9F4', deep: '#F4F0E8' },
  ink: '#1C1B19',
  // accent / monochrome bleiben unverändert
}
```
`nuxt.config.ts`: `theme-color` Meta `#ffffff` → `#FBF9F4`.

---

## 3. Typografie

| Familie | Font | Klasse | Einsatz |
|---|---|---|---|
| **Display** | **Playfair Display** | `font-display` | Top-Level-Headlines: Artikel-Titel (Liste + Detail), Lead, BookCard-Titel |
| **Brand (neu)** | **Fraunces** | `font-brand` | Header-Logo `flore.nz` — Marken-Display der flore.nz-Landingpage |
| Head | Crimson Text *(unverändert)* | `font-head` | Zwischenüberschriften h3/h4 im Fließtext, Sub-Headlines |
| Body | Crimson Text | `font-body` | Fließtext, Excerpts |
| Meta | Inter | `font-meta` | Datum, Genre, Serie, Spalten-Labels, Footer |
| **Mono (neu)** | **Space Mono** | `font-mono` | Header-Nav + RSS-Popover (Versalien, Tracking) — Interface-Type der Landingpage |

- **Marken-Konsistenz mit der Landingpage** (`github_profile/index.html`, ausgeliefert auf flore.nz): der Header übernimmt deren Identität — **Fraunces**-Logo mit Akzent-Punkt (`flore`·`.`·`nz`, Punkt in Akzent), **Space Mono** Versalien-Nav mit **Draw-in-Underline** (Akzent, `scaleX` von links, `cubic-bezier(0.16,1,0.3,1)`).
- **Wichtig:** `font-head` bleibt Crimson; `font-display` (Playfair) nur große Content-Headlines. Header-Logo = `font-brand` (Fraunces), Header-Nav = `font-mono` (Space Mono).
- Fonts laden über den `@import` in `assets/css/_typography.pcss` (Fraunces opsz 9..144, Space Mono 400/700 ergänzt).
- `tailwind.config.js`: `display` (Playfair), `brand` (Fraunces), `mono` → Space Mono.

> Hinweis: `font-mono` = Space Mono wirkt auch auf Prosa-Code (`pre`/`code`). Falls in code-lastigen Posts unerwünscht, eigene Mono für Prosa-Code definieren.

### Typo-Skala (Richtwerte)
| Element | Größe | Familie |
|---|---|---|
| Startseiten-Lead-Headline | `text-4xl`→`lg:text-5xl` | `font-display` |
| Artikel-Titel Liste (Spalte 1) | `text-2xl`→`text-3xl` | `font-display` |
| Detail-Artikel-Titel | `text-4xl`→`lg:text-5xl` | `font-display` |
| BookCard-Titel | `text-lg` | `font-display` |
| Spalten-Label („ARTIKEL" etc.) | `text-xs` uppercase `tracking-widest` | `font-meta` |
| In-Article h3/h4 | `text-xl`/`text-lg` | `font-head` |
| Meta (Datum/Genre/Serie) | `text-xs`/`text-sm` | `font-meta` |

---

## 4. Drop-Caps (Initialen)

- **Wo:** erster Absatz jeder **Detailseite** + Lead-Artikel der **Startseite**.
- **Stil:** große Initiale in `font-display`, `float: left`, ~3 Zeilen hoch, Farbe `ink` (Akzent optional).
- **Guard:** greift nur, wenn der erste Block ein **Text**-Absatz ist — nicht bei führendem Bild/Heading:
  ```css
  .has-dropcap > p:first-of-type::first-letter { /* font-display, float:left, ~3.4em */ }
  ```
  Klasse `has-dropcap` wird in `ArticleView` gesetzt, wenn `cachedHtml` mit einem echten Text-Absatz beginnt (Regex `^\s*<p[^>]*>\s*[^<\s]` — schließt `<p><img>` aus).

---

## 5. Header

Eine Variante. `HeaderNew.vue` + `HeaderOld.vue` sind gelöscht.

- **Sticky immer:** `sticky top-0 z-50` (entfernt das heutige `sticky md:relative`).
- **Full-Bleed:** Leiste spannt randlos über den Viewport; Inhalt (Logo · Nav · Social) bleibt am Content-Container ausgerichtet (`max-w-6xl xl:max-w-7xl`).
- **Hintergrund:** `paper/90` + `backdrop-blur` + untere Hairline (`monochrome-600`).
- **Quote/Phrases-Block entfällt komplett** (Desktop + Mobile) — inkl. der `randomHeadNumber`-Logik.

### Marken-Look der Landingpage (github_profile)
- **Logo:** `settings.sitetitle` in **Fraunces** (`font-brand`, `font-medium`, `tracking-tight`, **nicht** kursiv); auf `.` gesplittet → der Punkt steht in **Akzent** (`flore`·`.`·`nz`). Echo der Landingpage („Heldermann.").
- **Nav:** **Space Mono**, Versalien, `tracking-[0.18em]`, `text-[0.72rem]`, mit **Draw-in-Underline** — `::after` Akzent-Linie, `scaleX(0)→(1)` von links, `transition .45s cubic-bezier(0.16,1,0.3,1)`; aktiv = `is-active` (Linie sichtbar + Akzent-Text). Scoped CSS in `Header.vue`.
- **Mobile-Nav** ebenfalls Space Mono Versalien (`text-xl tracking-[0.2em]`).

### RSS-Popover (statt zwei RSS-Icons)
Ein einziges RSS-Icon; Klick öffnet ein Popover mit drei Feeds:
- **Artikel · Deutsch** → `/feed.xml`
- **Articles · English** → `/feed-en.xml`
- **Linkblog · Verlinkt** → `https://opentabs.flore.nz/recommendations/feed`

State `isRssOpen`, Klick-weg-Backdrop (`fixed inset-0`), schließt bei Routenwechsel. Aktives Icon = Akzent.

### Icons gleichfarbig
Alle Social-Icons (RSS, Mastodon, Goodreads, Bluesky) erscheinen in **einem** Ton (`text-monochrome-100`, Hover `accent`). Dafür sind die hartkodierten Fills in `SimpleIcon.vue` auf `currentColor` umgestellt (RSS: weißes Hintergrund-Quadrat entfernt, Wellen `currentColor`; Mastodon-Body ist bereits `currentColor`, das weiße „m" bleibt als Negativform).

### Mobile
Hamburger-Overlay, **per `<Teleport to="body">`** aus dem Header gelöst — sonst macht das `backdrop-blur` des Headers den Sticky-Wrapper zum Containing-Block und das `fixed inset-0`-Overlay deckt nur die Header-Box ab. Overlay `z-[60]` mit eigenem Schließen-X. Enthält Nav, gleichfarbige Social-Icons und die drei RSS-Feeds (RSS · EN · Linkblog).

Layout-Konsequenz: Full-Bleed-Header + Verbreiterung sind die einzigen Änderungen an `layouts/default.vue` (Wrapper `max-w-6xl xl:max-w-7xl`). Pages mit eigenem `max-w-4xl` (Detail, Kategorie …) bleiben schmal.

---

## 6. Startseite — Desktop (≥ `lg`)

Drei Spalten im **goldenen Schnitt** als Geometriereihe φ²:φ:1.

```css
/* Container: max-w-6xl xl:max-w-7xl mx-auto (Layout-Wrapper) */
grid-template-columns: 2.618fr 1.618fr 1fr;   /* ≈ 50% / 31% / 19% — gemessen 2.69 : 1.62 : 1.00 */
gap: 2rem;                                     /* Tailwind: lg:grid-cols-[2.618fr_1.618fr_1fr] gap-8 */
```
Vertikale Trenner: `border-l border-monochrome-600` + linkes Padding (`pl-8`) auf Spalte 2 und 3.

### Spalte 1 — „ARTIKEL" (φ²)
- Inhalt: alle Posts **außer Kategorie Bücher** (Filter `$or` slug `$ne buecher` / Kategorie `$null`); bestehender Heavy-Rotation-Ausschluss bleibt.
- Darstellung: `ArticleView` (Excerpt-Modus) bis `<!--more-->` + „Weiterlesen →".
- **Lead-Artikel** (erster): große `font-display`-Headline + **Drop-Cap**; danach kleiner.
- **Pagination bleibt hier** — **max. 5 Posts pro Seite** (`per_page = 5`).

### Spalte 2 — „GELESEN" (φ)
- Inhalt: Bücher (`category.slug === 'buecher'`), neueste N (Default **N = 12**).
- **`BookCard`** je Buch (Aufbau von oben nach unten):
  - **Cover im Seitenverhältnis 4:3** (`aspect-[4/3]`, `object-cover`, `paper.deep`-Fallback)
  - **darauf overlay**: Genre · Serie (`font-meta`, `text-[10px]` Versalien, auf Gradient-Scrim `from-ink/85`) — aus `genre_books[].title` / `bookseries[0].title`
  - **Headline** (Titel, `font-display`, `text-lg`)
  - ⭐ Wertung (`Rating :compact`, Akzent) + Datum (`font-meta`, klein) — Rating aus `additional[].__component === 'content.rating'`
  - **„Lesen →"**-CTA → `/blog/[slug]`
- Fußzeile der Spalte: „Alle Bücher →" → `/category/buecher`.

### Spalte 3 — „VERLINKT" (1)
- Inhalt: OpenTabs-Recommendations, neueste N (Default **N = 12**).
- **`LinkPostList`** je Eintrag:
  - Titel (`font-head`, Serife) als externer Link (`target="_blank" rel="noopener noreferrer"`), mit ↗-Marker
  - Datum (`font-meta`)
- Fußzeile: „Mehr →" → `https://opentabs.flore.nz/`.

### Spalten-Labels
Kleines `font-meta`-Versalien-Label mit em-dash-Flourish, z. B. `ARTIKEL —`, `GELESEN —`, `VERLINKT —`.

---

## 7. Startseite — Mobile (< `lg`)

**Ein verschmolzener, chronologischer Stream** aller drei Quellen, sortiert nach Datum absteigend.

| Quelle | Renderer | Datum-Feld |
|---|---|---|
| Artikel | `ArticleView` (Excerpt) | `display_published_date` |
| Buch | `BookCard` (kompakt) | `display_published_date` |
| Verlinkt | `LinkPostList`-Zeile „↗ Verlinkt: Titel · Datum" | `pubDate` (OpenTabs) |

- Merge clientseitig: jede Quelle → `{ type, date, payload }`, dann `sort((a,b) => b.date - a.date)`.
- „Mehr laden" am Ende (lädt weitere Artikel-Seiten + ggf. mehr OpenTabs/Bücher nach).

---

## 8. Daten & Queries

Alle Strapi-Queries via `qs.stringify(..., { encodeValuesOnly: true })`, `baseURL: strapiUrl`. Populate wie bestehendes `INDEX_POPULATE`.

**A — Blog (Spalte 1, paginiert)**
```
/api/articles
  filters[$or][0][category][slug][$ne] = buecher  // Bücher raus …
  filters[$or][1][category][id][$null] = true     // … aber Posts ohne Kategorie behalten
  sort = display_published_date:DESC
  pagination[start] = page * 5, pagination[limit] = 5   // max. 5 pro Seite
  populate = INDEX_POPULATE
```

**B — Bücher (Spalte 2)**
```
/api/articles
  filters[category][slug][$eq] = buecher
  sort = display_published_date:DESC
  pagination[limit] = 12
  populate = { cover, bookseries, genre_books, additional{ content.rating } }
```

**C — Verlinkt (Spalte 3)** → interne Route `/api/opentabs` (siehe §9).

Mobile: A (erste Seite) + B + C zusammenführen und nach Datum sortieren.

> Hinweis: Kategorie ist ein Objekt (`category.title` / `category.slug`). Der heutige Index-Vergleich `post.category !== 'Heavy Rotation'` ist faktisch ein No-op (Objekt ≠ String) — beim Umbau wird serverseitig sauber per `slug` gefiltert.

---

## 9. OpenTabs — Server-Route-Vertrag

**Datei:** `server/api/opentabs.get.ts`

- **Methode:** `GET /api/opentabs`
- **Antwort:** `{ items: Array<{ title: string; link: string; date: string /* ISO */ }> }`
- **Quelle:** `https://opentabs.flore.nz/recommendations/feed` (RSS 2.0)
- **Mapping:** `<item>` → `{ title: <title>, link: <link>, date: new Date(<pubDate>).toISOString() }`
- **Link-Host:** der Feed liefert `drops.florenz.dev`-Permalinks → werden auf **`opentabs.flore.nz`** umgeschrieben (`link.replace('drops.florenz.dev','opentabs.flore.nz')`).
- **Limit:** Standard 12 (per Query `?limit=` überschreibbar, max 50).
- **Caching:** ~30 min (`defineCachedFunction`, `maxAge: 1800`, Key `opentabs:recommendations`). Dev-Cache liegt unter `.nuxt/cache/nitro/functions/opentabs/` und muss bei Logikänderung gelöscht werden.
- **Fehlerfall:** bei Fetch-/Parse-Fehler `{ items: [] }` (graceful, Spalte 3 bleibt leer statt Seite zu brechen).
- **Parsing:** leichtgewichtig (Regex + Entity-Decode) ohne neue Dependency; nur Titel + Link + Datum.

---

## 10. Detailseiten (Struktur unverändert, Optik erbt)

`pages/blog/[slug].vue` → `max-w-4xl` → `ArticleView :detail`. **Strukturell wird nichts angefasst.**

Erbt automatisch:
- Cremeweißer Hintergrund.
- Artikel-Titel → `font-display` (Playfair). **h3/h4 im Fließtext bleiben Crimson.**
- Drop-Cap auf erstem Absatz (mit Guard, §4).
- Fließtext-Links (Prose) → Akzent (Prose-Link-Farbe via `@tailwindcss/typography`-Config oder CSS-Override auf `.e-content a`).
- Body Crimson, Meta Inter.

**Mitläufer** (gleiche Regel): `pages/blog/en/[slug].vue`, `pages/[slug].vue` (statische Seiten, `.article-title`/`.date`), `/blog`, `/category/*`, `/series/*`, `/genre/*`, `/author/*` — alle auf Papier-Hintergrund, mit Akzent statt Blau.

---

## 11. Responsive-Verhalten

| Breakpoint | Verhalten |
|---|---|
| `< lg` (Mobile/Tablet) | Ein verschmolzener chronologischer Stream (§7) |
| `≥ lg` (Desktop) | 3-Spalten Golden-Ratio-Grid (§6) |
| Header | Full-Bleed sticky auf allen Breakpoints; Nav → Hamburger `< md` |

---

## 12. Datei-Scope

**Neu**
- `server/api/opentabs.get.ts` — RSS → JSON, gecacht (§9)
- `components/BookCard.vue` — Buch-Karte Spalte 2 (§6)
- `components/LinkPostList.vue` — OpenTabs-Liste Spalte 3 (§6)

**Geändert**
- `pages/index.vue` — Golden-Ratio-Grid (Desktop) + Merge-Stream (Mobile) + Queries A/B/C, `per_page = 5`
- `components/Header.vue` — sticky-always, full-bleed, ohne Quote, Akzent, RSS-Popover, gleichfarbige Icons, Teleport-Mobile-Overlay, `xl:max-w-7xl`; **Landingpage-Look: Fraunces-Logo (Akzent-Punkt), Space-Mono-Versalien-Nav, Draw-in-Underline**
- `components/ArticleView.vue` — `font-display` auf Titel, Lead-/Drop-Cap-Hook (Text-Absatz-Guard), Akzent-Hover
- `components/SimpleIcon.vue` — RSS-Fills → `currentColor` (weißes Quadrat entfernt) für einheitliche Icon-Farbe
- `components/Footer.vue` — `bg-paper-deep` + `border-monochrome-600`
- `tailwind.config.js` — `paper`, `ink`, `accent.DEFAULT`, `fontFamily.display` + **`brand` (Fraunces)** + **`mono` → Space Mono**
- `assets/css/_typography.pcss` — `@import` (Playfair **+ Fraunces + Space Mono**), Body `text-ink bg-paper`, Akzent-Links, Drop-Cap, Blau → Akzent
- `assets/css/_globals.pcss` — Papier-Hintergrund, Prose-Link-Akzent, Selection
- `layouts/default.vue` — Full-Bleed-Header + Wrapper `max-w-6xl xl:max-w-7xl`
- `nuxt.config.ts` — `theme-color` → Cream

**Gelöscht**
- `components/HeaderNew.vue`, `components/HeaderOld.vue`

**Unverändert (Struktur)**
- Detail-/Content-Logik, `useArticlePage`, `/blog`, `/category/*`, `/series/*`, `/genre/*`, SEO/Schema

---

## 13. Festgelegte Parameter & offene Punkte

- **Spalte 1:** `per_page = 5` (festgelegt).
- **N (neueste)** in Spalte 2 & 3: **12** (festgelegt, per Query überschreibbar).
- **Breite:** Layout-Wrapper `max-w-6xl xl:max-w-7xl` (ein zusätzlicher Breakpoint). Gemessene Spaltenbreiten @1440: 584 / 351 / 217 px ≈ φ²:φ:1.
- **Cream-Ton** `#FBF9F4` / **Ink** `#1C1B19`: am echten Screen feinjustierbar.
- **Display-Font:** Playfair Display (Cormorant als Alternative möglich).
- **Drop-Cap:** `ink`, nur auf **text-geführten** Artikeln (führt ein Post mit Bild, erscheint keine Initiale — Guard `^\s*<p[^>]*>\s*[^<\s]`). Beide Beispiel-Posts beginnen mit Bild → dort bewusst keine Initiale.
- **Lead-Auswahl:** erster Post von Query A (kein „featured"-Flag in Strapi nötig).
