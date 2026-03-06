import { motion } from 'framer-motion';

const facultyMembers = [
  {
    id: 1,
    name: 'Rukmini Devi',
    title: 'Senior Bharathanatyam Instructor',
    bio: 'With over three decades of performance experience across global stages. She specializes in the Kalakshetra style with a focus on abhinaya.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2576&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Vikram Natarajan',
    title: 'Director of Choreography',
    bio: 'Renowned for blending classical rhythmic patterns with contemporary spatial dynamics. He leads our award-winning competitive ensembles.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2574&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Ananya Rao',
    title: 'Odissi Specialist & Theorist',
    bio: 'A distinguished scholar in Natya Shastra. Her disciplined approach emphasizes flawless technical precision and deeply rooted emotional storytelling.',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2550&auto=format&fit=crop'
  }
];

const Faculty = () => {
  return (
    <section className="bg-stone-50 text-zinc-950 py-32 lg:py-48" id="faculty">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-20">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 lg:mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl md:text-7xl tracking-tight max-w-2xl"
          >
            Mentors & <span className="italic font-light text-stone-400">Gurus.</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-xs tracking-[0.2em] uppercase text-stone-500 mt-8 md:mt-0 pb-2 md:text-right"
          >
            Our Faculty // Expertise
          </motion.div>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {facultyMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer flex flex-col"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[3/4] overflow-hidden mb-8 bg-stone-200">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover filter grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
                />
              </div>

              {/* Text Content */}
              <div className="relative flex-grow">
                <h3 className="font-serif text-3xl text-zinc-900 mb-2 tracking-tight transition-colors duration-500">
                  {member.name}
                </h3>
                <p className="font-sans text-sm tracking-[0.1em] uppercase text-stone-500 mb-6">
                  {member.title}
                </p>

                {/* Bio Reveal */}
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-out">
                  <div className="overflow-hidden">
                    <p className="font-sans text-[0.95rem] leading-relaxed text-stone-600 pt-2 pb-4 border-t border-stone-200 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Faculty;
