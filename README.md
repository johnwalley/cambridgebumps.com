# cambridgebumps.com

Bumps charts, statistics, and more for Cambridge and Oxford rowing races.

## Features

- **Interactive Bumps Charts**: Visualize the results of bumps races over the years.
- **Multi-year Charts**: Track the progress of clubs and crews across multiple years.
- **Statistics**: Detailed statistics for clubs, crews, and individual events.
- **Responsive Design**: Built with Tailwind CSS and Radix UI for a modern, mobile-friendly experience.
- **Dark Mode**: Support for light and dark themes.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Charts**: [react-bumps-chart](https://github.com/johnwalley/react-bumps-chart)
- **Icons**: [Radix Icons](https://icons.radix-ui.com/)
- **Fonts**: [Geist](https://vercel.com/font)

## Getting Started

### Prerequisites

- Node.js 18+
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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Environment Variables

The project uses environment variables to switch between Cambridge and Oxford configurations. You can use the provided `.env.cambridge` and `.env.oxford` files.
