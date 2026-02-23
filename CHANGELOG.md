# Changelog

## v7.1 - Per-World Inn/Shop (Current)
**Date:** 2025-02-19

### Critical Fix:
- 🔧 **Per-World Discovery** - Inn and shop are now separate for each world
- Woods inn ≠ Tundra inn (must discover separately)
- Woods shop ≠ Tundra shop (must discover separately)
- Prevents accessing Woods inn from Tundra (doesn't make sense)

### Why This Matters:
**Before:** Discover inn in Woods → have inn in Tundra (illogical)  
**After:** Must discover inn separately in each world (makes sense)

**Logic:** You can't teleport back to the Woods inn from the Tundra. Each world has its own locations, including shops and inns.

### Technical Changes:
- Added `shopDiscoveredTundra` and `innDiscoveredTundra` states
- Helper functions check current world: `isShopDiscovered()`, `isInnDiscovered()`
- Save/load preserves all four discovery states
- UI buttons check current world's discovery status

### Files Changed:
- `src/mud-terminal.jsx` - Per-world discovery system
- `GAME_GUIDE.md` - Clarified per-world mechanics
- `CHANGELOG.md` - This file

---

## v7.0 - Inn & Loot Pickup
**Date:** 2025-02-19

### Major Features:
- 🏨 **Inn System** - Safe resting for 20 XP (no theft risk)
- 🎒 **Loot Pickup** - Ground loot system with "Pick Up" button
- ✨ Inn discovered via Search (20% chance, not in boss rooms)
- ✨ Inn persists across worlds
- ✨ Ground loot stored when inventory full

### Inn Features:
- Cost: 20 XP per rest
- Benefit: Full HP restoration
- Safety: NO risk of gear theft
- Availability: All locations except Dragon's Lair and Yeti's Throne
- Strategic choice: Pay XP for safety vs free risky rest

### Loot Pickup Fix:
**Before:** Find loot with full slot → can't pick up, no way to get it later  
**After:** Find loot with full slot → drops on ground → unequip → click "Pick Up" button

### UI Changes:
- Inn button replaces Search when discovered (saves grid space)
- "Pick Up [item]" button appears below Actions when ground loot present
- Inn shows cost in button label: "Inn (20 XP)"

### Search Probabilities Updated:
- 30% → Shop discovery (reduced from 40%)
- 20% → Inn discovery (new!)
- 20% → Loot drop
- 30% → Enemy encounter

### Files Changed:
- `src/mud-terminal.jsx` - Added inn system, ground loot, pickup button
- `GAME_GUIDE.md` - Documented inn and pickup mechanics
- `CHANGELOG.md` - This file

---

## v6.2 - Collapsible Shop
**Date:** 2025-02-19

### Major UX Improvement:
- 🎯 **Collapsible Shop Panel** - Click to expand/collapse
- Shop now starts collapsed by default
- Auto-collapses when any action is taken
- Prevents shop from blocking important game info
- Much better mobile experience

### How It Works:
- Shop header is always visible when discovered
- Click header to toggle shop inventory open/closed
- Arrow indicator shows state (▶ collapsed, ▼ expanded)
- Any action (attack, search, move, etc.) auto-collapses shop
- Keeps character stats, location, and combat visible

### Why This Matters:
- Shop with 12 items is ~1500px tall
- Was blocking character HP, enemy status, combat log
- Players couldn't see if they were dying
- Mobile users had to scroll constantly
- Now: Shop is there when you need it, hidden when you don't

### Files Changed:
- `src/mud-terminal.jsx` - Added shopVisible state, collapsible UI, auto-collapse
- `CHANGELOG.md` - This file

---

## v6.1 - UX Improvements
**Date:** 2025-02-19

### UX Improvements:
- 📜 **Auto-scroll to top** after all actions (attack, flee, rest, search, move, shop)
- Keeps character info, location, and status visible
- Smooth scroll animation
- Better gameplay flow, especially with large shop panels

### Why This Matters:
- Shop panel is tall and pushes important info off-screen
- Players need to see HP, enemy status, and combat log
- Manual scrolling after every action is tedious
- Improves mobile experience significantly

### Files Changed:
- `src/mud-terminal.jsx` - Added gameTopRef and scrollToTop() function
- `CHANGELOG.md` - This file

---

## v6.0 - Loot & Risk System
**Date:** 2025-02-19

### Major Features:
- 🎒 **Starting Gear System** - Each class now starts with basic equipment
- 💎 **Loot Drops** - 20% chance to find gear when searching
- 🏪 **Selling System** - Sell items back to shop for 50% value
- 🦹 **Thief Mechanic** - 30% chance to lose FOUND gear when resting
- 🛡️ **Gear Protection** - Shop-purchased and starting gear cannot be stolen

### Starting Gear:
- **Warrior**: Rusty Sword (+3 ATK), Old Chainmail (+3 DEF)
- **Ranger**: Wooden Bow (+4 ATK), Worn Leather (+2 DEF)
- **Mage**: Worn Staff (+5 ATK), Tattered Robes (+1 DEF)

### Found Loot Items:
- Found Dagger, Found Mace, Found Armor, Found Shield, Found Charm
- All found items can be sold or stolen
- Provides XP injection for better shop purchases

### Balance Changes:
- **Positive**: Loot drops provide extra XP through selling
- **Negative**: Thieves can steal found gear during rest
- **Strategic**: Players must choose between keeping risky found gear or selling for guaranteed XP
- **Net Effect**: More dynamic economy, higher risk/reward

### UI Improvements:
- Sell buttons appear on equipped gear panel
- Shows sell value for each item
- Filters loot-only items from shop purchase display
- Better visual feedback for gear status

### Files Changed:
- `src/mud-terminal.jsx` - Added loot system, thief mechanic, selling, starting gear
- `GAME_GUIDE.md` - Updated with new mechanics and strategies
- `CHANGELOG.md` - This file

---

## v5.0 - Shop System
**Date:** 2025-02-19

### Major Features:
- 🛒 Added merchant shop with 12 unique items
- ✨ Equipment system with 3 slots (weapon, armor, accessory)
- ✨ Items purchased with XP (not gold)
- ✨ Gear affects base stats (attack, defense, max HP)
- ✨ Shop discovery through Search action (40% chance)
- ✨ Gear persists across worlds (woods → tundra)
- ✨ Unequip system (free, must unequip before buying replacement)

### Items Added:
**Weapons:** Iron Sword, Steel Axe, Enchanted Staff, Dragon Slayer  
**Armor:** Leather Armor, Chainmail, Plate Armor, Dragon Scale Mail  
**Accessories:** Ring of Vitality, Amulet of Power, Berserker Charm, Guardian Talisman

### UI Improvements:
- Stats panel now shows effective stats with gear bonuses
- Shop panel with equipped gear display
- Visual indicators for equipped items
- Buy/Unequip buttons with proper state handling

### Files Changed:
- `src/mud-terminal.jsx` - Added shop system, gear logic, stat calculations
- `GAME_GUIDE.md` - Added shop section and updated strategy tips
- `README.md` - Updated features list
- `CHANGELOG.md` - This file

---

## v4.0 - Three-Tier System
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
