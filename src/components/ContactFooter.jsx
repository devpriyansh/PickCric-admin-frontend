import { motion } from 'framer-motion';

const ContactFooter = () => {
  return (
    <footer className="bg-zinc-950 text-stone-100 pt-32 lg:pt-48 overflow-hidden" id="contact">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-20">
        
        {/* Contact Form Section */}
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-32 mb-32 lg:mb-48">
          
          {/* Left Column: Heading & Contact Info */}
          <div className="lg:w-1/2">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-6xl md:text-8xl tracking-tight mb-12 lg:mb-24"
            >
              Let's <br className="hidden lg:block"/> Connect.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-stone-500 mb-6">
                Direct Inquiries
              </h3>
              <p className="font-serif text-2xl lg:text-3xl text-stone-300 tracking-tight leading-relaxed mb-8 max-w-sm">
                For artistic collaborations, events, and personal consultations.
              </p>
              
              <div className="space-y-2">
                <p className="font-sans text-sm tracking-wide text-zinc-400">
                  <span className="text-white">Director:</span> Nritya Nitara Management
                </p>
                <p className="font-sans text-sm tracking-wide text-zinc-400">
                  <span className="text-white">Phone:</span> +91 98765 43210
                </p>
                <p className="font-sans text-sm tracking-wide text-zinc-400">
                  <span className="text-white">Email:</span> hello@nrityanitara.com
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Brutalist Form */}
          <div className="lg:w-1/2 flex items-center">
            <motion.form 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-full max-w-xl"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="space-y-12 mb-16">
                <div className="relative group">
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    className="w-full bg-transparent border-b border-zinc-800 pb-4 font-sans text-lg text-white placeholder-zinc-600 focus:outline-none focus:border-stone-300 transition-colors duration-300"
                    required
                  />
                </div>
                
                <div className="relative group">
                  <input 
                    type="tel" 
                    placeholder="Phone Number" 
                    className="w-full bg-transparent border-b border-zinc-800 pb-4 font-sans text-lg text-white placeholder-zinc-600 focus:outline-none focus:border-stone-300 transition-colors duration-300"
                  />
                </div>

                <div className="relative group">
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="w-full bg-transparent border-b border-zinc-800 pb-4 font-sans text-lg text-white placeholder-zinc-600 focus:outline-none focus:border-stone-300 transition-colors duration-300"
                    required
                  />
                </div>

                <div className="relative group">
                  <textarea 
                    placeholder="Project / Inquiry Details" 
                    rows="3"
                    className="w-full bg-transparent border-b border-zinc-800 pb-4 font-sans text-lg text-white placeholder-zinc-600 focus:outline-none focus:border-stone-300 transition-colors duration-300 resize-none"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-white text-zinc-950 font-sans text-xs tracking-[0.2em] uppercase py-6 hover:bg-zinc-900 hover:text-white hover:border-white border border-transparent transition-all duration-300"
              >
                Submit Inquiry
              </button>
            </motion.form>
          </div>
        </div>
      </div>

      {/* Massive Typographic Treatment */}
      <div className="w-full overflow-hidden border-t border-zinc-900 pt-16 lg:pt-24 mb-16 lg:mb-24 px-4 hidden md:block">
         <motion.h1 
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="text-[12rem] lg:text-[18rem] leading-none font-serif text-center text-zinc-900 tracking-tighter select-none scale-y-110"
         >
           NRITYA
         </motion.h1>
      </div>

      <div className="w-full overflow-hidden border-t border-zinc-900 pt-12 pb-16 px-4 md:hidden">
         <motion.h1 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="text-7xl leading-none font-serif text-center text-zinc-900 tracking-tighter select-none scale-y-110"
         >
           NRITYA
         </motion.h1>
      </div>

      {/* Structured Multi-Column Footer */}
      <div className="border-t border-zinc-900 py-12 px-8 lg:px-20 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          
          <div className="md:col-span-2">
             <div className="text-white font-serif text-xl tracking-wide font-medium mb-6">
               Nritya Nitara
             </div>
             <p className="text-zinc-500 font-sans text-sm max-w-sm leading-relaxed">
               A sanctuary for classical rhythm and exploratory modern movements. We build upon tradition to shape the choreography of tomorrow.
             </p>
          </div>

          <div>
            <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-stone-500 mb-6">Navigation</h4>
            <ul className="space-y-4 font-sans text-sm text-zinc-400">
              <li><a href="#about" className="hover:text-white transition-colors">Philosophy</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Expertise</a></li>
              <li><a href="#gallery" className="hover:text-white transition-colors">Archives</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Connect</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-stone-500 mb-6">Social</h4>
            <ul className="space-y-4 font-sans text-sm text-zinc-400">
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors">YouTube</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-zinc-900 font-sans text-xs tracking-wider text-zinc-600">
          <p>© 2026 Nritya Nitara. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-zinc-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
