# Deployment Guide for Deewan Residency

## Issue: Navigation Links Not Working After Deployment

### Root Cause
React Router uses client-side routing with `BrowserRouter`. When deployed to static hosting, direct navigation to routes like `/rooms` or `/about` returns a 404 because the server doesn't have these physical files. The server needs to redirect all routes to `index.html` so React Router can handle routing.

### Solution
Configuration files have been added to support all major hosting platforms:

## 1. Netlify Deployment

**File Created:** `public/_redirects`

The `_redirects` file tells Netlify to serve `index.html` for all routes.

**Steps:**
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. The `_redirects` file will automatically be copied to the build folder
4. All routes will now work correctly

**Additional Configuration:** `netlify.toml` (optional)
- Provides build settings and security headers
- Located at project root

## 2. Vercel Deployment

**File Created:** `vercel.json`

**Steps:**
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Vercel
3. Vercel will automatically use the `vercel.json` configuration
4. All routes will now work correctly

**Configuration includes:**
- Route rewrites for SPA support
- Cache headers for static assets
- Security headers

## 3. GitHub Pages Deployment

For GitHub Pages, you need to either:
- Use HashRouter instead of BrowserRouter (not recommended)
- Add a custom 404.html that redirects to index.html

**Option 1: Using 404.html trick**
Create `public/404.html` with the same content as `index.html`

## 4. Apache Server (cPanel, Shared Hosting)

**File Created:** `public/.htaccess`

**Steps:**
1. Build the project: `npm run build`
2. Upload contents of `dist` folder to your server's public directory
3. The `.htaccess` file will automatically be included
4. All routes will now work correctly

**Configuration includes:**
- Rewrite rules for SPA routing
- Security headers
- Gzip compression
- Cache control for static assets

## 5. Nginx Server

Add this configuration to your Nginx config file:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Security headers
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA routing - all routes go to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Testing Before Deployment

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Preview the production build locally:**
   ```bash
   npm run preview
   ```

3. **Test all navigation links:**
   - Click through all navbar links
   - Test direct URL navigation (type `/about` in browser)
   - Test browser back/forward buttons
   - Test the "Check Availability" button
   - Test mobile menu navigation

## Common Issues and Solutions

### Issue 1: Routes work on home page but 404 on refresh
**Solution:** Ensure your hosting platform has the correct redirect configuration (see above)

### Issue 2: Hash in URL (e.g., `/#/about`)
**Solution:** This means HashRouter is being used. The project uses BrowserRouter, which should work with the provided configurations.

### Issue 3: Assets not loading after deployment
**Solution:** 
- Check that the `base` URL in `vite.config.ts` is correct
- Ensure all asset paths are relative
- Verify the build output in `dist` folder

### Issue 4: "Check Availability" button not scrolling
**Solution:** Already fixed in Header.tsx with proper scroll handling

## Build Verification Checklist

Before deploying, verify:
- [ ] All routes defined in `App.tsx` match navigation items
- [ ] `npm run build` completes without errors
- [ ] `npm run preview` shows working navigation
- [ ] Direct URL access works in preview (e.g., `/about`)
- [ ] Mobile menu closes after navigation
- [ ] All links use `<Link>` from react-router-dom (not `<a>` tags)
- [ ] No hardcoded domain names in route paths
- [ ] Hash links properly handled (e.g., scroll to sections)

## Current Routes

All routes are defined in `src/App.tsx`:
- `/` - Home
- `/rooms` - Rooms listing
- `/rooms/:roomId` - Individual room details
- `/amenities` - Amenities
- `/dining` - Dining
- `/gallery` - Gallery
- `/about` - About page
- `/contact` - Contact page

## Production-Ready Configuration

The following files ensure production readiness:

1. **`public/_redirects`** - Netlify SPA routing
2. **`vercel.json`** - Vercel SPA routing + security headers
3. **`netlify.toml`** - Netlify build config + headers
4. **`public/.htaccess`** - Apache SPA routing + optimization
5. **`vite.config.ts`** - Build optimization with code splitting

## Performance Optimizations

The build includes:
- Code splitting (vendor, email, utils chunks)
- Asset optimization (images, CSS, JS)
- Cache headers for static assets
- Gzip compression
- Minification with esbuild
- Source maps for debugging

## Deployment Commands

```bash
# Development
npm run dev              # Start dev server (localhost:3000)
npm run dev:network      # Start dev server accessible on network

# Production
npm run build            # Build for production
npm run build:check      # Build and preview
npm run preview          # Preview production build
npm run preview:network  # Preview on network

# Quality
npm run lint             # Run ESLint
```

## Recommended Hosting Platforms

1. **Vercel** (Recommended)
   - Automatic deployment from Git
   - Zero configuration needed with vercel.json
   - Built-in CDN and SSL
   - Perfect for React apps

2. **Netlify**
   - Easy drag-and-drop deployment
   - Automatic builds from Git
   - Works perfectly with _redirects file
   - Free SSL certificates

3. **Cloudflare Pages**
   - Fast global CDN
   - Similar to Netlify/Vercel
   - Excellent performance

4. **Traditional Hosting (cPanel/Shared)**
   - Use .htaccess file
   - Upload dist folder contents
   - Works with most shared hosting

## Support

For deployment issues:
1. Check browser console for errors
2. Verify network requests in DevTools
3. Ensure correct hosting platform configuration
4. Test with `npm run preview` before deploying
5. Check that all required files are in the dist folder

## Files Modified for Production Fix

1. **Header.tsx** - Fixed "Check Availability" button routing
2. **package.json** - Added preview:network and build:check scripts
3. **Created deployment configs:**
   - `public/_redirects`
   - `vercel.json`
   - `netlify.toml`
   - `public/.htaccess`
