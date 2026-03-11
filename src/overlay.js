/**
 * Fullscreen overlay player.
 *
 * Shows a larger view of the clicked camera feed in a modal overlay.
 * - Closes on ESC key or clicking outside the player panel.
 * - JPEG feeds use a faster refresh rate (5s) in overlay mode.
 */

import { createFeed } from "./handlers/index.js";

export function createOverlay() {
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "Camera feed fullscreen view");
  overlay.hidden = true;

  const panel = document.createElement("div");
  panel.className = "overlay-panel";

  const header = document.createElement("div");
  header.className = "overlay-header";

  const title = document.createElement("h2");
  title.className = "overlay-title";

  const closeBtn = document.createElement("button");
  closeBtn.className = "overlay-close";
  closeBtn.setAttribute("aria-label", "Close overlay");
  closeBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

  header.appendChild(title);
  header.appendChild(closeBtn);

  const feedContainer = document.createElement("div");
  feedContainer.className = "overlay-feed";

  panel.appendChild(header);
  panel.appendChild(feedContainer);
  overlay.appendChild(panel);
  document.body.appendChild(overlay);

  let currentDestroyFeed = null;
  let previouslyFocused = null;

  function open(camera) {
    // Tear down any previous feed
    if (currentDestroyFeed) {
      currentDestroyFeed();
      currentDestroyFeed = null;
      feedContainer.innerHTML = "";
    }

    title.textContent = camera.label;

    const { el: feedEl, destroy: destroyFeed } = createFeed(camera, {
      isOverlay: true,
    });
    feedContainer.appendChild(feedEl);
    currentDestroyFeed = destroyFeed;

    previouslyFocused = document.activeElement;
    overlay.hidden = false;
    document.body.classList.add("overlay-open");
    closeBtn.focus();
  }

  function close() {
    overlay.hidden = true;
    document.body.classList.remove("overlay-open");

    if (currentDestroyFeed) {
      currentDestroyFeed();
      currentDestroyFeed = null;
      feedContainer.innerHTML = "";
    }

    if (previouslyFocused) {
      previouslyFocused.focus();
      previouslyFocused = null;
    }
  }

  // Close on button click
  closeBtn.addEventListener("click", close);

  // Close on backdrop click (outside the panel)
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });

  // Close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !overlay.hidden) close();
  });

  return { open, close, el: overlay };
}
