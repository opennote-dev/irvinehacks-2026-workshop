# Making AI Feel Human

A demo app for the IrvineHacks workshop on AI UX principles. Three side-by-side demos show how small design decisions make AI feel helpful instead of annoying.

## The 3 Principles

1. **Timing** — Don't fire on every keystroke. Wait until the user pauses.
2. **Inline** — Show suggestions where the user is working, not in a sidebar.
3. **Subtle** — Ghost text that appears and disappears silently. No modals, no guilt trips.

Each principle has a "Bad" and "Good" demo side by side. Same AI model, same API — only the UX changes.

## Setup

```bash
# Install dependencies
bun install

# Copy environment variables
cp .env.example .env.local

# Add your Anthropic API key to .env.local
# Get one at https://console.anthropic.com/
```

## Run

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## How It Works

### API Routes

- `POST /api/suggest` — Uses `generateText` to return a 1-2 sentence continuation
- `POST /api/chat` — Uses `streamText` for the sidebar chat in Demo 2

### Key Hooks (`src/lib/hooks.ts`)

- `useIdleDetection(text, ms)` — Returns `true` after `ms` milliseconds of no typing
- `useSuggestion()` — Fetches suggestions from `/api/suggest` with automatic cancellation

### Components

- `Editor` — Simple `contentEditable` div
- `GhostText` — Editor with inline ghost-text autocomplete (Tab to accept)
- `DemoShell` — Side-by-side "Bad" / "Good" container
- `Modal` — Used in the "Subtle Bad" demo to show aggressive AI patterns

## Architecture

```
src/
  app/
    page.tsx                # Single page with all 3 demos
    api/suggest/route.ts    # Non-streaming suggestion endpoint
    api/chat/route.ts       # Streaming chat endpoint
  components/
    DemoShell.tsx           # Bad/Good side-by-side container
    Editor.tsx              # Basic contentEditable editor
    GhostText.tsx           # Editor with inline ghost text
    Modal.tsx               # Modal for "bad" subtle demo
    demos/                  # Individual demo implementations
  lib/
    ai.ts                   # Anthropic provider config
    hooks.ts                # useIdleDetection + useSuggestion
```

## Built With

- [Next.js](https://nextjs.org)
- [Vercel AI SDK](https://sdk.vercel.ai)
- [Anthropic Claude](https://docs.anthropic.com)
- [Tailwind CSS](https://tailwindcss.com)
