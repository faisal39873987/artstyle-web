import { PUBLIC_ENV } from "../../../config/public-env.js";

let supabaseClientPromise;

export function getAuthStatus() {
  const supabase = PUBLIC_ENV.supabase || {};
  return {
    provider: PUBLIC_ENV.auth.provider,
    enabled: Boolean(supabase.enabled && supabase.url && supabase.anonKey),
    redirectPath: PUBLIC_ENV.auth.redirectPath,
  };
}

export async function getSupabaseClient() {
  const status = getAuthStatus();
  if (!status.enabled) {
    return null;
  }

  if (!supabaseClientPromise) {
    supabaseClientPromise = import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm")
      .then(({ createClient }) => createClient(PUBLIC_ENV.supabase.url, PUBLIC_ENV.supabase.anonKey, {
        auth: {
          autoRefreshToken: true,
          detectSessionInUrl: true,
          persistSession: true,
        },
      }))
      .catch((error) => {
        supabaseClientPromise = undefined;
        throw error;
      });
  }

  return supabaseClientPromise;
}

export async function getCurrentSession() {
  const client = await getSupabaseClient();
  if (!client) return null;

  const { data, error } = await client.auth.getSession();
  if (error) return null;
  return data?.session || null;
}

export async function signInWithEmail(email, password) {
  const client = await getSupabaseClient();
  if (!client) {
    return {
      ok: false,
      messageKey: "supabaseDisabled",
    };
  }

  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error) {
    return {
      ok: false,
      message: error.message,
    };
  }

  return {
    ok: true,
    data,
  };
}

export async function signUpWithEmail(email, password, metadata = {}) {
  const client = await getSupabaseClient();
  if (!client) {
    return {
      ok: false,
      messageKey: "supabaseDisabled",
    };
  }

  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
    },
  });

  if (error) {
    return {
      ok: false,
      message: error.message,
    };
  }

  return {
    ok: true,
    data,
  };
}

export async function signOut() {
  const client = await getSupabaseClient();
  if (!client) return { ok: false };

  const { error } = await client.auth.signOut();
  return error ? { ok: false, message: error.message } : { ok: true };
}
