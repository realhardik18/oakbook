"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { MessageThreadFull } from "@/components/tambo/message-thread-full";
import { useMcpServers } from "@/components/tambo/mcp-config-modal";
import { components, tools } from "@/lib/tambo";
import { TamboProvider } from "@tambo-ai/react";
import { ThemeToggle } from "@/components/theme-toggle";
import type { ActiveVideo } from "@/lib/supabase";

function ChatContent() {
  const searchParams = useSearchParams();
  const paramTitle = searchParams.get("videoTitle");
  const paramUrl = searchParams.get("videoUrl");

  const mcpServers = useMcpServers();

  const [activeVideo, setActiveVideo] = useState<ActiveVideo | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchActiveVideo = useCallback(async () => {
    try {
      const res = await fetch("/api/videos/active");
      if (!res.ok) return;
      const { video } = await res.json();
      setActiveVideo(video || null);
    } catch {
      // Network error — skip this poll cycle
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    fetchActiveVideo();

    // Poll every 5s for changes
    pollRef.current = setInterval(fetchActiveVideo, 5000);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [fetchActiveVideo]);

  // Resolve video: Supabase active video takes priority, fallback to URL params
  const videoTitle = activeVideo?.video_title || paramTitle;
  const videoUrl = activeVideo?.video_url || paramUrl;
  const channelName = activeVideo?.channel_name;

  const contextHelpers = {
    youtubeVideo: () => {
      if (!videoTitle && !videoUrl) return null;
      return {
        videoTitle: videoTitle || "Unknown",
        videoUrl: videoUrl || "",
        ...(channelName ? { channelName } : {}),
        instruction:
          "The user is watching this YouTube video. Use this context to answer their questions about the video content.",
      };
    },
  };

  const welcomeText = videoTitle
    ? `I see you're watching **${videoTitle}**. Feel free to ask me anything about this video — I can help with summaries, explanations, or any questions you have!`
    : "Welcome to Oakbook! Ask me anything, or use the Chrome extension to open a YouTube video for context-aware learning.";

  const initialMessages = [
    {
      role: "assistant" as const,
      content: [{ type: "text" as const, text: welcomeText }],
    },
  ];

  return (
    <TamboProvider
      apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY!}
      components={components}
      tools={tools}
      tamboUrl={process.env.NEXT_PUBLIC_TAMBO_URL}
      mcpServers={mcpServers}
      contextHelpers={contextHelpers}
      initialMessages={initialMessages}
    >
      <div className="h-screen flex flex-col">
        <nav className="flex items-center justify-between px-8 py-3 border-b border-border shrink-0">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-xl font-bold">
              Oakbook
            </Link>
            {videoTitle && (
              <span className="text-sm text-muted-foreground truncate max-w-md">
                Watching: {videoTitle}
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <UserButton />
          </div>
        </nav>
        <div className="flex-1 min-h-0">
          <MessageThreadFull className="max-w-4xl mx-auto h-full" />
        </div>
      </div>
    </TamboProvider>
  );
}

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <ChatContent />
    </Suspense>
  );
}
