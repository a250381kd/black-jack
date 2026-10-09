:root {
  --bg: #100d16;
  --bg-2: #171320;
  --panel: rgba(24, 20, 33, 0.88);
  --panel-soft: rgba(33, 27, 42, 0.9);
  --line: rgba(255, 255, 255, 0.08);
  --text: #f9f6ff;
  --muted: #b9b2c8;
  --pink: #ff5fe8;
  --purple: #9f7bff;
  --cyan: #5df2ff;
  --gold: #ffd36f;
  --red: #ff5b5b;
  --green: #63efba;
  --shadow: rgba(0, 0, 0, 0.35);
}

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  min-height: 100%;
  font-family: "Inter", sans-serif;
  background:
    radial-gradient(circle at top, rgba(159, 123, 255, 0.25), transparent 30%),
    radial-gradient(circle at bottom, rgba(93, 242, 255, 0.16), transparent 22%),
    linear-gradient(180deg, #0c0a12 0%, var(--bg) 100%);
  color: var(--text);
}

body {
  display: grid;
  place-items: center;
  min-height: 100vh;
  padding: 24px;
}

.game-shell {
  width: min(100%, 1100px);
  background: rgba(16, 13, 22, 0.9);
  border: 1px solid var(--line);
  border-radius: 28px;
  box-shadow: 0 20px 60px var(--shadow);
  padding: 24px 28px 30px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 26px;
}

.brand-block {
  display: flex;
  align-items: center;
  gap: 18px;
}

.brand-pill {
  display: inline-flex;
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid rgba(255, 95, 232, 0.45);
  background: rgba(255, 95, 232, 0.08);
  color: var(--pink);
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.14em;
}

h1 {
  margin: 0;
  font-size: clamp(1.8rem, 2.6vw, 2.8rem);
  font-weight: 900;
  letter-spacing: -0.05em;
}

.scoreboard {
  display: flex;
  align-items: center;
  gap: 12px;
}

.score-box {
  min-width: 140px;
  padding: 12px 16px;
  border: 1px solid rgba(255, 211, 111, 0.35);
  border-radius: 16px;
  background: linear-gradient(180deg, rgba(255, 211, 111, 0.12), rgba(255, 211, 111, 0.02));
  text-align: center;
}

.score-box span {
  display: block;
  color: var(--muted);
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.score-box strong {
  display: block;
  margin-top: 6px;
  font-size: 1.8rem;
  color: var(--gold);
}

.table {
  border: 1px solid var(--line);
  background: linear-gradient(180deg, rgba(32, 24, 41, 0.95), rgba(21, 17, 27, 0.94));
  border-radius: 24px;
  padding: 22px 20px;
  box-shadow: inset 0 0 24px rgba(255, 255, 255, 0.02);
}

.hand-panel {
  padding: 8px 6px 20px;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-weight: 700;
  color: var(--muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.panel-header strong {
  color: var(--text);
  font-size: 1.15rem;
  letter-spacing: -0.04em;
}

.hand {
  display: flex;
  flex-wrap: wrap;
  min-height: 180px;
  gap: 14px;
  padding: 10px 0 6px;
}

.card {
  position: relative;
  width: 110px;
  height: 156px;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(243,245,255,0.98));
  border: 1px solid rgba(0,0,0,0.12);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.28);
  color: #17141d;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px 10px 10px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 28px rgba(0, 0, 0, 0.32);
}

.card.red {
  color: var(--red);
}

.card.hidden {
  background: linear-gradient(135deg, rgba(255, 95, 232, 0.20), rgba(151, 123, 255, 0.24));
  border-color: rgba(255, 95, 232, 0.45);
  color: rgba(255,255,255,0.9);
  justify-content: center;
  align-items: center;
}

.card.hidden::before {
  content: "♠";
  font-size: 2.6rem;
  opacity: 0.9;
}

.card-top,
.card-bottom {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 800;
}

.card-value {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.7rem;
  font-weight: 900;
  letter-spacing: -0.08em;
}

.card-suit {
  font-size: 1.6rem;
  line-height: 1;
}

.status-box {
  margin: 8px auto 18px;
  width: fit-content;
  max-width: 100%;
  padding: 12px 18px;
  border-radius: 999px;
  background: rgba(93, 242, 255, 0.09);
  border: 1px solid rgba(93, 242, 255, 0.2);
  color: var(--cyan);
  font-weight: 700;
  text-align: center;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 24px;
  flex-wrap: wrap;
}

button {
  appearance: none;
  border: none;
  border-radius: 14px;
  padding: 14px 22px;
  font: inherit;
  font-weight: 800;
  letter-spacing: 0.04em;
  color: var(--text);
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  cursor: pointer;
  transition: transform 0.16s ease, box-shadow 0.16s ease, opacity 0.16s ease;
}

button:hover {
  transform: translateY(-2px);
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

button.primary {
  background: linear-gradient(135deg, var(--pink), var(--purple));
  border-color: transparent;
  box-shadow: 0 16px 28px rgba(159, 123, 255, 0.28);
}

#hit-button {
  background: linear-gradient(135deg, rgba(93,242,255,0.18), rgba(93,242,255,0.04));
  border-color: rgba(93,242,255,0.22);
}

#stand-button {
  background: linear-gradient(135deg, rgba(255,211,111,0.18), rgba(255,211,111,0.04));
  border-color: rgba(255,211,111,0.2);
}

@media (max-width: 700px) {
  .topbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .brand-block {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .card {
    width: 90px;
    height: 132px;
  }

  .card-value {
    font-size: 2.2rem;
  }
}
