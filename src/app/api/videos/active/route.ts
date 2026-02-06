import { auth } from "@clerk/nextjs/server";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabaseClient, extractVideoId } from "@/lib/supabase";

async function resolveUserId(req: NextRequest): Promise<string | null> {
  // Try Clerk session first
  const { userId } = await auth();
  if (userId) return userId;

  // Fall back to extension token
  const extensionToken = req.headers.get("x-extension-token");
  if (!extensionToken) return null;

  try {
    const secret = new TextEncoder().encode(
      process.env.EXTENSION_TOKEN_SECRET!
    );
    const { payload } = await jwtVerify(extensionToken, secret);
    return (payload.userId as string) || null;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const userId = await resolveUserId(req);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("active_videos")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ video: data || null });
}

export async function POST(req: NextRequest) {
  const userId = await resolveUserId(req);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { videoUrl, videoTitle, channelName } = body;

  if (!videoUrl || !videoTitle) {
    return NextResponse.json(
      { error: "videoUrl and videoTitle are required" },
      { status: 400 }
    );
  }

  const videoId = extractVideoId(videoUrl);
  if (!videoId) {
    return NextResponse.json(
      { error: "Invalid YouTube URL" },
      { status: 400 }
    );
  }

  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("active_videos")
    .upsert(
      {
        user_id: userId,
        video_id: videoId,
        video_url: videoUrl,
        video_title: videoTitle,
        channel_name: channelName || null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    )
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ video: data });
}

export async function DELETE(req: NextRequest) {
  const userId = await resolveUserId(req);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminSupabaseClient();
  const { error } = await supabase
    .from("active_videos")
    .delete()
    .eq("user_id", userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
