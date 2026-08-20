# ModScan Site Architecture

ModScan uses the same dependency-free static architecture and visual contract
as kaizosha.org.

## Public routes

| Route | Role | Page family |
| --- | --- | --- |
| <code>/</code> | Expanded ModScan product continuation | <code>directory</code> |
| <code>/privacy</code> | Canonical ModScan tool privacy notice | <code>document</code> |
| <code>/404.html</code> | Unknown-route recovery | <code>error</code> |

## Root experience

The Kaizōsha homepage expands ModScan in the bottom-right physical product cell
before the scroll handoff. The destination renders that settled state
immediately:

- the shared frame, top and bottom bars, drafting grid, tokens, and compact
  constructed Kaizōsha mark;
- the same active-cell grid geometry without an entry, exit, or slot
  transition;
- ModScan's product lead, npm installation, safety warning, privacy behavior,
  and source links;
- one accessible scroll region that continues through the complete product
  content without opening a second interface.

The main site may pass the active product slot as
<code>?slot=top-left</code>, <code>?slot=top-right</code>,
<code>?slot=bottom-left</code>, or <code>?slot=bottom-right</code>. The worker
renders that slot into the returned root HTML before first paint. The small
plain-JavaScript controller provides the same swap as a static-hosting fallback
and removes the temporary query parameter. Direct visits use ModScan's canonical
bottom-right slot.

## Shared layers

- <code>assets/styles/brand.css</code> and
  <code>assets/styles/markdown.css</code> are synchronized from the Kaizōsha
  shared-design source.
- <code>assets/styles/product-continuation.css</code> adds only the generic
  long active-cell continuation and terminal-oriented content primitives.
- <code>assets/scripts/site-motion.js</code> and
  <code>document-navigation.js</code> are shared progressive enhancements.
- <code>assets/scripts/product-continuation.js</code> handles the static-host
  product-slot fallback and URL cleanup.

No product-specific content, classes, filenames, or behavior from sibling sites
is part of the ModScan implementation.

## Build and hosting

<code>tools/build-site.sh</code> recreates <code>dist</code> from an explicit
allowlist. Public files go to <code>dist/client</code>, and
<code>tools/sites-static-worker.js</code> becomes
<code>dist/server/index.js</code>.

The worker handles HTTPS, canonical redirects, GET and HEAD restriction, cache
policy, security headers, 404 no-index headers, and server-side product-slot
rendering. Static assets are served through the Cloudflare <code>ASSETS</code>
binding configured in <code>wrangler.jsonc</code>.

There is no frontend dependency, package manager, TypeScript, framework,
runtime API, database, account, or analytics service.

## Safety boundary

The website documents the ModScan 1.0.1 source behavior rather than simulating
filesystem access. It never runs ModScan in the browser. The permanent deletion
warning appears in the initial product surface, the detailed product content,
and the privacy notice.
