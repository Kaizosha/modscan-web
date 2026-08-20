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
<code>?slot=bottom-left</code>, or <code>?slot=bottom-right</code>. The
synchronous plain-JavaScript controller applies that slot during the initial
document render and removes the temporary query parameter. Direct visits use
ModScan's canonical bottom-right slot.

## Shared layers

- <code>assets/styles/brand.css</code> and
  <code>assets/styles/markdown.css</code> are synchronized from the Kaizōsha
  shared-design source.
- <code>assets/styles/product-continuation.css</code> adds only the generic
  long active-cell continuation and terminal-oriented content primitives.
- <code>assets/scripts/site-motion.js</code> and
  <code>document-navigation.js</code> are shared progressive enhancements.
- <code>assets/scripts/product-continuation.js</code> applies the incoming
  product slot and cleans the temporary URL state.

No product-specific content, classes, filenames, or behavior from sibling sites
is part of the ModScan implementation.

## Cloudflare Pages hosting

The repository root is the complete public site. Cloudflare Pages connects to
the Git repository with framework preset <code>None</code>, production branch
<code>main</code>, no build command, and build output directory
<code>.</code>. A push to <code>main</code> publishes the committed static files
directly. Pages supplies extensionless HTML routing and the custom
<code>404.html</code>; <code>_redirects</code> canonicalizes
<code>/privacy/</code>, and <code>_headers</code> supplies the security, cache,
language, and no-index policies.

There is no frontend dependency, package manager, TypeScript, framework,
runtime API, database, account, or analytics service.

## Safety boundary

The website documents the ModScan 1.0.1 source behavior rather than simulating
filesystem access. It never runs ModScan in the browser. The permanent deletion
warning appears in the initial product surface, the detailed product content,
and the privacy notice.
