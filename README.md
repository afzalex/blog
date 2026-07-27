# Afzal, In Plain Text

[![Afzal, In Plain Text home hero](./src/assets/home-hero-v2.webp)](https://blog.afzalex.com/)

![Astro 6](https://img.shields.io/badge/Astro-6-ff5d01?style=flat-square&logo=astro&logoColor=white)
![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)
![MDX](https://img.shields.io/badge/Content-MDX-1b1f24?style=flat-square&logo=mdx&logoColor=white)
![Node.js 24](https://img.shields.io/badge/Node.js-24-5fa04e?style=flat-square&logo=nodedotjs&logoColor=white)
![MIT License](https://img.shields.io/badge/License-MIT-111827?style=flat-square)

**Live site:** [blog.afzalex.com](https://blog.afzalex.com/)

This repository contains Mohammad Afzal's personal engineering blog. It is a
static Astro site for practical notes about software engineering, cloud
infrastructure, automation, networking, self-hosting, and reliable systems.

The project began with the Quiet Pages Astro theme and has since been adapted
into a personal publication with a custom home page, profile, technical
articles, contact form, metadata, and deployment workflow.

## What the site includes

- A responsive editorial home page with a featured article and latest-post
  filters
- MDX articles validated through an Astro content collection
- Archive search, category and tag filters, and client-side pagination
- Category, tag, and author pages
- Article tables of contents, reading progress, code-copy controls, sharing
  links, related posts, and previous/next navigation
- A detailed About page for Mohammad Afzal
- A contact form protected by Cloudflare Turnstile and submitted to a
  Cloudflare Worker
- RSS, XML sitemap, robots.txt, canonical URLs, Open Graph metadata, Twitter
  card metadata, and JSON-LD
- Light and dark themes with a stored user preference
- Self-hosted Inter, Fraunces, and JetBrains Mono fonts
- Responsive image generation through Astro's asset pipeline
- Static deployment to GitHub Pages at `blog.afzalex.com`

Comments and the newsletter UI are intentionally hidden until their backends
are implemented.

## Technology

- [Astro 6](https://astro.build/)
- [Tailwind CSS 4](https://tailwindcss.com/) through the Vite plugin
- [MDX](https://mdxjs.com/)
- Astro content collections
- Prettier
- GitHub Pages
- Cloudflare Turnstile and a separate Cloudflare Worker for contact-form
  processing

## Requirements

- Node.js 24, matching the CI workflows
- npm

## Local development

Install the exact dependency versions from `package-lock.json`:

```bash
npm ci
```

Start the development server:

```bash
npm run dev
```

Astro listens on all local interfaces at port `4321`. Open
`http://localhost:4321`.

Build the production site:

```bash
npm run build
```

Preview the generated `dist/` directory:

```bash
npm run preview
```

Format the repository:

```bash
npm run format
```

There is currently no separate lint or automated test script. The production
build is the primary repository-wide validation.

## Environment variables

The site has working production defaults, but production builds should set the
canonical URL explicitly.

| Variable                    | Purpose                                                                       | Default                                          |
| --------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------ |
| `SITE_URL`                  | Preferred canonical origin used by Astro, feeds, metadata, and generated URLs | `https://blog.afzalex.com` in `astro.config.mjs` |
| `PUBLIC_SITE_URL`           | Alternative site-origin variable when `SITE_URL` is not set                   | Project fallback                                 |
| `BASE_PATH`                 | URL base for static hosting                                                   | `/`, or a GitHub repository-derived path         |
| `PUBLIC_CONTACT_ENDPOINT`   | Cloudflare Worker endpoint that accepts contact-form submissions              | `https://blog.afzalex.workers.dev`               |
| `PUBLIC_TURNSTILE_SITE_KEY` | Public Turnstile widget key rendered by the browser                           | The configured production site key               |
| `GITHUB_REPOSITORY`         | Supplied by GitHub Actions and used to infer a repository base path           | Empty locally                                    |

For the production domain, use:

```bash
SITE_URL=https://blog.afzalex.com
PUBLIC_SITE_URL=https://blog.afzalex.com
BASE_PATH=/
npm run build
```

Variables prefixed with `PUBLIC_` are included in browser-facing code and must
never contain secrets. The Turnstile secret and email-delivery credentials
belong in the Cloudflare Worker environment, not in this repository.

## Project structure

```text
.
├── .gitea/workflows/test.yml       # Gitea build validation
├── .github/workflows/deploy.yml    # GitHub Pages deployment
├── public/
│   ├── CNAME                       # blog.afzalex.com
│   └── fonts/                      # self-hosted WOFF2 fonts
├── src/
│   ├── assets/                     # shared images and profile photo
│   ├── components/                 # reusable Astro components
│   ├── content/blog/               # one folder per MDX article
│   ├── layouts/BaseLayout.astro    # global document and SEO shell
│   ├── lib/blog-data.js            # site, author, category, and tag data
│   ├── lib/contact-config.js       # public contact-form configuration
│   ├── pages/                      # file-based routes and XML/text endpoints
│   ├── content.config.js           # article collection schema
│   └── styles.css                  # Tailwind import, tokens, and global styles
├── astro.config.mjs
├── package.json
└── preview.webp
```

## Writing a new article

Create a folder under `src/content/blog/`. The folder name becomes the article
slug:

```text
src/content/blog/my-article/
├── index.mdx
└── cover.webp
```

Start `index.mdx` with validated frontmatter:

```yaml
---
title: "My article title"
excerpt: "A concise summary used in cards, feeds, and metadata."
date: 2026-07-28
readingTime: 7
category: "engineering"
tags: ["tools", "web"]
author: "mohammad-afzal"
thumbnail: ./cover.webp
featured: false
---
```

### Frontmatter reference

| Field         | Required | Notes                                                            |
| ------------- | -------- | ---------------------------------------------------------------- |
| `title`       | Yes      | Article heading and metadata title                               |
| `excerpt`     | Yes      | Used in cards, feeds, descriptions, and social metadata          |
| `date`        | Yes      | Publication date; parsed as a date                               |
| `updated`     | No       | Last substantial update date                                     |
| `readingTime` | Yes      | Positive whole number in minutes                                 |
| `category`    | Yes      | Must match a category slug in `src/lib/blog-data.js`             |
| `tags`        | No       | Tag slugs from `src/lib/blog-data.js`; defaults to an empty list |
| `author`      | Yes      | Must match an author slug in `src/lib/blog-data.js`              |
| `thumbnail`   | Yes      | Local image imported through Astro's content pipeline            |
| `featured`    | No       | Marks the preferred home-page feature; defaults to `false`       |
| `imageCredit` | No       | Caption, author, author URL, source, and source URL              |

Keep article-specific images beside `index.mdx` and reference them with
relative paths. Use descriptive alt text in Markdown; use empty alt text only
for decorative images.

If more than one article has `featured: true`, the newest matching article in
the sorted collection wins. Prefer keeping only one featured article.

## Site configuration

Common changes are centralized:

- `src/lib/blog-data.js`
  - site name and description
  - author profiles
  - categories and tags
  - article sorting and related-post logic
- `src/lib/contact-config.js`
  - public Worker endpoint
  - contact address
  - Turnstile action and site key
- `src/content.config.js`
  - article schema and defaults
- `src/components/Header.astro`
  - primary navigation, search panel, mobile menu, and theme toggle
- `src/components/Footer.astro`
  - social links and footer navigation
- `src/styles.css`
  - fonts, colors, design tokens, prose, and responsive behavior

## Contact form

The contact page is static, but submission is handled outside this repository:

```text
Browser form
  → Cloudflare Turnstile token
  → Cloudflare Worker
  → server-side Siteverify validation
  → Cloudflare Email Service binding
  → verified destination inbox
```

The browser refuses to submit without a Turnstile token. The Worker must still
verify the token server-side, check the expected hostname and action, validate
the form fields, and enforce its own abuse controls.

The action currently expected by the front end is `turnstile-spin-v2`.
Changing it requires a matching Worker change.

## Generated routes

Important routes include:

| Route                | Source                              |
| -------------------- | ----------------------------------- |
| `/`                  | `src/pages/index.astro`             |
| `/blog`              | `src/pages/blog/index.astro`        |
| `/blog/[slug]`       | `src/pages/blog/[slug].astro`       |
| `/categories/[slug]` | `src/pages/categories/[slug].astro` |
| `/tags/[slug]`       | `src/pages/tags/[slug].astro`       |
| `/authors/[slug]`    | `src/pages/authors/[slug].astro`    |
| `/about`             | `src/pages/about.astro`             |
| `/contact`           | `src/pages/contact.astro`           |
| `/rss.xml`           | `src/pages/rss.xml.js`              |
| `/sitemap.xml`       | `src/pages/sitemap.xml.js`          |
| `/robots.txt`        | `src/pages/robots.txt.js`           |

`src/pages/blog/send-custom-domain-email-from-gmail-for-free.astro` is a
compatibility redirect for an older article URL.

## Deployment

`.github/workflows/deploy.yml` deploys pushes to `main` to GitHub Pages. It:

1. installs Node.js 24;
2. runs `npm ci`;
3. builds with the production site URL and root base path;
4. uploads `dist/`;
5. deploys the Pages artifact.

`public/CNAME` assigns the generated site to `blog.afzalex.com`.

`.gitea/workflows/test.yml` runs `npm ci` and `npm run build` for pushes and
pull requests. It validates the site but does not deploy it.

## Before publishing

Run:

```bash
npm run build
```

Then check:

- the new article is present in `dist/blog/`;
- internal links resolve;
- images render at desktop and mobile widths;
- the featured article is intentional;
- RSS, sitemap, canonical, and social URLs use `https://blog.afzalex.com`;
- screenshots contain no private tokens, credentials, or unrelated personal
  information;
- the contact page still completes Turnstile and reaches the Worker.

## License

The project retains the original [MIT License](./LICENSE) and attribution from
the Quiet Pages theme.
