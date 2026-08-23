# cambridgebumps.com

Bumps charts, statistics, and more for Cambridge and Oxford rowing races.

## Features

- **Interactive Bumps Charts**: Visualize the results of bumps races over the years.
- **Multi-year Charts**: Track the progress of clubs and crews across multiple years.
- **Statistics**: Detailed statistics for clubs, crews, and individual events.
- **Responsive Design**: Built with Tailwind CSS and Radix UI for a modern, mobile-friendly experience.
- **Dark Mode**: Support for light and dark themes.

## Tech Stack

- **Framework**: [Astro](https://astro.build/) (static output, [React](https://react.dev/) islands)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Charts**: [react-bumps-chart](https://github.com/johnwalley/react-bumps-chart)
- **Icons**: [Radix Icons](https://icons.radix-ui.com/)
- **Fonts**: [Geist](https://vercel.com/font) and [Roboto Flex](https://fonts.google.com/specimen/Roboto+Flex)

## Getting Started

### Prerequisites

- Node.js 24+
- [pnpm](https://pnpm.io/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/johnwalley/cambridgebumps.com.git
   cd cambridgebumps.com
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

Open [http://localhost:4321](http://localhost:4321) with your browser to see the result.

### Commands

| Command               | Action                                                |
| --------------------- | ----------------------------------------------------- |
| `pnpm dev`            | Start the dev server at `localhost:4321`              |
| `pnpm dev:oxford`     | Same, serving the Oxford configuration                |
| `pnpm build`          | Build the production site to `./dist/`                |
| `pnpm build:oxford`   | Build the Oxford site to `./dist/`                    |
| `pnpm preview`        | Serve the built site locally                          |
| `pnpm lint`           | Run ESLint                                            |
| `pnpm typecheck`      | Run `astro check`                                     |
| `pnpm format`         | Format with Prettier                                  |
| `pnpm gen:redirects`  | Regenerate `vercel.json` from `scripts/redirects.mjs` |
| `pnpm gen:chart-meta` | Regenerate `src/data/chart-meta.json`                 |

### Environment Variables

The project uses environment variables to switch between the Cambridge and Oxford configurations. `SITE` picks which of the checked-in files is read — `.env.cambridge` by default, `.env.oxford` when `SITE=oxford` (what `pnpm dev:oxford` and `pnpm build:oxford` set):

- `PUBLIC_TITLE` — "Cambridge" or "Oxford"
- `PUBLIC_BASE_URL` — the canonical origin
- `PUBLIC_GOOGLE_ANALYTICS_TAG` — the GA measurement ID

Variables set in the real environment (for example a hosting provider's project settings) take precedence over the files.
