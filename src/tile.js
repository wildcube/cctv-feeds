/**
 * Camera tile component.
 *
 * Renders one grid cell containing the feed, label, and status info.
 * Emits a "tile-click" custom event when clicked (for the overlay to handle).
 */

import { createFeed } from "./handlers/index.js";

/**
 * @param {object} camera
 * @returns {{ el: HTMLElement, destroy: () => void }}
 */
export function createTile(camera) {
  const tile = document.createElement("div");
  tile.className = "tile";
  tile.dataset.id = camera.id;
  tile.dataset.category = camera.category ?? "other";
  tile.setAttribute("role", "button");
  tile.setAttribute("tabindex", "0");
  tile.setAttribute("aria-label", `Open ${camera.label} fullscreen`);

  // Feed area
  const feedArea = document.createElement("div");
  feedArea.className = "tile-feed";

  const { el: feedEl, destroy: destroyFeed } = createFeed(camera);
  feedArea.appendChild(feedEl);

  // Footer
  const footer = document.createElement("div");
  footer.className = "tile-footer";

  const label = document.createElement("span");
  label.className = "tile-label";
  label.textContent = camera.label;

  const categoryBadge = document.createElement("span");
  categoryBadge.className = `tile-category tile-category--${camera.category ?? "other"}`;
  categoryBadge.textContent = camera.category ?? "other";

  footer.appendChild(label);
  footer.appendChild(categoryBadge);

  tile.appendChild(feedArea);
  tile.appendChild(footer);

  // Open overlay on click or Enter/Space
  function openOverlay() {
    tile.dispatchEvent(
      new CustomEvent("tile-click", {
        bubbles: true,
        detail: { camera },
      })
    );
  }

  tile.addEventListener("click", openOverlay);
  tile.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openOverlay();
    }
  });

  function destroy() {
    tile.removeEventListener("click", openOverlay);
    destroyFeed();
  }

  return { el: tile, destroy };
}
