import { Collection } from './types';

// Fashion/Editorial specific image - Neutral/Abstract Texture
export const HERO_IMAGE = "https://images.unsplash.com/photo-1496293455970-f8581aae0e3c?q=80&w=2013&auto=format&fit=crop"; 
export const BRAND_NAME = "AETHER";

export const ABOUT_CONTENT = {
  title: "The Collective",
  text: "We are architects of fabric. Founded in the brutalist corners of Milan, Aether exists to strip away the noise. We do not chase trends; we chase the silence found between the seams.",
  // Group/Team shot
  image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop" 
};

export const MANIFESTO_TEXT = "Silence is the loudest form of luxury.";

export const LOCATIONS = [
  { city: "Milan", address: "Via Montenapoleone, 12", hours: "10:00 — 19:00" },
  { city: "Paris", address: "Rue Saint-Honoré, 245", hours: "11:00 — 20:00" },
  { city: "Tokyo", address: "Ginza 6-10-1", hours: "10:00 — 21:00" },
  { city: "New York", address: "Mercer Street, SoHo", hours: "11:00 — 19:00" }
];

export const FAQS = [
  { q: "Do you ship worldwide?", a: "The ether has no borders. We ship globally." },
  { q: "What is your sustainability policy?", a: "We produce in limited quantities to eliminate waste. Permanence over disposable trends." },
  { q: "How do I care for the fabrics?", a: "Natural fibers breathe. Dry clean only, store in darkness." }
];

export const CATEGORIES = [
  { id: 'cat1', title: 'Outerwear', image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=1974&auto=format&fit=crop' },
  { id: 'cat2', title: 'Knitwear', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1994&auto=format&fit=crop' },
  { id: 'cat3', title: 'Tailoring', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1780&auto=format&fit=crop' },
  { id: 'cat4', title: 'Accessories', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=1887&auto=format&fit=crop' }
];

export const COLLECTIONS: Collection[] = [
  {
    id: 'c1',
    title: "Urban Silence",
    season: "FW 2025",
    description: "Structure meets fluidity.",
    products: [
      { id: 'p1', name: 'Wool Trench', price: '€1,200', image: 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=1964&auto=format&fit=crop', category: 'Outerwear' },
      { id: 'p2', name: 'Cashmere Turtleneck', price: '€650', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1964&auto=format&fit=crop', category: 'Knitwear' },
      { id: 'p3', name: 'Pleated Trousers', price: '€480', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1964&auto=format&fit=crop', category: 'Bottoms' },
    ]
  },
  {
    id: 'c2',
    title: "Ethereal Layers",
    season: "SS 2025",
    description: "The intersection of nature and architecture.",
    products: [
      { id: 'p4', name: 'Draped Dress', price: '€1,850', image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1964&auto=format&fit=crop', category: 'Dresses' },
      { id: 'p5', name: 'Structure Blazer', price: '€920', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1964&auto=format&fit=crop', category: 'Tailoring' },
      { id: 'p6', name: 'Void Scarf', price: '€320', image: 'https://images.unsplash.com/photo-1520975661595-6453be3f7070?q=80&w=1887&auto=format&fit=crop', category: 'Accessories' },
    ]
  }
];