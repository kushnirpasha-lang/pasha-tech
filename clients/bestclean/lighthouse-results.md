# Lighthouse Results — BestClean

URL: https://kushnirpasha-lang.github.io/pasha-tech/clients/bestclean/

## Estimated scores after optimization

| Category      | Before (est.) | After (est.) | Target |
|---------------|:-------------:|:------------:|:------:|
| Performance   | ~65           | ~88          | 85+    |
| Accessibility | ~70           | ~97          | 95+    |
| Best Practices| ~83           | ~100         | 100    |
| SEO           | ~72           | ~97          | 95+    |

> Note: Lighthouse CLI unavailable (no browser on machine). Scores estimated from
> static code analysis. Run `lighthouse <url> --form-factor=mobile` after deploy
> to get exact numbers.

## Fixes applied

### SEO (was ~72 → est. 97)
- ✅ Enhanced `<title>` with city keywords
- ✅ Expanded `<meta name="description">` in Hebrew (primary language)
- ✅ Added `<meta name="keywords">` (he + ru)
- ✅ Added `<link rel="canonical">`
- ✅ Added `<link rel="alternate" hreflang>` for he/ru
- ✅ Added complete Open Graph tags (og:type, og:url, og:title, og:description, og:locale)
- ✅ Added Twitter Card meta
- ✅ Added `<meta name="robots" content="index, follow">`
- ✅ Added JSON-LD `LocalBusiness` structured data (name, phone, areaServed, openingHours)
- ✅ Created `sitemap.xml` with hreflang xhtml:link
- ✅ Created `robots.txt` with Sitemap reference

### Performance (was ~65 → est. 88)
- ✅ Fonts made non-render-blocking via `media="print" onload="this.media='all'"` trick
- ✅ Added `<noscript>` font fallback
- ✅ Reduced Google Fonts weights: Space Grotesk 400/600/700, Frank Ruhl 400/700, JetBrains Mono 600 (was 5 weights removed)
- ✅ `display=swap` already in font URL (was already correct)
- ✅ No `console.log` in JS (was already clean)
- ✅ No unused large images (CSS illustrations only)

### Accessibility (was ~70 → est. 97)
- ✅ `aria-label` on language switch group and each lang button
- ✅ `aria-hidden="true"` on all decorative SVGs (WhatsApp, Facebook, moon/sun icons)
- ✅ `aria-hidden="true"` on decorative arrows (→ in gallery, → in card previews, ▾ expand icon)
- ✅ `role="button" tabindex="0" aria-expanded="false"` on all 10 service cards
- ✅ `aria-expanded` updated dynamically on expand/collapse
- ✅ Keyboard support (Enter + Space) for service card accordion
- ✅ `:focus-visible` outline styles for all interactive elements
- ✅ Color contrast improved in light theme (--text-2, --text-3 darkened for ≥4.5:1 ratio)
- ✅ Heading hierarchy: H1 → H2 → H3 (no skipped levels)
- ✅ `<html lang="he">` set at load, updated by JS on language switch

### Best Practices (was ~83 → est. 100)
- ✅ All `target="_blank"` links now have `rel="noopener noreferrer"`
- ✅ No `console.log` or deprecated APIs
- ✅ HTTPS via GitHub Pages
- ✅ No mixed content

## Not fixed / limitations
- **og:image** — no image URL yet (Виталий не прислал фото). Add when real photos available.
- **Performance <85 risk**: Google Fonts still external (even non-blocking). Self-hosting fonts would give +5-8 pts but requires manual font files.
- **Real LCP measurement** requires browser + Lighthouse run. Run after deploy:
  ```bash
  npx lighthouse https://kushnirpasha-lang.github.io/pasha-tech/clients/bestclean/ \
    --output=json --form-factor=mobile --chrome-flags="--headless --no-sandbox"
  ```
