# The Dark Woods - MUD Terminal Game

A browser-based MUD (Multi-User Dungeon) game that transitions into a retro terminal interface.

## Features
- Choose from 3 character classes
- Explore 4 locations with 5 enemy types
- Level progression and combat system
- Auto-save functionality using browser storage
- Transitions to a retro terminal interface after death
- Fully client-side (no backend required)

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
│   ├── mud-terminal.jsx    # Main game component
│   ├── App.jsx              # App wrapper
│   ├── main.jsx             # React entry point
│   └── index.css            # Tailwind styles
├── index.html               # HTML entry point
├── package.json             # Dependencies
└── vite.config.js           # Build configuration
```

## License
MIT - Feel free to modify and use for your own projects!
