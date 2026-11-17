# NextShop: Next.js E-commerce Store

A demo e-commerce store built with Next.js (App Router), TypeScript, Tailwind CSS and Redux Toolkit.

Live demo: coming soon

## Features

- Shop page with live search, category filter and sorting (state kept in the URL)
- Product detail pages with dynamic routes (`/shop/[slug]`) and static generation
- Shopping cart with Redux Toolkit (add, remove, change quantity, stock limits)
- Cart saved in `localStorage`, so it survives page refreshes
- Checkout form with validation (React Hook Form + Zod)
- Fake orders API built with a Route Handler (`POST /api/orders`) that validates data again on the server and recalculates prices
- Order confirmation page
- SEO: per-page metadata, Open Graph, canonical URLs, product structured data (JSON-LD), sitemap and robots.txt
- Optimized images with `next/image`
- Light and dark mode based on system preference

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router, Turbopack, Cache Components)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Hook Form](https://react-hook-form.com/) and [Zod](https://zod.dev/)

## Getting Started

```bash
git clone https://github.com/hyousafdev/nextjs-ecommerce-store.git
cd nextjs-ecommerce-store
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the development server |
| `npm run build` | Create a production build    |
| `npm run start` | Run the production build     |
| `npm run lint`  | Run ESLint                   |

## Project Structure

```
src/
├── app/
│   ├── api/orders/      # Fake orders API (Route Handler)
│   ├── cart/
│   ├── checkout/
│   ├── order-success/
│   ├── shop/
│   │   └── [slug]/      # Product detail pages
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
├── lib/                 # Products data, schemas, helpers
├── store/               # Redux Toolkit store and cart slice
└── types/
```

## Notes

- This is a demo project: no real payments are taken and orders are only kept in server memory.
- Product images are random placeholders from picsum.photos.

## Author

Hassan Yousaf - [GitHub](https://github.com/hyousafdev)