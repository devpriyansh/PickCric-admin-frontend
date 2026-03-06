import { motion } from 'framer-motion';

const LogoAnatomy = [
  {
    num: '01',
    title: 'Flowing Roots',
    desc: 'Anchored deeply in the heritage of classical forms, yet fluid enough to nurture modern interpretative expressions.'
  },
  {
    num: '02',
    title: 'The Tree',
    desc: 'A symbol of life, growth, and the upward ascent of a dancer seeking perfection through disciplined practice.'
  },
  {
    num: '03',
    title: 'Branches',
    desc: 'The diverse pathways of rhythmic exploration, reaching outwards into contemporary storytelling and global stages.'
  },
  {
    num: '04',
    title: 'Tradition',
    desc: 'The unwavering core philosophy that grounds every movement, ensuring the legacy remains pure and untainted.'
  }
];

const AboutVision = () => {
  return (
    <section className="bg-stone-50 text-zinc-950 py-32 lg:py-48 px-8 lg:px-20 overflow-hidden" id="vision">
      {/* Section 1: Oversized Quote */}
      <div className="max-w-6xl mx-auto mb-40 lg:mb-64">
        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl md:text-5xl lg:text-[5.5rem] leading-[1.1] tracking-tight text-center md:text-left"
        >
          <span className="text-stone-300 ml-[-0.05em]">"</span>
          Dance like Nature is a force of life, <br className="hidden lg:block"/> constantly in motion and full of grace.
          <span className="text-stone-300">"</span>
        </motion.h2>
      </div>

      {/* Section 2: Logo Anatomy Grid */}
      <div className="max-w-7xl mx-auto lg:flex lg:gap-24 items-stretch">
        {/* Sticky Left Column */}
        <div className="lg:w-1/3 mb-16 lg:mb-0 relative py-8">
          <div className="lg:sticky lg:top-40">
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-sans text-xs tracking-[0.3em] uppercase text-stone-400 mb-6"
            >
              Philosophy
            </motion.h3>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-5xl md:text-6xl text-zinc-900 mb-8 leading-tight"
            >
              The Logo<br/>Anatomy
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-stone-500 font-sans leading-relaxed max-w-sm text-sm"
            >
              Every curve in our emblem represents a fundamental pillar of our approach to rhythmic storytelling. We decompose our identity to share our core values and aesthetic principles with the world.
            </motion.p>
          </div>
        </div>

        {/* 2x2 Corporate Report Grid using gap technique for perfect borders */}
        <div className="lg:w-2/3 bg-stone-200 border border-stone-200 grid grid-cols-1 md:grid-cols-2 gap-[1px]">
          {LogoAnatomy.map((item, index) => (
            <motion.div 
              key={item.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2 + (index * 0.1) }}
              className="bg-stone-50 p-10 lg:p-14 flex flex-col h-full group"
            >
              <div className="text-7xl lg:text-8xl font-sans font-extralight text-stone-200/60 tracking-tighter mb-16 transform origin-left group-hover:scale-105 group-hover:text-stone-300 transition-all duration-700">
                {item.num}
              </div>
              
              <div className="mt-auto">
                <h4 className="font-serif text-3xl text-zinc-900 mb-4 tracking-tight">
                  {item.title}
                </h4>
                <div className="w-8 h-[1px] bg-stone-300 mb-6 group-hover:w-16 transition-all duration-700 ease-out" />
                <p className="font-sans text-[0.9rem] leading-relaxed text-stone-500">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutVision;
