/**
 * JPEG feed handler.
 *
 * Displays a static JPEG image that refreshes at a configurable interval.
 * Uses <img> src assignment (not fetch) so browser CORS rules don't apply.
 * A cache-busting query parameter forces the browser to re-request the image
 * rather than serving it from cache.
 */

const DEFAULT_INTERVAL_MS = 30_000;
const OVERLAY_INTERVAL_MS = 5_000;

/**
 * Create a JPEG feed element.
 *
 * @param {object} camera
 * @param {object} [options]
 * @param {boolean} [options.isOverlay] — use faster refresh rate
 * @returns {{ el: HTMLElement, destroy: () => void }}
 */
export function createJpegFeed(camera, options = {}) {
  const intervalMs = options.isOverlay
    ? OVERLAY_INTERVAL_MS
    : (camera.interval ?? DEFAULT_INTERVAL_MS);

  const wrapper = document.createElement("div");
  wrapper.className = "feed-wrapper feed-jpeg";

  const img = document.createElement("img");
  img.alt = camera.label;
  img.className = "feed-img";

  const timestamp = document.createElement("span");
  timestamp.className = "feed-timestamp";

  wrapper.appendChild(img);
  wrapper.appendChild(timestamp);

  function refresh() {
    const url = new URL(camera.url);
    url.searchParams.set("_cb", Date.now());
    img.src = url.toString();

    img.onload = () => {
      img.classList.remove("feed-error");
      img.classList.add("feed-loaded");
      wrapper.classList.add("is-loaded");
      wrapper.classList.remove("is-error");
      updateTimestamp();
    };

    img.onerror = () => {
      img.classList.add("feed-error");
      wrapper.classList.add("is-error");
      timestamp.textContent = "Error loading feed";
    };
  }

  function updateTimestamp() {
    const now = new Date();
    timestamp.textContent = `Updated ${now.toLocaleTimeString("en-AU", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })}`;
  }

  refresh();
  let timerId = setInterval(() => {
    if (document.visibilityState !== "hidden") {
      refresh();
    }
  }, intervalMs);

  // Pause/resume on tab visibility change
  function onVisibilityChange() {
    if (document.visibilityState === "visible") {
      refresh(); // immediate refresh when tab becomes visible again
    }
  }
  document.addEventListener("visibilitychange", onVisibilityChange);

  function destroy() {
    clearInterval(timerId);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    img.src = "";
  }

  return { el: wrapper, destroy };
}
