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
  // ── Main Roads WA traffic cameras ─────────────────────────────────────────
  //
  // URL format (confirmed via open-source TrafficCamPerth app on GitHub):
  //   https://mrapps.mainroads.wa.gov.au/TrafficImages/{CameraID}.jpg
  //
  // HOW TO FIND CAMERA IDs:
  //   1. Open https://travelmap.mainroads.wa.gov.au in your browser
  //   2. Open DevTools → Network tab → filter by "jpg"
  //   3. Click any camera icon on the map
  //   4. The image request URL will reveal the CameraID (e.g. "CAM_0042")
  //   5. Replace the placeholder IDs below with real ones
  //
  // The IDs below are placeholders — uncomment and fill in real IDs once found.
  //
  // { id: "mrwa-mitchell-north", label: "Mitchell Fwy North", type: "jpeg",
  //   url: "https://mrapps.mainroads.wa.gov.au/TrafficImages/CAM_XXXX.jpg", category: "traffic" },
  // { id: "mrwa-kwinana-north",  label: "Kwinana Fwy North",  type: "jpeg",
  //   url: "https://mrapps.mainroads.wa.gov.au/TrafficImages/CAM_XXXX.jpg", category: "traffic" },

  // ── Transport WA Coastal Cameras (Dept of Transport) ──────────────────────
  //
  // Source: https://www.transport.wa.gov.au/marine/charts-warnings-current-conditions/coast-cams
  // URL pattern confirmed via clode.com source and worldcam.eu (active as of Feb 2026).
  // Images refresh every ~60 seconds on the server side.
  //
  {
    id: "dotwa-trigg",
    label: "Trigg Point",
    type: "jpeg",
    url: "https://www.transport.wa.gov.au/imarine/coastaldata/coastcam/livegfx/camtrigg/live.jpg",
    category: "beach",
    interval: 60000,
  },
  {
    id: "dotwa-swanbourne",
    label: "Swanbourne Beach",
    type: "jpeg",
    url: "https://www.transport.wa.gov.au/imarine/coastaldata/coastcam/livegfx/camswanbourne/live.jpg",
    category: "beach",
    interval: 60000,
  },
  {
    id: "dotwa-fremantle",
    label: "Fremantle Fishing Boat Harbour",
    type: "jpeg",
    url: "https://www.transport.wa.gov.au/imarine/coastaldata/coastcam/livegfx/camfremantle/live.jpg",
    category: "beach",
    interval: 60000,
  },
  {
    id: "dotwa-lancelin",
    label: "Lancelin Beach",
    type: "jpeg",
    url: "https://www.transport.wa.gov.au/imarine/coastaldata/coastcam/livegfx/camlancelin/live.jpg",
    category: "beach",
    interval: 60000,
  },
  {
    id: "dotwa-mandurah",
    label: "Mandurah Ocean Marina",
    type: "jpeg",
    url: "https://www.transport.wa.gov.au/imarine/coastaldata/coastcam/livegfx/cammandurah/live.jpg",
    category: "beach",
    interval: 60000,
  },

  // ── Windy.com beach webcams ────────────────────────────────────────────────
  //
  // Confirmed webcam IDs from windy.com search results.
  // URL format: https://images-webcams.windy.com/{last2ofID}/{ID}/current/full/{ID}.jpg
  // Note: <img> tags don't send a Referer header — if Windy blocks these,
  // a proxy is the fix: TODO /proxy/img?url=...
  //
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

  // ── HLS streams ───────────────────────────────────────────────────────────
  // TODO: Add real Perth HLS streams here when sources are identified.
  // If CORS blocks hls.js fetching the .m3u8, route through a proxy:
  //   url: "/proxy/hls?target=https://origin.example.com/stream.m3u8"
];

export default cameras;
