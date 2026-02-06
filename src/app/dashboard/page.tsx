import { UserButton } from "@clerk/nextjs";
import { MessageSquare, Puzzle } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)]">
      <nav className="flex items-center justify-between px-8 py-4 border-b border-border">
        <Link href="/dashboard" className="text-xl font-bold">
          Oakbook
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <UserButton />
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl w-full">
          <Link
            href="/chat"
            className="border border-border rounded-lg p-8 hover:bg-muted/50 transition-colors"
          >
            <MessageSquare className="h-6 w-6 text-muted-foreground mb-3" />
            <h2 className="text-xl font-semibold mb-2">Start Learning</h2>
            <p className="text-muted-foreground text-sm">
              Open the AI chat to ask questions about any topic or YouTube
              video.
            </p>
          </Link>

          <div className="border border-border rounded-lg p-8">
            <Puzzle className="h-6 w-6 text-muted-foreground mb-3" />
            <h2 className="text-xl font-semibold mb-2">Chrome Extension</h2>
            <p className="text-muted-foreground text-sm">
              Install the Oakbook Chrome extension to chat about YouTube videos
              with one click. Load the <code>extension/</code> folder as an
              unpacked extension in Chrome.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
