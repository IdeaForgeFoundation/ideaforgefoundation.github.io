# Idea Forge Foundation - Brand & Design Style Guide

This style guide establishes visual and structural standards for the Idea Forge Foundation website (`idea-forge.org`) and related digital and print materials. Adherence to these guidelines ensures consistent branding, accessibility, and user experience across all digital properties and outreach initiatives.

---

## 1. Brand Identity & Mission

### Core Mission
To provide a safe and creative environment for individuals of all ages to develop, explore, and share knowledge through technology, tools, and materials in a collaborative, welcoming atmosphere that encourages innovation, learning, and creative expression.

### Guiding Principles
As members of the **Electronic Frontier Alliance (EFA)**, our digital and physical presence reflects:
* **Free Expression**
* **Security & User Autonomy**
* **Privacy & Anonymity**
* **Creativity & Open Innovation**
* **Access to Knowledge**

### Tone & Voice
* **Empowering & Welcoming:** Enthusiastic, approachable, inclusive, and encouraging to innovators of all skill levels.
* **Transparent & Community-Centric:** Honest, clear, non-corporate, and mission-focused.
* **Forward-Looking & Technical:** Practical, modern, precise, and tech-literate.

---

## 2. Color Palette

The color system is built around vibrant orange focal accents combined with clean neutrals and distinct palette accents for individual initiatives.

### Primary Brand Colors

| Color Role | Hex Code | Tailwind Utility Class | Usage |
| :--- | :--- | :--- | :--- |
| **Primary Brand Orange** | `#F97316` | `bg-orange-500` / `text-orange-500` | Primary CTAs, active nav links, brand accents |
| **Orange Hover / Active** | `#EA580C` | `bg-orange-600` / `text-orange-600` | Button hover states, links, highlighted text |
| **Orange Light Accent** | `#FB923C` | `bg-orange-400` / `border-orange-400` | Borders, hover highlights, subtle card borders |
| **Dark Neutral (Hero/Footer)** | `#111827` / `#111827` | `bg-gray-900` / `bg-stone-800` | Footers, dark hero background, dark cards |
| **Body Text Dark** | `#1F2937` / `#292524` | `text-gray-800` / `text-stone-800` | Primary readable page body text |
| **Light Background** | `#F9FAFB` / `#F5F5F4` | `bg-gray-50` / `bg-stone-50` | Page background, alternating section backgrounds |
| **Card White** | `#FFFFFF` | `bg-white` | Header, cards, modals, content containers |

### Initiative & Pillar Colors

To provide visual organization across programs, specific color accents are assigned to key pillars:

| Initiative / Program | Accent Color | Hex Code | Tailwind Class |
| :--- | :--- | :--- | :--- |
| **Makerspace Access / Spark Incubator** | Orange | `#F97316` | `bg-orange-100 text-orange-600` |
| **Anvil Accelerator / Oklathon** | Blue | `#3B82F6` | `bg-blue-100 text-blue-600` |
| **Open Innovation Lab (OIL) / Workshops** | Green | `#22C55E` | `bg-green-100 text-green-600` |
| **Supported User Groups** | Purple | `#A855F7` | `bg-purple-100 text-purple-600` |
| **Pay It Forward Scholarship** | Teal | `#14B8A6` | `bg-teal-100 text-teal-600` |
| **Maker Passport** | Rose | `#F43F5E` | `bg-rose-100 text-rose-600` |
| **Discord / Community** | Indigo | `#6366F1` | `bg-indigo-50 text-indigo-900` |

---

## 3. Typography

### Typefaces
* **Primary Body & Interface:** `'Inter', sans-serif` (Loaded via Google Fonts: `400`, `500`, `600`, `700`, `800` weights).
* **Headings (Campaign / Presentation Mode):** `'Lexend', sans-serif` (Used optionally for high-impact section headers).

### Type Scale & Hierarchy

```html
<!-- Main Page Title (H1) -->
<h1 class="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900">
  Forging Oklahoma's Future
</h1>

<!-- Section Heading (H2) -->
<h2 class="text-3xl md:text-4xl font-bold text-gray-900">
  Our Guiding Principles
</h2>

<!-- Card Title (H3) -->
<h3 class="text-xl font-bold text-gray-900 mb-2">
  Pay It Forward: Community-Supported Access
</h3>

<!-- Body Text -->
<p class="text-base text-gray-600 leading-relaxed">
  We are a non-profit foundation dedicated to empowering Oklahoma's innovators...
</p>

<!-- Small / Meta Text -->
<span class="text-sm text-gray-500">
  Idea Forge Foundation is a registered 501(c)(3) non-profit organization.
</span>
```

---

## 4. UI Components & CSS Patterns

### Call-To-Action (CTA) Buttons
Main primary buttons feature a subtle SVG background pattern overlay and hover translate animations:

```css
.cta-button {
    transition: all 0.3s ease;
    background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.15' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
}
.cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
```

```html
<!-- Primary CTA Button -->
<a href="membership.html" class="bg-orange-500 text-white font-semibold px-6 py-3 rounded-lg cta-button hover:bg-orange-600 inline-block">
    Become a Member
</a>

<!-- Secondary CTA Button -->
<a href="#involved" class="bg-gray-700 text-white font-semibold px-6 py-3 rounded-lg cta-button hover:bg-gray-600 inline-block">
    Get Involved
</a>
```

### Feature & Program Cards
Cards use clean white backgrounds, shadow elevations, rounded corners (`rounded-lg` or `rounded-2xl`), and subtle hover translations:

```html
<div class="bg-white p-8 rounded-lg shadow-lg feature-card flex flex-col h-full group">
    <div class="bg-orange-100 text-orange-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
        <svg class="w-8 h-8" ...></svg>
    </div>
    <h3 class="text-xl font-bold mb-3 group-hover:text-orange-600 transition-colors">Program Title</h3>
    <p class="text-gray-600 leading-relaxed flex-grow mb-4">Description text...</p>
    <span class="text-orange-600 font-bold group-hover:underline mt-auto inline-block">Learn More &rarr;</span>
</div>
```

### Header Navigation
* Sticky navigation bar with semi-transparent background and blur effect (`bg-white/80 backdrop-blur-lg sticky top-0 z-50`).
* Navigation links pointing to homepage sections from auxiliary pages must include the prefix `index.html#section-id` (e.g., `index.html#programs`).
* Dropdown submenus and mobile menus are driven by **Alpine.js**.

### Footer Standard
* Dark background (`bg-gray-900 text-white`).
* 3-column layout: About/Address, Quick Links, and Connect/Social Media.
* Official contact email: `foundation@idea-forge.org`.
* Mandatory copyright and tax-exempt notice: `&copy; 2026 Idea Forge Foundation. All rights reserved. Idea Forge Foundation is a registered 501(c)(3) non-profit organization.`

### Partner Logos
Partner logos are displayed with grayscale and reduced opacity by default, transitioning to full color on hover:

```css
.partner-logo {
    transition: all 0.3s ease;
    filter: grayscale(100%);
    opacity: 0.6;
}
.partner-logo:hover {
    filter: grayscale(0%);
    opacity: 1;
}
```

---

## 5. Front-End Technology Stack & Conventions

* **HTML5:** Semantic tags (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`).
* **Tailwind CSS:** Utility-first styling via CDN (`https://cdn.tailwindcss.com`).
* **Alpine.js:** Interactivity for dropdowns, mobile navigation, tab switching, and presentation mode.
* **Icons:** FontAwesome 4.7.0 (`fa fa-twitter`, `fa-instagram`) and clean Heroicons SVGs (`stroke-width="1.5"` or `"2"`).
* **Chart.js:** Data visualization for campaigns (`campaign.html`).
* **Marked.js:** Markdown rendering for policy (`policies.html`) and bylaws (`bylaws.html`) wrappers.

---

## 6. Print & Standalone Sub-Templates (Maker Passport)

For standalone print documents like the **Maker Passport** (`maker-passport-template.html`):
1. **Base Page Sizing:** Scaled for 4.25 x 5.5 inch (Quarter Letter) physical booklet pages.
2. **Page Count Rule:** The total page count must always remain a **multiple of 4** to ensure proper saddle-stitch booklet layout.
3. **Black & White High Contrast:** Pages are printed in black and white at small font sizes. Simple, high-contrast symbols (e.g., `○`, `📖`, `🎓`, `$`, `★`, `🔒`) must be used instead of complex color emojis.
4. **Access Level Legend Format:** Rendered immediately below space address as `<p><span class="bold">ACCESS LEVEL:</span> [Symbol] [Text]</p>`.
5. **Physical Stamp Alternative:** Explicitly accepts a selfie at the location as a valid alternative to a physical stamp.

---

## 7. SEO & Schema.org Structured Data

Every major HTML page includes JSON-LD structured data in the `<head>` section:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "NGO",
  "name": "Idea Forge Foundation",
  "url": "https://idea-forge.org",
  "logo": "https://idea-forge.org/images/Idea_Forge_Foundation_Logo.png",
  "description": "We are a non-profit foundation dedicated to empowering Oklahoma's innovators, entrepreneurs, and creators.",
  "sameAs": [
    "https://x.com/theforge46",
    "https://www.instagram.com/IDEAFORGEFOUNDATION"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Oklahoma City",
    "addressRegion": "OK",
    "addressCountry": "US"
  },
  "email": "foundation@idea-forge.org"
}
</script>
```

---

## 8. Summary Checklist for Code Changes

- [ ] Does the page use `Inter` font for text and standard Tailwind utility classes?
- [ ] Are primary action buttons using the `.cta-button` class with `bg-orange-500` / `hover:bg-orange-600`?
- [ ] Do auxiliary page links back to homepage sections use `index.html#section`?
- [ ] Is JSON-LD structured data included in the `<head>`?
- [ ] Is the header responsive with Alpine.js mobile menu support?
- [ ] Are all email references set to `foundation@idea-forge.org`?
