import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutVision from './components/AboutVision';
import Services from './components/Services';
import Faculty from './components/Faculty';
import Gallery from './components/Gallery';
import ContactFooter from './components/ContactFooter';

function App() {
  return (
    <main className="bg-zinc-950 min-h-screen antialiased selection:bg-white/20">
      <Navbar />
      <Hero />
      <AboutVision />
      <Services />
      <Faculty />
      <Gallery />
      <ContactFooter />
    </main>
  );
}

export default App;
