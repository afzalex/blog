# Repository instructions for coding agents

## Scope

These instructions apply to the entire repository.

This is the source for **Afzal, In Plain Text**, Mohammad Afzal's personal
engineering blog at `https://blog.afzalex.com`. It is an Astro 6 static site,
not a generic demo theme. Optimize changes for this publication and preserve
its existing design, content, metadata, and deployment behavior.

## Working agreement

- Tell the user what files and behavior you intend to change before modifying
  the repository.
- Inspect the relevant files before proposing or implementing a change.
- Do not deploy, publish, commit, push, open a pull request, or change external
  services unless the user explicitly asks.
- Preserve unrelated user changes in a dirty worktree.
- Keep requested edits narrowly scoped. Do not bundle cleanup, content
  rewrites, dependency upgrades, or visual redesigns into an unrelated task.
- Use `rg` and `rg --files` for repository searches.
- Use `apply_patch` for manual source edits.
- Never expose credentials, private tokens, Turnstile secrets, SMTP
  credentials, or private email-routing details in source, logs, screenshots,
  documentation, or responses.

## Project overview

- Framework: Astro 6
- Styling: Tailwind CSS 4 through `@tailwindcss/vite`, plus global CSS
- Content: MDX in an Astro content collection
- Output: static files in `dist/`
- Package manager: npm with a committed `package-lock.json`
- CI runtime: Node.js 24
- Production host: GitHub Pages
- Domain: `blog.afzalex.com`
- Contact processing: Cloudflare Turnstile plus a separate Cloudflare Worker

The site intentionally uses mostly static HTML. Client-side JavaScript exists
only for focused interactions such as search, filters, pagination, dark mode,
reading progress, copy buttons, navigation panels, and the contact form.

## Repository map

- `src/content/blog/<slug>/index.mdx`
  - article body and frontmatter
  - the containing folder becomes the route slug
- `src/content.config.js`
  - authoritative article schema
- `src/lib/blog-data.js`
  - site metadata, authors, categories, tags, sorting, featured article,
    related articles, and adjacent navigation
- `src/lib/contact-config.js`
  - public contact-form configuration only
- `src/pages/`
  - page routes plus RSS, sitemap, and robots endpoints
- `src/pages/blog/[slug].astro`
  - article rendering, metadata, table of contents, sharing, reading progress,
    code-copy controls, related posts, and adjacent navigation
- `src/layouts/BaseLayout.astro`
  - shared document structure, canonical links, Open Graph, Twitter cards,
    JSON-LD, fonts, header, and footer
- `src/components/`
  - reusable Astro components
- `src/styles.css`
  - Tailwind import, design tokens, global styles, and prose styles
- `public/CNAME`
  - production custom domain
- `.github/workflows/deploy.yml`
  - GitHub Pages deployment from `main`
- `.gitea/workflows/test.yml`
  - build validation for pushes and pull requests

## Commands

Use the locked dependency graph:

```bash
npm ci
```

Development:

```bash
npm run dev
```

Production validation:

```bash
npm run build
```

Production preview:

```bash
npm run preview
```

Formatting:

```bash
npm run format
```

There is no lint script or automated test suite. Do not claim tests passed when
only the build was run. For documentation-only changes, prefer:

```bash
npx prettier --check README.md AGENTS.md
```

For source, configuration, content, or dependency changes, run at minimum:

```bash
npm run build
```

## Content rules

The schema in `src/content.config.js` is authoritative. Every article requires:

- `title`
- `excerpt`
- `date`
- positive integer `readingTime`
- `category`
- `author`
- local `thumbnail`

`tags` defaults to an empty list. `updated`, `imageCredit`, and `featured` are
optional.

When adding or editing an article:

- Store it at `src/content/blog/<slug>/index.mdx`.
- Keep article-specific images in the same folder.
- Use a lowercase, stable, hyphenated slug.
- Use an author, category, and tag slug already defined in
  `src/lib/blog-data.js`, or update that central data intentionally.
- Use `mohammad-afzal` for Afzal's first-person technical articles unless the
  user specifies another author.
- Keep excerpts concise and useful as metadata.
- Use descriptive alt text for meaningful images.
- Preserve image-credit data when the image still requires attribution.
- Do not fabricate experience, quotations, results, dates, personal details,
  or technical findings.
- Do not silently rewrite existing articles or remove legacy sample content.
- Avoid publishing credentials or account-specific secrets in screenshots and
  code samples. Redact sensitive values while keeping tutorials useful.
- Prefer one `featured: true` article at a time.

The repository still contains legacy Quiet Pages sample authors and articles.
They are existing content, not permission to invent more personal details or
to delete them during unrelated work.

## Configuration rules

### Site origin and base path

Production builds must resolve canonical, feed, sitemap, robots, and social
URLs to `https://blog.afzalex.com`.

Relevant configuration is split between:

- `astro.config.mjs`
- `src/lib/blog-data.js`
- `.github/workflows/deploy.yml`
- `public/CNAME`

If changing the production URL or base path, inspect and update every relevant
location together. Prefer `SITE_URL` as the build-time source of truth.

The fallback origins in `astro.config.mjs` and `src/lib/blog-data.js` are not
currently identical. Do not introduce another fallback or depend on the
difference. Set `SITE_URL` explicitly in production.

### Contact form

The contact page posts to a separate Cloudflare Worker. The public front-end
configuration is in `src/lib/contact-config.js`.

Preserve these security properties:

- the browser requires a Turnstile token before sending;
- the Worker must perform canonical server-side Siteverify validation;
- the Worker must verify the expected hostname and action;
- the action is currently `turnstile-spin-v2`;
- form fields have length limits and must also be validated by the Worker;
- the Worker, not this repository, stores `TURNSTILE_SECRET`;
- secrets must never use a `PUBLIC_` environment variable;
- CORS and allowed origins must remain restricted to intended site origins;
- a successful browser widget alone must never be treated as authorization.

Do not change the Worker endpoint, Turnstile site key, expected action, sender,
or recipient assumptions without explaining the coordinated external change
the user must make.

### Disabled features

- `src/components/Newsletter.astro` is deliberately wrapped in
  `class="hidden"` and has no real subscription backend.
- The comments placeholder in `src/pages/blog/[slug].astro` is deliberately
  hidden and has no authentication or persistence backend.

Do not expose either feature merely by removing `hidden`. Implement and verify
a real backend, privacy behavior, error states, and abuse protection only when
the user explicitly asks to enable the feature.

## Astro and JavaScript conventions

- Prefer `.astro` components and static rendering.
- Do not introduce React, Vue, another UI runtime, or a new dependency when
  Astro, HTML, CSS, or a small script is sufficient.
- Keep client scripts local to the component or route that needs them.
- Preserve progressive enhancement where practical.
- Do not convert content that should be crawlable into client-only rendering.
- Keep component responsibilities focused.
- Use Astro's `Image` component or content image pipeline for local images.
- Include dimensions or stable aspect ratios to prevent layout shift.
- Do not add hydration directives without a concrete need.

## Design and accessibility

- Preserve the existing editorial visual language, typography, spacing, and
  light/dark tokens unless redesign is the task.
- Use semantic landmarks and native controls.
- Maintain one clear `h1` per page and logical heading order.
- Every form control needs a visible or accessible label.
- Icon-only controls and links need descriptive accessible names.
- Interactive elements must work with a keyboard and retain visible focus.
- Search and mobile panels must continue to update `aria-expanded`, close with
  Escape, and return focus appropriately.
- Do not rely on color alone to convey state.
- Respect `prefers-reduced-motion`.
- Keep contrast readable in both light and dark themes.

## SEO and generated-output invariants

Preserve:

- unique titles and descriptions;
- canonical URLs;
- Open Graph and Twitter card tags;
- article `BlogPosting` JSON-LD;
- person JSON-LD on the About page;
- RSS at `/rss.xml`;
- sitemap at `/sitemap.xml`;
- robots.txt with the production sitemap URL;
- crawlable category, tag, author, and article links.

When changing routing, metadata, site origin, authors, categories, tags, or
article slugs, inspect the feed, sitemap, robots, structured data, share URLs,
redirect route, and internal links for downstream effects.

`src/pages/blog/send-custom-domain-email-from-gmail-for-free.astro` preserves an
older article URL. Do not remove it without checking inbound-link and redirect
requirements.

## Dependencies and generated files

- Do not edit `node_modules/`, `.astro/`, or `dist/`.
- Do not commit generated output unless the repository policy changes.
- Use `npm install <package>` only when a dependency is genuinely required so
  both `package.json` and `package-lock.json` stay synchronized.
- Avoid dependency upgrades during unrelated work.
- Keep the self-hosted fonts in `public/fonts/`; do not add external font
  requests without explicit approval.
- The package name, changelog, and MIT license still reflect the Quiet Pages
  origin. Preserve the existing license and attribution unless the user asks
  for a deliberate legal/packaging change.

## Validation checklist

Choose checks proportional to the change:

### Documentation only

- `npx prettier --check README.md AGENTS.md`
- inspect Markdown links and commands against the current repository

### Article or metadata changes

- `npm run build`
- confirm the expected route exists under `dist/`
- inspect the article title, excerpt, author, date, image, table of contents,
  related links, and social metadata

### Layout, component, style, or client-script changes

- `npm run build`
- test affected pages at mobile and desktop widths
- test keyboard interaction and visible focus
- test both light and dark themes
- check the browser console for errors

### Contact-form changes

- all layout/component checks above
- valid Turnstile submission
- missing, expired, and failed Turnstile states
- Worker error response and network failure
- button disabled/reset behavior
- allowed production and local hostnames
- no secret or token exposure

### Deployment changes

- verify the GitHub Pages artifact is still `dist`
- verify `SITE_URL`, `PUBLIC_SITE_URL`, and `BASE_PATH`
- verify `public/CNAME`
- do not trigger deployment unless explicitly requested

## Completion report

When handing work back:

- summarize the behavior changed;
- list the files changed;
- report the exact checks run and their outcomes;
- call out checks not run;
- mention any required external Cloudflare, DNS, GitHub Pages, or Worker step;
- never describe an unverified or unperformed action as complete.
