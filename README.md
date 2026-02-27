# Making AI Feel Human

Why does most AI feel like a tool, and what does it take to make it feel like a collaborator?

Every AI interaction starts the same way — a blank box. You have to know what to ask, frame the problem yourself, then figure out what to do with a wall of text. But the tools that actually feel good — autocomplete, spell check, Smart Compose — work because they already have your context. They don't wait for you to ask. They show up at the right moment, in the right place, and get out of the way if you don't need them.

The gap between AI that waits for a prompt and AI that meets you where you are is what this workshop is about.

## The 3 Principles

### 1. Timing Over Capability

The smartest AI in the world is useless if it shows up at the wrong moment. A suggestion at exactly the right time feels like it's reading your mind.

**Gut check:** Before you trigger any AI feature, ask — what did the user just do that tells me they need this right now? If you can't answer that, don't show it.

### 2. Inline Over Overlay

Every sidebar, every modal, every separate chat window is a context switch. Context switches kill flow.

**Quick test:** How many clicks does it take to go from "AI generated this" to "it's in my work"? If the answer is more than zero — if the user has to copy-paste — you've already lost. Design for insertion, not generation.

### 3. Make It Subtle

The best AI interactions are the ones where saying "no" costs zero effort. If dismissing AI requires clicking a button, reading a confirmation, or feeling guilty — you've designed it wrong.

The default state should be: AI is invisible. It earns screen space by being useful, and gives it back immediately when it's not. The hard part isn't building it — it's making the design decision to keep your AI quiet.

## Setup

```bash
bun install
cp .env.example .env.local
```

Add your API keys to `.env.local`:
- `CEREBRAS_API_KEY` — [cerebras.ai](https://cerebras.ai) (used for fast inline suggestions)
- `ANTHROPIC_API_KEY` — [console.anthropic.com](https://console.anthropic.com/)

## Run

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Architecture

```
src/
  app/
    page.tsx                # Landing page with links to 3 demos
    timing/page.tsx         # Demo 1: Timing
    inline/page.tsx         # Demo 2: Inline
    subtle/page.tsx         # Demo 3: Subtle
    api/suggest/route.ts    # Non-streaming suggestion endpoint
    api/chat/route.ts       # Streaming chat endpoint
  components/
    DemoShell.tsx           # Bad/Good vertical container
    DemoLayout.tsx          # Shared demo page wrapper
    Editor.tsx              # contentEditable editor
    GhostText.tsx           # Editor with inline ghost text
    Modal.tsx               # Modal for "bad" subtle demo
    demos/                  # Individual demo implementations
  lib/
    ai.ts                   # Cerebras + Anthropic provider config
    hooks.ts                # useIdleDetection + useSuggestion
```

## Built With

- [Next.js](https://nextjs.org)
- [Vercel AI SDK](https://sdk.vercel.ai)
- [Cerebras](https://cerebras.ai) (llama3.1-8b for near-instant suggestions)
- [Anthropic Claude](https://docs.anthropic.com)
- [Tailwind CSS](https://tailwindcss.com)
