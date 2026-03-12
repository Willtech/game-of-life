import { useState, useEffect, useRef, useCallback } from "react";

const ROWS = 60;
const COLS = 100;
const CELL_SIZE = 10;

const createEmptyGrid = () =>
  Array.from({ length: ROWS }, () => Array(COLS).fill(0));

const createRandomGrid = () =>
  Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => (Math.random() > 0.7 ? 1 : 0))
  );

const PRESETS = {
  Glider: [[0,1],[1,2],[2,0],[2,1],[2,2]],
  Pulsar: [
    [2,4],[2,5],[2,6],[2,10],[2,11],[2,12],
    [4,2],[4,7],[4,9],[4,14],
    [5,2],[5,7],[5,9],[5,14],
    [6,2],[6,7],[6,9],[6,14],
    [7,4],[7,5],[7,6],[7,10],[7,11],[7,12],
    [9,4],[9,5],[9,6],[9,10],[9,11],[9,12],
    [10,2],[10,7],[10,9],[10,14],
    [11,2],[11,7],[11,9],[11,14],
    [12,2],[12,7],[12,9],[12,14],
    [14,4],[14,5],[14,6],[14,10],[14,11],[14,12],
  ],
  "R-Pentomino": [[1,2],[1,3],[2,1],[2,2],[3,2]],
};

const nextGeneration = (grid) => {
  const newGrid = createEmptyGrid();
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      let neighbors = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = (r + dr + ROWS) % ROWS;
          const nc = (c + dc + COLS) % COLS;
          neighbors += grid[nr][nc];
        }
      }
      if (grid[r][c] === 1) {
        newGrid[r][c] = neighbors === 2 || neighbors === 3 ? 1 : 0;
      } else {
        newGrid[r][c] = neighbors === 3 ? 1 : 0;
      }
    }
  }
  return newGrid;
};

export default function GameOfLife() {
  const [grid, setGrid] = useState(createRandomGrid);
  const [running, setRunning] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [population, setPopulation] = useState(0);
  const [speed, setSpeed] = useState(100);
  const [hue, setHue] = useState(160);
  const canvasRef = useRef(null);
  const runningRef = useRef(running);
  const gridRef = useRef(grid);
  const speedRef = useRef(speed);
  runningRef.current = running;
  gridRef.current = grid;
  speedRef.current = speed;

  useEffect(() => {
    const pop = grid.flat().reduce((a, b) => a + b, 0);
    setPopulation(pop);
  }, [grid]);

  const drawGrid = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0a0a0f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const g = gridRef.current;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (g[r][c]) {
          const intensity = 0.6 + 0.4 * Math.random();
          ctx.fillStyle = `hsla(${hue}, 90%, ${50 + intensity * 30}%, ${0.7 + intensity * 0.3})`;
          ctx.shadowColor = `hsl(${hue}, 100%, 70%)`;
          ctx.shadowBlur = 4;
          ctx.fillRect(c * CELL_SIZE + 1, r * CELL_SIZE + 1, CELL_SIZE - 1, CELL_SIZE - 1);
        }
      }
    }
    ctx.shadowBlur = 0;
  }, [hue]);

  useEffect(() => { drawGrid(); }, [grid, drawGrid]);

  const runSimulation = useCallback(() => {
    if (!runningRef.current) return;
    setGrid((g) => {
      const next = nextGeneration(g);
      gridRef.current = next;
      return next;
    });
    setGeneration((g) => g + 1);
    setTimeout(runSimulation, speedRef.current);
  }, []);

  const handleToggleRun = () => {
    setRunning((r) => {
      if (!r) setTimeout(runSimulation, speedRef.current);
      return !r;
    });
  };

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    const c = Math.floor(x / CELL_SIZE);
    const r = Math.floor(y / CELL_SIZE);
    if (r >= 0 && r < ROWS && c >= 0 && c < COLS) {
      setGrid((g) => {
        const newG = g.map((row) => [...row]);
        newG[r][c] = newG[r][c] ? 0 : 1;
        return newG;
      });
    }
  };

  const loadPreset = (name) => {
    const newGrid = createEmptyGrid();
    const offsetR = Math.floor(ROWS / 2) - 8;
    const offsetC = Math.floor(COLS / 2) - 8;
    PRESETS[name].forEach(([r, c]) => {
      const nr = r + offsetR;
      const nc = c + offsetC;
      if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) newGrid[nr][nc] = 1;
    });
    setGrid(newGrid);
    setGeneration(0);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Courier New', monospace",
      color: `hsl(${hue}, 80%, 70%)`,
      padding: "16px",
    }}>
      <div style={{ textAlign: "center", marginBottom: "12px" }}>
        <h1 style={{
          fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: `hsl(${hue}, 90%, 75%)`,
          textShadow: `0 0 20px hsl(${hue}, 100%, 60%)`,
          margin: 0,
        }}>Conway's Game of Life</h1>
        <p style={{ opacity: 0.5, fontSize: "0.75rem", marginTop: 4, letterSpacing: "0.15em" }}>
          GEN {String(generation).padStart(6, "0")} &nbsp;|&nbsp; POP {String(population).padStart(6, "0")}
        </p>
      </div>

      <canvas
        ref={canvasRef}
        width={COLS * CELL_SIZE}
        height={ROWS * CELL_SIZE}
        onClick={handleCanvasClick}
        style={{
          cursor: "crosshair",
          border: `1px solid hsl(${hue}, 60%, 25%)`,
          boxShadow: `0 0 30px hsl(${hue}, 80%, 15%), inset 0 0 60px rgba(0,0,0,0.5)`,
          maxWidth: "100%",
          display: "block",
        }}
      />

      <div style={{
        display: "flex",
        gap: "10px",
        marginTop: "14px",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
      }}>
        {[
          { label: running ? "⏸ Pause" : "▶ Play", onClick: handleToggleRun, primary: true },
          { label: "⟳ Random", onClick: () => { setGrid(createRandomGrid()); setGeneration(0); } },
          { label: "✕ Clear", onClick: () => { setGrid(createEmptyGrid()); setGeneration(0); setRunning(false); } },
        ].map((btn) => (
          <button key={btn.label} onClick={btn.onClick} style={{
            background: btn.primary ? `hsl(${hue}, 70%, 20%)` : "transparent",
            border: `1px solid hsl(${hue}, 60%, 35%)`,
            color: `hsl(${hue}, 80%, 75%)`,
            padding: "6px 16px",
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: "0.8rem",
            letterSpacing: "0.1em",
            transition: "all 0.2s",
          }}
          onMouseOver={e => e.target.style.background = `hsl(${hue}, 70%, 28%)`}
          onMouseOut={e => e.target.style.background = btn.primary ? `hsl(${hue}, 70%, 20%)` : "transparent"}
          >{btn.label}</button>
        ))}

        <select onChange={(e) => loadPreset(e.target.value)} defaultValue="" style={{
          background: "transparent",
          border: `1px solid hsl(${hue}, 60%, 35%)`,
          color: `hsl(${hue}, 80%, 75%)`,
          padding: "6px 12px",
          cursor: "pointer",
          fontFamily: "inherit",
          fontSize: "0.8rem",
        }}>
          <option value="" disabled>Presets</option>
          {Object.keys(PRESETS).map((p) => <option key={p} value={p} style={{ background: "#0a0a0f" }}>{p}</option>)}
        </select>
      </div>

      <div style={{ display: "flex", gap: "20px", marginTop: "10px", flexWrap: "wrap", justifyContent: "center", alignItems: "center", opacity: 0.8 }}>
        <label style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>
          SPEED
          <input type="range" min="30" max="500" value={500 - speed + 30}
            onChange={(e) => { speedRef.current = 500 - e.target.value + 30; setSpeed(500 - e.target.value + 30); }}
            style={{ marginLeft: 8, accentColor: `hsl(${hue}, 80%, 60%)`, verticalAlign: "middle" }} />
        </label>
        <label style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>
          COLOR
          <input type="range" min="0" max="360" value={hue}
            onChange={(e) => setHue(Number(e.target.value))}
            style={{ marginLeft: 8, accentColor: `hsl(${hue}, 80%, 60%)`, verticalAlign: "middle" }} />
        </label>
      </div>

      <p style={{ opacity: 0.3, fontSize: "0.65rem", marginTop: 10, letterSpacing: "0.1em" }}>
        CLICK CELLS TO TOGGLE · RULES: B3/S23
      </p>
    </div>
  );
}
