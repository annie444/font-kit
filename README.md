# Font Feature Tester

A web application for uploading, previewing, and testing OpenType font features. Upload any font file (TTF, OTF, WOFF, WOFF2) and interactively toggle features like ligatures, stylistic alternates, small caps, and more to see how they affect your text in real-time.

## Features

- **Font Upload** - Drag and drop or select font files up to 5MB
- **OpenType Feature Toggle** - Enable/disable any OpenType feature the font supports
- **Real-time Preview** - See changes instantly as you toggle features
- **Feature Documentation** - Hover over feature tags to learn what each one does (100+ features documented)
- **Dark/Light Mode** - Full theme support
- **Persistent Storage** - Your uploaded font is saved locally and restored on page reload
- **Upload Progress** - Multi-stage progress notifications during upload

## Supported OpenType Features

The application provides detailed descriptions for 100+ OpenType features including:

| Category | Features |
|----------|----------|
| **Ligatures** | `liga`, `dlig`, `clig`, `hlig`, `rlig` |
| **Capitals** | `smcp`, `c2sc`, `pcap`, `c2pc`, `unic` |
| **Figures** | `onum`, `lnum`, `pnum`, `tnum`, `frac` |
| **Stylistic** | `salt`, `ss01`-`ss20`, `cv01`-`cv99`, `swsh`, `cswh` |
| **Positional** | `subs`, `sups`, `sinf`, `ordn` |
| **Script-specific** | Arabic forms, Indic features, CJK variants, and more |

## Tech Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/) with Svelte 5 (runes)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **UI Components**: [shadcn-svelte](https://shadcn-svelte.com/) (bits-ui based)
- **Forms**: [sveltekit-superforms](https://superforms.rocks/) with Zod validation
- **Font Parsing**: [fontkit](https://github.com/foliojs/fontkit)
- **Storage**: Cloudflare R2 (S3-compatible)
- **Deployment**: Cloudflare Pages

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [pnpm](https://pnpm.io/) (recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/font-kit.git
cd font-kit

# Install dependencies
pnpm install
```

### Environment Variables

Create a `.dev.vars` file in the project root with the following variables:

```env
S3_ACCESS_KEY_ID=your_access_key
S3_SECRET_ACCESS_KEY=your_secret_key
S3_BUCKET_NAME=your_bucket_name
S3_REGION=auto
S3_ACCOUNT_ID=your_cloudflare_account_id
```

These credentials are for Cloudflare R2 storage. You can create an R2 bucket in the [Cloudflare Dashboard](https://dash.cloudflare.com/).

### Development

```bash
# Start the development server
pnpm dev

# Open in browser (optional)
pnpm dev -- --open
```

The app will be available at `http://localhost:5173`.

## Available Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build locally |
| `pnpm check` | Run TypeScript type checking |
| `pnpm lint` | Run Prettier and ESLint |
| `pnpm format` | Auto-format code with Prettier |

## Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── forms/          # Font upload form
│   │   ├── layout/         # Header, Footer, Head
│   │   ├── ui/             # shadcn-svelte components
│   │   └── font-preview.svelte
│   ├── stores/             # Svelte stores (font persistence, upload status)
│   ├── utils/              # Utilities (feature info, upload progress)
│   ├── forms/              # Zod schemas
│   └── consts.ts           # Constants (URLs)
├── routes/
│   ├── +layout.svelte      # App layout
│   ├── +page.svelte        # Home page
│   └── +page.server.ts     # Server actions (upload handling)
└── app.css                 # Global styles
```

## Deployment

The app is configured for deployment to Cloudflare Pages using `@sveltejs/adapter-cloudflare`.

```bash
# Build the project
pnpm build

# Deploy using Wrangler
pnpm wrangler pages deploy .svelte-kit/cloudflare
```

Make sure to set the environment variables in your Cloudflare Pages project settings.

## How It Works

1. **Upload**: User selects a font file which is uploaded to the server
2. **Parse**: Server uses fontkit to extract font metadata (family name, available features)
3. **Store**: Font is uploaded to Cloudflare R2 with a public URL
4. **Load**: Client dynamically injects `@font-face` CSS pointing to the CDN URL
5. **Toggle**: User toggles features which update `font-feature-settings` CSS property

## Privacy

- Uploaded fonts are stored temporarily on Cloudflare R2 and automatically deleted after 24 hours
- No user data is collected or stored
- Font metadata is processed server-side and not retained

## License

MIT
