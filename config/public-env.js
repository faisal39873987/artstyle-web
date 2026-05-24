export const PUBLIC_ENV = Object.freeze({
  appName: "Art Style Apps",
  siteUrl: "https://artstyle.live",
  supportEmail: "opensea3987@gmail.com",
  supabase: {
    enabled: false,
    url: "",
    anonKey: "",
  },
  auth: {
    provider: "supabase",
    redirectPath: "/dashboard",
  },
  playroom: {
    enabled: true,
    localAccessCode: "ARTSTYLE",
    storageMode: "static-demo",
    storageBucket: "private-roms",
    signedUrlTtlSeconds: 300,
  },
  pwa: {
    enabled: false,
    serviceWorker: "/sw.js",
  },
});
