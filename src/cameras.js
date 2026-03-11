/**
 * Camera feed configuration.
 * Add, remove, or edit entries here to manage which feeds are displayed.
 *
 * Types:
 *   "jpeg"  — static JPEG refreshed via setInterval (e.g. Main Roads WA traffic cams)
 *   "mjpeg" — multipart/x-mixed-replace stream displayed directly in <img>
 *   "hls"   — HLS .m3u8 playlist played via hls.js (or native on Safari)
 *
 * Optional fields:
 *   category — used for filtering ("traffic" | "beach" | "city" | "other")
 *   interval — custom refresh interval in ms for jpeg type (default: 30000)
 */

/** @type {Array<{id: string, label: string, type: 'jpeg'|'mjpeg'|'hls', url: string, category?: string, interval?: number}>} */
const cameras = [
  // ── Windy.com beach webcams (confirmed working) ───────────────────────────
  {
    id: "windy-scarborough-north",
    label: "Scarborough Beach (North)",
    type: "jpeg",
    url: "https://images-webcams.windy.com/94/1203350394/current/full/1203350394.jpg",
    category: "beach",
    interval: 60000,
  },
  {
    id: "windy-swanbourne-south",
    label: "Swanbourne Beach (South)",
    type: "jpeg",
    url: "https://images-webcams.windy.com/64/1203350464/current/full/1203350464.jpg",
    category: "beach",
    interval: 60000,
  },

  // ── Main Roads WA traffic cameras ─────────────────────────────────────────
  // URL format: https://mrapps.mainroads.wa.gov.au/TrafficImages/{CameraID}.jpg
  // To find camera IDs: open https://travelmap.mainroads.wa.gov.au, open DevTools
  // Network tab filtered by "jpg", then click a camera on the map.
  //
  // { id: "mrwa-mitchell-north", label: "Mitchell Fwy North", type: "jpeg",
  //   url: "https://mrapps.mainroads.wa.gov.au/TrafficImages/CAM_XXXX.jpg", category: "traffic" },
];

export default cameras;
