import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)]">
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-200">
        <Link href="/dashboard" className="text-xl font-bold">
          Oakbook
        </Link>
        <UserButton />
      </nav>

      <main className="flex-1 flex items-center justify-center px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl w-full">
          <Link
            href="/chat"
            className="border border-gray-200 rounded-lg p-8 hover:border-gray-400 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">Start Learning</h2>
            <p className="text-gray-600 text-sm">
              Open the AI chat to ask questions about any topic or YouTube
              video.
            </p>
          </Link>

          <div className="border border-gray-200 rounded-lg p-8">
            <h2 className="text-xl font-semibold mb-2">Chrome Extension</h2>
            <p className="text-gray-600 text-sm">
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
