
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { getHomepageConfig } from '@/services/sectionsService';
import { Button } from '@/components/ui/button';
import { ClientLogo } from '@/types/sections';

export interface HeroData {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaSecondaryText: string;
  backgroundImage: string;
  showTrustedClients?: boolean;
  trustedClientsTitle?: string;
  trustedClients?: ClientLogo[];
}

// Fonction pour récupérer les données du Hero
const fetchHeroData = async (): Promise<HeroData> => {
  // Utiliser le nouveau service pour récupérer les données
  const config = getHomepageConfig();
  
  if (config.sectionData && config.sectionData.hero) {
    return config.sectionData.hero as HeroData;
  }
  
  // Valeurs par défaut si aucune données n'est stockée
  return {
    title: 'Solutions numériques innovantes pour votre entreprise',
    subtitle: 'Nous accompagnons les entreprises dans leur transformation numérique avec des solutions sur mesure et des experts passionnés.',
    ctaText: 'Découvrir nos services',
    ctaSecondaryText: 'Nous contacter',
    backgroundImage: '',
    showTrustedClients: true,
    trustedClientsTitle: 'Ils nous font confiance',
    trustedClients: [
      {
        id: '1',
        name: 'Client 1',
        logoUrl: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3',
      },
      {
        id: '2',
        name: 'Client 2',
        logoUrl: 'https://images.unsplash.com/photo-1614680376408-16afefa3332b?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3',
      },
      {
        id: '3',
        name: 'Client 3',
        logoUrl: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3',
      },
      {
        id: '4',
        name: 'Client 4',
        logoUrl: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3',
      }
    ]
  };
};

const Hero = () => {
  const { data: heroData } = useQuery({
    queryKey: ['heroData'],
    queryFn: fetchHeroData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <section id="hero" className="relative min-h-screen flex items-center elite-gradient text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 dot-pattern opacity-20"></div>
      
      {/* Background animated shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-indigo-400 rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDuration: '12s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 py-20 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8 animate-fade-in">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gradient">
                {heroData?.title || 'Solutions numériques innovantes pour votre entreprise'}
              </h1>
              <div className="w-24 h-1.5 bg-primary mt-8"></div>
            </div>
            
            <p className="text-xl text-gray-200 max-w-2xl mt-6">
              {heroData?.subtitle || 'Nous accompagnons les entreprises dans leur transformation numérique avec des solutions sur mesure et des experts passionnés.'}
            </p>
            
            <div className="flex flex-wrap gap-4 pt-8">
              <Button 
                asChild 
                size="lg"
                className="button-animation bg-[#ca3c66] hover:bg-[#ca3c66]/90 text-white font-medium rounded-md group"
              >
                <a href="#services">
                  {heroData?.ctaText || 'Découvrir nos services'}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="bg-white/10 text-white backdrop-blur-sm border border-white/20 hover:bg-white/20 rounded-md"
              >
                <a href="#contact">
                  {heroData?.ctaSecondaryText || 'Nous contacter'}
                </a>
              </Button>
            </div>
          </div>
          
          <div className="lg:col-span-5 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full bg-[#ca3c66]/20 rounded-xl animate-pulse" style={{ animationDuration: '6s' }}></div>
              <div className="glass-panel bg-white/5 backdrop-blur-sm border border-white/20 overflow-hidden rounded-xl relative hover-scale">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3" 
                  alt="Digital Solutions" 
                  className="w-full h-auto transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Section "Ils nous font confiance" */}
        {heroData?.showTrustedClients && heroData?.trustedClients?.length > 0 && (
          <div className="mt-24 pt-10 border-t border-white/10 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <p className="text-sm font-medium text-gray-300 mb-4">
              {heroData.trustedClientsTitle || 'Ils nous font confiance'}
            </p>
            <div className="flex flex-wrap gap-8 items-center">
              {heroData.trustedClients.map((client) => (
                <div key={client.id} className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity">
                  {client.websiteUrl ? (
                    <a href={client.websiteUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
                      <img 
                        src={client.logoUrl} 
                        alt={client.name} 
                        className="h-full w-auto brightness-0 invert hover-scale" 
                        title={client.name}
                      />
                    </a>
                  ) : (
                    <img 
                      src={client.logoUrl} 
                      alt={client.name} 
                      className="h-full w-auto brightness-0 invert hover-scale" 
                      title={client.name}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-white/80 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
