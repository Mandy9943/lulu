# Lulu | Cocina bonita para todos los dias

Static storefront for Lulu kitchen products. The project runs directly in the browser without a build step.

## Project Structure

- `index.html` - Main storefront entrypoint.
- `src/styles/styles.css` - Responsive styling and layout.
- `src/data/catalogo-productos.js` - Product catalog data and product image paths.
- `src/js/app.js` - Product rendering, detail view, lightbox, cart, and WhatsApp checkout logic.
- `assets/hero/` - Active hero imagery used by the storefront.
- `productos/` - Product photos referenced by the catalog data.

## Removed Cleanup Artifacts

The old `stitch-artifacts/` folder and unused `assets/images/` files were removed because they were reference/generated assets and were not loaded by the live page.

## Run

Open `index.html` directly in a browser. No build step is required.
