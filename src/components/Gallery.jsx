import { motion } from 'framer-motion';

const galleryImages = [
  {
    id: 1,
    src: 'https://images.picxy.com/cache/2019/3/28/f96e132e65f0ac036e5b4ccdedf79f93.jpg',
    alt: 'Classical Indian dance performance wide',
    className: 'md:col-span-2 md:row-span-2' // Large square/rectangle
  },
  {
    id: 2,
    src: 'https://media.rnztools.nz/rnz/image/upload/s--A4ZHCEAB--/ar_16:10,c_fill,f_auto,g_auto,q_auto,w_1050/v1769729798/4JTZT35_Prabha_Ravi_jpeg?_a=BACCd2AD',
    alt: 'Close up on hand gestures',
    className: 'md:col-span-1 md:row-span-1' // Small square
  },
  {
    id: 3,
    src: 'https://i.pinimg.com/474x/37/ce/72/37ce720301ab1ec46d70699242db169c.jpg',
    alt: 'Portrait of dancer',
    className: 'md:col-span-1 md:row-span-2' // Vertical rectangle
  },
  {
    id: 4,
    src: `https://www.shutterstock.com/editorial/image-editorial/M1T7M313N6TdMax5NDI2NDA=/indian-classical-dancers-perform-'praise-seven-hills'-440nw-13435593c.jpg`,
    alt: 'Performance details',
    className: 'md:col-span-1 md:row-span-1' // Small square
  },
  {
    id: 5,
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmEMm4Z0KvJds6UwJs4fMgcIgj41E95RcyDg&s',
    alt: 'Group practice',
    className: 'md:col-span-2 md:row-span-1' // Horizontal rectangle
  },
  {
    id: 6,
    src: 'https://content.jdmagicbox.com/v2/comp/coimbatore/h7/0422px422.x422.140715122141.r2h7/catalogue/cp-events-peelamedu-coimbatore-event-organisers-for-dance-parties-9rv6hx63qq.jpg',
    alt: 'Stage lighting',
    className: 'md:col-span-1 md:row-span-1' // Small square
  }
];

const Gallery = () => {
  return (
    <section className="bg-zinc-950 text-stone-100 py-32 lg:py-48" id="gallery">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-24 px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl md:text-7xl tracking-tight max-w-2xl"
          >
            Moments in <span className="italic font-light text-stone-400">Motion.</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-xs tracking-[0.2em] uppercase text-stone-500 mt-8 md:mt-0 pb-2 md:text-right"
          >
            Curated Archives // Visuals
          </motion.div>
        </div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[300px] md:auto-rows-[350px] gap-2 md:gap-4">
          {galleryImages.map((image, i) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative group overflow-hidden bg-zinc-900 rounded-sm cursor-pointer ${image.className}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105 group-hover:contrast-110"
              />

              {/* Overlay Gradient (Optional, helps text pop) */}
              <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* 'View' Text */}
              <div className="absolute top-6 right-6 font-sans text-xs tracking-[0.2em] uppercase text-white opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out z-10 flex items-center gap-2 mix-blend-difference">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                View
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
