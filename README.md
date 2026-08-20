# ModScan website

The dependency-free static product site for ModScan, Kaizōsha's keyboard-first
Node.js terminal interface for finding and managing project node_modules
directories.

The root route directly continues the expanded bottom-right ModScan product
cell from kaizosha.org. It retains the same frame, toolbar, status bar,
two-tone palette, constructed Kaizōsha mark, typography, drafting grid, and
motion. The expanded surface scrolls into accurate product, installation,
deletion, privacy, and open-source details without switching interfaces.

ModScan's tool-specific privacy notice is local to this site. Shared company
pages such as Contact and website Privacy use their canonical kaizosha.org
routes.

## Local preview

~~~sh
python3 tools/dev-server.py 5173
~~~

## Production build

~~~sh
./tools/build-site.sh
~~~

The build recreates <code>dist/client</code> and
<code>dist/server/index.js</code>. Generated output is ignored by Git.

## Routes

- <code>/</code> — permanently expanded ModScan product surface
- <code>/privacy</code> — ModScan's canonical tool privacy notice
- <code>/404.html</code> — unknown-route recovery
- <code>/site.webmanifest</code>, <code>/robots.txt</code>, and
  <code>/sitemap.xml</code> — product and search metadata

There is no package manager, frontend framework, TypeScript, runtime API,
database, account, analytics SDK, or build dependency. The explicit build
allowlist produces the static client and Cloudflare Worker entrypoint.

## Product source

ModScan itself is open source under the MIT License:

- Source: https://github.com/Kaizosha/modscan
- Package: https://www.npmjs.com/package/modscan
- License: https://github.com/Kaizosha/modscan/blob/main/LICENSE

## Shared design

Kaizōsha's main website is the source of truth for <code>BRAND.md</code>,
<code>DESIGN_SYSTEM.md</code>, the brand icon, and the shared CSS and
JavaScript foundations. This site commits synchronized copies so its repository
and Cloudflare deployment remain independent.

Product-specific behavior stays in
<code>assets/styles/product-continuation.css</code>,
<code>assets/scripts/product-continuation.js</code>, and the ModScan worker.
Visible branding always uses the constructed HTML/CSS mark. The raster icon is
reserved for favicon, Apple touch icon, manifest, and metadata use.

## Social preview

Root metadata expects the product card at
<code>assets/media/social/modscan-social-card.png</code>. The build copies that
file when present and otherwise succeeds without generating a placeholder.
