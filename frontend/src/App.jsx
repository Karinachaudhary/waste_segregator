import React from 'react';
import Navbar from './components/Navbar';
import Hero from './pages/Home';
import Features from './pages/Features';
import HowItWorks from './pages/HowItWorks';
import UploadCTA from './pages/Upload';
import Categories from './pages/Categories';
import Testimonials from './pages/Testimonials';
import About from './pages/About';
import CtaBanner from './pages/CtaBanner';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#f8fdf9] text-[#0e1f16] font-sans antialiased selection:bg-[#b4e8c3] selection:text-[#0e3f24]">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <UploadCTA />
        <Features />
        <Categories />
        <Testimonials />
        <About />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}