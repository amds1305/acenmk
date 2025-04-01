
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { getHomepageConfig } from '@/services/sectionsService';

export interface HeroData {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaSecondaryText: string;
  backgroundImage: string;
}

// Fonction pour récupérer les données du Hero
const fetchHeroData = async (): Promise<HeroData> => {
  // Utiliser le nouveau service pour récupérer les données
  const config = getHomepageConfig();
  
  if (config.sectionData && config.sectionData.hero) {
    return config.sectionData.hero as HeroData;
  }
  
  // Valeurs par défaut si aucune donnée n'est stockée
  return {
    title: 'Solutions numériques innovantes pour votre entreprise',
    subtitle: 'Nous accompagnons les entreprises dans leur transformation numérique avec des solutions sur mesure et des experts passionnés.',
    ctaText: 'Découvrir nos services',
    ctaSecondaryText: 'Nous contacter',
    backgroundImage: '',
  };
};

const Hero = () => {
  const { data: heroData } = useQuery({
    queryKey: ['heroData'],
    queryFn: fetchHeroData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white">
      {/* Background decoration - Simplifiée comme sur shelf.nu */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-blue-50/80"></div>
        <div className="absolute bottom-32 left-10 w-40 h-40 rounded-full bg-blue-50/50"></div>
      </div>
      
      <div className="max-w-7xl mx-auto w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3 space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-secondary">
              {heroData?.title || 'Solutions numériques innovantes pour votre entreprise'}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              {heroData?.subtitle || 'Nous accompagnons les entreprises dans leur transformation numérique avec des solutions sur mesure et des experts passionnés.'}
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#services" className="btn-primary flex items-center gap-2">
                {heroData?.ctaText || 'Découvrir nos services'}
                <ArrowRight className="h-4 w-4" />
              </a>
              
              <a href="#contact" className="btn-secondary">
                {heroData?.ctaSecondaryText || 'Nous contacter'}
              </a>
            </div>
            
            <div className="flex flex-col gap-2 pt-8">
              <p className="text-sm font-medium text-gray-500">Ils nous font confiance :</p>
              <div className="flex flex-wrap gap-8 items-center">
                {/* Client logos avec style shelf.nu */}
                <div className="h-8 w-auto grayscale opacity-70 hover:opacity-100 transition-opacity">
                  <img src="https://via.placeholder.com/120x40?text=Logo" alt="Client" className="h-full w-auto" />
                </div>
                <div className="h-8 w-auto grayscale opacity-70 hover:opacity-100 transition-opacity">
                  <img src="https://via.placeholder.com/120x40?text=Logo" alt="Client" className="h-full w-auto" />
                </div>
                <div className="h-8 w-auto grayscale opacity-70 hover:opacity-100 transition-opacity">
                  <img src="https://via.placeholder.com/120x40?text=Logo" alt="Client" className="h-full w-auto" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="glass-panel shadow-xl overflow-hidden rounded-2xl">
              <div className="w-full">
                <img 
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop" 
                  alt="Digital Solutions" 
                  className="w-full h-auto object-cover aspect-video"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
