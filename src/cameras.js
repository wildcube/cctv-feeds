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
  // ── Main Roads WA traffic cameras (JPEG, publicly accessible) ──────────────
  // Source: https://www.mainroads.wa.gov.au/traffic-travel/traffic-cameras/
  {
    id: "mrwa-mitchell-fwy-north",
    label: "Mitchell Fwy North (Reid Hwy)",
    type: "jpeg",
    url: "https://regionalroads.trafficstatus.wa.gov.au/api/cameras/MTC_NTH_MTC_RDHWY/image",
    category: "traffic",
  },
  {
    id: "mrwa-mitchell-fwy-south",
    label: "Mitchell Fwy South (Karrinyup Rd)",
    type: "jpeg",
    url: "https://regionalroads.trafficstatus.wa.gov.au/api/cameras/MTC_STH_KARRRD/image",
    category: "traffic",
  },
  {
    id: "mrwa-kwinana-fwy-north",
    label: "Kwinana Fwy North (Mill Point Rd)",
    type: "jpeg",
    url: "https://regionalroads.trafficstatus.wa.gov.au/api/cameras/KWN_NTH_MILLPT/image",
    category: "traffic",
  },
  {
    id: "mrwa-kwinana-fwy-south",
    label: "Kwinana Fwy South (Canning Hwy)",
    type: "jpeg",
    url: "https://regionalroads.trafficstatus.wa.gov.au/api/cameras/KWN_STH_CANNHWY/image",
    category: "traffic",
  },
  {
    id: "mrwa-graham-farmer-east",
    label: "Graham Farmer Fwy East",
    type: "jpeg",
    url: "https://regionalroads.trafficstatus.wa.gov.au/api/cameras/GFF_EST_GFFWY/image",
    category: "traffic",
  },
  {
    id: "mrwa-great-eastern-hwy",
    label: "Great Eastern Hwy (Midland)",
    type: "jpeg",
    url: "https://regionalroads.trafficstatus.wa.gov.au/api/cameras/GEH_MIDLAND/image",
    category: "traffic",
  },
  {
    id: "mrwa-stirling-hwy",
    label: "Stirling Hwy (Cottesloe)",
    type: "jpeg",
    url: "https://regionalroads.trafficstatus.wa.gov.au/api/cameras/STH_COTTS/image",
    category: "traffic",
  },
  {
    id: "mrwa-roe-hwy",
    label: "Roe Hwy (Welshpool Rd)",
    type: "jpeg",
    url: "https://regionalroads.trafficstatus.wa.gov.au/api/cameras/ROE_WPOOL/image",
    category: "traffic",
  },

  // ── GOandROAM / beach & harbour webcams (JPEG) ───────────────────────────
  // Source: https://www.goandroam.com.au/webcams/
  {
    id: "gar-scarborough-beach",
    label: "Scarborough Beach",
    type: "jpeg",
    url: "https://www.seabreeze.com.au/webcam/scarborough/image.jpg",
    category: "beach",
    interval: 60000,
  },
  {
    id: "gar-cottesloe-beach",
    label: "Cottesloe Beach",
    type: "jpeg",
    url: "https://www.seabreeze.com.au/webcam/cottesloe/image.jpg",
    category: "beach",
    interval: 60000,
  },
  {
    id: "gar-city-beach",
    label: "City Beach",
    type: "jpeg",
    url: "https://www.seabreeze.com.au/webcam/city-beach/image.jpg",
    category: "beach",
    interval: 60000,
  },
  {
    id: "gar-fremantle-harbour",
    label: "Fremantle Harbour",
    type: "jpeg",
    url: "https://www.portfremantle.com.au/webcam/image.jpg",
    category: "city",
    interval: 60000,
  },
  {
    id: "gar-perth-cbd",
    label: "Perth CBD (Hay St)",
    type: "jpeg",
    url: "https://www.seabreeze.com.au/webcam/perth/image.jpg",
    category: "city",
    interval: 60000,
  },

  // ── HLS example (replace with a real Perth stream when available) ──────────
  // TODO: Add real Perth HLS streams here when sources are identified.
  // Example structure:
  // {
  //   id: "hls-example",
  //   label: "Example HLS Stream",
  //   type: "hls",
  //   url: "https://example.com/stream.m3u8",
  //   // TODO: If CORS blocks hls.js fetching the .m3u8, route through a proxy:
  //   //   url: "/proxy/hls?target=https://example.com/stream.m3u8"
  //   category: "city",
  // },
];

export default cameras;
