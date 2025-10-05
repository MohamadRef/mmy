# File: README.md

# Pork — Typing Defense

Protect the nest. Type fast. Survive.

> **30-second pitch**  
> Pork is a fast, satisfying typing defense game. Enemies fall from the sky; you eliminate them by typing the word under each one. Miss three, and it’s game over. Built for quick rounds, clean visuals, and hackathon-friendly iteration.

---

## ✨ Features
- **Simple core loop**: Type the word → pop the enemy → score points.
- **Escalating challenge**: Enemies spawn faster; fall speed ramps up gradually.
- **Crisp visuals**: Right-pinned tree with a bird-in-nest sprite; enemies (cat, crow, eagle) fall from the top-left playfield.
- **Juice**: Explosions on hit, partial-match highlighting, HUD with hearts/score/speed.
- **Zero-config dev**: Vite + React for instant HMR.

---

## 🕹️ How to Play
1. Watch for falling enemies.
2. Type the **word shown under** an enemy to destroy it.
3. Each miss that reaches the red line removes a heart.
4. Lose all hearts = **Game Over**. Highest score wins.

**Controls**: Keyboard only — just type.  
**Pro tip**: Focus a single enemy at a time; the partial-match highlight shows progress.

---

## 🔧 Requirements
- **Node.js ≥ 18** (LTS recommended)  
- npm (bundled with Node)

---

## 🚀 Quick Start

```bash
# install dependencies
npm install

# start dev server (Vite)
npm run dev

# build for production
npm run build

# preview the production build locally
npm run preview

src/
  assets/
    Sprites/
      Background Sky...
      Bird 1.png
      Bird 2.png
      Cat.png
      Crow.png
      Eagle.png
      Egg.png
      explosion.gif
      Full Bird Nest 1.png
      Full Bird Nest 2...
      Nest (Front).PNG
      Nest.PNG
      Tree.PNG
  components/
  App.css
  # Game.jsx (main game component)
