/**
 * Camera type handler registry.
 *
 * To add a new camera type:
 *   1. Create src/handlers/<type>.js exporting a `create<Type>Feed(camera, options)` function.
 *   2. Import it here and add an entry to the HANDLERS map.
 */

import { createJpegFeed } from "./jpeg.js";
import { createMjpegFeed } from "./mjpeg.js";
import { createHlsFeed } from "./hls.js";

const HANDLERS = {
  jpeg: createJpegFeed,
  mjpeg: createMjpegFeed,
  hls: createHlsFeed,
};

/**
 * Create the appropriate feed element for a camera.
 *
 * @param {object} camera
 * @param {object} [options]
 * @param {boolean} [options.isOverlay]
 * @returns {{ el: HTMLElement, destroy: () => void }}
 */
export function createFeed(camera, options = {}) {
  const handler = HANDLERS[camera.type];
  if (!handler) {
    const wrapper = document.createElement("div");
    wrapper.className = "feed-wrapper feed-unsupported";
    wrapper.textContent = `Unsupported type: ${camera.type}`;
    return { el: wrapper, destroy: () => {} };
  }
  return handler(camera, options);
}
