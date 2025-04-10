
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getHomepageConfig } from '@/services/sections';
import { cn } from '@/lib/utils';

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
    <section className="w-full h-screen relative overflow-hidden">
      {/* Fond avec gradient et texture pixellisée */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A1F2C] to-[#2C3241]">
        {/* Texture pixellisée en overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm33.414-6l5.95-5.95L45.95.636 40 6.586 34.05.636 32.636 2.05 38.586 8l-5.95 5.95 1.414 1.414L40 9.414l5.95 5.95 1.414-1.414L41.414 8zM40 48c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zM9.414 40l5.95-5.95-1.414-1.414L8 38.586l-5.95-5.95L.636 34.05 6.586 40l-5.95 5.95 1.414 1.414L8 41.414l5.95 5.95 1.414-1.414L9.414 40z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>
      
      {/* Grille pixellisée décalée */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 0h20L0 20z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '20px 20px'
        }}
      />
      
      {/* Contenu principal */}
      <div className="container mx-auto h-full flex flex-col justify-center px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <span className="inline-block text-sm font-light tracking-widest bg-[#9b87f5]/10 text-[#9b87f5] px-4 py-2 border border-[#9b87f5]/30 mb-6">
                INNOVATION DIGITALE
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-none tracking-tight font-sans">
              {heroData.title}
            </h1>
            <p className="text-lg text-[#8E9196] max-w-lg font-light">
              {heroData.subtitle}
            </p>
            <div className="flex flex-wrap gap-4 pt-6">
              <Button 
                size="lg" 
                className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white rounded-none border-none transition-colors duration-300 py-6 px-8"
                style={activeVersion?.buttonStyle?.primary ? {
                  backgroundColor: activeVersion.buttonStyle.primary.backgroundColor || '#9b87f5',
                  color: activeVersion.buttonStyle.primary.textColor || 'white',
                  borderRadius: '0px',
                  borderWidth: '0px'
                } : {}}
              >
                {heroData.ctaText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10 rounded-none transition-colors duration-300 py-6 px-8"
                style={activeVersion?.buttonStyle?.secondary ? {
                  backgroundColor: 'transparent',
                  color: activeVersion.buttonStyle.secondary.textColor || '#9b87f5',
                  borderRadius: '0px',
                  borderColor: activeVersion.buttonStyle.secondary.borderColor || '#9b87f5',
                  borderWidth: activeVersion.buttonStyle.secondary.borderWidth || '1px',
                  borderStyle: 'solid'
                } : {}}
              >
                {heroData.ctaSecondaryText}
              </Button>
            </div>
          </div>
          
          <div className="relative h-full max-h-[70vh] flex items-center justify-center">
            {/* Cadre avec effet glitch */}
            <div className="relative z-20 border-8 border-[#9b87f5]/30 shadow-2xl">
              {/* Effet glitch */}
              <div className="absolute inset-0 bg-[#9b87f5]/10 mix-blend-overlay z-10"></div>
              <div className="absolute -inset-1 bg-[#9b87f5]/5 z-0 glitch-effect"></div>
              
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3" 
                alt="Digital Solutions" 
                className="w-full h-auto object-cover max-h-[60vh] relative z-0"
              />
              
              {/* Scanlines effect */}
              <div className="absolute inset-0 bg-scanlines opacity-10 z-20"></div>
            </div>
            
            {/* Éléments décoratifs */}
            <div className="absolute w-96 h-96 bg-[#9b87f5]/10 rounded-full blur-3xl -bottom-48 -right-48"></div>
            <div className="absolute w-64 h-64 bg-[#7E69AB]/10 rounded-full blur-3xl -top-32 -right-32"></div>
            
            {/* Éléments géométriques pixellisés */}
            <div className="absolute -bottom-10 left-10 w-20 h-20 border-4 border-[#9b87f5]/30 transform rotate-45"></div>
            <div className="absolute top-10 -right-10 w-32 h-4 bg-[#9b87f5]/20"></div>
            <div className="absolute -top-10 left-20 w-4 h-32 bg-[#9b87f5]/20"></div>
          </div>
        </div>
        
        {/* Section "Ils nous font confiance" - Conditionnelle */}
        {heroData.showTrustedClients && heroData.trustedClients?.length > 0 && (
          <div className="absolute bottom-12 left-0 right-0 border-t border-white/10 pt-8">
            <div className="container mx-auto">
              <div className="flex flex-col items-center">
                <p className="text-sm font-light tracking-widest text-[#8E9196] uppercase mb-6">
                  {heroData.trustedClientsTitle || 'Ils nous font confiance'}
                </p>
                <div className="flex flex-wrap gap-10 items-center justify-center">
                  {heroData.trustedClients.map((client) => (
                    <div key={client.id} className="h-8 md:h-10 w-auto opacity-60 hover:opacity-100 transition-opacity">
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
          </div>
        )}
      </div>
      
      {/* Styles spécifiques pour les effets */}
      <style jsx>{`
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        .glitch-effect {
          animation: glitch 10s infinite;
        }
        .bg-scanlines {
          background: linear-gradient(
            to bottom,
            transparent 50%,
            rgba(0, 0, 0, 0.1) 50%
          );
          background-size: 100% 4px;
        }
      `}</style>
    </section>
  );
};

export default NmkFireHero;
