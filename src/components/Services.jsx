import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const services = [
  {
    id: '01',
    title: 'Online Community & Personalised Classes',
    category: 'Digital & 1-on-1',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: '02',
    title: 'Competition Choreography',
    category: 'Performance',
    image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=2574&auto=format&fit=crop'
  },
  {
    id: '03',
    title: 'Corporate & College Event Workshops',
    category: 'Workshops',
    image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: '04',
    title: 'Thematic Dance Productions',
    category: 'Production',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2670&auto=format&fit=crop'
  }
];

const Services = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="bg-zinc-900 text-stone-100 py-32 lg:py-48 relative min-h-screen" id="programs">
      <div className="max-w-7xl mx-auto px-8 lg:px-20 relative z-10">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-24 lg:mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl md:text-7xl tracking-tight"
          >
            Our Expertise.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block font-sans text-xs tracking-[0.2em] uppercase text-stone-400 pb-2"
          >
            Capabilities // 2026
          </motion.div>
        </div>

        {/* Interactive Rows */}
        <div className="border-t border-zinc-800">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className="relative group border-b border-zinc-800"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between py-12 lg:py-16 md:transform md:transition-transform md:duration-500 md:group-hover:translate-x-4 cursor-pointer">
                
                {/* Left Side: Number & Category */}
                <div className="flex items-center gap-8 md:gap-16 mb-6 md:mb-0 md:w-1/4">
                  <span className="font-sans text-sm md:text-base text-zinc-500 group-hover:text-amber-600/60 transition-colors duration-500">
                    {service.id}
                  </span>
                  <span className="font-sans text-xs tracking-[0.2em] uppercase text-stone-400 group-hover:text-amber-600/80 transition-colors duration-500">
                    {service.category}
                  </span>
                </div>

                {/* Right Side: Title & Icon */}
                <div className="flex items-center justify-between md:flex-1 w-full">
                  <h3 className="font-serif text-3xl md:text-5xl lg:text-6xl tracking-tight text-stone-100 group-hover:text-amber-600 transition-colors duration-500 max-w-2xl">
                    {service.title}
                  </h3>
                  <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:border-amber-600/30 transition-all duration-500 text-amber-600 ml-4 hidden md:flex">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Image on Desktop */}
      <AnimatePresence>
        {hoveredIndex !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 pointer-events-none z-0 hidden lg:flex justify-end items-center pr-20"
          >
            <div className="w-[450px] aspect-[3/4] overflow-hidden ml-auto mt-20 relative mix-blend-screen">
              {/* Gradient Overlay for blending into dark background */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-zinc-900 z-10" />
              <div className="absolute inset-0 bg-gradient-to-l from-zinc-900 via-transparent to-zinc-900 z-10" />
              
              <img 
                src={services[hoveredIndex].image} 
                alt={services[hoveredIndex].title}
                className="w-full h-full object-cover filter grayscale-[50%] contrast-125 brightness-75 scale-105"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;
