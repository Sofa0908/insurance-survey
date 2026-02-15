# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static single-page marketing site for Tesla car insurance in Taiwan. All content is in Traditional Chinese (zh-Hant). Zero dependencies — pure vanilla HTML, CSS, and JavaScript with no build step, no package manager, and no framework.

## Development

There is no build or install step. To serve locally:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`. There are no tests or linters configured.

## Deployment

Deployed via **Vercel** as a static site (framework preset "Other", no build command, output directory `.`). `vercel.json` configures long-term immutable caching for CSS/JS and no-cache for HTML. GitHub Pages is an alternative (branch `main`, folder `/`).

## Architecture

The entire site is three files:

- **`index.html`** — All page markup organized as sequential sections: header, hero, quote form, partners, benefits, advisor, coverage, process, savings, FAQ, footer
- **`styles.css`** — All styling using CSS custom properties (theme variables defined at `:root`), CSS Grid/Flexbox layouts, and responsive breakpoints at 900px and 640px. Dark theme with accent color `#e82127`
- **`script.js`** — All interactivity: mobile menu toggle, smooth scroll navigation, interactive quote calculator, Google Form submission via hidden iframe, Intersection Observer animations, scroll parallax, and counter animations

## Key Integrations

**Google Forms** — The quote request form posts to a Google Form endpoint using a hidden iframe target. Form field `name` attributes use Google Forms `entry.XXXXXXX` IDs. If the Google Form fields change, the entry IDs in `index.html` must be updated to match.

**Google Fonts** — Inter typeface loaded via Google Fonts API in the HTML `<head>`.

## Quote Calculator Logic

The interactive quote card in the hero section computes premiums based on:
- Base premium: NT$2,480/month
- Adjustments for mileage (5,000–20,000 km), driver count (1–4), and a derived safety score
- Safety score formula: `99 - abs(mileage - 12000) / 1000 * 1.5 - (drivers - 1) * 1.8`
