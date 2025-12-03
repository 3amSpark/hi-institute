# HI Institute

A monorepo containing multiple sites for HI Institute, built with [Astro](https://astro.build/) and shared UI components. By Adrian.

## Project Structure

```
hi-institute/
├── packages/
│   └── ui/                 # Shared UI components (@repo/ui)
│       ├── components/     # Astro components
│       └── theme.css       # Shared theme styles
├── sites/
│   └── skin-beauty/        # Skin & Beauty site (Astro + Tailwind)
├── pnpm-workspace.yaml     # Workspace configuration
└── package.json
```

### Packages

- **`@repo/ui`** — Shared UI components and theme styles used across all sites

### Sites

- **`skin-beauty`** — Skin & Beauty website

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) (v8+)

### Installation

From the root directory, install all dependencies:

```bash
pnpm install
```

## Running a Site

From the root directory, use pnpm's `--filter` flag:

```bash
pnpm --filter skin-beauty dev
```

This starts the development server at `http://localhost:4321`

### Available Scripts

| Command                        | Description                      |
| ------------------------------ | -------------------------------- |
| `pnpm --filter <site> dev`     | Start development server         |
| `pnpm --filter <site> build`   | Build for production             |
| `pnpm --filter <site> preview` | Preview production build locally |

## Using Shared Components

Sites can import components from the shared UI package:

```astro
---
import Card from '@repo/ui/components/card';
import '@repo/ui/theme.css';
---
```

## Adding a New Site

1. Create a new directory under `sites/`
2. Initialize an Astro project or copy from an existing site
3. Add `@repo/ui` as a dependency in `package.json`:
   ```json
   {
     "dependencies": {
       "@repo/ui": "workspace:^"
     }
   }
   ```
4. Run `pnpm install` from the root to link dependencies
