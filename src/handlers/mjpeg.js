/**
 * MJPEG feed handler.
 *
 * MJPEG streams are served as multipart/x-mixed-replace.
 * The browser handles playback natively when the URL is assigned to <img> src —
 * no JavaScript polling required.
 *
 * Note: MJPEG in <img> doesn't work in Firefox (it renders only the first frame).
 * In that case we fall back to showing the first frame as a static JPEG.
 */

/**
 * @param {object} camera
 * @returns {{ el: HTMLElement, destroy: () => void }}
 */
export function createMjpegFeed(camera) {
  const wrapper = document.createElement("div");
  wrapper.className = "feed-wrapper feed-mjpeg";

  const img = document.createElement("img");
  img.alt = camera.label;
  img.className = "feed-img";
  img.src = camera.url;

  const badge = document.createElement("span");
  badge.className = "feed-badge";
  badge.textContent = "LIVE";

  const timestamp = document.createElement("span");
  timestamp.className = "feed-timestamp";
  timestamp.textContent = "Streaming live";

  img.onload = () => {
    img.classList.remove("feed-error");
    img.classList.add("feed-loaded");
    wrapper.classList.add("is-loaded");
    wrapper.classList.remove("is-error");
  };

  img.onerror = () => {
    img.classList.add("feed-error");
    wrapper.classList.add("is-error");
    timestamp.textContent = "Error loading feed";
    badge.style.display = "none";
  };

  wrapper.appendChild(img);
  wrapper.appendChild(badge);
  wrapper.appendChild(timestamp);

  function destroy() {
    // Setting src to empty string stops the MJPEG stream download
    img.src = "";
  }

  return { el: wrapper, destroy };
}
