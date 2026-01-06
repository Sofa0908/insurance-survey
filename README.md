# Insurance Frontend

Static single-page marketing site for the insurance landing page. Contains:
- `index.html` — markup
- `styles.css` — styling
- `script.js` — small interactions

## Deploying to Vercel (recommended for previews)

The repo already contains `vercel.json` for static caching; Vercel will pick it up automatically. To ship the site:

1. Go to [Vercel](https://vercel.com) → **New Project** → **Add Git Repository**. Import this repo.
2. In the project setup screen, choose **Framework Preset: Other**.
3. Leave **Root Directory** as `./` (repo root).
4. Leave **Build Command** empty (no build step needed).
5. Set **Output Directory** to `.` (so Vercel serves the repo root files directly).
6. Click **Deploy**. Vercel will build and host the site and give you a live URL.
7. (Optional) Add a custom domain in **Project Settings → Domains**. Vercel will guide DNS and issue HTTPS automatically.
8. (Optional) For pull request previews, keep the default **Create Preview Deployment for Every Git Push** enabled.

**Optional Vercel tweaks**
- The included `vercel.json` already adds long-term caching for CSS/JS and short caching for HTML. You can remove it if you prefer defaults.
- If you add more static assets (images, fonts), they will inherit the same cache headers; adjust patterns in `vercel.json` as needed.
- For a custom 404 page, add `404.html` in the repo root; Vercel will serve it automatically.

## Deploying to GitHub Pages
1. In repository Settings → Pages, select the **Branch** `main` and **Folder** `/ (root)`.
2. Save; GitHub Pages will publish the site at `<user>.github.io/<repo>`.
3. Optional: add a CNAME in Settings → Pages for a custom domain.
