import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-zinc-950 text-stone-50 flex flex-col lg:flex-row overflow-hidden">
      {/* Left Content */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-20 pt-32 lg:pt-0 z-10 relative">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] text-stone-100">
              Rooted in Tradition.
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          >
            <p className="font-serif italic text-3xl md:text-4xl lg:text-5xl mt-4 lg:mt-6 text-stone-400 font-light">
              Dancing Towards Tomorrow.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="mt-16 lg:mt-24"
          >
            <a href="#vision" className="group relative inline-flex items-center gap-4 text-sm uppercase tracking-[0.2em] font-sans pb-2 hover:text-white transition-colors">
              <span>Explore Our Vision</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/30 origin-left transform scale-x-100 transition-transform duration-500 ease-out group-hover:bg-white" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Right Image Container */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 relative mt-12 lg:mt-0 min-h-[50vh] lg:min-h-screen"
      >
        <div className="absolute inset-0 bg-zinc-950/20 z-10 lg:hidden" />

        {/* Placeholder High-Contrast Moody Image */}
        <div className="absolute inset-0 w-full h-full bg-stone-900 border-l border-white/5 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-80 mix-blend-overlay bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10" />
          <div className="absolute inset-0 opacity-40 mix-blend-multiply bg-gradient-to-l from-transparent via-transparent to-zinc-950 z-10" />

          <img
            // src="https://thumbs.dreamstime.com/b/beautiful-girl-dancer-indian-classical-dance-bharatanatyam-young-woman-exponent-35039505.jpg"
            // src="https://instagram.fbho1-3.fna.fbcdn.net/v/t51.82787-15/625053134_18148980628455952_8387762568134281836_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=103&ig_cache_key=MzM3MjQyNjY1OTU0OTc1MTIwMg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMC5zZHIuQzMifQ%3D%3D&_nc_ohc=ZQaLBlNBgZcQ7kNvwED9dmC&_nc_oc=AdlclEXHm_6QLnGJjmMMV3YlV7LoC4npvhWa11sOyiTONLxvem92_FtHYfx89tCBezc26GUwenCaix0G01U1C5qN&_nc_ad=z-m&_nc_cid=2034&_nc_zt=23&_nc_ht=instagram.fbho1-3.fna&_nc_gid=LiwB3MVabH-PwK7VfHU6QA&_nc_ss=8&oh=00_AfwelCFEJANABBTp4MQkQrJncr3NKL3K8eL633AXwK17jQ&oe=69B0BD33"
            src="https://media.istockphoto.com/id/502859565/photo/beautiful-girl-dancer-of-indian-classical-dance-bharatanatyam.jpg?s=612x612&w=0&k=20&c=3XqfHl59lUpQUAAbBoi9z_9S40AGL3dQlvhxgZEtH5Q="
            alt="Classical Dance Sequence"
            className="w-full h-full object-cover object-center filter grayscale-[30%] contrast-[1.1] brightness-90 z-0"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
