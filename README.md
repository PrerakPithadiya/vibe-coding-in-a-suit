# Vibe Coding in a Suit 👔

An interactive, responsive single-page scrolling web experience based on the presentation **"Agentic Coding Is Just Vibe Coding In A Suit"**.

This project translates a 9-slide deck exploring the psychological reality, humor, and architectural transition behind modern AI-assisted software engineering into a fluid, visual, and highly responsive web app.

## ✨ Features
*   **Slide-to-Slide Scroll Snapping:** Smooth, full-viewport scroll snapping replicating a physical presentation slide advance.
*   **Custom Hand-Drawn Whiteboard Aesthetics:** Recreated SVG marker highlights, hand-drawn wobbly arrows, grid/graph paper background patterns, and custom layout components (comparison tables, flowcharts, Venn diagram, and the "agentic iceberg").
*   **Adaptive Theme/Vibe Sections:** Rich color palettes shifting contextually based on the slide design guidelines (cream, rust-orange, slate-blue, ink-black, and sepia-brown).
*   **Responsive Desktop-First Design:** Optimized for 16:9 desktop presentation format, but gracefully degrading to mobile screens.
*   **Side-Dot Navigation:** Quick-access fixed indicators allowing scroll-linked state tracking and click-to-jump.

## 🛠️ Tech Stack
*   **Vite** (Next-generation frontend tooling)
*   **HTML5** (Semantic structures)
*   **CSS3** (Custom properties/variables, Flexbox/Grid, scroll snapping, wobbly SVG filters, micro-interactions)
*   **JavaScript** (IntersectionObserver for scroll tracking, side-dot active states, and entrance animations)

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18+)
*   npm

### Installation & Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/<YOUR-USERNAME>/vibe-coding-in-a-suit.git
   cd vibe-coding-in-a-suit
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite dev server:
   ```bash
   npm run dev
   ```
4. Open the link displayed in your terminal (usually `http://localhost:5173`) in your browser.

### Building for Production
To build a static production bundle:
```bash
npm run build
```
This generates the optimized output files in the `dist/` directory.

---

*Based on insights from Alex Dunlop.*
