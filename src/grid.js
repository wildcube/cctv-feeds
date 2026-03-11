/**
 * Dashboard grid.
 *
 * Renders all camera tiles and manages the filter/category toolbar.
 * Emits tile-click events up to main.js which delegates to the overlay.
 */

import cameras from "./cameras.js";
import { createTile } from "./tile.js";

export function createGrid(container) {
  // Derive unique categories from camera list
  const allCategories = [...new Set(cameras.map((c) => c.category ?? "other"))].sort();

  // ── Filter toolbar ─────────────────────────────────────────────────────────
  const toolbar = document.createElement("div");
  toolbar.className = "toolbar";
  toolbar.setAttribute("role", "group");
  toolbar.setAttribute("aria-label", "Filter cameras by category");

  const allBtn = makeFilterBtn("all", "All");
  allBtn.classList.add("active");
  toolbar.appendChild(allBtn);

  for (const cat of allCategories) {
    toolbar.appendChild(makeFilterBtn(cat, capitalise(cat)));
  }

  container.appendChild(toolbar);

  // ── Grid ──────────────────────────────────────────────────────────────────
  const grid = document.createElement("div");
  grid.className = "grid";
  container.appendChild(grid);

  // Create all tiles
  const tiles = cameras.map((camera) => {
    const { el, destroy } = createTile(camera);
    grid.appendChild(el);
    return { camera, el, destroy };
  });

  // ── Filter logic ──────────────────────────────────────────────────────────
  let activeFilter = "all";

  function applyFilter(category) {
    activeFilter = category;

    // Update button states
    toolbar.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.category === category);
    });

    // Show/hide tiles
    tiles.forEach(({ el, camera }) => {
      const camCat = camera.category ?? "other";
      const visible = category === "all" || camCat === category;
      el.style.display = visible ? "" : "none";
    });
  }

  toolbar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (btn) applyFilter(btn.dataset.category);
  });

  function destroy() {
    tiles.forEach((t) => t.destroy());
  }

  return { el: container, destroy };
}

function makeFilterBtn(category, label) {
  const btn = document.createElement("button");
  btn.className = "filter-btn";
  btn.dataset.category = category;
  btn.textContent = label;
  return btn;
}

function capitalise(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
