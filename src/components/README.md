# Components Structure

This project uses a single, stable convention for component organization:

- `layout/`: global layout primitives (`Navbar`, `Footer`, dividers, floating actions).
- `ui/`: reusable presentational pieces used across multiple domains.
- `sections/`: reusable page sections shared by multiple pages.
- `common/`: shared higher-level section building blocks.
- `marketing/`: marketing page-specific components.
- `development/`: development page-specific components.
- `banners/`, `promos/`, `hero/`: feature-specific shared component families.

## Rules

- Folder names are in English only.
- Page-specific components stay inside their domain folder (`marketing/`, `development/`).
- `ui/` should contain only truly shared components.
- If a component is used by only one domain/page, keep it out of `ui/`.

## Current Normalization

- Removed deprecated `components/desarrollo/` folder.
- Moved marketing plan card from `ui/` to `marketing/` to avoid cross-domain leakage.
