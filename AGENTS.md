# Guidelines for Autonomous Agents and AI Contributors

Welcome! This file provides essential guidelines, architecture overview, and project rules for AI agents and human contributors working on the Idea Forge Foundation codebase.

---

## 1. Project Overview & Tech Stack

The Idea Forge Foundation website (`idea-forge.org`) is a **static website** hosted on GitHub Pages.

* **HTML5 / CSS:** Semantic HTML markup with [Tailwind CSS](https://tailwindcss.com/) loaded via CDN or local build.
* **JavaScript Framework:** [Alpine.js](https://alpinejs.dev/) for minimal state management (navigation menus, dropdowns, tabs, presentation mode).
* **Charts & Data:** [Chart.js](https://www.chartjs.org/) for data visualizations on `campaign.html`.
* **Markdown Rendering:** `Marked.js` for rendering `bylaws.md` and `policies.md` dynamically on `bylaws.html` and `policies.html`.
* **Testing:** Node.js Playwright (`@playwright/test`) in `tests/` directory for visual regression and page verification.

---

## 2. Style Guide & Branding Standards

All code and content additions **MUST** strictly comply with the project's style guide:
👉 **See [`STYLE_GUIDE.md`](STYLE_GUIDE.md) for full visual and structural specifications.**

### Key Rules to Remember:
1. **Primary Brand Colors:** Primary Orange (`bg-orange-500` / `#F97316`), Dark Neutral (`bg-gray-900` / `#111827`), Light Background (`bg-gray-50` / `#F9FAFB`).
2. **CTA Buttons:** Must use the `.cta-button` class with standard Tailwind background utilities (e.g., `bg-orange-500 hover:bg-orange-600`).
3. **Cross-Page Links:** Auxiliary page navigation links pointing to homepage anchor sections MUST include the `index.html` prefix (e.g., `index.html#programs`).
4. **Official Contact Email:** `foundation@idea-forge.org`.
5. **SEO & Structured Data:** Ensure `application/ld+json` Schema.org tags are maintained in HTML document `<head>` sections.

---

## 3. Printable Sub-Templates (Maker Passport)

For `maker-passport-template.html`:
* Base CSS is scaled for 4.25 x 5.5 inch (Quarter Letter) booklet pages.
* The total page count **MUST always remain a multiple of 4** for saddle-stitch imposition printing.
* Uses simple black-and-white high contrast symbols (`○`, `📖`, `🎓`, `$`, `★`, `🔒`) instead of emojis.

---

## 4. Testing & Verification

* Run `npm test` to execute Playwright frontend tests.
* Delete any temporary local Playwright scripts or artifacts prior to committing code.
