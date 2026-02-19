# MUD Terminal Game - Three-Tier System Guide

## Overview
The game now features a three-tier progression system with two distinct worlds and three terminal access levels.

## The Journey

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

### Surviving the Dark Woods:
1. **Level up before boss fights** - Search for enemies to grind XP
2. **Rest strategically** - Heal when out of combat (but may attract enemies)
3. **Know when to flee** - 50% chance of success
4. **Explore all locations** - Different areas have different enemy pools

### The Frozen Wastes (Post-Dragon):
1. **You will die** - The Yeti is unbeatable (999 HP, 50 attack)
2. **Your stats carry over** - You keep your level and max HP
3. **Explore first** - Fight weaker enemies before facing the Yeti
4. **There is no victory** - Death is the true ending

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
