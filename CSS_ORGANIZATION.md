/* CSS ORGANIZATION STRUCTURE
   ========================================
   
   This file documents the clean CSS architecture used in this project.

   FILE HIERARCHY & PURPOSE:
   ========================================

   1. base.css
      - Global variables (colors, spacing, fonts, shadows, etc.)
      - Reset styles
      - Typography defaults
      - Global utility classes
      
   2. layout.css
      - Main layout grid/flex containers
      - Page structure and flow
      - Container sizing

   3. components.css
      - Reusable UI components (buttons, cards, forms)
      - Button variants (.btn, .btn-primary, .btn-afspraak, .btn-bel)
      - Generic component styles
      - Component hover/active states
      - Shared form styling
      
   4. heroes.css (NEW - Consolidated Hero Styles)
      - All hero section styles (base hero, hero-content, hero-image)
      - Hero typography (.hero, .hero h1, .hero h2, .hero p)
      - Hero-specific SVG overlays (.svg-olie-filter, .svg-rem-blokken)
      - Homepage hero grid layout (.hero-grid, .hero-left, .hero-right)
      - Hero reviews and badges
      - All hero responsive breakpoints
      - Organized by component type, then by breakpoint
      
   5. pages/home.css
      - Homepage stats section
      - Services grid
      - Appointment form styling
      - Page-specific layouts
      
   6. pages/*.css (apk.css, banden.css, etc.)
      - Individual page-specific styles
      - Page header variations
      
   7. cards.css
      - Card component variations
      - Card layouts and responsive behavior
      
   8. footer.css
      - Footer styling
      - Footer responsive behavior

   IMPORT ORDER (Critical - Cascade):
   ========================================
   
   CSS files are imported in this specific order to ensure proper cascade:
   
   1. base.css          → Variables, resets, defaults
   2. layout.css        → Layout structures
   3. components.css    → Generic components
   4. heroes.css        → ALL hero-related styles (NEW)
   5. pages/*.css       → Page-specific overrides
   6. footer.css        → Footer styles
   7. cards.css         → Card component styles

   IMPORT LOCATION:
   - src/js/main.js (homepage + all pages)
   - src/js/apk.js, src/js/banden.js, etc. (individual pages)

   MIGRATION NOTES:
   ========================================
   
   What Moved to heroes.css:
   ✓ All .hero* classes from components.css
   ✓ All .hero* classes from home.css
   ✓ All @media queries for hero sections
   ✓ SVG overlay styles
   ✓ Hero typography

   What Stayed:
   ✓ .hero-buttons in components.css (they're button components)
   ✓ .container-hero-btn-sub in components.css
   ✓ Button variants in components.css
   
   Benefits:
   ✓ Single source of truth for all hero styles
   ✓ Easier to maintain and modify hero sections
   ✓ Better code organization and searchability
   ✓ Cleaner, more maintainable CSS architecture
   ✓ Reduced CSS duplication
*/
