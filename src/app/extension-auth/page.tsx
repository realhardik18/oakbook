"use client";

import { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function ExtensionAuthPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    async function fetchToken() {
      try {
        const res = await fetch("/api/auth/extension-token");
        if (!res.ok) throw new Error("Failed to get token");
        const data = await res.json();
        setToken(data.token);
        setStatus("success");
      } catch {
        setStatus("error");
      }
    }
    fetchToken();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="flex items-center justify-between px-8 py-3 border-b border-gray-200">
        <Link href="/dashboard" className="text-xl font-bold">
          Oakbook
        </Link>
        <UserButton />
      </nav>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md">
          {status === "loading" && (
            <p className="text-gray-500">Connecting extension...</p>
          )}
          {status === "success" && (
            <>
              <div className="text-4xl mb-4">&#10003;</div>
              <h1 className="text-2xl font-bold mb-2">Connected!</h1>
              <p className="text-gray-500">
                Your Oakbook extension is now connected. You can close this tab
                and start watching YouTube videos — they&apos;ll automatically
                appear in your chat.
              </p>
            </>
          )}
          {status === "error" && (
            <>
              <h1 className="text-2xl font-bold mb-2 text-red-600">
                Connection Failed
              </h1>
              <p className="text-gray-500">
                Could not connect the extension. Please try again.
              </p>
            </>
          )}
        </div>
      </div>
      {/* Hidden element for the extension content script to read */}
      {token && (
        <div id="oakbook-extension-token" data-token={token} hidden />
      )}
    </div>
  );
}
