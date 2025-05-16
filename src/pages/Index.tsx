
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSections } from '@/contexts/sections/SectionsContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import About from '@/components/sections/About';
import Team from '@/components/sections/Team';
import TrustedClients from '@/components/sections/TrustedClients';
import Testimonials from '@/components/sections/Testimonials';
import Faq from '@/components/sections/Faq';
import Contact from '@/components/sections/Contact';
import { SectionType } from '@/types/sections';

// Map des composants de section
const sectionComponents: Record<SectionType, React.ComponentType<any>> = {
  'hero': Hero,
  'services': Services,
  'about': About,
  'team': Team,
  'trusted-clients': TrustedClients,
  'testimonials': Testimonials,
  'faq': Faq,
  'contact': Contact,
  'custom': () => null // Placeholder pour les sections personnalisées
};

const Index: React.FC = () => {
  const { sections, isLoading } = useSections();
  
  // Si les données sont en cours de chargement, afficher un indicateur
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  // Filtrer les sections visibles et les trier par ordre
  const visibleSections = sections
    .filter(section => section.visible)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {visibleSections.map(section => {
          const SectionComponent = sectionComponents[section.type];
          
          if (!SectionComponent) {
            console.warn(`No component found for section type: ${section.type}`);
            return null;
          }
          
          return (
            <section key={section.id} id={section.id}>
              <SectionComponent section={section} />
            </section>
          );
        })}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
