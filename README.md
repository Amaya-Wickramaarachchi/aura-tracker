# AURA Skincare Tracker

## Overview
AURA is a simple skincare tracker built with HTML, CSS, and JavaScript. Users can log skincare products and view their history, stored in LocalStorage.

## Features
- Add skincare product entries with timestamps.
- View skincare history.
- Responsive, clean UI.

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript
- **Storage**: LocalStorage
- **Deployment**: Vercel

## Setup
1. Clone the repo: `git clone https://github.com/your-username/aura-skincare-tracker.git`
2. Open `index.html` in a browser.

## Deployment Environments
- **Prod**: https://aura-tracker-one.vercel.app/ (main branch)
- **Staging**: https://aura-tracker-git-staging-amaya-wickramaarahchis-projects.vercel.app (staging branch)
- **Dev**: https://aura-tracker-git-dev-amaya-wickramaarahchis-projects.vercel.app (dev branch)

## AI Usage
- Used Grok by xAI to guide development and provide code samples.

## Future Improvements
- Add delete/edit functionality.
- Include product categories.

## Dependency Management
- Currently no external dependencies.
- Future plan: Use Dependabot (GitHub tool) for automated updates if libraries like Bootstrap are added.

## SLA
- Goal: Resolve issues within 48 hours of creation (solo project).

## Monitoring
- Current: Console logs for debugging.
- Future: Integrate Sentry for tracing/logging.

## SLO
- Objective: App loads and saves entries in <1s.
- Metric: Total entries logged.

## Alerting
- Rule: Alert if app fails to load (manual check).
- Response: Check console logs, fix within 24 hours.

## Synthetic Monitoring
- Journey: Add entry > check history.
- Current: Manual browser test.
- Future: Use GitHub Actions cron job.

## Blue-Green Deployment
- Tested `<p>Blue-Green Test</p>` on `dev` (green), merged to `staging`, then `main` (blue) for prod.
- Live at: https://aura-tracker-one.vercel.app/

## CDN & Caching
- Vercel CDN enabled.
- 1-hour cache via `vercel.json`.

## Disaster Recovery
- **Backup**: GitHub repo (https://github.com/Amaya-Wickramaarachchi/aura-tracker).
- **Recovery**: `git clone`, `vercel --prod`.

