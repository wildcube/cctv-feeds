import "./style.css";
import { createGrid } from "./grid.js";
import { createOverlay } from "./overlay.js";

// ── Dark mode ───────────────────────────────────────────────────────────────

const DARK_KEY = "perth-cams-dark";

function initDarkMode(toggleBtn) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const stored = localStorage.getItem(DARK_KEY);
  const isDark = stored !== null ? stored === "true" : prefersDark;

  setDark(isDark, toggleBtn);

  toggleBtn.addEventListener("click", () => {
    const next = !document.documentElement.classList.contains("dark");
    setDark(next, toggleBtn);
    localStorage.setItem(DARK_KEY, String(next));
  });
}

function setDark(isDark, btn) {
  document.documentElement.classList.toggle("dark", isDark);
  btn.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  btn.innerHTML = isDark ? sunIcon() : moonIcon();
}

function moonIcon() {
  return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
}

function sunIcon() {
  return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
}

// ── App bootstrap ────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  const darkToggle = document.getElementById("dark-toggle");
  initDarkMode(darkToggle);

  // Overlay (singleton)
  const overlay = createOverlay();

  // Grid + tiles
  const main = document.getElementById("app-main");
  createGrid(main);

  // Wire tile clicks to overlay
  main.addEventListener("tile-click", (e) => {
    overlay.open(e.detail.camera);
  });
});
