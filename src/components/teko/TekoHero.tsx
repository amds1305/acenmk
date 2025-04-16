
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getHomepageConfig } from '@/services/supabase/sectionsService';

const TekoHero = () => {
  const { data: config } = useQuery({
    queryKey: ['homeConfig'],
    queryFn: getHomepageConfig,
  });
  
  // Récupérer les données du Hero
  const heroData = config?.sectionData?.hero || {
    title: 'Solutions numériques innovantes pour votre entreprise',
    subtitle: 'Nous accompagnons les entreprises dans leur transformation numérique avec des solutions sur mesure et des experts passionnés.',
    ctaText: 'Découvrir nos services',
    ctaSecondaryText: 'Nous contacter'
  };

  // Récupérer les paramètres avancés du Hero
  const heroSettings = config?.sectionData?.heroSettings;
  const activeVersion = heroSettings?.versions?.find(v => v.id === heroSettings.activeVersion) || heroSettings?.versions?.[0];
  
  return (
    <section className="relative bg-gray-900 text-white">
      {/* Fond sombre avec overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800"></div>
      
      {/* Contenu du hero */}
      <div className="container relative z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {heroData.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-lg">
              {heroData.subtitle}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                size="lg" 
                className="rounded-md bg-primary hover:bg-primary/90 text-white"
                style={activeVersion?.buttonStyle?.primary ? {
                  backgroundColor: activeVersion.buttonStyle.primary.backgroundColor,
                  color: activeVersion.buttonStyle.primary.textColor,
                  borderRadius: activeVersion.buttonStyle.primary.borderRadius,
                  borderColor: activeVersion.buttonStyle.primary.borderColor,
                  borderWidth: activeVersion.buttonStyle.primary.borderWidth,
                  borderStyle: 'solid'
                } : {}}
              >
                {heroData.ctaText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="rounded-md border-gray-500 text-white hover:bg-gray-800"
                style={activeVersion?.buttonStyle?.secondary ? {
                  backgroundColor: activeVersion.buttonStyle.secondary.backgroundColor,
                  color: activeVersion.buttonStyle.secondary.textColor,
                  borderRadius: activeVersion.buttonStyle.secondary.borderRadius,
                  borderColor: activeVersion.buttonStyle.secondary.borderColor,
                  borderWidth: activeVersion.buttonStyle.secondary.borderWidth,
                  borderStyle: 'solid'
                } : {}}
              >
                {heroData.ctaSecondaryText}
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3" 
                alt="Digital Solutions" 
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-500/30 rounded-full blur-xl"></div>
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-purple-500/30 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TekoHero;
