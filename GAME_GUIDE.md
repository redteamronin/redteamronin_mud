# MUD Terminal Game - Three-Tier System Guide

## Overview
The game now features a three-tier progression system with two distinct worlds and three terminal access levels.

## The Journey

### Inn System 🏨
**Discovery:** 20% chance when searching (not available in boss rooms)

**Purpose:** Safe resting without risk of theft

**Cost:** 20 XP per rest

**Per-World:** Each world (Woods, Tundra) has its own separate inn
- Must discover inn in each world independently  
- Woods inn ≠ Tundra inn
- Both must be found through searching

**Benefits:**
- Restores to full HP
- **NO risk of gear being stolen**
- Safe alternative to camping

**Availability:**
- Woods: All locations except Dragon's Lair
- Tundra: All locations except Yeti's Throne

**Strategy:**
- Use inn when carrying valuable found loot
- Free rest risks 30% theft of found gear
- Inn guarantees safety but costs XP
- Worth it if you have rare loot equipped

---

### Shop System 🛒
**Discovery:** The shop has a 30% chance to appear when you use the Search action

**Currency:** XP (not gold!)

**Per-World:** Each world (Woods, Tundra) has its own separate shop
- Must discover shop in each world independently
- Same items available in both shops
- Woods shop ≠ Tundra shop

**Mechanics:**
- **Starting Gear**: Each class begins with basic equipment (cannot be sold or stolen)
- **Found Loot**: 20% chance when searching (can be sold and stolen)
- **Ground Loot**: If slot is full, item drops on ground - use "Pick Up" button after unequipping
- **Shop Items**: Purchased with XP (can be sold at 50% value, but NOT stolen)

**Risk/Reward:**
- **Resting** has a 30% chance for a thief to steal FOUND gear only
- Shop-purchased items are safe from thieves (you paid good XP!)
- Basic starting gear is also safe

**Slots:**
- **Weapon** - Increases attack
- **Armor** - Increases defense  
- **Accessory** - Various bonuses (HP, mixed stats)

**Rules:**
- Only one item per slot
- Must unequip before buying a replacement
- Unequipping is free
- Selling returns 50% of purchase price
- Gear carries over to the Tundra
- Shop remains available once discovered

**Starting Gear by Class:**
- **Warrior**: Rusty Sword (+3 ATK), Old Chainmail (+3 DEF)
- **Ranger**: Wooden Bow (+4 ATK), Worn Leather (+2 DEF)
- **Mage**: Worn Staff (+5 ATK), Tattered Robes (+1 DEF)

**Found Loot (Rare Drops):**
- Found Dagger (+6 ATK) - Sell: 30 XP
- Found Mace (+8 ATK) - Sell: 40 XP
- Found Armor (+4 DEF) - Sell: 40 XP
- Found Shield (+5 DEF) - Sell: 50 XP
- Found Charm (+4 ATK, +2 DEF) - Sell: 60 XP

**Available Items:**

*Weapons:*
- Iron Sword (50 XP) - +5 Attack | Sell: 25 XP
- Steel Axe (150 XP) - +10 Attack | Sell: 75 XP
- Enchanted Staff (200 XP) - +15 Attack | Sell: 100 XP
- Dragon Slayer (400 XP) - +25 Attack | Sell: 200 XP

*Armor:*
- Leather Armor (50 XP) - +3 Defense | Sell: 25 XP
- Chainmail (150 XP) - +6 Defense | Sell: 75 XP
- Plate Armor (250 XP) - +10 Defense | Sell: 125 XP
- Dragon Scale Mail (500 XP) - +15 Defense | Sell: 250 XP

*Accessories:*
- Ring of Vitality (100 XP) - +30 Max HP | Sell: 50 XP
- Amulet of Power (200 XP) - +8 Attack, +4 Defense | Sell: 100 XP
- Berserker Charm (300 XP) - +15 Attack, -5 Defense | Sell: 150 XP
- Guardian Talisman (300 XP) - +12 Defense, -5 Attack | Sell: 150 XP

---

### Phase 1: The Dark Woods
**Goal:** Survive and defeat the Ancient Dragon

**Locations:**
- Forest Entrance → Deep Woods → Ancient Clearing → Dragon's Lair

**Enemies:**
- Goblin (HP: 30, Attack: 8)
- Dire Wolf (HP: 45, Attack: 12)
- Forest Troll (HP: 80, Attack: 18)
- Shadow Wraith (HP: 60, Attack: 22)
- Ancient Dragon (HP: 150, Attack: 30)

**Outcomes:**
- **Die in the woods** → Basic Terminal (Level 0)
- **Defeat the Dragon** → Elite Terminal (Level 1)

---

### Phase 2: The Frozen Wastes (ELITE ONLY)
**Goal:** Face the unbeatable Ancient Yeti

**How to Access:**
1. Beat the Ancient Dragon
2. Access the Elite Terminal
3. Type: `read secrets.dat`
4. Type: `journey`

**Locations:**
- Frozen Wasteland → Glacial Valley → Frozen Peaks → The Yeti's Throne

**Enemies:**
- Ice Wolf (HP: 70, Attack: 20)
- Frost Giant (HP: 120, Attack: 28)
- Wendigo (HP: 90, Attack: 32)
- Ice Drake (HP: 150, Attack: 38)
- Ancient Yeti (HP: 999, Attack: 50) - **UNBEATABLE**

**Outcome:**
- **Die in the tundra** → Omega Terminal (Level 2)
- Note: The Yeti cannot be defeated. Death is inevitable.

---

## Terminal Access Levels

### Level 0: Basic Terminal
**Access:** Die in the Dark Woods

**Available Files:**
- `README.txt` - Standard welcome message
- `secrets.dat` - Encrypted, cannot read

**Commands:** help, about, whoami, status, files, read, clear, exit

**Status:** FALLEN

---

### Level 1: Elite Terminal
**Access:** Defeat the Ancient Dragon

**Available Files:**
- `README.txt` - Updated welcome message
- `secrets.dat` - **DECRYPTED** - Reveals the next trial
- `victory.txt` - Your victory report

**Commands:** All basic commands + `journey`

**Special Features:**
- Can read `secrets.dat` to learn about the Frozen Wastes
- Can use `journey` command to begin Phase 2
- Status shows as VICTOR

---

### Level 2: Omega Terminal
**Access:** Die in the Frozen Wastes (after beating the Dragon)

**Available Files:**
- `README.txt` - Final acknowledgment
- `secrets.dat` - Decrypted
- `victory.txt` - Phase 1 victory
- `truth.txt` - **NEW** - The ultimate revelation

**Special Features:**
- Different terminal boot sequence
- `truth.txt` reveals the philosophical conclusion
- Status shows as TRANSCENDENT
- This is the true ending

---

## Progression Flowchart

```
START
  ↓
Select Character
  ↓
Enter Dark Woods
  ↓
┌─────────────────────┐
│  Die in Woods?      │ → YES → Basic Terminal (END)
└─────────────────────┘
  ↓ NO
  ↓
Defeat Dragon
  ↓
Elite Terminal
  ↓
Read secrets.dat
  ↓
Type "journey"
  ↓
Enter Frozen Wastes
  ↓
Face enemies, gain XP
  ↓
Reach Yeti's Throne
  ↓
Fight Ancient Yeti
  ↓
Die (inevitable)
  ↓
Omega Terminal (TRUE END)
```

---

## Key Terminal Commands

### All Levels:
- `help` - Show available commands
- `about` - System information
- `whoami` - Your character status
- `status` - System status
- `files` - List available files
- `read [filename]` - Read a file
- `clear` - Clear screen
- `exit` - Exit message

### Elite Level Only:
- `journey` - Begin the Frozen Wastes trial

---

## Tips for Players

### General Strategy:
1. **Discover the shop early** - Search actions: 40% shop, 20% loot, 40% enemy
2. **Sell found loot** - Quick XP boost to buy better shop gear
3. **Don't rest with found gear** - 30% chance of theft! Sell or replace first
4. **Shop gear is safe** - Purchased items cannot be stolen
5. **Balance your build** - Berserker Charm is high risk/reward

### Economic Strategy:
- **Early game**: Sell found loot, save for Iron Sword (50 XP)
- **Mid game**: Found Charm (60 XP) → sell → buy Ring of Vitality (100 XP)
- **Late game**: Save 400 XP for Dragon Slayer before dragon fight
- **Selling**: Shop items sell for 50% value (emergency XP if needed)

### Surviving the Dark Woods:
1. **Level up before boss fights** - Search for enemies to grind XP
2. **Search frequently** - Get shop access and loot drops
3. **Upgrade starting gear ASAP** - Basic gear is weak
4. **Rest strategically** - Only rest when you have shop gear (safe from thieves)
5. **Know when to flee** - 50% chance of success
6. **Explore all locations** - Different areas have different enemy pools
7. **Save XP for Dragon Slayer** - Makes the dragon fight much easier (400 XP)

### The Frozen Wastes (Post-Dragon):
1. **Your gear carries over** - Equipment purchased in woods works in tundra
2. **You will die** - The Yeti is unbeatable (999 HP, 50 attack)
3. **Your stats carry over** - You keep your level and max HP
4. **Max out gear first** - Dragon Slayer + Dragon Scales + Amulet = best chance
5. **Explore first** - Fight weaker enemies before facing the Yeti
6. **There is no victory** - Death is the true ending

---

## Technical Notes

### Save System:
- Progress saves automatically using localStorage
- Save includes: player stats, location, world, terminal level
- Save is cleared upon reaching any terminal

### Balancing:
- Woods: Balanced for levels 1-20
- Tundra: Balanced for levels 20+, but Yeti is intentionally unbeatable
- Yeti has 999 HP to make victory extremely improbable

### Design Philosophy:
The game explores themes of:
- Inevitable mortality
- The journey vs. the destination
- What it means to "win"
- Persistence in the face of certain defeat

The Omega Terminal reveals that the true test was never about winning,
but about the willingness to continue despite knowing the end.

---

## File Contents Summary

### README.txt (All Levels)
Standard welcome and acknowledgment of your journey.

### secrets.dat
- Level 0: Encrypted
- Level 1+: Reveals the Frozen Wastes and `journey` command

### victory.txt (Level 1+)
Classification report confirming you beat the Dragon.

### truth.txt (Level 2 Only)
Philosophical conclusion about death, persistence, and the meaning of the trials.

---

## For Developers

### Adding New Worlds:
1. Add enemies to `enemies` object
2. Add locations to `locations` object  
3. Update `currentWorld` state
4. Add new terminal level if needed
5. Update `transitionToTerminal()` logic

### Modifying Difficulty:
- Adjust enemy HP/attack in `enemies` object
- Modify player attack/defense in `characterClasses`
- Change XP requirements in level calculation

### Terminal Customization:
- Edit welcome messages in `transitionToTerminal()`
- Add new files in `files` command
- Add new commands in `terminalCommands` object
