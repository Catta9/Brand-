import React, { useState, useEffect } from 'react';
import HorizontalScroll from './components/HorizontalScroll';
import StylistModal from './components/StylistModal';

const App: React.FC = () => {
  const [isStylistOpen, setIsStylistOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBackToStart, setShowBackToStart] = useState(false);

  // Track scroll to show/hide "Back to Start" button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowBackToStart(true);
      } else {
        setShowBackToStart(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const MobileMenuDrawer = () => (
    <div 
      className={`fixed inset-0 bg-aether-black z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="flex flex-col h-full p-8">
        <div className="flex justify-between items-center mb-12">
          <span className="font-serif text-2xl font-bold">A.</span>
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="text-sm uppercase tracking-widest text-white/50 hover:text-white"
          >
            Close
          </button>
        </div>

        <nav className="flex flex-col gap-8">
          <button onClick={() => { setIsMenuOpen(false); }} className="text-4xl font-serif italic text-left hover:text-white/70 transition-colors">Collections</button>
          <button onClick={() => { setIsMenuOpen(false); setIsStylistOpen(true); }} className="text-4xl font-serif italic text-left hover:text-white/70 transition-colors">The Stylist</button>
          <button onClick={() => { setIsMenuOpen(false); }} className="text-4xl font-serif italic text-left hover:text-white/70 transition-colors">Manifesto</button>
          <button onClick={() => { setIsMenuOpen(false); }} className="text-4xl font-serif italic text-left hover:text-white/70 transition-colors">Account</button>
        </nav>

        <div className="mt-auto">
          <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2">Social</p>
          <div className="flex gap-4 text-sm text-white/60">
            <span>IG</span>
            <span>TW</span>
            <span>LI</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Simple fixed navigation
  const Navigation = () => (
    <nav className="fixed top-0 left-0 w-full z-40 flex justify-between items-center p-4 md:p-8 pointer-events-none mix-blend-difference text-white">
      <div className="pointer-events-auto cursor-pointer" onClick={scrollToTop}>
        <span className="font-serif text-xl md:text-2xl font-bold tracking-tighter">A.</span>
      </div>
      
      {/* Desktop Menu */}
      <div className="pointer-events-auto hidden md:flex gap-12">
        <button onClick={() => setIsStylistOpen(true)} className="text-xs uppercase tracking-widest hover:line-through decoration-white">
          Stylist
        </button>
        <button className="text-xs uppercase tracking-widest hover:line-through decoration-white">
          Menu
        </button>
        <button className="text-xs uppercase tracking-widest hover:line-through decoration-white">
          Cart (0)
        </button>
      </div>

      {/* Mobile Hamburger */}
      <div className="pointer-events-auto md:hidden">
        <button onClick={() => setIsMenuOpen(true)} className="p-2 space-y-1.5 group">
           <div className="w-6 h-0.5 bg-white transition-all group-hover:w-4 ml-auto"></div>
           <div className="w-6 h-0.5 bg-white transition-all"></div>
           <div className="w-6 h-0.5 bg-white transition-all group-hover:w-4 ml-auto"></div>
        </button>
      </div>
    </nav>
  );

  return (
    <div className="bg-aether-black min-h-screen text-aether-white antialiased selection:bg-white selection:text-black">
      <Navigation />
      <MobileMenuDrawer />
      
      {/* 
        The main scroll interaction. 
        Pass handler to open modal from inside the scroll flow. 
      */}
      <HorizontalScroll onOpenStylist={() => setIsStylistOpen(true)} />

      {/* 
        Modal sits on top of everything.
      */}
      <StylistModal 
        isOpen={isStylistOpen} 
        onClose={() => setIsStylistOpen(false)} 
      />

      {/* Back to Top (Mobile) / Back to Start (Desktop) Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-4 right-4 md:bottom-8 md:right-8 z-40 mix-blend-difference text-white border border-white/30 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center transition-all duration-500 hover:bg-white hover:text-black hover:scale-110 ${
          showBackToStart ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        {/* The icon rotates 90deg on mobile to point UP, and is default (Left) on desktop */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={1.5} 
          stroke="currentColor" 
          className="w-5 h-5 md:w-6 md:h-6 transform rotate-90 md:rotate-0 transition-transform duration-300"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
      </button>
    </div>
  );
};

export default App;