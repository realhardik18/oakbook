import { createClient, SupabaseClient } from "@supabase/supabase-js";

export type ActiveVideo = {
  id: string;
  user_id: string;
  video_id: string;
  video_url: string;
  video_title: string;
  channel_name: string | null;
  updated_at: string;
};

/**
 * Browser-side Supabase client authenticated with a Clerk JWT.
 * Uses the anon key + JWT so RLS policies apply.
 */
export function createBrowserSupabaseClient(
  token: string
): SupabaseClient {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: { Authorization: `Bearer ${token}` },
      },
      realtime: {
        headers: { Authorization: `Bearer ${token}` },
      },
    }
  );
}

/**
 * Server-side Supabase client using the service role key.
 * Bypasses RLS — use only in API routes.
 */
export function createAdminSupabaseClient(): SupabaseClient {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

/**
 * Extract YouTube video ID from a URL.
 * Handles youtube.com/watch?v=ID, youtu.be/ID, and youtube.com/embed/ID.
 */
export function extractVideoId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.slice(1) || null;
    }
    if (parsed.pathname === "/watch") {
      return parsed.searchParams.get("v");
    }
    const embedMatch = parsed.pathname.match(/^\/embed\/([^/]+)/);
    if (embedMatch) {
      return embedMatch[1];
    }
    return null;
  } catch {
    return null;
  }
}
