
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Team from '@/components/Team';
import Testimonials from '@/components/Testimonials';
import FaqSection from '@/components/FaqSection';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

// Ce tableau pourrait être récupéré depuis l'API/base de données dans un contexte réel
const DEFAULT_VISIBLE_SECTIONS = {
  hero: true,
  services: true,
  about: true,
  team: true,
  testimonials: true,
  faq: true,
  contact: true
};

const Index = () => {
  // Dans une application réelle, on récupérerait cette configuration depuis le backend
  const [visibleSections, setVisibleSections] = useState(DEFAULT_VISIBLE_SECTIONS);
  
  useEffect(() => {
    // Initialisation de l'observateur d'intersection pour les animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observer tous les éléments avec des classes d'animation
    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-fade-in-up, .animate-slide-in-right, .animate-blur-in');
    animatedElements.forEach((el) => observer.observe(el));

    // Simulation de la récupération de la configuration depuis le backend
    // Dans une application réelle, on ferait un appel API ici
    const fetchVisibilityConfig = async () => {
      try {
        // Simulation d'un délai d'API
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Dans une vraie application, on récupérerait ces données depuis le backend
        // const response = await fetch('/api/home-config');
        // const data = await response.json();
        // setVisibleSections(data.visibleSections);
      } catch (error) {
        console.error('Erreur lors de la récupération de la configuration:', error);
      }
    };

    fetchVisibilityConfig();

    return () => {
      if (animatedElements) {
        animatedElements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow dark:bg-gray-900">
        {visibleSections.hero && <Hero />}
        {visibleSections.services && <Services />}
        {visibleSections.about && <About />}
        {visibleSections.team && <Team />}
        {visibleSections.testimonials && <Testimonials />}
        {visibleSections.faq && <FaqSection />}
        {visibleSections.contact && <Contact />}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
