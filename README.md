# Dashboard - Aurora

A Next.js dashboard for the React conversion of our WordPress theme called [Aurora](https://www.lucid-themes.com/theme/aurora-wordpress-blog-shop-theme/).

This dashboard is designed to work with the React + Supabase project [here](https://github.com/lucidthemes/aurora-sb)

This project is mainly intended for learning purposes.

## Demo

Production site: [demo](https://dashboard-aurora-sb.vercel.app/)

Staging site: [demo](https://dashboard-aurora-sb-staging.vercel.app/)

## Features

- Dashboard
  - Pages
  - Blog posts
    - Categories
    - Tags
    - Comments
    - Authors
  - Single page/post editor
    - 12 blocks
    - Drag and drop reordering
    - Floating toolbar
    - Rich text
    - History with undo and redo
  - Media
  - Sidebars
  - Instagram feed
  - Users
  - Logs
- Auth
  - Login
  - Forgot password
  - Reset password

## Built with

Frontend

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn](https://ui.shadcn.com/)
- [TanStack Table](https://tanstack.com/table/latest)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [TanStack Query](https://tanstack.com/query/latest)
- [dnd kit](https://dndkit.com/)
- [Floating UI](https://floating-ui.com/)
- [DOMPurify](https://www.npmjs.com/package/dompurify)
- [Isomorphic DOMPurify](https://www.npmjs.com/package/isomorphic-dompurify)

Database

- [Supabase](https://supabase.com/database)

File storage

- [Supabase](https://supabase.com/storage)

## Installation

1. Clone the repository

```sh
git clone https://github.com/lucidthemes/dashboard-aurora.git
```

2. Install dependencies

```sh
npm install
```

## Usage

1. Start the dev server

```sh
npm run dev
```

2. Open your browser and navigate to: `http://localhost:3000/`

## License

MIT — see the [LICENSE](./LICENSE) file for more information.
