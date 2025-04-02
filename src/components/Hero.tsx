
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
    <section id="hero" className="relative min-h-[90vh] flex items-center elite-gradient text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 dot-pattern opacity-20"></div>
      
      {/* Blue light effect */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {heroData?.title || 'Solutions numériques innovantes pour votre entreprise'}
              </h1>
              <div className="w-20 h-1.5 bg-primary mt-8"></div>
            </div>
            
            <p className="text-xl text-gray-200 max-w-2xl mt-6">
              {heroData?.subtitle || 'Nous accompagnons les entreprises dans leur transformation numérique avec des solutions sur mesure et des experts passionnés.'}
            </p>
            
            <div className="flex flex-wrap gap-4 pt-8">
              <a href="#services" className="elite-button group">
                {heroData?.ctaText || 'Découvrir nos services'}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              
              <a href="#contact" className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-white/10 text-white backdrop-blur-sm border border-white/20 font-medium transition-all duration-200 hover:bg-white/20">
                {heroData?.ctaSecondaryText || 'Nous contacter'}
              </a>
            </div>
          </div>
          
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full bg-primary/20 rounded-xl"></div>
              <div className="glass-panel bg-white/5 backdrop-blur-sm border border-white/20 overflow-hidden rounded-xl relative">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" 
                  alt="Digital Solutions" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-24 pt-10 border-t border-white/10">
          <p className="text-sm font-medium text-gray-300 mb-4">Ils nous font confiance</p>
          <div className="flex flex-wrap gap-8 items-center">
            <div className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity">
              <img src="https://via.placeholder.com/120x40?text=Logo" alt="Client" className="h-full w-auto brightness-0 invert" />
            </div>
            <div className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity">
              <img src="https://via.placeholder.com/120x40?text=Logo" alt="Client" className="h-full w-auto brightness-0 invert" />
            </div>
            <div className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity">
              <img src="https://via.placeholder.com/120x40?text=Logo" alt="Client" className="h-full w-auto brightness-0 invert" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
