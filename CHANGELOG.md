# Changelog

## v4.0 - Three-Tier System (Current)
**Date:** 2025-02-19

### Major Features:
- ✨ Added Frozen Wastes as second world
- ✨ Implemented three-tier terminal system (Basic, Elite, Omega)
- ✨ Added 5 new tundra enemies including unbeatable Ancient Yeti
- ✨ Added `journey` command for Elite terminal users
- ✨ Added `truth.txt` file for Omega terminal
- ✨ Visual theming based on current world (dark woods vs blue tundra)
- ✨ Stats carry over between worlds

### Bug Fixes:
- 🐛 Fixed confusing "Proceed? [y/n]" prompt in secrets.dat
- 🐛 Removed unreadable fake files (log_XXX.txt, core.sys) from file listings
- 🐛 Corrected file count and disk space calculations

### Files Changed:
- `src/mud-terminal.jsx` - Major refactor for multi-world support
- `GAME_GUIDE.md` - New comprehensive guide
- `README.md` - Updated with three-tier system info

---

## v3.0 - Victory Ending
**Date:** 2025-02-19

### Features:
- ✨ Added victory ending for beating the Ancient Dragon
- ✨ Different terminal messages based on performance
- ✨ Added `victory.txt` file for dragon victors
- ✨ Added status indicators (FALLEN vs VICTOR)

### Bug Fixes:
- 🐛 Game no longer continues after player death
- 🐛 Fixed duplicate death messages
- 🐛 All action buttons disabled when HP <= 0
- 🐛 Enemy properly cleared on death

---

## v2.0 - Browser Compatibility
**Date:** 2025-02-19

### Critical Fix:
- 🐛 **Terminal transition not working** - Replaced Claude-specific `window.storage` API with browser's native `localStorage`
- 🐛 Death transition now properly triggers in deployed environments
- ✨ Added console logging for debugging

### Files Changed:
- `src/mud-terminal.jsx` - Updated storage API calls
- `FIXES.md` - Created to document issues

---

## v1.0 - Initial Release
**Date:** 2025-02-19

### Features:
- ✨ Character selection (Warrior, Ranger, Mage)
- ✨ Dark Woods with 4 locations
- ✨ 5 enemy types (Goblin, Wolf, Troll, Wraith, Dragon)
- ✨ Combat system with attack, flee, rest, search
- ✨ Level progression and XP system
- ✨ Basic terminal interface on death
- ✨ Terminal commands: help, about, whoami, status, files, read, clear, exit
- ✨ Auto-save using localStorage
- ✨ React + Vite + Tailwind stack

---

## Known Issues

### Current (v4.0):
- None reported

### Fixed:
- ✅ Terminal not appearing after death (v2.0)
- ✅ Game continuing after death (v3.0)
- ✅ Confusing "Proceed?" prompt (v4.0)
- ✅ Unreadable files in listing (v4.0)

---

## Upgrade Guide

### From v3.0 to v4.0:
1. Extract new files
2. Run `npm install` (no new dependencies)
3. Run `npm run build`
4. Deploy new `dist` folder
5. Clear browser localStorage if testing (localStorage will auto-update)

### From v2.0 to v3.0:
- Same as above

### From v1.0 to v2.0:
- **Critical**: Must update to v2.0+ for deployed sites to work properly
- localStorage format changed - saves from v1.0 incompatible

---

## Future Roadmap

### Potential v5.0 Features:
- Additional character classes
- Item/equipment system
- More worlds beyond the tundra
- Multiplayer leaderboard
- Sound effects and music
- Mobile app version
- Additional terminal mini-games

---

## Contributing

If you find bugs or have feature requests:
1. Test locally first: `npm run dev`
2. Check console for errors (F12)
3. Document reproduction steps
4. Note your browser and OS

---

## Credits

Created by: [Your Name]
Built with: React, Vite, Tailwind CSS
Inspired by: Classic MUD games, terminal aesthetics, roguelikes

Special thanks to all playtesters!
