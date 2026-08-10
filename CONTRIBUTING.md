# Contributing

Thanks for contributing! This project uses [pnpm](https://pnpm.io/installation) as its package manager.

## Install dependencies

```bash
pnpm install
```

## Run the dev server

Start the Next.js development server:

```bash
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> For the full local setup (Supabase and Stripe webhook forwarding), see the "Develop locally" section of the [README](./README.md).

## Run the checks

This project does not have a dedicated test suite. Before opening a pull request, make sure linting and the production build both pass:

```bash
pnpm run lint
pnpm run build
```
