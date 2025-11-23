import React, { useRef, useEffect, useState } from 'react';
import { COLLECTIONS, HERO_IMAGE, MANIFESTO_TEXT, ABOUT_CONTENT, LOCATIONS, FAQS, CATEGORIES } from '../constants';

interface HorizontalScrollProps {
  onOpenStylist: () => void;
}

// Helper hook for intersection observer to trigger animations
const useOnScreen = (options: IntersectionObserverInit) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect(); 
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, options]);

  return [ref, isVisible] as const;
};

// Reusable animated text component with "Illumination" effect
interface AnimatedTextProps {
  children?: React.ReactNode;
  className?: string;
  delay?: number;
  illumination?: boolean; 
}

const AnimatedText = ({ children, className = "", delay = 0, illumination = true }: AnimatedTextProps) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.15 });
  
  // Base classes for movement
  const movementClasses = `transition-all duration-1000 ease-out transform ${isVisible ? 'translate-y-0' : 'translate-y-8'}`;
  
  // Illumination classes (opacity/color)
  const illuminationClasses = illumination 
    ? `${isVisible ? 'opacity-100 text-aether-white blur-0' : 'opacity-30 text-aether-gray blur-[2px]'}`
    : `${isVisible ? 'opacity-100' : 'opacity-0'}`;

  return (
    <div 
      ref={ref} 
      className={`${movementClasses} ${illuminationClasses} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({ onOpenStylist }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Track window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (scrollContainerRef.current) {
        setScrollWidth(scrollContainerRef.current.scrollWidth);
      }
    };

    handleResize();
    const timeoutId = setTimeout(handleResize, 500); 
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Track scroll for transform
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isMobile = windowWidth < 768;
  const totalHeight = scrollWidth - windowWidth + window.innerHeight;
  // If mobile, totalHeight isn't used for ghost spacer, native scroll applies.
  const isScrollable = scrollWidth > windowWidth;
  const translateX = (isScrollable && !isMobile) ? -scrollY : 0;
  
  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <>
      {/* Ghost Spacer for Desktop Horizontal Scroll */}
      {!isMobile && (
        <div style={{ height: `${totalHeight}px` }} className="w-full" />
      )}

      {/* Main Viewport */}
      <div 
        className={`${!isMobile ? 'fixed top-0 left-0 h-screen w-screen overflow-hidden bg-aether-black' : 'relative w-full overflow-x-hidden bg-aether-black min-h-screen'}`}
      >
        {/* Background Grain/Lines - Desktop Only */}
        {!isMobile && (
           <div className="absolute top-0 left-0 w-[400vw] h-full pointer-events-none z-0 opacity-10"
                style={{ transform: `translateX(${translateX * 0.1}px)` }}>
              <div className="h-full w-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
           </div>
        )}
        
        {/* Content Stream */}
        <div 
          ref={scrollContainerRef}
          className={`relative flex ${!isMobile ? 'h-full flex-row items-center' : 'flex-col w-full'}`}
          style={{ 
            transform: !isMobile ? `translateX(${translateX}px)` : 'none',
            willChange: 'transform'
          }}
        >
          
          {/* --- SECTION 1: HERO --- */}
          <section className="flex-shrink-0 w-full md:w-screen h-screen relative overflow-hidden z-20 bg-aether-black flex items-center justify-center">
            <div className="absolute inset-0">
               <img 
                src={HERO_IMAGE} 
                alt="Hero Fashion" 
                className="w-full h-full object-cover scale-105 animate-pulse"
                style={{ objectPosition: 'center', animationDuration: '10s' }}
              />
            </div>
            
            {/* Darker overlay + Gradient */}
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-transparent via-transparent to-aether-black z-10" />
            
            <div className="relative z-10 flex flex-col items-center justify-center text-center p-6">
              <div className="mb-4 md:mb-6 overflow-hidden">
                 <p className="text-[10px] md:text-sm tracking-[0.4em] md:tracking-[0.6em] uppercase text-aether-stone animate-fade-in-up">The New Era / FW25</p>
              </div>
              
              <div className="mix-blend-overlay">
                <h1 className="text-[18vw] md:text-[15vw] font-serif leading-none text-white tracking-tighter animate-fade-in-up animation-delay-200">
                  AETHER
                </h1>
              </div>
              
              <div className="mt-4 md:mt-6 overflow-hidden">
                <p className="text-xs md:text-xl font-light tracking-[0.5em] md:tracking-[0.8em] text-aether-gray uppercase animate-fade-in-up animation-delay-500">
                  Form & Void
                </p>
              </div>

               <div className="absolute bottom-12 animate-bounce opacity-50">
                  <span className="text-[10px] uppercase tracking-widest text-white">
                    {isMobile ? 'Scroll Down' : 'Scroll to Explore'}
                  </span>
               </div>
            </div>
          </section>

          {/* --- SECTION 2: SHORT MANIFESTO --- */}
          <section className="flex-shrink-0 flex items-center justify-center min-h-[50vh] md:h-full px-6 md:px-24 z-10 py-20 md:py-0">
            <AnimatedText className="w-full md:w-auto text-center md:text-left" illumination={true}>
                <h2 className="text-4xl md:text-[10vw] font-serif italic leading-tight md:leading-none whitespace-normal md:whitespace-nowrap transition-colors duration-1000">
                  {MANIFESTO_TEXT}
                </h2>
            </AnimatedText>
          </section>

           {/* --- SECTION 3: ABOUT US (Team Image) --- */}
           <section className="flex-shrink-0 w-full md:w-[90vw] md:h-full flex items-center justify-center relative px-6 md:px-0 py-20 md:py-0">
             <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center w-full max-w-7xl mx-auto">
               
               {/* Team/Group Image */}
               <div className="md:col-span-7 relative h-[50vh] md:h-[60vh]">
                  <AnimatedText delay={100} className="w-full h-full" illumination={false}>
                    <div className="w-full h-full overflow-hidden">
                      <img 
                        src={ABOUT_CONTENT.image} 
                        alt="Aether Atelier Team" 
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out scale-100 hover:scale-105" 
                      />
                    </div>
                  </AnimatedText>
               </div>

               {/* Text Content */}
               <div className="md:col-span-5 md:pl-12">
                  <AnimatedText delay={300} illumination={true}>
                    <span className="text-xs tracking-[0.3em] uppercase block mb-4 md:mb-6 opacity-70">— The Collective</span>
                    <h3 className="text-3xl md:text-5xl font-serif mb-6 md:mb-8">{ABOUT_CONTENT.title}</h3>
                    <p className="text-base md:text-lg font-light leading-loose opacity-80">
                      {ABOUT_CONTENT.text}
                    </p>
                    <button className="mt-8 md:mt-12 group flex items-center gap-4 text-xs uppercase tracking-widest transition-all">
                      <span className="border-b border-white pb-1 group-hover:text-aether-gray group-hover:border-aether-gray transition-colors">Read Our Story</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">→</span>
                    </button>
                  </AnimatedText>
               </div>
             </div>
           </section>

          {/* --- MOBILE ONLY: CATEGORIES SECTION --- */}
          <div className="md:hidden flex-shrink-0 w-full px-6 py-20 bg-white/5">
             <AnimatedText illumination={true}>
                <h2 className="text-3xl font-serif italic mb-8">Categories</h2>
             </AnimatedText>
             <div className="grid grid-cols-2 gap-4">
                {CATEGORIES.map((cat, idx) => (
                   <AnimatedText key={cat.id} delay={idx * 100} illumination={false} className="relative aspect-[3/4] group overflow-hidden">
                      <img 
                        src={cat.image} 
                        alt={cat.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                         <span className="text-white text-sm uppercase tracking-widest font-medium border-b border-transparent group-hover:border-white pb-1 transition-all">{cat.title}</span>
                      </div>
                   </AnimatedText>
                ))}
             </div>
          </div>


          {/* --- SECTION 4: COLLECTIONS --- */}
          {COLLECTIONS.map((collection, cIdx) => (
            <React.Fragment key={collection.id}>
              
              {/* Collection Title */}
              <div className="flex-shrink-0 w-full md:w-[40vw] md:h-full flex flex-col justify-center md:justify-end py-20 md:pb-32 px-6 md:px-24 z-10 relative">
                 <AnimatedText illumination={true}>
                    <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase block mb-2 md:mb-4 opacity-60">
                        {collection.season}
                    </span>
                    <h2 className="text-5xl md:text-8xl font-serif italic break-words">
                        {collection.title}
                    </h2>
                    {isMobile && <p className="mt-4 text-sm font-light opacity-80">{collection.description}</p>}
                 </AnimatedText>
              </div>

              {/* Products */}
              {collection.products.map((product, pIdx) => {
                const layoutType = (pIdx + cIdx) % 3;

                return (
                  <div key={product.id} className="flex-shrink-0 relative w-full md:w-auto h-auto md:h-full flex items-center justify-center px-6 md:px-0 py-12 md:py-0">
                    
                    {/* LAYOUT 0: TOWER */}
                    {layoutType === 0 && (
                       <div className="w-full md:w-[30vw] md:mx-12 h-[60vh] md:h-[70vh] flex flex-col">
                          <AnimatedText delay={100} className="flex-grow relative group overflow-hidden" illumination={false}>
                             <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                             />
                             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                <span className="text-white font-serif italic text-2xl tracking-widest">Discover</span>
                             </div>
                          </AnimatedText>
                          <AnimatedText delay={200} illumination={true}>
                            <div className="mt-4 flex justify-between items-start">
                              <div>
                                  <h3 className="text-lg md:text-xl font-serif">{product.name}</h3>
                                  <p className="text-[10px] md:text-xs uppercase mt-1 opacity-60">{product.category}</p>
                              </div>
                              <span className="text-sm font-light border border-white/30 px-3 py-1 rounded-full group-hover:bg-white group-hover:text-black transition-colors">{product.price}</span>
                            </div>
                          </AnimatedText>
                       </div>
                    )}

                    {/* LAYOUT 1: CINEMATIC */}
                    {layoutType === 1 && (
                       <div className="w-full md:w-[50vw] md:mx-4 h-[50vh] md:h-[80vh] flex flex-col justify-end md:pb-24">
                          <AnimatedText delay={100} className="w-full aspect-video relative group overflow-hidden" illumination={false}>
                             <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-full h-full object-cover object-top transition-transform duration-[2s] group-hover:scale-105 filter sepia-[.2] group-hover:sepia-0"
                             />
                          </AnimatedText>
                          <AnimatedText delay={300} illumination={true}>
                            <div className="mt-6 md:absolute md:bottom-32 md:-right-12 bg-aether-black/90 md:backdrop-blur-xl p-6 md:p-8 w-full md:max-w-xs z-20 shadow-2xl">
                              <h3 className="text-xl md:text-2xl font-serif italic mb-2">{product.name}</h3>
                              <p className="text-xs md:text-sm text-gray-400 mb-4">Crafted for the modern void.</p>
                              <div className="flex justify-between items-center">
                                  <button className="text-xs uppercase tracking-widest hover:underline decoration-1 underline-offset-4">Add to Cart</button>
                                  <span>{product.price}</span>
                              </div>
                            </div>
                          </AnimatedText>
                       </div>
                    )}

                    {/* LAYOUT 2: DETAIL */}
                    {layoutType === 2 && (
                       <div className="w-full md:w-[25vw] md:-ml-12 md:mr-12 h-[60vh] md:h-[80vh] flex flex-col justify-start md:pt-32 z-30">
                          <AnimatedText delay={200} className="w-full aspect-[4/5] relative group shadow-2xl overflow-hidden" illumination={false}>
                             <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-full h-full object-cover transition-all duration-700 group-hover:grayscale grayscale-0"
                             />
                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 bg-white mix-blend-difference rounded-full group-hover:w-[150%] group-hover:h-[150%] transition-all duration-700 ease-in-out pointer-events-none opacity-0 group-hover:opacity-100"></div>
                          </AnimatedText>
                          <AnimatedText delay={300} illumination={true}>
                            <div className="text-center mt-6">
                              <h3 className="text-lg font-serif">{product.name}</h3>
                              <p className="text-xs mt-1 opacity-60">{product.price}</p>
                            </div>
                          </AnimatedText>
                       </div>
                    )}

                  </div>
                );
              })}
            
            </React.Fragment>
          ))}

           {/* --- SECTION 5: WHERE YOU CAN FIND US (Locations) --- */}
           <section className="flex-shrink-0 w-full md:w-[60vw] md:h-full flex items-center px-6 md:px-24 py-20 md:py-0">
              <div className="w-full">
                <AnimatedText illumination={true}>
                   <h2 className="text-3xl md:text-5xl font-serif mb-12 md:mb-16 italic">Where You Can Find Us</h2>
                </AnimatedText>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-16">
                   {LOCATIONS.map((loc, idx) => (
                      <React.Fragment key={idx}>
                        <AnimatedText delay={idx * 100} illumination={true} className="border-t border-white/20 pt-4">
                           <h3 className="text-xl md:text-2xl font-serif mb-2">{loc.city}</h3>
                           <p className="text-sm font-light text-aether-gray">{loc.address}</p>
                           <p className="text-xs uppercase tracking-widest mt-2 opacity-50">{loc.hours}</p>
                        </AnimatedText>
                      </React.Fragment>
                   ))}
                </div>
              </div>
           </section>

           {/* --- SECTION 6: FAQs (Accordion) --- */}
           <section className="flex-shrink-0 w-full md:w-[50vw] md:h-full flex flex-col justify-center px-6 md:px-24 py-20 md:py-0 bg-white/5">
              <AnimatedText illumination={true} className="mb-8 md:mb-12">
                 <h2 className="text-2xl md:text-3xl font-serif uppercase tracking-widest">FAQs</h2>
              </AnimatedText>
              
              <div className="space-y-4 md:space-y-6 w-full max-w-2xl">
                 {FAQS.map((faq, idx) => (
                    <React.Fragment key={idx}>
                      <AnimatedText delay={idx * 100} illumination={true}>
                         <div className="group border-b border-white/10 pb-4">
                            <button 
                              onClick={() => toggleFaq(idx)}
                              className="w-full text-left flex justify-between items-center py-2 focus:outline-none"
                            >
                                <h4 className={`text-lg md:text-xl transition-colors duration-300 ${activeFaq === idx ? 'text-white' : 'text-aether-gray group-hover:text-white'}`}>
                                  {faq.q}
                                </h4>
                                <span className="text-xl md:text-2xl font-light text-aether-gray">
                                  {activeFaq === idx ? '−' : '+'}
                                </span>
                            </button>
                            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeFaq === idx ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                               <p className="text-sm font-light text-aether-stone leading-relaxed pl-2 border-l border-white/20">
                                  {faq.a}
                                </p>
                            </div>
                         </div>
                      </AnimatedText>
                    </React.Fragment>
                 ))}
              </div>
           </section>

          {/* --- SECTION 7: STYLIST PROMPT --- */}
          <section className="flex-shrink-0 w-full md:w-screen h-[80vh] md:h-screen flex items-center justify-center relative bg-aether-stone text-black z-20">
             <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
             
             <div className="max-w-4xl w-full flex flex-col md:flex-row items-center justify-between p-6 md:p-12">
                <div className="md:w-1/2 mb-12 md:mb-0 text-center md:text-left">
                    <h2 className="text-6xl md:text-9xl font-serif leading-none mb-6">Ask<br/>The<br/>Oracle</h2>
                </div>
                <div className="md:w-1/2 md:pl-12 md:border-l border-black/10 text-center md:text-left">
                    <p className="text-lg md:text-xl font-light mb-8 leading-relaxed">
                      Unsure of the composition? Allow our artificial intelligence to curate your silhouette based on your mood, occasion, or the weather in your city.
                    </p>
                    <button 
                      onClick={onOpenStylist}
                      className="group relative px-10 md:px-12 py-4 md:py-5 bg-black text-white overflow-hidden transition-all hover:bg-transparent hover:text-black border border-black shadow-2xl hover:shadow-none"
                    >
                      <span className="relative z-10 text-xs md:text-sm uppercase tracking-[0.2em]">Consult Stylist</span>
                      <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0"></div>
                    </button>
                </div>
             </div>
          </section>

          {/* --- SECTION 8: CONTACT US FORM --- */}
          <section className="flex-shrink-0 w-full md:w-[60vw] md:h-full bg-aether-black flex items-center justify-center px-6 md:px-24 py-20 md:py-0">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 w-full">
                {/* Info Side */}
                <div className="flex flex-col justify-center">
                   <AnimatedText illumination={true}>
                      <span className="text-xs uppercase tracking-widest text-aether-gray mb-4 block">Get In Touch</span>
                      <h2 className="text-5xl md:text-7xl font-serif italic mb-6 md:mb-8">Contact Us</h2>
                      <p className="text-aether-gray font-light mb-8 md:mb-12 max-w-md">
                         For inquiries regarding bespoke tailoring, press, or appointments, please leave your details.
                      </p>
                      
                      <div className="space-y-4">
                         <div className="flex items-center gap-4 text-sm font-light">
                            <span className="w-16 uppercase text-xs tracking-widest text-gray-500">Email</span>
                            <a href="mailto:void@aether.com" className="hover:text-white text-gray-300 transition-colors">void@aether.com</a>
                         </div>
                         <div className="flex items-center gap-4 text-sm font-light">
                            <span className="w-16 uppercase text-xs tracking-widest text-gray-500">Phone</span>
                            <span className="text-gray-300">+39 02 555 0199</span>
                         </div>
                      </div>
                   </AnimatedText>
                </div>

                {/* Form Side */}
                <div className="flex flex-col justify-center">
                   <AnimatedText delay={200} illumination={true} className="w-full">
                      <form className="space-y-8 md:space-y-12">
                         <div className="relative group">
                            <input type="text" placeholder="NAME" className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-white transition-colors placeholder:text-gray-600 uppercase text-xs tracking-widest" />
                         </div>
                         <div className="relative group">
                            <input type="email" placeholder="EMAIL ADDRESS" className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-white transition-colors placeholder:text-gray-600 uppercase text-xs tracking-widest" />
                         </div>
                         <div className="relative group">
                            <textarea placeholder="MESSAGE" rows={3} className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-white transition-colors placeholder:text-gray-600 uppercase text-xs tracking-widest resize-none"></textarea>
                         </div>
                         <button type="button" className="text-xs uppercase tracking-[0.2em] border border-white/30 px-8 py-4 hover:bg-white hover:text-black transition-all duration-500 w-full md:w-auto">
                            Send Message
                         </button>
                      </form>
                   </AnimatedText>
                </div>
             </div>
          </section>

          {/* --- SECTION 9: FOOTER --- */}
          <section className="flex-shrink-0 w-full md:w-[30vw] md:h-full bg-aether-black text-white flex flex-col justify-center p-12 md:p-24 md:border-l border-white/5 py-24">
             <AnimatedText delay={200} illumination={true} className="h-full flex flex-col justify-between">
                <div>
                   <h2 className="text-6xl md:text-8xl font-serif mb-12 opacity-10">END.</h2>
                   <div className="space-y-8">
                       <div>
                          <p className="text-white uppercase tracking-widest text-[10px] mb-4 opacity-50">Explore</p>
                          <ul className="space-y-2 text-sm font-light text-gray-400">
                              <li className="hover:text-white transition-colors cursor-pointer">Collections</li>
                              <li className="hover:text-white transition-colors cursor-pointer">The Oracle</li>
                              <li className="hover:text-white transition-colors cursor-pointer">Manifesto</li>
                          </ul>
                       </div>
                       <div>
                          <p className="text-white uppercase tracking-widest text-[10px] mb-4 opacity-50">Legal</p>
                          <ul className="space-y-2 text-sm font-light text-gray-400">
                              <li className="hover:text-white transition-colors cursor-pointer">Privacy Policy</li>
                              <li className="hover:text-white transition-colors cursor-pointer">Terms of Use</li>
                          </ul>
                       </div>
                   </div>
                </div>
                
                <div className="mt-12">
                   <div className="text-[10px] uppercase tracking-widest text-gray-600">
                      © 2025 Aether Group
                   </div>
                   <div className="flex gap-4 mt-4">
                      <a href="#" className="text-gray-500 hover:text-white transition-colors text-xs">IG</a>
                      <a href="#" className="text-gray-500 hover:text-white transition-colors text-xs">TW</a>
                      <a href="#" className="text-gray-500 hover:text-white transition-colors text-xs">LI</a>
                   </div>
                </div>
             </AnimatedText>
          </section>

        </div>
      </div>
    </>
  );
};

export default HorizontalScroll;