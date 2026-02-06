import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  MessageSquare,
  Chrome,
  Sparkles,
  Play,
  ArrowRight,
  BookOpen,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)]">
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <span className="text-xl font-bold tracking-tight">Oakbook</span>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <SignedOut>
              <Link
                href="/sign-in"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="text-sm font-medium px-4 py-2 rounded-md bg-foreground text-background hover:bg-foreground/90 transition-colors"
              >
                Get Started
              </Link>
            </SignedOut>
            <SignedIn>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background orbs */}
        <div className="absolute top-[-20%] left-[10%] w-[500px] h-[500px] rounded-full bg-chart-3/8 blur-[120px] animate-drift" />
        <div className="absolute bottom-[-10%] right-[5%] w-[400px] h-[400px] rounded-full bg-chart-5/8 blur-[100px] animate-drift-reverse" />

        <div className="relative max-w-4xl mx-auto px-6 pt-28 pb-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground mb-8">
            <Zap className="h-3.5 w-3.5" />
            <span>AI-powered video learning</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            Learn from YouTube,{" "}
            <span className="bg-gradient-to-r from-chart-3 via-chart-5 to-chart-1 bg-clip-text text-transparent">
              10x faster
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Ask questions about any video and get instant, context-aware answers.
            Oakbook watches what you watch and becomes your personal tutor.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <SignedOut>
              <Link
                href="/sign-up"
                className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors text-base"
              >
                Start for free
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </SignedOut>
            <SignedIn>
              <Link
                href="/dashboard"
                className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors text-base"
              >
                Go to Dashboard
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </SignedIn>
          </div>
        </div>
      </section>

      {/* Mock UI Preview */}
      <section className="relative max-w-4xl mx-auto px-6 -mt-4 mb-24">
        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-2xl shadow-black/10">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <div className="flex-1 text-center text-xs text-muted-foreground">
              oakbook.app/chat
            </div>
          </div>
          <div className="p-6 sm:p-8 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5">
                <Play className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <div className="rounded-lg bg-muted/50 px-4 py-3 text-sm text-muted-foreground max-w-md">
                Watching: <span className="text-foreground font-medium">3Blue1Brown — But what is a neural network?</span>
              </div>
            </div>
            <div className="flex items-start gap-3 justify-end">
              <div className="rounded-lg bg-foreground/10 px-4 py-3 text-sm max-w-sm">
                Can you explain backpropagation from the video in simpler terms?
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-chart-3/20 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="h-3.5 w-3.5 text-chart-3" />
              </div>
              <div className="rounded-lg bg-muted/50 px-4 py-3 text-sm text-muted-foreground max-w-md leading-relaxed">
                Sure! Think of it like grading a test backwards. The network makes a guess, checks how wrong it was, then goes back through each layer saying &quot;you contributed this much to the mistake&quot; and adjusts...
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto px-6 mb-28">
        <h2 className="text-3xl font-bold text-center mb-4">How it works</h2>
        <p className="text-muted-foreground text-center mb-14 max-w-lg mx-auto">
          Three steps to transform any YouTube video into an interactive learning session.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: "1",
              icon: Chrome,
              title: "Install the extension",
              desc: "Add the Oakbook Chrome extension. It detects what you're watching automatically.",
            },
            {
              step: "2",
              icon: Play,
              title: "Watch a video",
              desc: "Play any YouTube video. Oakbook picks up the title and context in real time.",
            },
            {
              step: "3",
              icon: MessageSquare,
              title: "Ask anything",
              desc: "Chat with AI that already knows what you're watching. Get answers instantly.",
            },
          ].map((item) => (
            <div key={item.step} className="relative group">
              <div className="rounded-xl border border-border p-6 h-full bg-card hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-foreground text-background text-sm font-bold">
                    {item.step}
                  </span>
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-muted/20">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <h2 className="text-3xl font-bold text-center mb-14">
            Built for deep learning
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: MessageSquare,
                title: "Context-aware chat",
                desc: "AI knows which video you're on, what it covers, and who made it. No pasting links.",
              },
              {
                icon: Sparkles,
                title: "Smart follow-ups",
                desc: "Get summaries, deeper explanations, related topics, and practice questions.",
              },
              {
                icon: BookOpen,
                title: "Any subject",
                desc: "Works with lectures, tutorials, documentaries, conference talks — anything on YouTube.",
              },
              {
                icon: Zap,
                title: "Real-time sync",
                desc: "Switch videos and Oakbook follows. Your chat always has the latest context.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="flex gap-4 p-5 rounded-xl hover:bg-muted/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <feature.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Ready to learn smarter?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Join Oakbook and turn every YouTube video into a conversation with AI.
        </p>
        <SignedOut>
          <Link
            href="/sign-up"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors text-base"
          >
            Get started free
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </SignedOut>
        <SignedIn>
          <Link
            href="/chat"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors text-base"
          >
            Open chat
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </SignedIn>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between text-sm text-muted-foreground">
          <span>Oakbook</span>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}
