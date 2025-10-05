// File: src/Game.jsx
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

// Sprites
import TreeImg from './assets/Sprites/Tree.png';
import FullNestImg from './assets/Sprites/Full Bird Nest 1.png';
import ExplosionGif from './assets/Sprites/explosion.gif';
import CatPng from './assets/Sprites/Cat.png';
import CrowPng from './assets/Sprites/Crow.png';
import EaglePng from './assets/Sprites/Eagle.png';

// Enemy sprite map
const ENEMIES = { cat: CatPng, crow: CrowPng, eagle: EaglePng };
const ENEMY_NAMES = Object.keys(ENEMIES);

// Random words shown under enemies
const WORDS = [
  // 3-letter words
  "cat","sun","dog","sky","car","box","map","cup","run","bat",
  "pen","toy","log","egg","hat","jam","key","mud","web","fan",
  "oak","zip","owl","ice","bus","cow","fox","ray","bee","pie",

  // 4-letter words
  "tree","fish","book","moon","star","rain","milk","fire","rock","door",
  "cake","sand","ship","wolf","gold","wind","leaf","bear","farm","game",
  "snow","frog","road","desk","seed","lamp","corn","time","ring","hand",

  // 5-letter words
  "apple","grape","smile","river","flame","cloud","chair","grass","bread","music",
  "angel","zebra","queen","house","plant","lemon","sweet","beach","storm","tiger",
  "mouse","sugar","dance","dream","happy","laugh","world","stone","light","towel",
  "piano","clock","water","ghost","honey","table","flock","train","blaze","earth",

  // 6-letter words
  "orange","planet","castle","silver","bridge","forest","magnet","rocket","butter","dragon",
  "stream","island","basket","breeze","puzzle","spider","flower","spring","golden","valley",
  "circle","wonder","throne","bubble","hunter","kitten","spirit","pencil","velvet","cookie",
  "castle","summer","helmet","galaxy","shadow","rocket","marble","pickle","gentle","anchor",

  // 7-letter words
  "picture","journey","diamond","morning","freedom","country","station","library","fantasy","treasure",
  "gateway","harvest","monster","perfume","painter","lantern","kingdom","mission","fortune","rainbow",
  "balloon","concert","warrior","teacher","flavour","stretch","fashion","orchard","crystal","paradox",
  "project","journey","charmer","village","whisper","courage","dreamer","present","phoenix","emerald"
];

const choice = (arr: string | any[]) => arr[Math.floor(Math.random() * arr.length)];
const rand = (min: number, max: number) => Math.random() * (max - min) + min;

const TREE_WIDTH_CSS = 'min(36vw, 520px)';

const NEST_ANCHOR = {
  leftPct: 32,   
  topPct: 66,    
  widthPct: 36,  
  rotateDeg: -6, 
};

const NEST_TRANSFORM = `translate(-50%, -100%) rotate(${NEST_ANCHOR.rotateDeg}deg)`;


type Enemy = {
  id: number;
  type: string;
  sprite: string;
  word: string;
  x: number;
  y: number;
  matched: string;
};
type Explosion = {
  id: number;
  x: number;
  y: number;
};

export default function Game() {
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [speed, setSpeed] = useState(0.28); // slower fall
  const [explosions, setExplosions] = useState<Explosion[]>([]);

  const gameLoopRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const nextIdRef = useRef(0);
  const explosionIdRef = useRef(0);

  const treeWrapRef = useRef<HTMLDivElement | null>(null);
  const [rightReservedPct, setRightReservedPct] = useState(36);

  useLayoutEffect(() => {
    const update = () => {
      const w = treeWrapRef.current?.getBoundingClientRect().width ?? 0;
      const pct = Math.min(55, (w / window.innerWidth) * 100 + 2); 
      setRightReservedPct(pct);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    if (gameOver) return;
    const spawn = setInterval(() => {
      const spriteName = choice(ENEMY_NAMES) as keyof typeof ENEMIES;
      setEnemies(prev => [
        ...prev,
        {
          id: nextIdRef.current++,
          type: spriteName,
          sprite: ENEMIES[spriteName],
          word: choice(WORDS),
          x: rand(3, Math.max(4, 100 - rightReservedPct - 3)),
          y: -50,
          matched: '',
        },
      ]);
    }, Math.max(1600 - score * 10, 700)); // slower spawn at higher scores
    return () => clearInterval(spawn);
  }, [gameOver, score, rightReservedPct]);

  // Game loop
  useEffect(() => {
    if (gameOver) return;
    gameLoopRef.current = setInterval(() => {
      setEnemies(prev => {
        const updated = prev.map(e => ({ ...e, y: e.y + speed }));
        // Calculate threshold as a percentage of game area height
        const thresholdPx = window.innerHeight - 250; // 250px from bottom
        const thresholdPct = (thresholdPx / window.innerHeight) * 100;
        const crossed = updated.filter(e => e.y > thresholdPct);
        if (crossed.length > 0) {
          setHearts(h => {
            const nh = h - crossed.length;
            if (nh <= 0) setGameOver(true);
            return Math.max(0, nh);
          });
        }
        return updated.filter(e => e.y <= thresholdPct);
      });
    }, 16);
    return () => {
      if (gameLoopRef.current !== null) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameOver, speed]);

  // Gradual speed-up
  useEffect(() => {
    if (gameOver) return;
    const tick = setInterval(() => {
      setSpeed(prev => Math.min(prev + 0.035, 1.4));
    }, 8000);
    return () => clearInterval(tick);
  }, [gameOver]);

  const handleInputChange = (e: { target: { value: string; }; }) => {
    const input = e.target.value.toLowerCase();
    setCurrentInput(input);

    setEnemies(prev => {
      const idx = prev.findIndex(enemy => enemy.word === input);
      if (idx !== -1) {
        const hit = prev[idx];

        const exId = explosionIdRef.current++;
  setExplosions((list: Explosion[]) => [...list, { id: exId, x: hit.x, y: hit.y }]);
  setTimeout(() => setExplosions((list: Explosion[]) => list.filter(ex => ex.id !== exId)), 1000);

        setScore(s => s + hit.word.length * 10);
        setCurrentInput('');
        return prev.filter((_, i) => i !== idx);
      }

      return prev.map(e =>
        e.word.startsWith(input) ? { ...e, matched: input } : { ...e, matched: '' }
      );
    });
  };

  const restartGame = () => {
    setEnemies([]);
    setExplosions([]);
    setCurrentInput('');
    setScore(0);
    setHearts(3);
    setGameOver(false);
    setSpeed(0.28);
    nextIdRef.current = 0;
    explosionIdRef.current = 0;
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'linear-gradient(135deg, #56ccf2 0%, #87ceeb 60%, #fdf6b1 100%)',
      overflow: 'hidden'
    }}>
      {/* HUD */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '3rem',
        alignItems: 'center',
        zIndex: 100
      }}>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fed7aa', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
          Score: {score}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[...Array(3)].map((_, i) => (
            <span key={i} style={{ fontSize: '2rem', opacity: i < hearts ? 1 : 0.3, filter: i < hearts ? 'none' : 'grayscale(100%)' }}>❤️</span>
          ))}
        </div>
        <div style={{ fontSize: '1.2rem', color: '#bfdbfe', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
          Speed: {speed.toFixed(2)}x
        </div>
      </div>

      {/* Game Area */}
      <div style={{ position: 'relative', width: '100%', height: '100%', paddingTop: '100px' }}>
        <div
          style={{
            position: 'absolute',
            right: 0, 
            bottom: '40px',
            zIndex: 20,
            pointerEvents: 'none'
          }}
        >
          <div ref={treeWrapRef} style={{ position: 'relative', width: TREE_WIDTH_CSS }}>
            
            <img
              src={FullNestImg}
              alt="Bird in Nest"
              style={{
                position: 'absolute',
                bottom: '50px',
                left: '-60%',
                transform: 'translateX(-50%)',
                zIndex: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            />
          </div>
        </div>

        {/* Green ground under threshold */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '250px',
            background: 'linear-gradient(to top, #7ed957 60%, transparent)',
            zIndex: 0
          }}
        />

        {/* Threshold line */}
        <div style={{
          position: 'absolute',
          bottom: '250px',
          left: 0,
          right: 0,
          height: '3px',
          background: 'rgba(239, 68, 68, 0.6)',
          boxShadow: '0 0 20px rgba(239, 68, 68, 0.8)',
          zIndex: 1
        }} />

        {/* Explosions */}
        {explosions.map(explosion => (
          <div key={explosion.id} style={{
            position: 'absolute',
            left: `${explosion.x}%`,
            top: `${explosion.y}%`,
            transform: 'translate(-50%, -50%)',
            zIndex: 100
          }}>
            <img src={ExplosionGif} alt="explosion" style={{ width: '150px', height: '150px', objectFit: 'contain' }} />
          </div>
        ))}

        {/* Enemies */}
        {enemies.map(enemy => (
          <div
            key={enemy.id}
            style={{
              position: 'absolute',
              left: `${enemy.x}%`,
              top: `${enemy.y}%`,
              transform: 'translate(-50%, -50%)',
              transition: 'top 0.016s linear',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <img
              src={enemy.sprite}
              alt={enemy.type}
              style={{
                width: '80px',
                height: '80px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.3))'
              }}
            />
            <div style={{
              background: 'rgba(59, 130, 246, 0.9)',
              border: '3px solid rgba(96, 165, 250, 0.8)',
              borderRadius: '12px',
              padding: '8px 16px',
              fontSize: '1.3rem',
              fontWeight: 'bold',
              color: 'white',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)',
              minWidth: '80px',
              textAlign: 'center',
              userSelect: 'none'
            }}>
              <span style={{ color: '#4ade80' }}>{enemy.matched}</span>
              <span style={{ color: 'white' }}>
                {enemy.word.slice((enemy.matched || '').length)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={{
        position: 'absolute',
        bottom: '50px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '400px',
        zIndex: 100
      }}>
        <input
          type="text"
          value={currentInput}
          onChange={handleInputChange}
          disabled={gameOver}
          autoFocus
          placeholder="Type the random word under the enemy..."
          style={{
            width: '100%',
            padding: '15px 20px',
            fontSize: '1.5rem',
            borderRadius: '50px',
            border: '3px solid rgba(96, 165, 250, 0.8)',
            background: 'rgba(0, 0, 0, 0.95)',
            outline: 'none',
            textAlign: 'center',
            fontWeight: 'bold',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)'
          }}
        />
      </div>

      {/* Game Over */}
      {gameOver && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #1e3a5f, #7c2d12)',
            padding: '60px',
            borderRadius: '20px',
            textAlign: 'center',
            border: '3px solid rgba(96, 165, 250, 0.8)',
            boxShadow: '0 10px 50px rgba(0, 0, 0, 0.5)'
          }}>
            <h1 style={{ fontSize: '4rem', color: '#fed7aa', marginBottom: '20px', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
              Game Over!
            </h1>
            <p style={{ fontSize: '2rem', color: '#bfdbfe', marginBottom: '30px' }}>
              Final Score: {score}
            </p>
            <button
              onClick={restartGame}
              style={{
                padding: '15px 40px',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: 'white',
                background: '#3b82f6',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(59, 130, 246, 0.5)',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      {/* Instructions */}
      {!gameOver && enemies.length === 0 && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: '#bfdbfe',
          fontSize: '1.5rem',
          textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          zIndex: 50
        }}>
          <p>Type the random words under falling enemies!</p>
          <p style={{ marginTop: '10px', fontSize: '1.2rem' }}>
            Don't let 3 enemies cross the red line...
          </p>
        </div>
      )}
    </div>
  );
}
