import { PUBLIC_ENV } from "../../../config/public-env.js";
import { getAuthStatus, getCurrentSession, getSupabaseClient } from "./auth.js";

const accessKey = "artstyle_playroom_access";

function storageGet(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function storageSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Restricted browser modes can block localStorage.
  }
}

function storageRemove(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    // Restricted browser modes can block localStorage.
  }
}

function normalizeCode(value) {
  return String(value || "").trim().toLowerCase();
}

export function getPlayroomStatus() {
  const playroom = PUBLIC_ENV.playroom || {};
  const auth = getAuthStatus();

  return {
    enabled: playroom.enabled !== false,
    storageMode: playroom.storageMode || "static-demo",
    hasLocalCode: Boolean(playroom.localAccessCode),
    authEnabled: auth.enabled,
    privateStorageReady: Boolean(auth.enabled && playroom.storageBucket),
    unlocked: auth.enabled || storageGet(accessKey) === "unlocked",
  };
}

export function unlockPlayroom(code) {
  const expected = PUBLIC_ENV.playroom?.localAccessCode || "";

  if (!expected || normalizeCode(code) === normalizeCode(expected)) {
    storageSet(accessKey, "unlocked");
    return true;
  }

  return false;
}

export function lockPlayroom() {
  storageRemove(accessKey);
}

export function hasPlayroomHostedRom(game) {
  const playroom = PUBLIC_ENV.playroom || {};
  return Boolean(game?.romUrl || (game?.storagePath && (game.storageBucket || playroom.storageBucket)));
}

export async function resolvePlayroomRomUrl(game) {
  const playroom = PUBLIC_ENV.playroom || {};
  if (game?.romUrl) {
    return {
      ok: true,
      romUrl: game.romUrl,
      source: "public",
    };
  }

  const bucket = game?.storageBucket || playroom.storageBucket || "";
  const path = game?.storagePath || "";
  if (!bucket || !path) {
    return {
      ok: false,
      messageKey: "emulatorNoHosted",
    };
  }

  let client;
  try {
    client = await getSupabaseClient();
  } catch (error) {
    return {
      ok: false,
      messageKey: "playroomPrivateStorageDisabled",
      detail: error?.message || "",
    };
  }

  if (!client) {
    return {
      ok: false,
      messageKey: "playroomPrivateStorageDisabled",
    };
  }

  let session;
  try {
    session = await getCurrentSession();
  } catch {
    session = null;
  }

  if (!session) {
    return {
      ok: false,
      messageKey: "playroomAuthRequired",
    };
  }

  const expiresIn = Number(playroom.signedUrlTtlSeconds || playroom.signedUrlTtl || 300);
  const { data, error } = await client.storage.from(bucket).createSignedUrl(path, expiresIn);
  if (error || !data?.signedUrl) {
    return {
      ok: false,
      messageKey: "playroomSignedUrlFailed",
      detail: error?.message || "",
    };
  }

  return {
    ok: true,
    romUrl: data.signedUrl,
    source: "private-storage",
  };
}
