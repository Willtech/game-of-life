# [~] Conway's Game of Life

A beautiful, interactive implementation of [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) built with React and HTML5 Canvas. Features glowing neon cells, classic pattern presets, and full playback controls.

> **[Live Demo ->](https://YOUR-USERNAME.github.io/game-of-life)**

---

## What is Conway's Game of Life?

Conway's Game of Life is a classic **cellular automaton** invented by British mathematician **John Horton Conway** in 1970. It was first introduced to the public in Martin Gardner's *Mathematical Games* column in *Scientific American* (October 1970).

It is a zero-player game -- meaning it runs itself after you set the initial state.

The universe is an infinite grid of cells. Each cell is either **alive** or **dead**. Every generation, the following rules are applied to every cell simultaneously:

| Rule | Description |
|------|-------------|
| **Survival** | A live cell with 2 or 3 live neighbours survives to the next generation |
| **Death** | A live cell with fewer than 2 or more than 3 live neighbours dies |
| **Birth** | A dead cell with exactly 3 live neighbours becomes alive |

These two simple rules produce extraordinarily complex and beautiful evolving patterns. The Game of Life is theoretically equivalent to a universal Turing machine -- meaning anything that can be computed algorithmically can be computed within it.

---

## Features

- * **Real-time simulation** -- watch patterns evolve generation by generation
- - **Click to draw** -- toggle any cell alive or dead with a click
- * **Colour slider** -- change the glow colour across the full spectrum
- * **Speed control** -- adjust simulation speed from slow to fast
- * **Random seed** -- fill the grid with a random starting population
- * **Clear grid** -- wipe the board and draw your own pattern from scratch
- * **Built-in presets** -- load classic patterns instantly:
  - **Glider** -- a small pattern that travels diagonally across the grid
  - **Pulsar** -- a large, symmetrical oscillator that pulses every 3 generations
  - **R-Pentomino** -- a tiny 5-cell pattern that evolves chaotically for over 1,000 generations
- * **Live stats** -- generation counter and population count displayed in real time
- * **Wrapping edges** -- cells on the edge wrap around to the opposite side

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) v16 or higher
- [Git](https://git-scm.com)

### Run Locally

```bash
# Clone the repository
git clone https://github.com/YOUR-USERNAME/game-of-life.git

# Move into the project folder
cd game-of-life

# Install dependencies
npm install

# Start the development server
npm start
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## How to Use

| Control | Action |
|---------|--------|
| **> Play / || Pause** | Start or stop the simulation |
| **~ Random** | Fill the grid with a random pattern |
| **x Clear** | Empty the grid |
| **Presets menu** | Load a classic pattern (Glider, Pulsar, R-Pentomino) |
| **Click a cell** | Toggle it between alive and dead |
| **Speed slider** | Drag right to speed up, left to slow down |
| **Colour slider** | Change the neon glow colour |

---

## Deployment

This project is deployed via [GitHub Pages](https://pages.github.com) using the `gh-pages` package.

```bash
# Build and deploy to GitHub Pages
npm run deploy
```

The live site will update at `https://YOUR-USERNAME.github.io/game-of-life` within a few minutes.

---

## Built With

- [React](https://react.dev) -- UI and state management
- [HTML5 Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) -- cell rendering with glow effects
- [gh-pages](https://www.npmjs.com/package/gh-pages) -- GitHub Pages deployment

---

## Licence

This project is split into two distinct parts with different licensing:

### The Game of Life Rules -- Public Domain

The rules and concept of Conway's Game of Life were devised by **John Horton Conway** (1937-2020) and published in 1970. Mathematical rules and game mechanics are not subject to copyright protection. The Game of Life concept is free for anyone to implement, study, and build upon, and has been widely used by programmers, mathematicians, and researchers for over 50 years.

> *"Conway's Game of Life"* is named in honour of John Conway. His work is described on [Wikipedia](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) and the community wiki [LifeWiki](https://conwaylife.com/wiki/).

### This Implementation -- MIT Licence

The source code of this specific React implementation is released under the **MIT Licence**:

```
MIT License

Copyright (c) 2026 YOUR-NAME

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

The MIT Licence is a short, permissive open source licence. It allows anyone to freely use, copy, modify, and distribute this code, provided the original copyright notice is included.

---

## Related Projects

- * [Text Transposer](https://willtech.github.io/transposer/) -- another project by the same author

---

*Built with [Claude](https://claude.ai)*
