# The Dark Woods - MUD Terminal Game

A browser-based MUD (Multi-User Dungeon) game with three-tier progression and multiple endings.

## Features
- **Two distinct worlds**: Dark Woods and Frozen Wastes
- **Three terminal access levels**: Basic, Elite, and Omega
- **Multiple endings** based on your performance
- Choose from 3 character classes
- Progressive difficulty with 10 unique enemy types
- Level progression and combat system
- Auto-save functionality using browser storage
- Philosophical meta-narrative about mortality and persistence
- Fully client-side (no backend required)

## Game Structure

### Phase 1: The Dark Woods
- 4 locations to explore
- 5 enemy types culminating in the Ancient Dragon
- **Die here** → Basic Terminal (Standard ending)
- **Beat the Dragon** → Elite Terminal (Unlock Phase 2)

### Phase 2: The Frozen Wastes (Elite Access Only)
- 4 new icy locations
- 5 new enemy types culminating in the Ancient Yeti
- The Yeti is unbeatable - death is certain
- **Die here** → Omega Terminal (True ending)

### Terminal Progression
1. **Basic Terminal** - Standard access, limited files
2. **Elite Terminal** - Decrypted files, `journey` command unlocked
3. **Omega Terminal** - Access to `truth.txt`, philosophical conclusion

See [GAME_GUIDE.md](./GAME_GUIDE.md) for complete walkthrough.

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open browser to `http://localhost:5173`

## Build for Production

```bash
npm run build
```

This creates a `dist` folder ready for deployment.

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive hosting instructions.

Quick option: Upload `dist` folder to Netlify, Vercel, or GitHub Pages.

## Technology Stack
- React 18
- Vite (build tool)
- Tailwind CSS
- Browser localStorage for save data

## Project Structure
```
├── src/
│   ├── mud-terminal.jsx    # Main game component (three-tier system)
│   ├── App.jsx              # App wrapper
│   ├── main.jsx             # React entry point
│   └── index.css            # Tailwind styles
├── index.html               # HTML entry point
├── package.json             # Dependencies
├── vite.config.js           # Build configuration
├── GAME_GUIDE.md            # Complete game walkthrough
└── DEPLOYMENT.md            # Hosting instructions
```

## Design Philosophy

This game explores themes of inevitable mortality, the journey vs. the destination, and persistence despite certain defeat. The three-tier structure creates a narrative arc:

1. Most players fail in the woods (mortality)
2. Elite players conquer the dragon (achievement)
3. All elite players eventually fall to the Yeti (inevitability)

The Omega Terminal reveals that the true test was never about winning, but about continuing despite knowing the end.

## License
MIT - Feel free to modify and use for your own projects!
