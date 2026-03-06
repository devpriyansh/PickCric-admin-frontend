import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Transition past height 80px
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-stone-100' 
          : 'backdrop-blur-md bg-white/10 border-b border-white/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className={`font-serif text-2xl tracking-wide font-medium transition-colors duration-300 ${isScrolled ? 'text-zinc-950' : 'text-stone-50'}`}>
          Nritya Nitara
        </div>
        
        <nav className="hidden md:flex gap-10">
          {['Programs', 'Faculty', 'Vision', 'Gallery', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className={`text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
                isScrolled 
                  ? 'text-zinc-950 hover:text-zinc-600' 
                  : 'text-stone-50 hover:text-white/70'
              }`}
            >
              {item}
            </a>
          ))}
        </nav>
        
        <button className={`md:hidden transition-colors duration-300 ${isScrolled ? 'text-zinc-950' : 'text-stone-50'}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>
      </div>
    </motion.header>
  );
};

export default Navbar;
