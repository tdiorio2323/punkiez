# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PUNKIEZ is a mobile-first Next.js landing page for a brand featuring a glassmorphism design with custom orange branding (#FF7A00). The site includes a standalone Pac-Man style game at `/punkman`.

## Development Commands

```bash
# Development
pnpm dev              # Start dev server with Turbopack (default port 3001)

# Production
pnpm build            # Build for production
pnpm start            # Start production server

# Code quality
pnpm lint             # Run ESLint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router and TypeScript
- **Styling**: Tailwind CSS v4 with custom theme configuration
- **Package Manager**: pnpm (v10.15.1)
- **Font**: Inter (Google Fonts)

### Project Structure
```
app/
├── layout.tsx          # Root layout with metadata and Inter font
├── page.tsx            # Landing page with glassmorphism card
├── punkman/
│   └── page.tsx        # Game page (iframe wrapper)
└── globals.css         # Tailwind imports and custom CSS

public/
├── background.jpg      # Background image
├── punkiez-logo.png    # Wordmark logo
├── p-icon.png          # P icon/stamp
├── og-image.png        # Open Graph image
└── punkman_game/       # Standalone game (HTML/CSS/JS)
```

### Design System

**Brand Color**: `#FF7A00` (defined in globals.css as `--color-brand-orange`)

**Custom CSS Classes**:
- `.glass` - Glassmorphism card with gradient border (before pseudo-element)
- `.menu-btn` - White buttons with orange text, hover inverts colors
- `.telegram-btn` - Gradient orange button with shimmer effect

**Key Design Elements**:
- Background: Fixed background image (`/background.jpg`)
- Glass card: 75% white opacity with 16px blur and multi-layer shadows
- Gradient border: Orange gradient on glass card using mask composite
- Button effects: Transform translateY on hover, layered box shadows
- Mobile-first responsive breakpoints (max-width: 420px → 720px)

### Routes

- `/` - Landing page with menu buttons and Telegram link
- `/punkman` - Standalone game in iframe (loads `/punkman_game/index.html`)

### External Links Configuration

All menu items in `app/page.tsx` link to external URLs:
- **POTATO CHAT**: `https://ptwdym158.org/punkiez`
- **INSTAGRAM**: `https://www.instagram.com/punkiez__/`
- **TELEGRAM**: `https://t.me/+mx113PockSVjNzgx`

When updating links, modify the `menuItems` array in `app/page.tsx:2-8`.

### Game Integration

The `/punkman` route loads a static HTML game from `public/punkman_game/`. The game is fully self-contained with its own HTML/CSS/JS and runs independently in an iframe. To modify the game, edit files in `public/punkman_game/`.

## Path Aliases

TypeScript path alias `@/*` maps to project root (configured in tsconfig.json).

## Deployment Notes

- Static assets are served from `/public`
- Open Graph images configured for social sharing
- Mobile viewport optimized for iOS and Android
- Accessibility features: aria-labels on all interactive elements
