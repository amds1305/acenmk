
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getHomepageConfig } from '@/services/sections';

const NmkFireHero = () => {
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
    <section className="w-full relative">
      {/* Fond avec gradient et overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 opacity-95"></div>
      
      {/* Pattern en arrière-plan */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657l1.415 1.414L13.858 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 .828 17.272 13.556l-1.414-1.414L28 0h4zM.284 0l28 28-1.414 1.414L0 2.544v-2.26zm0 5.373l25.456 25.455-1.414 1.415L0 8.2v-2.83zm0 5.656l22.627 22.627-1.414 1.414L0 13.86v-2.83zm0 5.656l19.8 19.8-1.415 1.413L0 19.514v-2.83zm0 5.657l16.97 16.97-1.414 1.415L0 25.172v-2.83zM0 28l14.142 14.142-1.414 1.414L0 30.828v-2.83zm0 5.657L11.314 44.97l-1.414 1.415L0 36.485v-2.83zm0 5.657L8.485 47.8l-1.414 1.414L0 42.142v-2.83zm0 5.657l5.657 5.657-1.414 1.415L0 47.8v-2.83zm0 5.657l2.828 2.83-1.414 1.413L0 53.456v-2.83zM54.627 60L30 35.373 5.373 60H8.2L30 38.2 51.8 60h2.827zm-5.656 0L30 41.03 11.03 60h2.828L30 43.858 46.142 60h2.83zm-5.656 0L30 46.686 16.686 60h2.83L30 49.515 40.485 60h2.83zm-5.657 0L30 52.343 22.344 60h2.83L30 55.172 34.828 60h2.83zM32 60l-2-2-2 2h4zM59.716 0l-28 28 1.414 1.414L60 2.544V0h-.284zM60 5.373L34.544 30.828l1.414 1.415L60 8.2V5.374zm0 5.656L37.373 33.656l1.414 1.414L60 13.86v-2.83zm0 5.656l-19.8 19.8 1.415 1.413L60 19.514v-2.83zm0 5.657l-16.97 16.97 1.414 1.415L60 25.172v-2.83zM60 28L45.858 42.142l1.414 1.414L60 30.828V28zm0 5.657L48.686 44.97l1.414 1.415L60 36.485v-2.83zm0 5.657L51.515 47.8l1.414 1.414L60 42.142v-2.83zm0 5.657l-5.657 5.657 1.414 1.415L60 47.8v-2.83zm0 5.657l-2.828 2.83 1.414 1.413L60 53.456v-2.83zM39.9 16.385l1.414-1.414L30 3.658 18.686 14.97l1.415 1.415 9.9-9.9 9.9 9.9zm-2.83 2.828l1.415-1.414L30 9.313 21.515 17.8l1.414 1.413L30 11.8l7.07 7.07z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      ></div>
      
      {/* Contenu principal */}
      <div className="container mx-auto py-28 px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <span className="inline-block text-sm font-semibold bg-purple-600/30 text-white px-4 py-1.5 rounded-full mb-4">
                Innovation Digitale
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-none">
              {heroData.title}
            </h1>
            <p className="text-lg text-purple-100 max-w-lg">
              {heroData.subtitle}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                size="lg" 
                className="rounded-md bg-white text-purple-900 hover:bg-purple-100"
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
                className="rounded-md border-white text-white hover:bg-white/10"
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
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-purple-300/10">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-purple-900/30 mix-blend-overlay z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3" 
                alt="Digital Solutions" 
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>
            
            {/* Éléments décoratifs */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-400/30 rounded-full blur-3xl"></div>
            <div className="absolute -top-10 -right-10 w-60 h-60 bg-purple-700/20 rounded-full blur-3xl"></div>
            <div className="absolute -top-4 -right-4 w-20 h-20 border-4 border-purple-300/30 rounded-lg"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 border-4 border-purple-300/20 rounded-full"></div>
          </div>
        </div>
        
        {/* Section "Ils nous font confiance" - Conditionnelle */}
        {heroData.showTrustedClients && heroData.trustedClients?.length > 0 && (
          <div className="mt-20 pt-10 border-t border-purple-500/20">
            <div className="flex flex-col items-center">
              <p className="text-sm font-medium text-purple-200 mb-8">
                {heroData.trustedClientsTitle || 'Ils nous font confiance'}
              </p>
              <div className="flex flex-wrap gap-10 items-center justify-center">
                {heroData.trustedClients.map((client) => (
                  <div key={client.id} className="h-10 md:h-12 w-auto opacity-70 hover:opacity-100 transition-opacity">
                    {client.websiteUrl ? (
                      <a href={client.websiteUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
                        <img 
                          src={client.logoUrl} 
                          alt={client.name} 
                          className="h-full w-auto brightness-0 invert transition-all duration-300" 
                          title={client.name}
                        />
                      </a>
                    ) : (
                      <img 
                        src={client.logoUrl} 
                        alt={client.name} 
                        className="h-full w-auto brightness-0 invert transition-all duration-300" 
                        title={client.name}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default NmkFireHero;
