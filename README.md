# My Freedom Portfolio

A modern, SSR-enabled Astro 5.x website for tracking and sharing investment portfolios and ETF watchlists. Built for deployment on Cloudflare Pages.

## Features

- **Server-Side Rendering (SSR)** - Fast, dynamic content powered by Cloudflare Workers
- **Google Sheets Integration** - Real-time portfolio and ETF data from public Google Sheets
- **Modern Stack** - Astro 5.x, React 18, TypeScript, Tailwind CSS v4
- **SEO Optimized** - Automatic sitemap generation, meta tags, and structured data
- **Content Collections** - Blog posts managed with Astro's content collections
- **Framer Motion Animations** - Subtle, performant animations where needed

## Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm package manager

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Project Structure

```
/
├── public/
│   ├── _redirects           # Cloudflare Pages redirects
│   ├── robots.txt           # SEO robots file
│   └── favicon.svg          # Site favicon
├── src/
│   ├── components/
│   │   ├── react/           # React components
│   │   │   └── AnimatedButtonRow.tsx
│   │   ├── Nav.astro
│   │   └── Footer.astro
│   ├── content/
│   │   ├── blog/            # Blog post markdown files
│   │   └── config.ts        # Content collections schema
│   ├── data/
│   │   └── services.json    # Services data
│   ├── layouts/
│   │   └── BaseLayout.astro # Main layout with SEO
│   ├── lib/
│   │   └── sheets.ts        # Google Sheets fetching/caching
│   ├── pages/
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   └── [post].astro
│   │   ├── services/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── index.astro      # Home page
│   │   ├── portfolio.astro  # Portfolio data from Sheet 1
│   │   ├── etfs.astro       # ETF data from Sheet 2
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── thank-you.astro
│   │   ├── privacy.astro
│   │   ├── terms.astro
│   │   └── 404.astro
│   ├── styles/
│   │   └── global.css       # Tailwind directives
│   └── env.d.ts             # TypeScript environment types
├── astro.config.mjs         # Astro configuration
├── package.json
└── tsconfig.json
```

## Google Sheets Integration

The site pulls data from two public Google Sheets:

1. **Portfolio List**: Holdings, prices, and investment details
2. **ETF Weekly List**: ETF watchlist with ownership and payout information

Data is fetched server-side with a 10-minute cache to optimize performance.

### Environment Variables (Optional)

```env
# Site configuration
SITE=https://yourdomain.com
PUBLIC_SITE_NAME=My Freedom Portfolio

# Google Sheets (defaults provided if not set)
SHEET_PORTFOLIO_ID=1Nh1PhHEyzk1G7XWFpRG5ivXfWumgyNzxyKxw68gKbtQ
SHEET_PORTFOLIO_GID=0
SHEET_ETF_ID=1irkOwYS3phsSBpeHMq1xt6XyfTcMQEBuZdPfOsh0SOw
SHEET_ETF_GID=0
```

## Cloudflare Pages Deployment

### Build Settings

- **Build command**: `pnpm build`
- **Build output directory**: `dist`
- **Node version**: 18 or higher

### Environment Variables

Set in Cloudflare Pages dashboard:

- `SITE` - Your production URL (e.g., `https://myfreedomportfolio.pages.dev`)
- `NODE_VERSION` - `18` (if not auto-detected)

### Deployment Steps

1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. Connect the repository to Cloudflare Pages
3. Configure build settings as above
4. Deploy!

Cloudflare Pages will automatically rebuild and deploy on every push to your main branch.

## Tech Stack Details

- **Astro 5.x** - SSR framework with Cloudflare adapter
- **React 18** - For interactive island components
- **TypeScript** - Strict mode enabled
- **Tailwind CSS v4** - Via Vite plugin (latest beta)
- **Framer Motion** - Smooth animations
- **Papaparse** - CSV parsing for Google Sheets data
- **@astrojs/sitemap** - Automatic sitemap generation

## Development Commands

```bash
# Type checking
pnpm typecheck

# Development with hot reload
pnpm dev

# Production build (includes type checking)
pnpm build

# Preview production build locally
pnpm preview
```

## License

This is a personal portfolio project for educational purposes. See source code for reference.

## Disclaimer

This website is for educational and entertainment purposes only. Nothing on this site constitutes financial advice. Always consult with a qualified financial advisor before making investment decisions.
