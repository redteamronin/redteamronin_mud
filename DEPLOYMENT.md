# MUD Terminal Game - Deployment Guide

## Quick Overview
This is a React app that needs to be "built" before hosting. The build process converts your React code into regular HTML, CSS, and JavaScript files that any web server can serve.

## Prerequisites
You need **Node.js** installed on your computer:
- Download from: https://nodejs.org/
- Get the LTS (Long Term Support) version
- This includes `npm` (Node Package Manager)

---

## Setup Instructions

### 1. Install Dependencies
Open a terminal/command prompt in your project folder and run:

```bash
npm install
```

This downloads all the required libraries (React, Vite, Tailwind, etc.)

### 2. Test Locally (Optional)
To see your site running locally:

```bash
npm run dev
```

Then open your browser to `http://localhost:5173`
Press `Ctrl+C` to stop the local server

### 3. Build for Production
This creates the files ready for your web server:

```bash
npm run build
```

This creates a `dist` folder with all your website files.

---

## Hosting Options

### Option A: Traditional Web Server (Apache, Nginx, etc.)

**What to upload:**
- Upload everything inside the `dist` folder to your web server
- The `dist` folder contains: `index.html`, `assets/` folder with CSS and JS files

**Where to upload:**
- Usually to a folder like `public_html/` or `www/` or `htdocs/`
- Depends on your hosting provider

**Example file structure on server:**
```
public_html/
  ├── index.html
  └── assets/
      ├── index-[hash].js
      └── index-[hash].css
```

**Important:** Your web server needs to be configured to serve `index.html` for all routes. Add this to your `.htaccess` (Apache) or nginx config:

**Apache (.htaccess):**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**Nginx:**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

---

### Option B: Static Hosting Services (Easiest)

These services are designed for React apps and handle everything automatically:

#### **Netlify (Recommended - Free)**
1. Sign up at https://netlify.com
2. Drag and drop your `dist` folder
3. Done! You get a URL like `https://your-site.netlify.app`

Or use Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

#### **Vercel (Also Free)**
1. Sign up at https://vercel.com
2. Install Vercel CLI: `npm install -g vercel`
3. Run: `vercel --prod`
4. Follow the prompts

#### **GitHub Pages (Free)**
1. Install gh-pages: `npm install -g gh-pages`
2. Update `vite.config.js` to set `base: '/your-repo-name/'`
3. Run: `npm run build`
4. Deploy: `gh-pages -d dist`

#### **Cloudflare Pages (Free)**
1. Sign up at https://pages.cloudflare.com
2. Connect your GitHub repo or upload `dist` folder
3. Build command: `npm run build`
4. Output directory: `dist`

---

### Option C: Your Own Server (VPS/Cloud)

If you have a VPS (like DigitalOcean, AWS, Linode):

1. **Install Nginx:**
```bash
sudo apt update
sudo apt install nginx
```

2. **Upload your files:**
```bash
# On your computer, build the site:
npm run build

# Upload to server (replace with your details):
scp -r dist/* user@your-server-ip:/var/www/html/
```

3. **Configure Nginx:**
```bash
sudo nano /etc/nginx/sites-available/default
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

4. **Restart Nginx:**
```bash
sudo systemctl restart nginx
```

---

## Important Notes

### Browser Storage
The game uses browser localStorage for saving progress. This means:
- Each player's save is stored in their own browser
- Data persists across browser sessions
- Clearing browser data will delete saves
- No database needed on your server

### No Backend Required
This is a fully client-side application:
- No server-side code (PHP, Python, Node.js, etc.)
- No database setup needed
- Just static file hosting

### File Size
The built site is very small (typically under 500KB), so it works on any hosting plan.

---

## Troubleshooting

**Problem:** Blank page after deployment
- **Solution:** Check browser console (F12) for errors
- Make sure `base` in `vite.config.js` matches your URL path
- Verify all files from `dist` folder were uploaded

**Problem:** 404 errors on refresh
- **Solution:** Configure your web server to redirect all routes to `index.html` (see Apache/Nginx configs above)

**Problem:** Styles not loading
- **Solution:** Check that the `assets` folder was uploaded alongside `index.html`

---

## Quick Deployment Steps (TL;DR)

1. Install Node.js
2. Run `npm install`
3. Run `npm run build`
4. Upload `dist` folder contents to web server
5. Configure server to serve `index.html` for all routes (if needed)
6. Done!

---

## Updating Your Site

When you make changes:

1. Edit your source files
2. Run `npm run build` again
3. Re-upload the new `dist` folder
4. Refresh your browser (may need to hard refresh: Ctrl+Shift+R)

---

## Recommended: Netlify for Beginners

If this is your first time deploying a React app, I highly recommend **Netlify**:

1. Build: `npm run build`
2. Go to https://app.netlify.com/drop
3. Drag your `dist` folder onto the page
4. Your site is live!

You get:
- Free hosting
- Automatic HTTPS
- Custom domain support
- Dead simple deployment

---

Need help? The most common issues are:
1. Forgetting to upload the `assets` folder
2. Not configuring URL rewriting for single-page apps
3. Wrong `base` path in vite.config.js
