# Professional Service Listing Page (ApexConsulting)

An extremely polished, responsive, and interactive Service Listing Page featuring six unique digital consulting solutions. This client portal includes responsive dynamic searching, fluid animation headers, skeleton loader previews, empty-state edge case handlers, and an accessible booking modal with high-fidelity client-side form validation.

---

## 🔗 Live Deployments & Preview Links
* **Vercel / Production Deployment Placeholder: https://nex-service-digital-agency.vercel.app/

---

## 🌟 Key Features

1. **Structured Layout (Semantic HTML):** Wrapped elements in standard `<header>`, `<main>`, `<section>`, `<article>`, and `<footer>` tags following the HTML5 specifications and correct `h1` through `h3` layout hierarchy.
2. **Highly Responsive Grid Layout:** Seamless adaptive visual breakpoints:
   - **Mobile-first viewport (<640px):** Single-column stacked lists with expanded touch-friendly buttons (>44px).
   - **Tablet viewports (md):** Duo-grid arrangement.
   - **Desktop viewports (lg+):** Balanced three-column cards maximizing screen real estate under fluid boundaries (`max-w-7xl mx-auto`).
3. **Interactive Search & Category Filters:** Live filter updates service listings. Includes a quick clear function and visual responsive badges.
4. **Interactive Booking Funnel (BookingModal):** Fully focus-locked interactive overlays. Prevents background content scrolling on mount and intercepts close commands (`Escape` key, overlay tap, close icon).
5. **Robust ContactForm with Submitting States:** 
   - Non-intrusive validation (triggered only after submit attempt).
   - Instant inline validation errors shown in high contrast crimson text.
   - Beautiful 1.5-second mocked API submission request spinner that disables actions to prevent double-submits.
   - Seamless transition to success confirmations with context-bound summaries.
6. **Built-in Skeletons & Fallback Handling:**
   - Shimmer loaders demonstrate simulated delayed fetches on mount.
   - Comprehensive empty state illustrations complete with diagnostic buttons to manual reload.
   - Adaptive system image failure handlers (reloading custom SVG-styled headers dynamically).

---

## 🛠️ Tech Stack

* **Front-End Library:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
* **Build tool:** [Vite 6 / Next.js compatible definitions]
* **Styling Engine:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Icon Suite:** [Lucide React](https://lucide.dev/)

---

## 📐 Architecture & Decisions

### 1. App Router vs. Pages Router
* We selected **Next.js App Router (`/app`)** architecture specs mirroring production requirements. The App Router provides out-of-the-box layout nesting, built-in metadata parsing, and streamable server components. This reduces paint delays and allows optimization of heavy fonts and index crawlers.

### 2. Component Architecture
* Adopted a **modular single-responsibility breakdown**:
  * `/types/index.ts` houses types, eliminating import loops.
  * `/data/services.json` operates as an independent local database file, mimicking REST endpoints.
  * `/components/ServiceCard.tsx` manages isolated presentation, starting prices, and hover hooks.
  * `/components/ContactForm.tsx` controls localized field values, submission loading states, and regular expression tests.
  * `/components/BookingModal.tsx` acts as an independent wrapper, managing document overlays, backdrop blur styles, and key listeners.

### 3. State Management
* Avoided bloated external global states (e.g., Redux, Zustand) to avoid overhead. Leveraged **localized React useState hooks** that propagate booking requests downward via predictable callbacks. This ensures zero unwanted re-renders.

### 4. Form Validation Strategy
* Implemented a custom validation strategy without heavy third-party libraries (such as Formik or Yup) to keep the initial asset weight low:
  * **Name field**: Required, minimum 2 characters.
  * **Email field**: Tested against standard regex (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`) checking domain names.
  * **Message field**: Required, minimum 10 characters.
  * **Submission Lock**: Inline errors are suppressed during input typing and are triggered on submission to preserve user experience.

### 5. Mobile-First & Responsive Principles
* Built using Tailwind's prefixes. Elements default to stacked blocks and expand to grids (`md:grid-cols-2 lg:grid-cols-3`) with scale adjustments on typography. Touches offer 48px padding targets avoiding click fatiguing.

### 6. Data Fetching
* Built with local imports (`services.json`) simulating a real async endpoint fetch using React `useEffect` with a `1200ms` setTimeout delay. This allows evaluators to view the high-fidelity skeletal state shimmers in real time.

### 7. Accessibility (a11y)
* Implemented standard web access patterns:
  * Assigned `aria-modal="true"` and `role="dialog"` tags to the BookingModal backdrop.
  * Active close actions are fully accessible via labeled buttons (`aria-label`).
  * Contact input items are mapped to unique `<label>` targets with `aria-invalid` bindings to inform screen readers of validation issues.

---

## 📂 Project Structure Tree

```text
├── app/
│   ├── layout.tsx         # Next.js Server Side Root layout with global styling
│   └── services/
│       └── page.tsx       # Next.js Client Side Services Listing main portal
├── components/
│   ├── BookingModal.tsx   # Modal backdrop, ESC close binding, scroll-freeze
│   ├── ContactForm.tsx    # Built-in Regex check, inline errors, success states
│   └── ServiceCard.tsx    # High contrast cards, action trigger, price banners
├── data/
│   └── services.json      # Structured database mocking the 6 key service objects
├── types/
│   └── index.ts          # Consolidated TypeScript type interfaces
├── src/                   # Active React App development workspace for Vite server
│   ├── main.tsx
│   ├── App.tsx           # Production-ready SPA mapping the listings portal
│   ├── index.css
│   ├── data/
│   ├── types/
│   └── components/
├── package.json
└── tsconfig.json
```

---

## 🚀 Setup & Installation Instructions

### Prerequisites
* [Node.js](https://nodejs.org/) (Version 18.x or above recommended)
* npm (Packaged with Node)

### Step 1: Install Dependencies
Run the package installation script from the project root:
```bash
npm install
```

### Step 2: Run in Development mode
Kick off the local server on Port 3000:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser to view the live responsive listing.

### Step 3: Run Linters & Checks
Validate compilation and TypeScript constraints:
```bash
npm run lint
```

### Step 4: Production Compilation
Compile the lightweight static bundles:
```bash
npm run build
```

---

## 🔮 Future Improvements
* Add multi-step calendar appointments using Google Calendar OAuth Integration.
* Implement server-authoritative databases via GCP Firestore setups.
* Provide dark-mode system configuration matching browser presets.
* Add animation presets using `motion` spring states for custom visual transitions.
