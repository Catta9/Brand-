# AETHER | Form & Void

> "Silence is the loudest form of luxury."

**AETHER** is a conceptual high-fashion e-commerce experience that blends brutalist aesthetics with high-end editorial design. The platform abandons traditional grid layouts in favor of an immersive horizontal scroll journey on desktop, while offering a highly optimized, editorial-style vertical experience on mobile devices.

At its core features **The Oracle**, an AI-powered personal stylist integrated directly into the shopping experience, capable of curating outfits based on abstract user contexts (mood, weather, occasion).

---

## ✨ Key Features

### 🖥️ Immersive UI/UX
- **Horizontal Scroll (Desktop):** A unique, side-scrolling navigation inspired by fashion runways and art galleries.
- **Mobile Editorial Layout:** A fully responsive vertical experience designed for smartphones, featuring touch-optimized navigation and specific mobile-only content (Categories Grid).
- **Cinematic Animations:** Custom "Illumination" text effects, smooth parallax scrolling, and fade-in transitions powered by Tailwind CSS.

### 🤖 AI Stylist ("The Oracle")
- **Powered by Google Gemini:** Uses the `gemini-2.5-flash` model via the `@google/genai` SDK.
- **Contextual Awareness:** Users can input abstract prompts (e.g., *"Opening night at a gallery in Berlin"* or *"Rainy Monday morning"*).
- **Structured Output:** The AI returns a JSON-structured styling guide containing an Outfit Name, Poetic Description, Key Items list, and specific Styling Tips.

### 🎨 Design System
- **Typography:** Uses *Cormorant Garamond* for editorial headers and *Montserrat* for functional UI text.
- **Palette:** A minimal brutalist scheme: Aether Black (`#0a0a0a`), Stone (`#e6e2dd`), and White.
- **Imagery:** Curated high-fashion editorial photography with "Form & Void" aesthetics.

---

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **AI Integration:** [Google GenAI SDK](https://www.npmjs.com/package/@google/genai)
- **Bundler:** (Assumed Vite/CRA based on structure)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- A Google AI Studio API Key (for the Stylist feature)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/aether-fashion.git
   cd aether-fashion
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add your Google Gemini API key:
   ```env
   REACT_APP_API_KEY=your_actual_api_key_here
   # OR for Vite:
   VITE_API_KEY=your_actual_api_key_here
   ```
   *Note: Ensure the API key handling in `services/geminiService.ts` matches your build tool's environment variable prefix.*

4. **Run the Development Server**
   ```bash
   npm start
   # or
   npm run dev
   ```

---

## 📂 Project Structure

```
/
├── components/
│   ├── HorizontalScroll.tsx  # Main desktop/mobile layout logic
│   └── StylistModal.tsx      # AI interaction UI
├── services/
│   └── geminiService.ts      # Google GenAI implementation
├── constants.ts              # Content, Image URLs, Configuration
├── types.ts                  # TypeScript Interfaces
├── App.tsx                   # Main Entry & Navigation
└── index.tsx                 # Root render
```

---

## 📸 Experience Overview

**Desktop:**
Users traverse a horizontal timeline starting from the "Hero" section, moving through the "Manifesto", "Collections" (presented in varied layouts: Tower, Cinematic, Detail), "Locations", and finally the "AI Oracle".

**Mobile:**
The layout shifts to a vertical stream. A dedicated "Categories" section appears. The navigation transforms into a sliding drawer (Hamburger menu), and the "Back to Top" interaction is optimized for thumb reachability.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

*Designed for the digital void. 2025.*
