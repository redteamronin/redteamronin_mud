import React, { useState, useEffect, useRef } from 'react';

const MUDTerminal = () => {
  const [gameState, setGameState] = useState('loading');
  const [player, setPlayer] = useState(null);
  const [location, setLocation] = useState('start');
  const [hp, setHp] = useState(100);
  const [maxHp, setMaxHp] = useState(100);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [inventory, setInventory] = useState([]);
  const [gameLog, setGameLog] = useState([]);
  const [currentEnemy, setCurrentEnemy] = useState(null);
  const [terminalLines, setTerminalLines] = useState([]);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [terminalLevel, setTerminalLevel] = useState(0); // 0=basic, 1=elite, 2=final
  const [currentWorld, setCurrentWorld] = useState('woods'); // 'woods' or 'tundra'
  const logEndRef = useRef(null);
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  const characterClasses = [
    { name: 'Warrior', hp: 120, attack: 15, defense: 8, description: 'Strong and resilient, excels in close combat' },
    { name: 'Ranger', hp: 100, attack: 18, defense: 5, description: 'Swift and deadly, strikes from the shadows' },
    { name: 'Mage', hp: 80, attack: 25, defense: 3, description: 'Wields powerful magic but fragile in defense' }
  ];

  const enemies = {
    goblin: { name: 'Goblin', hp: 30, attack: 8, xp: 15, description: 'A small, green creature with sharp teeth' },
    wolf: { name: 'Dire Wolf', hp: 45, attack: 12, xp: 25, description: 'A massive wolf with glowing red eyes' },
    troll: { name: 'Forest Troll', hp: 80, attack: 18, xp: 40, description: 'A hulking brute with regenerating flesh' },
    wraith: { name: 'Shadow Wraith', hp: 60, attack: 22, xp: 50, description: 'An ethereal being that feeds on fear' },
    dragon: { name: 'Ancient Dragon', hp: 150, attack: 30, xp: 100, description: 'The apex predator of these woods' },
    // Tundra enemies
    ice_wolf: { name: 'Ice Wolf', hp: 70, attack: 20, xp: 35, description: 'A frost-covered predator with icy fangs' },
    frost_giant: { name: 'Frost Giant', hp: 120, attack: 28, xp: 60, description: 'A towering giant wielding an ice club' },
    wendigo: { name: 'Wendigo', hp: 90, attack: 32, xp: 75, description: 'A cursed spirit of endless hunger' },
    ice_drake: { name: 'Ice Drake', hp: 150, attack: 38, xp: 90, description: 'A dragon of ice and frost' },
    yeti: { name: 'Ancient Yeti', hp: 999, attack: 50, xp: 200, description: 'The immortal guardian of the frozen wastes' }
  };

  const locations = {
    // Woods locations
    start: {
      name: 'Forest Entrance',
      description: 'You stand at the edge of a dark forest. The trees loom overhead, blocking out most of the sunlight.',
      encounters: ['goblin', 'wolf'],
      next: ['deeper']
    },
    deeper: {
      name: 'Deep Woods',
      description: 'The forest grows denser. Strange sounds echo through the trees. You sense danger nearby.',
      encounters: ['wolf', 'troll', 'wraith'],
      next: ['clearing', 'deeper']
    },
    clearing: {
      name: 'Ancient Clearing',
      description: 'A clearing opens before you. In the center stands a massive stone altar, stained with age.',
      encounters: ['wraith', 'dragon'],
      next: ['deeper', 'lair']
    },
    lair: {
      name: 'Dragon\'s Lair',
      description: 'You enter a cave littered with bones and treasure. The air grows hot. This is the end of your journey.',
      encounters: ['dragon'],
      next: []
    },
    // Tundra locations
    tundra_start: {
      name: 'Frozen Wasteland',
      description: 'An endless expanse of snow stretches before you. The wind howls with an otherworldly fury.',
      encounters: ['ice_wolf'],
      next: ['tundra_deeper']
    },
    tundra_deeper: {
      name: 'Glacial Valley',
      description: 'Massive ice formations tower above. The temperature drops further. Something moves in the distance.',
      encounters: ['ice_wolf', 'frost_giant', 'wendigo'],
      next: ['tundra_peaks', 'tundra_deeper']
    },
    tundra_peaks: {
      name: 'Frozen Peaks',
      description: 'You climb higher into the mountains. Ice drakes circle overhead. The summit beckons.',
      encounters: ['wendigo', 'ice_drake'],
      next: ['tundra_deeper', 'yeti_throne']
    },
    yeti_throne: {
      name: 'The Yeti\'s Throne',
      description: 'A massive ice throne sits atop the highest peak. The Ancient Yeti waits. This is where legends die.',
      encounters: ['yeti'],
      next: []
    }
  };

  const terminalCommands = {
    help: {
      description: 'Display available commands',
      execute: () => {
        const cmds = Object.keys(terminalCommands)
          .filter(cmd => {
            // Hide journey command unless at elite level
            if (cmd === 'journey' && terminalLevel < 1) return false;
            return true;
          })
          .map(cmd => 
            `  ${cmd.padEnd(12)} - ${terminalCommands[cmd].description}`
          ).join('\n');
        return `Available commands:\n${cmds}`;
      }
    },
    about: {
      description: 'Information about this system',
      execute: () => {
        const accessLevel = terminalLevel === 0 ? 'STANDARD' : terminalLevel === 1 ? 'ELITE' : 'OMEGA';
        return `MAINFRAME TERMINAL v2.4.1
Connected to: CLASSIFIED
Uptime: ${Math.floor(Math.random() * 1000)} days
Access Level: ${accessLevel}

You have accessed a restricted system. All activity is logged.`;
      }
    },
    whoami: {
      description: 'Display current user',
      execute: () => {
        if (!player) return 'User: GUEST';
        let status = 'FALLEN';
        if (terminalLevel === 2) status = 'TRANSCENDENT';
        else if (terminalLevel === 1) status = 'VICTOR';
        return `User: ${player.name}
Class: ${player.class}
Final Level: ${level}
Total XP: ${xp}
Status: ${status}`;
      }
    },
    status: {
      description: 'System status',
      execute: () => {
        return `SYSTEM STATUS: OPERATIONAL
Memory: 64KB / 128KB
Processes: 12 running
Network: CONNECTED
Security: ${terminalLevel === 0 ? 'MAXIMUM' : terminalLevel === 1 ? 'ELEVATED' : 'OMEGA CLEARANCE'}`;
      }
    },
    files: {
      description: 'List available files',
      execute: () => {
        const victoryFile = terminalLevel >= 1 ? '  victory.txt     0.8 KB   CLASSIFIED\n' : '';
        const finalFile = terminalLevel >= 2 ? '  truth.txt       1.1 KB   OMEGA\n' : '';
        const secretsStatus = terminalLevel >= 1 ? 'DECRYPTED' : 'ENCRYPTED';
        return `Directory of /home/user:
  README.txt       1.2 KB   ${new Date().toLocaleDateString()}
  secrets.dat      0.5 KB   ${secretsStatus}
${victoryFile}${finalFile}
${terminalLevel === 0 ? '2' : terminalLevel === 1 ? '3' : '4'} File(s)     ${terminalLevel === 0 ? '1.7' : terminalLevel === 1 ? '2.5' : '3.6'} KB
Free Space:   126.4 KB`;
      }
    },
    read: {
      description: 'Read a file (usage: read [filename])',
      execute: (args) => {
        if (!args || args.length === 0) {
          return 'Usage: read [filename]';
        }
        const file = args[0].toLowerCase();
        if (file === 'readme.txt') {
          return `WELCOME TO THE MAINFRAME

You've completed your journey through the ${currentWorld === 'tundra' ? 'frozen wastes' : 'woods'}.
What you experienced was not just a game.

Every choice you made, every battle you fought,
every step deeper into the ${currentWorld === 'tundra' ? 'tundra' : 'forest'}...
it was all part of the test.

Thank you for playing.

- The Architect`;
        } else if (file === 'victory.txt') {
          if (terminalLevel >= 1) {
            return `CLASSIFIED DOCUMENT - LEVEL 5 CLEARANCE

Subject: Trial Result - ${player?.name || 'Unknown'}

The subject has achieved what was thought impossible.
They conquered the Dark Woods. Defeated the Ancient Dragon.
Survived against all odds.

Classification: EXCEPTIONAL

This individual has proven themselves worthy.
The test is complete.

Recommendation: APPROVED FOR NEXT PHASE

[END TRANSMISSION]`;
          } else {
            return 'ERROR: File not found.';
          }
        } else if (file === 'truth.txt') {
          if (terminalLevel >= 2) {
            return `OMEGA CLEARANCE DOCUMENT

Subject: The Truth

You have reached the end of all trials.
The Woods. The Tundra. The Ancient Yeti.

Every warrior falls eventually.
There is no victory against death itself.

You were not meant to win.
You were meant to understand.

The journey was the test.
Your persistence was the answer.

Status: COMPLETE
Classification: OMEGA

You are free now.

[SYSTEM TERMINAL - END OF LINE]`;
          } else {
            return 'ERROR: File not found.';
          }
        } else if (file === 'secrets.dat') {
          if (terminalLevel >= 1) {
            return `DECRYPTION SUCCESSFUL

ELITE ACCESS GRANTED

The woods were only the beginning.
Beyond the flames lies the frost.
Beyond the dragon lies something older.

The Ancient Yeti awaits in the frozen north.
Those who conquered the dragon may face what lies beyond.

WARNING: None have returned from the tundra.
This path leads only to one end.

To continue the trial, type: journey`;
          } else {
            return 'ERROR: File is encrypted. Access denied.';
          }
        } else {
          return `ERROR: File '${file}' not found.`;
        }
      }
    },
    journey: {
      description: 'Begin the next trial',
      execute: () => {
        if (terminalLevel >= 1 && terminalLevel < 2) {
          setTimeout(() => {
            startTundraJourney();
          }, 2000);
          return `Initiating transfer protocol...
Loading coordinates...
Temperature dropping...

The frozen wastes await you, ${player?.name}.

[TRANSFERRING...]`;
        } else if (terminalLevel === 0) {
          return 'ERROR: Unknown command. Type "help" for available commands.';
        } else {
          return 'The journey is complete. There is nowhere left to go.';
        }
      }
    },
    clear: {
      description: 'Clear terminal screen',
      execute: () => {
        setTerminalLines([]);
        return null;
      }
    },
    exit: {
      description: 'Logout from terminal',
      execute: () => {
        return 'Connection closed by remote host.';
      }
    }
  };

  useEffect(() => {
    loadGame();
  }, []);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [gameLog]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLines]);

  useEffect(() => {
    if (gameState === 'terminal') {
      inputRef.current?.focus();
    }
  }, [gameState]);

  const loadGame = () => {
    try {
      const savedState = localStorage.getItem('mud-game-state');
      if (savedState) {
        const state = JSON.parse(savedState);
        setPlayer(state.player);
        setLocation(state.location);
        setHp(state.hp);
        setMaxHp(state.maxHp);
        setLevel(state.level);
        setXp(state.xp);
        setInventory(state.inventory);
        setGameLog(state.gameLog || []);
        setCurrentWorld(state.currentWorld || 'woods');
        setTerminalLevel(state.terminalLevel || 0);
        setGameState('playing');
      } else {
        setGameState('character-select');
      }
    } catch (error) {
      setGameState('character-select');
    }
  };

  const saveGame = (state) => {
    try {
      localStorage.setItem('mud-game-state', JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save game:', error);
    }
  };

  const addLog = (message, type = 'info') => {
    setGameLog(prev => [...prev, { message, type, timestamp: Date.now() }]);
  };

  const selectCharacter = (charClass) => {
    const newPlayer = {
      name: `${charClass.name} Adventurer`,
      class: charClass.name,
      attack: charClass.attack,
      defense: charClass.defense
    };
    setPlayer(newPlayer);
    setMaxHp(charClass.hp);
    setHp(charClass.hp);
    setLocation('start');
    setGameState('playing');
    addLog(`Welcome, ${newPlayer.name}! Your journey begins...`, 'system');
    addLog(locations.start.description, 'location');
    
    saveGame({
      player: newPlayer,
      location: 'start',
      hp: charClass.hp,
      maxHp: charClass.hp,
      level: 1,
      xp: 0,
      inventory: [],
      gameLog: []
    });
  };

  const encounterEnemy = () => {
    const currentLoc = locations[location];
    const enemyType = currentLoc.encounters[Math.floor(Math.random() * currentLoc.encounters.length)];
    const enemy = { ...enemies[enemyType], currentHp: enemies[enemyType].hp };
    setCurrentEnemy(enemy);
    addLog(`A ${enemy.name} appears! ${enemy.description}`, 'enemy');
  };

  const attack = () => {
    if (!currentEnemy || hp <= 0) return;

    const playerDamage = Math.max(1, player.attack + Math.floor(Math.random() * 10) - 5);
    const enemyDamage = Math.max(0, currentEnemy.attack - player.defense + Math.floor(Math.random() * 8) - 4);

    const newEnemyHp = currentEnemy.currentHp - playerDamage;
    addLog(`You attack the ${currentEnemy.name} for ${playerDamage} damage!`, 'combat');

    if (newEnemyHp <= 0) {
      addLog(`You defeated the ${currentEnemy.name}! Gained ${currentEnemy.xp} XP.`, 'victory');
      const newXp = xp + currentEnemy.xp;
      const newLevel = Math.floor(newXp / 100) + 1;
      
      if (newLevel > level) {
        addLog(`Level up! You are now level ${newLevel}!`, 'system');
        setLevel(newLevel);
        const hpIncrease = 20;
        setMaxHp(prev => prev + hpIncrease);
        setHp(prev => prev + hpIncrease);
      }
      
      setXp(newXp);
      setCurrentEnemy(null);
      
      // Check if player defeated the dragon in the final location
      if (currentEnemy.name === 'Ancient Dragon' && location === 'lair') {
        addLog('', 'system');
        addLog('The mighty dragon falls. The forest grows silent.', 'victory');
        addLog('You have conquered the Dark Woods.', 'victory');
        addLog('Elite access granted. Secrets await...', 'system');
        setTimeout(() => {
          console.log('Victory! Transitioning to elite terminal...');
          transitionToTerminal(1);
        }, 4000);
        return;
      }
      
      // Check if player defeated the Yeti (shouldn't happen, but just in case)
      if (currentEnemy.name === 'Ancient Yeti') {
        addLog('', 'system');
        addLog('The impossible has occurred. The Yeti falls.', 'victory');
        addLog('...but this was not meant to be.', 'system');
        addLog('Reality fractures. The system crashes.', 'death');
        setTimeout(() => {
          console.log('Yeti defeated (impossible). Final terminal...');
          transitionToTerminal(2);
        }, 4000);
        return;
      }
      
      saveGame({
        player,
        location,
        hp,
        maxHp,
        level: newLevel,
        xp: newXp,
        inventory,
        gameLog
      });
    } else {
      setCurrentEnemy({ ...currentEnemy, currentHp: newEnemyHp });
      addLog(`The ${currentEnemy.name} strikes back for ${enemyDamage} damage!`, 'combat');
      
      const newHp = hp - enemyDamage;
      if (newHp <= 0) {
        console.log('Player died, transitioning to terminal...');
        setHp(0);
        setCurrentEnemy(null);
        addLog('You have fallen...', 'death');
        
        // Determine terminal level based on world
        const termLevel = currentWorld === 'tundra' ? 2 : 0;
        
        setTimeout(() => {
          console.log(`Executing terminal transition to level ${termLevel}`);
          transitionToTerminal(termLevel);
        }, 2000);
      } else {
        setHp(newHp);
      }
    }
  };

  const flee = () => {
    if (!currentEnemy || hp <= 0) return;
    
    if (Math.random() > 0.5) {
      addLog('You successfully fled from combat!', 'system');
      setCurrentEnemy(null);
    } else {
      const damage = Math.floor(currentEnemy.attack / 2);
      addLog(`You failed to escape! The ${currentEnemy.name} hits you for ${damage} damage!`, 'combat');
      const newHp = hp - damage;
      if (newHp <= 0) {
        console.log('Player died while fleeing, transitioning to terminal...');
        setHp(0);
        setCurrentEnemy(null);
        addLog('You have fallen...', 'death');
        
        // Determine terminal level based on world
        const termLevel = currentWorld === 'tundra' ? 2 : 0;
        
        setTimeout(() => {
          console.log(`Executing terminal transition to level ${termLevel}`);
          transitionToTerminal(termLevel);
        }, 2000);
      } else {
        setHp(newHp);
      }
    }
  };

  const move = (direction) => {
    if (currentEnemy) {
      addLog('You cannot move while in combat!', 'system');
      return;
    }

    const currentLoc = locations[location];
    if (currentLoc.next.includes(direction)) {
      setLocation(direction);
      addLog(`You venture ${direction === 'deeper' ? 'deeper into the woods' : `to the ${locations[direction].name}`}...`, 'system');
      addLog(locations[direction].description, 'location');
      
      if (Math.random() > 0.3) {
        setTimeout(encounterEnemy, 1000);
      }
      
      saveGame({
        player,
        location: direction,
        hp,
        maxHp,
        level,
        xp,
        inventory,
        gameLog
      });
    } else {
      addLog('You cannot go that way.', 'system');
    }
  };

  const rest = () => {
    if (currentEnemy) {
      addLog('You cannot rest while in combat!', 'system');
      return;
    }

    const healAmount = Math.floor(maxHp * 0.3);
    const newHp = Math.min(maxHp, hp + healAmount);
    setHp(newHp);
    addLog(`You rest and recover ${newHp - hp} HP.`, 'system');
    
    if (Math.random() > 0.5) {
      addLog('But the noise attracted something...', 'system');
      setTimeout(encounterEnemy, 1000);
    }
  };

  const startTundraJourney = () => {
    console.log('Starting tundra journey');
    setCurrentWorld('tundra');
    setLocation('tundra_start');
    setGameState('playing');
    setGameLog([]);
    // Keep player stats but reset HP
    setHp(maxHp);
    addLog(`The air grows cold. You step into the frozen wastes...`, 'system');
    addLog(locations.tundra_start.description, 'location');
    addLog(`Your trials in the woods have made you stronger. But here, death is certain.`, 'system');
    
    saveGame({
      player,
      location: 'tundra_start',
      hp: maxHp,
      maxHp,
      level,
      xp,
      inventory,
      gameLog: [],
      currentWorld: 'tundra',
      terminalLevel: 1
    });
  };

  const transitionToTerminal = (level = 0) => {
    console.log(`Transitioning to terminal interface - Level ${level}`);
    try {
      localStorage.removeItem('mud-game-state');
      console.log('Game state cleared from localStorage');
    } catch (error) {
      console.error('Failed to clear save:', error);
    }
    
    setTerminalLevel(level);
    setGameState('terminal');
    console.log('Game state set to: terminal');
    
    let welcomeLines;
    
    if (level === 2) {
      // Final terminal - died to Yeti
      welcomeLines = [
        '> SYSTEM FAILURE DETECTED',
        '> Core temperature: -273°C',
        '> Life signs: NEGATIVE',
        '> ',
        '> REBOOTING...',
        '> ',
        '> OMEGA PROTOCOL ACTIVATED',
        '> Welcome to the final terminal',
        '> ',
        '> You have seen the truth.',
        '> The Yeti cannot be defeated.',
        '> Death was always the answer.',
        '> ',
        '> Type "help" for available commands',
        '> Type "read truth.txt" to understand',
        '> '
      ];
    } else if (level === 1) {
      // Elite terminal - beat dragon
      welcomeLines = [
        '> SYSTEM REBOOT INITIATED',
        '> Loading MAINFRAME.SYS...',
        '> Establishing connection...',
        '> ',
        '> CONNECTION ESTABLISHED',
        '> Welcome to the MAINFRAME',
        '> ',
        '> STATUS: TRIAL COMPLETE - VICTORY ACHIEVED',
        '> Clearance level: ELITE',
        '> ',
        '> Type "help" for available commands',
        '> Type "read secrets.dat" to see what you\'ve unlocked',
        '> '
      ];
    } else {
      // Basic terminal - died in woods
      welcomeLines = [
        '> SYSTEM REBOOT INITIATED',
        '> Loading MAINFRAME.SYS...',
        '> Establishing connection...',
        '> ',
        '> CONNECTION ESTABLISHED',
        '> Welcome to the MAINFRAME',
        '> ',
        '> Type "help" for available commands',
        '> '
      ];
    }
    
    setTerminalLines(welcomeLines);
  };

  const handleTerminalCommand = (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setTerminalHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);
    setTerminalLines(prev => [...prev, `> ${trimmed}`]);

    const parts = trimmed.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (terminalCommands[command]) {
      const output = terminalCommands[command].execute(args);
      if (output) {
        setTerminalLines(prev => [...prev, output, '']);
      }
    } else {
      setTerminalLines(prev => [...prev, `Command not found: ${command}`, 'Type "help" for available commands', '']);
    }

    setTerminalInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleTerminalCommand(terminalInput);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (terminalHistory.length > 0) {
        const newIndex = historyIndex === -1 ? terminalHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setTerminalInput(terminalHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= terminalHistory.length) {
          setHistoryIndex(-1);
          setTerminalInput('');
        } else {
          setHistoryIndex(newIndex);
          setTerminalInput(terminalHistory[newIndex]);
        }
      }
    }
  };

  if (gameState === 'loading') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-green-500 font-mono text-xl animate-pulse">Loading...</div>
      </div>
    );
  }

  if (gameState === 'character-select') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <h1 className="text-5xl font-bold text-green-400 text-center mb-4 font-mono">
            {currentWorld === 'tundra' ? 'THE FROZEN WASTES' : 'THE DARK WOODS'}
          </h1>
          <p className="text-green-300 text-center mb-12 font-mono">
            {currentWorld === 'tundra' 
              ? 'The cold will claim all. But how long will you last?'
              : 'Choose your character and venture into the unknown...'}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {characterClasses.map((char) => (
              <button
                key={char.name}
                onClick={() => selectCharacter(char)}
                className="bg-gray-800 border-2 border-green-600 p-6 rounded hover:bg-gray-700 hover:border-green-400 transition-all transform hover:scale-105"
              >
                <h3 className="text-2xl font-bold text-green-400 mb-2 font-mono">{char.name}</h3>
                <p className="text-gray-300 mb-4 text-sm">{char.description}</p>
                <div className="text-left text-green-300 font-mono text-sm space-y-1">
                  <div>HP: {char.hp}</div>
                  <div>Attack: {char.attack}</div>
                  <div>Defense: {char.defense}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'terminal') {
    return (
      <div className="min-h-screen bg-black text-green-500 font-mono p-4">
        <div className="max-w-4xl mx-auto">
          <div className="border-2 border-green-600 p-6 min-h-screen">
            <div className="mb-4 pb-4 border-b border-green-700">
              <div className="text-green-400 text-sm">
                MAINFRAME TERMINAL v2.4.1 | Connected | {new Date().toLocaleString()}
              </div>
            </div>
            
            <div className="space-y-1 mb-4">
              {terminalLines.map((line, i) => (
                <div key={i} className="whitespace-pre-wrap">{line}</div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            <div className="flex items-center">
              <span className="mr-2">{'>'}</span>
              <input
                ref={inputRef}
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-green-500 caret-green-500"
                autoFocus
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${currentWorld === 'tundra' ? 'bg-gradient-to-b from-blue-950 via-slate-900 to-black' : 'bg-gradient-to-b from-gray-900 via-gray-800 to-black'} text-green-400 p-4`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div className="bg-gray-900 border border-green-600 p-4 rounded">
            <h3 className="text-lg font-bold mb-2 font-mono">{player?.name}</h3>
            <div className="space-y-2 text-sm font-mono">
              <div>Class: {player?.class}</div>
              <div>Level: {level}</div>
              <div>XP: {xp} / {level * 100}</div>
              <div className="pt-2">
                <div className="flex justify-between mb-1">
                  <span>HP:</span>
                  <span>{hp} / {maxHp}</span>
                </div>
                <div className="w-full bg-gray-700 h-4 rounded">
                  <div 
                    className="bg-green-600 h-4 rounded transition-all"
                    style={{ width: `${(hp / maxHp) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-green-600 p-4 rounded">
            <h3 className="text-lg font-bold mb-2 font-mono">Location</h3>
            <div className="text-sm font-mono">
              <div className="text-xs text-blue-400 mb-1">
                {currentWorld === 'tundra' ? '❄ FROZEN WASTES' : '🌲 DARK WOODS'}
              </div>
              <div className="text-yellow-400">{locations[location]?.name}</div>
            </div>
          </div>

          <div className="bg-gray-900 border border-green-600 p-4 rounded">
            <h3 className="text-lg font-bold mb-2 font-mono">Status</h3>
            <div className="text-sm font-mono">
              {currentEnemy ? (
                <div className="text-red-400">
                  In Combat: {currentEnemy.name}
                  <div className="mt-2 text-xs">
                    HP: {currentEnemy.currentHp} / {currentEnemy.hp}
                  </div>
                  <div className="w-full bg-gray-700 h-2 rounded mt-1">
                    <div 
                      className="bg-red-600 h-2 rounded transition-all"
                      style={{ width: `${(currentEnemy.currentHp / currentEnemy.hp) * 100}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-blue-400">Exploring</div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-green-600 p-4 rounded mb-4 h-96 overflow-y-auto">
          <div className="space-y-2 text-sm font-mono">
            {gameLog.map((log, i) => (
              <div 
                key={i} 
                className={`
                  ${log.type === 'system' && 'text-blue-400'}
                  ${log.type === 'combat' && 'text-yellow-400'}
                  ${log.type === 'enemy' && 'text-red-400'}
                  ${log.type === 'victory' && 'text-green-400'}
                  ${log.type === 'location' && 'text-purple-400'}
                  ${log.type === 'death' && 'text-red-600 font-bold text-lg'}
                  ${log.type === 'info' && 'text-gray-300'}
                `}
              >
                {log.message}
              </div>
            ))}
            <div ref={logEndRef} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 border border-green-600 p-4 rounded">
            <h3 className="text-lg font-bold mb-3 font-mono">Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={attack}
                disabled={!currentEnemy || hp <= 0}
                className="bg-red-900 hover:bg-red-800 disabled:bg-gray-700 disabled:text-gray-500 border border-red-600 disabled:border-gray-600 px-4 py-2 rounded font-mono transition-all"
              >
                Attack
              </button>
              <button
                onClick={flee}
                disabled={!currentEnemy || hp <= 0}
                className="bg-yellow-900 hover:bg-yellow-800 disabled:bg-gray-700 disabled:text-gray-500 border border-yellow-600 disabled:border-gray-600 px-4 py-2 rounded font-mono transition-all"
              >
                Flee
              </button>
              <button
                onClick={rest}
                disabled={currentEnemy || hp <= 0}
                className="bg-blue-900 hover:bg-blue-800 disabled:bg-gray-700 disabled:text-gray-500 border border-blue-600 disabled:border-gray-600 px-4 py-2 rounded font-mono transition-all"
              >
                Rest
              </button>
              <button
                onClick={encounterEnemy}
                disabled={currentEnemy || hp <= 0}
                className="bg-purple-900 hover:bg-purple-800 disabled:bg-gray-700 disabled:text-gray-500 border border-purple-600 disabled:border-gray-600 px-4 py-2 rounded font-mono transition-all"
              >
                Search
              </button>
            </div>
          </div>

          <div className="bg-gray-900 border border-green-600 p-4 rounded">
            <h3 className="text-lg font-bold mb-3 font-mono">Movement</h3>
            <div className="space-y-2">
              {locations[location]?.next.map((loc) => (
                <button
                  key={loc}
                  onClick={() => move(loc)}
                  disabled={currentEnemy || hp <= 0}
                  className="w-full bg-green-900 hover:bg-green-800 disabled:bg-gray-700 disabled:text-gray-500 border border-green-600 disabled:border-gray-600 px-4 py-2 rounded font-mono transition-all"
                >
                  Go to {locations[loc]?.name}
                </button>
              ))}
              {locations[location]?.next.length === 0 && (
                <div className="text-gray-500 text-sm font-mono">No exits available</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MUDTerminal;