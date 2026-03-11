/**
 * HLS feed handler.
 *
 * Uses hls.js for browsers that don't support native HLS (Chrome, Firefox, etc.).
 * Falls back to native HLS on Safari / iOS (where <video> supports m3u8 natively).
 *
 * hls.js is dynamically imported so the ~500 kB bundle is only loaded when
 * an HLS camera is actually present in the config.
 *
 * CORS note: hls.js fetches the .m3u8 playlist and segment files via XHR/fetch,
 * so the HLS origin server must send appropriate CORS headers. If the stream
 * does not support CORS:
 *   TODO: Route the HLS URL through a reverse proxy, e.g.:
 *     url: "/proxy/hls?target=https://origin.example.com/stream.m3u8"
 *   and configure your proxy (nginx, Caddy, or a Node middleware) to rewrite
 *   and forward requests, adding CORS headers on the way back.
 */

/**
 * @param {object} camera
 * @returns {{ el: HTMLElement, destroy: () => void }}
 */
export function createHlsFeed(camera) {
  const wrapper = document.createElement("div");
  wrapper.className = "feed-wrapper feed-hls";

  const video = document.createElement("video");
  video.className = "feed-video";
  video.muted = true;
  video.autoplay = true;
  video.playsInline = true;
  video.controls = false;

  const badge = document.createElement("span");
  badge.className = "feed-badge";
  badge.textContent = "LIVE";

  const timestamp = document.createElement("span");
  timestamp.className = "feed-timestamp";
  timestamp.textContent = "Connecting…";

  wrapper.appendChild(video);
  wrapper.appendChild(badge);
  wrapper.appendChild(timestamp);

  let hls = null;
  let destroyed = false;

  function onPlaying() {
    timestamp.textContent = "Streaming live";
    video.classList.add("feed-loaded");
    video.classList.remove("feed-error");
    wrapper.classList.add("is-loaded");
    wrapper.classList.remove("is-error");
  }

  function onError(msg) {
    video.classList.add("feed-error");
    wrapper.classList.add("is-error");
    timestamp.textContent = msg || "Error loading stream";
    badge.style.display = "none";
  }

  // Dynamically import hls.js — the bundle is only fetched when an HLS tile renders
  import("hls.js").then(({ default: Hls }) => {
    if (destroyed) return;

    if (Hls.isSupported()) {
      hls = new Hls({
        // Bound buffer to keep memory reasonable in long-running dashboard sessions
        maxBufferLength: 10,
        maxMaxBufferLength: 20,
      });
      hls.loadSource(camera.url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) onError(`Stream error: ${data.type}`);
      });
      video.addEventListener("playing", onPlaying);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Native HLS (Safari / iOS)
      video.src = camera.url;
      video.addEventListener("playing", onPlaying);
      video.addEventListener("error", () => onError("Error loading stream"));
      video.play().catch(() => {});
    } else {
      onError("HLS not supported in this browser");
    }
  }).catch(() => {
    onError("Failed to load HLS player");
  });

  function destroy() {
    destroyed = true;
    video.removeEventListener("playing", onPlaying);
    if (hls) {
      hls.destroy();
      hls = null;
    }
    video.src = "";
  }

  return { el: wrapper, destroy };
}
