import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { getHomepageConfig } from '@/services/sections';
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

// Type pour les blocs personnalisés
export interface HeroBlock {
  id: string;
  type: 'text' | 'image' | 'button' | 'stat';
  content: string;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: string;
    height: string;
  };
  style: {
    color?: string;
    fontSize?: string;
    fontWeight?: string;
    textAlign?: 'left' | 'center' | 'right';
    backgroundColor?: string;
    borderRadius?: string;
    padding?: string;
  };
}

// Type pour le style des boutons
export interface ButtonStyle {
  backgroundColor: string;
  textColor: string;
  borderRadius: string;
  borderColor: string;
  borderWidth: string;
  hoverBackgroundColor?: string;
}

// Type pour les versions du Hero
export interface HeroVersion extends HeroData {
  id: string;
  name: string;
  textColor: string;
  titleFontSize: string;
  subtitleFontSize: string;
  backgroundColor: string;
  backgroundType: 'color' | 'image' | 'gradient';
  backgroundGradient?: string;
  marginTop: string;
  marginBottom: string;
  padding: string;
  blocks: HeroBlock[];
  buttonStyle?: {
    primary: ButtonStyle;
    secondary: ButtonStyle;
  };
}

// Type pour les paramètres du carousel
export interface HeroCarouselSettings {
  enabled: boolean;
  transitionTime: number; // seconds
  transitionType: 'fade' | 'slide' | 'zoom';
  autoplay: boolean;
  autoplaySpeed: number; // seconds
}

// Fonction pour récupérer les données du Hero
const fetchHeroData = async (): Promise<HeroData> => {
  try {
    // Utiliser le nouveau service pour récupérer les données
    const config = await getHomepageConfig();
    
    const heroSection = config.sections.find(section => section.type === 'hero');
    if (heroSection && heroSection.data) {
      return heroSection.data as HeroData;
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
  } catch (error) {
    console.error("Error fetching hero data:", error);
    // Return default values in case of error
    return {
      title: 'Solutions numériques innovantes',
      subtitle: 'Nous accompagnons les entreprises dans leur transformation numérique.',
      ctaText: 'Découvrir nos services',
      ctaSecondaryText: 'Nous contacter',
      backgroundImage: '',
    };
  }
};

const Hero = () => {
  const { data: heroData } = useQuery({
    queryKey: ['heroData'],
    queryFn: fetchHeroData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // État pour suivre la version active dans le cas d'un carousel
  const [activeVersionIndex, setActiveVersionIndex] = useState(0);
  const [heroSettings, setHeroSettings] = useState<any>(null);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  // Récupérer les paramètres avancés du Hero
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const config = await getHomepageConfig();
        const heroSection = config.sections.find(section => section.type === 'hero');
        if (heroSection && heroSection.data && heroSection.data.settings) {
          setHeroSettings(heroSection.data.settings);
        }
      } catch (error) {
        console.error("Error fetching hero settings:", error);
      }
    };
    
    fetchSettings();
  }, []);

  // Effet pour animer les éléments au chargement
  useEffect(() => {
    const animateElements = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('appeared');
        }, 150 * index);
      });
    };
    
    animateElements();
  }, []);

  // Effet pour gérer le défilement automatique du carousel
  useEffect(() => {
    if (
      heroSettings && 
      heroSettings.versions && 
      heroSettings.versions.length > 1 && 
      heroSettings.carousel && 
      heroSettings.carousel.enabled && 
      heroSettings.carousel.autoplay && 
      !isCarouselPaused
    ) {
      const interval = setInterval(() => {
        setActiveVersionIndex(prev => 
          prev === heroSettings.versions.length - 1 ? 0 : prev + 1
        );
      }, heroSettings.carousel.autoplaySpeed * 1000);
      
      return () => clearInterval(interval);
    }
  }, [heroSettings, activeVersionIndex, isCarouselPaused]);

  // Default hero component if data is not loaded or there's an error
  if (!heroData) {
    return (
      <section id="hero" className="bg-gray-900 text-white py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Solutions numériques innovantes</h1>
          <p className="text-xl mb-8">Nous accompagnons les entreprises dans leur transformation numérique.</p>
          <div className="flex gap-4 flex-wrap">
            <Button asChild>
              <a href="#services">Découvrir nos services</a>
            </Button>
            <Button variant="outline">
              <a href="#contact">Nous contacter</a>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // Si les paramètres avancés du Hero sont disponibles
  if (heroSettings && heroSettings.versions && heroSettings.versions.length > 0) {
    // Obtenir la version active
    const activeVersion = heroSettings.versions[activeVersionIndex];
    
    // Générer le style pour l'arrière-plan en fonction du type
    const getBackgroundStyle = () => {
      if (activeVersion.backgroundType === 'image' && activeVersion.backgroundImage) {
        return {
          backgroundImage: `url(${activeVersion.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        };
      } else if (activeVersion.backgroundType === 'gradient' && activeVersion.backgroundGradient) {
        return {
          background: activeVersion.backgroundGradient,
        };
      } else {
        return {
          backgroundColor: activeVersion.backgroundColor || '#1a1f2c',
        };
      }
    };

    // Générer le style pour un bloc
    const getBlockStyle = (block: HeroBlock) => {
      return {
        position: 'absolute' as const,
        left: `${block.position.x}px`,
        top: `${block.position.y}px`,
        width: block.size.width,
        height: block.size.height,
        color: block.style.color,
        fontSize: block.style.fontSize,
        fontWeight: block.style.fontWeight,
        textAlign: block.style.textAlign as 'left' | 'center' | 'right',
        backgroundColor: block.style.backgroundColor,
        borderRadius: block.style.borderRadius,
        padding: block.style.padding,
      };
    };

    // Style pour les boutons en fonction des paramètres
    const getPrimaryButtonStyle = () => {
      if (activeVersion.buttonStyle?.primary) {
        return {
          backgroundColor: activeVersion.buttonStyle.primary.backgroundColor,
          color: activeVersion.buttonStyle.primary.textColor,
          borderRadius: activeVersion.buttonStyle.primary.borderRadius,
          borderColor: activeVersion.buttonStyle.primary.borderColor,
          borderWidth: activeVersion.buttonStyle.primary.borderWidth,
          borderStyle: 'solid',
        };
      }
      return {};
    };

    const getSecondaryButtonStyle = () => {
      if (activeVersion.buttonStyle?.secondary) {
        return {
          backgroundColor: activeVersion.buttonStyle.secondary.backgroundColor,
          color: activeVersion.buttonStyle.secondary.textColor,
          borderRadius: activeVersion.buttonStyle.secondary.borderRadius,
          borderColor: activeVersion.buttonStyle.secondary.borderColor,
          borderWidth: activeVersion.buttonStyle.secondary.borderWidth,
          borderStyle: 'solid',
        };
      }
      return {};
    };

    // Rendu d'un bloc en fonction de son type
    const renderBlock = (block: HeroBlock) => {
      switch (block.type) {
        case 'text':
          return <div style={getBlockStyle(block)}>{block.content}</div>;
        case 'image':
          return (
            <img 
              src={block.content} 
              alt="Block content" 
              style={getBlockStyle(block)} 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/400x200?text=Image+Error';
              }}
            />
          );
        case 'button':
          return <button className="hover:opacity-90 transition-opacity" style={getBlockStyle(block)}>{block.content}</button>;
        case 'stat':
          return (
            <div style={getBlockStyle(block)} className="flex flex-col items-center">
              <div className="text-3xl font-bold">{block.content}</div>
              <div className="text-sm opacity-80">Statistique</div>
            </div>
          );
        default:
          return null;
      }
    };

    // Version avancée du Hero avec toutes les fonctionnalités
    return (
      <section 
        id="hero" 
        className="relative overflow-hidden transition-all duration-300"
        style={{
          ...getBackgroundStyle(),
          color: activeVersion.textColor || '#ffffff',
          marginTop: activeVersion.marginTop || '0',
          marginBottom: activeVersion.marginBottom || '0',
          padding: activeVersion.padding || '2rem',
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 md:py-20">
          <div className="max-w-4xl">
            <h1 className={`font-bold leading-tight tracking-tight mb-6 text-${activeVersion.titleFontSize || '4xl'} md:text-${activeVersion.titleFontSize || '6xl'}`}>
              {activeVersion.title}
            </h1>
            
            <p className={`mb-8 max-w-2xl text-${activeVersion.subtitleFontSize || 'lg'} md:text-${activeVersion.subtitleFontSize || 'xl'}`}>
              {activeVersion.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Button 
                asChild 
                className="rounded-md py-6 px-8 text-base font-medium"
                style={getPrimaryButtonStyle()}
              >
                <a href="#services">
                  {activeVersion.ctaText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                className="rounded-md py-6 px-8 text-base font-medium"
                style={getSecondaryButtonStyle()}
              >
                <a href="#contact">
                  {activeVersion.ctaSecondaryText}
                </a>
              </Button>
            </div>
          </div>
          
          {/* Blocs personnalisés */}
          {activeVersion.blocks && activeVersion.blocks.map((block) => (
            <div key={block.id} className="absolute">
              {renderBlock(block)}
            </div>
          ))}
          
          {/* Section "Ils nous font confiance" */}
          {activeVersion.showTrustedClients && activeVersion.trustedClients?.length > 0 && (
            <div className="mt-12 pt-10 border-t border-white/10">
              <div className="flex flex-col items-center">
                <p className="text-sm font-medium mb-8">
                  {activeVersion.trustedClientsTitle || 'Ils nous font confiance'}
                </p>
                <div className="flex flex-wrap gap-10 items-center justify-center">
                  {activeVersion.trustedClients.map((client) => (
                    <div key={client.id} className="h-8 md:h-10 w-auto opacity-60 hover:opacity-100 transition-opacity">
                      {client.websiteUrl ? (
                        <a href={client.websiteUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
                          <img 
                            src={client.logoUrl} 
                            alt={client.name} 
                            className="h-full w-auto grayscale hover:grayscale-0 transition-all duration-300" 
                            title={client.name}
                          />
                        </a>
                      ) : (
                        <img 
                          src={client.logoUrl} 
                          alt={client.name} 
                          className="h-full w-auto grayscale hover:grayscale-0 transition-all duration-300" 
                          title={client.name}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Indicateurs du carousel */}
          {heroSettings.carousel && 
           heroSettings.carousel.enabled && 
           heroSettings.versions.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {heroSettings.versions.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeVersionIndex ? 'bg-white scale-100' : 'bg-white/30 scale-75'
                  }`}
                  onClick={() => setActiveVersionIndex(index)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  // Version standard du Hero
  return (
    <section id="hero" className="bg-gray-900 text-white py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">{heroData.title}</h1>
        <p className="text-xl mb-8 max-w-2xl">{heroData.subtitle}</p>
        <div className="flex gap-4 flex-wrap">
          <Button asChild>
            <a href="#services">{heroData.ctaText || 'Découvrir nos services'}</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="#contact">{heroData.ctaSecondaryText || 'Nous contacter'}</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
