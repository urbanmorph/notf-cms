# Project Instructions for Claude Code

## Project Overview
This is the Corporations of Greater Bengaluru website - a civic grievance management system for Bengaluru's five city corporations (North, South, East, West, Central).

## i18n (Internationalization)

### IMPORTANT: Always update translations when modifying text
- This project supports **English** and **Kannada (ಕನ್ನಡ)** translations
- When adding or modifying ANY user-facing text in HTML files, you MUST also update `js/i18n.js` with both English and Kannada translations
- The language toggle button appears in the navbar on all pages

### How to add translatable text
1. In HTML, use `data-i18n="section.key"` attribute:
   ```html
   <h1 data-i18n="hero.title">English Text Here</h1>
   ```

2. For input placeholders, use `data-i18n-placeholder="section.key"`:
   ```html
   <input data-i18n-placeholder="complaint.emailPlaceholder" placeholder="English placeholder">
   ```

3. Add translations to `js/i18n.js` in both `en` and `kn` objects:
   ```javascript
   const translations = {
       en: {
           section: {
               key: "English text"
           }
       },
       kn: {
           section: {
               key: "ಕನ್ನಡ ಪಠ್ಯ"
           }
       }
   };
   ```

### Translation key conventions
- `nav.*` - Navigation elements
- `hero.*` - Hero/banner sections
- `stats.*` - Statistics cards
- `dashboard.*` - Dashboard sections
- `charts.*` - Chart titles and labels
- `complaint.*` - Complaint form fields
- `footer.*` - Footer content
- `features.*` - Feature descriptions
- `geographic.*` - Geographic coverage sections
- `contact.*` - Contact information

### Pages with translations
All pages must include the i18n script and have `data-lang="en"` on the html tag:
- `index.html` - Landing page
- `north.html`, `south.html`, `east.html`, `west.html`, `central.html` - Corporation pages
- `track.html` - Complaint tracking page

### Admin pages (complete)
Admin pages use `admin.*` translation keys (e.g., `admin.sidebar.dashboard`, `admin.login.title`).
All admin pages now have full i18n support:
- `admin/login.html` ✓
- `admin/dashboard.html` ✓
- `admin/complaints.html` ✓
- `admin/officers.html` ✓
- `admin/assignments.html` ✓
- `admin/analytics.html` ✓
- `admin/sla-tracking.html` ✓

All admin translation keys are defined in `js/i18n.js` under the `admin.*` namespace.

## Git Workflow
- Main development branch: `elastic-blackwell`
- Production branch: `main`
- This is a git worktree - `main` is checked out in `/Users/sathya/Documents/GitHub/notf-cms`
- To push to main: `git push origin elastic-blackwell:main`

## File Structure
```
├── index.html          # Landing page
├── north.html          # North corporation page
├── south.html          # South corporation page
├── east.html           # East corporation page
├── west.html           # West corporation page
├── central.html        # Central corporation page
├── track.html          # Complaint tracking page
├── css/
│   └── styles.css      # Main stylesheet
├── js/
│   ├── i18n.js         # Translation system (English + Kannada)
│   ├── main.js         # Main JavaScript
│   └── ...
└── CLAUDE.md           # This file
```

## CSS Versioning
When making CSS changes, bump the version query parameter in HTML files for cache busting:
```html
<link rel="stylesheet" href="css/styles.css?v=6">
```

## Deployment

### Production URLs

**Primary Site (Vercel):**
- Main site: https://notf-cms.vercel.app
- Chat interface: https://notf-cms.vercel.app/chat-complaint.html?corp=north
- API endpoint: https://notf-cms.vercel.app/api/submit-complaint

**GitHub Pages (Legacy):**
- https://urbanmorph.github.io/notf-cms

### Vercel Configuration

**Environment Variables:**
- `SUPABASE_URL` = https://abblyaukkoxmgzwretvm.supabase.co
- `SUPABASE_SERVICE_KEY` = (stored securely in Vercel dashboard)

**Serverless Functions:**
- Located in `/api/` directory
- `/api/submit-complaint.js` - Handles complaint submission with hidden API keys

**Deployment:**
- Auto-deploys from `main` branch
- Vercel dashboard: https://vercel.com/sathyas-projects-5dfd8e1a/notf-cms

### Supabase Backend

**Project URL:** https://abblyaukkoxmgzwretvm.supabase.co
**Database:** PostgreSQL
**Storage Bucket:** `notf-cms` (for complaint photo attachments)

**Key Tables:**
- `complaints` - Main complaint records
- `issue_categories` - Complaint categories
- `complaint_attachments` - Photo metadata
- `corporations` - Corporation data
- `admin_users` - Admin user accounts

### Architecture

**Client → Vercel Serverless Function → Supabase**
- Client-side code calls `/api/submit-complaint`
- Serverless function validates data and uses hidden service key
- Function submits to Supabase and returns ticket number
- API keys never exposed to browser (secure!)

### Testing Checklist

After deployment:
- [ ] Test chat interface on all 5 corporations
- [ ] Verify complaint submission generates real ticket numbers
- [ ] Check browser console - no exposed API keys
- [ ] Verify photos upload to Supabase storage
- [ ] Test geo-fencing (reject out-of-boundary locations)
- [ ] Test on mobile devices
