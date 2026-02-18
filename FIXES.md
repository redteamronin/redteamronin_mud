# Quick Fixes for Common Issues

## CRITICAL FIX: Terminal Transition Not Working
**Status:** FIXED in v2

**What was wrong:**
- The code used `window.storage` which is a Claude-specific API
- `window.storage` doesn't exist in regular web browsers
- This caused the death → terminal transition to fail silently
- Game would freeze on death but never transition

**What was fixed:**
- Changed from `window.storage` to browser's native `localStorage`
- Added console logging for debugging
- Terminal transition now works in all browsers

**How to verify it's working:**
1. Open browser console (F12)
2. When you die, you should see:
   - "Player died, transitioning to terminal..."
   - "Executing terminal transition"
   - "Transitioning to terminal interface"
   - "Game state set to: terminal"
3. After 2 seconds, the terminal should appear

## Issue: Game keeps playing after death
**Status:** FIXED in latest version

**What was wrong:**
- Attack and flee buttons weren't checking if HP <= 0
- Enemy wasn't being cleared on death
- Multiple death messages could trigger

**What was fixed:**
- All action buttons now disabled when HP <= 0
- Enemy is cleared immediately on death
- Death transition now only happens once

## GitHub Pages Specific Issues

### Issue: Blank page or 404 errors
**Solution:** Update your `vite.config.js`

If your GitHub repo is at `https://github.com/username/my-game`, change:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/my-game/',  // Use your repo name here
})
```

Then rebuild:
```bash
npm run build
```

### Issue: Assets not loading (CSS/JS files missing)
**Check:**
1. Make sure you deployed the entire `dist` folder
2. Verify your `base` path in `vite.config.js` matches your repo name
3. Check browser console (F12) for specific errors

### Issue: Page refresh shows 404
This is expected with GitHub Pages single-page apps. Users should:
- Use the navigation in your app (not browser refresh)
- OR add a 404.html redirect (see below)

**Advanced fix for refresh 404s:**
Create `public/404.html`:
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Redirecting...</title>
    <script>
      sessionStorage.redirect = location.href;
    </script>
    <meta http-equiv="refresh" content="0;URL='/'">
  </head>
</html>
```

Then in your `index.html`, add before the closing `</body>`:
```javascript
<script>
  (function() {
    var redirect = sessionStorage.redirect;
    delete sessionStorage.redirect;
    if (redirect && redirect != location.href) {
      history.replaceState(null, null, redirect);
    }
  })();
</script>
```

## Updating Your Deployed Site

After making changes:

1. Pull latest code
2. Run `npm run build`
3. Commit the new `dist` folder (if using gh-pages)
4. Or re-upload to your hosting service
5. Hard refresh browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

## Testing Locally Before Deploy

Always test locally first:
```bash
npm run build
npm run preview
```

This shows you exactly what will be deployed.
