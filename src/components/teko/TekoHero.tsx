
import React from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getHomepageConfig } from '@/services/sections';
import { HeroData } from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { ClientLogo } from '@/types/sections';
import { Separator } from '@/components/ui/separator';

const TekoHero: React.FC = () => {
  const { data: heroData } = useQuery({
    queryKey: ['heroData'],
    queryFn: async () => {
      const config = getHomepageConfig();
      
      if (config.sectionData && config.sectionData.hero) {
        return config.sectionData.hero as HeroData;
      }
      
      return {
        title: 'Solutions numériques innovantes pour votre entreprise',
        subtitle: 'Nous accompagnons les entreprises dans leur transformation numérique avec des solutions sur mesure et des experts passionnés.',
        ctaText: 'Découvrir nos services',
        ctaSecondaryText: 'Nous contacter',
        backgroundImage: ''
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Fetch trusted clients data
  const { data: trustedClientsData } = useQuery({
    queryKey: ['trustedClientsData'],
    queryFn: async () => {
      const config = getHomepageConfig();
      
      if (config.sectionData && config.sectionData['trusted-clients']) {
        return config.sectionData['trusted-clients'] as any;
      }
      
      // Default data if none exists
      return {
        title: 'Brands we\'ve worked with',
        featuredLabel: 'Featured Clients',
        clients: [
          {
            id: '1',
            name: 'Monash University',
            logoUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3',
            category: 'University'
          },
          {
            id: '2',
            name: 'Transport NSW',
            logoUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3',
            category: 'Government'
          },
          {
            id: '3',
            name: 'Modern Dental Pacific',
            logoUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3',
            category: 'Public Company'
          },
          {
            id: '4',
            name: 'OZ Hair & Beauty',
            logoUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3',
            category: 'eCommerce'
          },
          {
            id: '5',
            name: 'Dragonfly',
            logoUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3',
            category: 'Acquired'
          },
          {
            id: '6',
            name: 'Renascent',
            logoUrl: 'https://images.unsplash.com/photo-1555421689-3f034debb7a6?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3',
            category: '$2b+ Projects Delivered'
          },
          {
            id: '7',
            name: 'Connec',
            logoUrl: 'https://images.unsplash.com/photo-1603969072881-b0fc7f3d77d7?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3',
            category: 'Acquired'
          },
          {
            id: '8',
            name: 'No Names',
            logoUrl: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3',
            category: 'Hospitality Company'
          }
        ]
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <section className="relative bg-[#0a0c10] text-white overflow-hidden min-h-screen flex items-center">
      {/* Background grid pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMxMjE1MjAiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6IiBmaWxsLW9wYWNpdHk9Ii4wNCIgZmlsbD0iI2ZmZiIvPjwvZz48L3N2Zz4K')]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c10]/20 via-[#0a0c10]/40 to-[#0a0c10]"></div>
      </div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <div className="max-w-4xl">
          {/* Eyebrow text */}
          <div className="inline-flex items-center gap-2 mb-6 text-xs md:text-sm font-medium bg-white/10 text-white/80 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
            <span className="bg-teal-500 w-2 h-2 rounded-full"></span>
            Innovation Numérique
            <ChevronRight className="h-3 w-3 opacity-60" />
          </div>
          
          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6">
            {heroData?.title || 'Solutions numériques innovantes pour votre entreprise'}
          </h1>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl">
            {heroData?.subtitle || 'Nous accompagnons les entreprises dans leur transformation numérique avec des solutions sur mesure et des experts passionnés.'}
          </p>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button 
              asChild 
              className="bg-white text-[#0a0c10] hover:bg-white/90 rounded-full py-6 px-8 text-base font-medium"
            >
              <a href="#services">
                {heroData?.ctaText || 'Découvrir nos services'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10 rounded-full py-6 px-8 text-base font-medium"
            >
              <a href="#contact">
                {heroData?.ctaSecondaryText || 'Nous contacter'}
              </a>
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-white/10 pt-10 mb-16">
            <div className="flex flex-col">
              <span className="text-3xl md:text-4xl font-bold text-white mb-1">95%</span>
              <span className="text-sm text-white/60">Satisfaction client</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl md:text-4xl font-bold text-white mb-1">200+</span>
              <span className="text-sm text-white/60">Projets réalisés</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl md:text-4xl font-bold text-white mb-1">15+</span>
              <span className="text-sm text-white/60">Années d'expérience</span>
            </div>
          </div>
          
          {/* Featured Clients Section */}
          {trustedClientsData?.clients && trustedClientsData.clients.length > 0 && (
            <div className="featured-clients border-t border-white/10 pt-16">
              <div className="text-center mb-10">
                {/* Featured Clients label - styled like the Innovation Numérique button */}
                <div className="inline-flex items-center gap-2 mb-4 text-xs md:text-sm font-medium bg-rose-50 text-rose-500 px-3 py-1 rounded-full">
                  <span className="bg-rose-500 w-2 h-2 rounded-full"></span>
                  {trustedClientsData.featuredLabel || 'Featured Clients'}
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold mt-6">
                  {trustedClientsData.title || 'Brands we\'ve worked with'}
                </h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 gap-y-16">
                {trustedClientsData.clients.map((client: ClientLogo & { category?: string }) => (
                  <div key={client.id} className="flex flex-col items-center">
                    <div className="h-16 flex items-center justify-center mb-4">
                      {client.websiteUrl ? (
                        <a 
                          href={client.websiteUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="transition-all duration-300"
                        >
                          <img 
                            src={client.logoUrl} 
                            alt={client.name} 
                            className="max-h-12 max-w-full object-contain"
                          />
                        </a>
                      ) : (
                        <img 
                          src={client.logoUrl} 
                          alt={client.name} 
                          className="max-h-12 max-w-full object-contain"
                        />
                      )}
                    </div>
                    {/* Category text below each logo */}
                    {client.category && (
                      <span className="text-sm text-white/60 text-center">
                        {client.category}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TekoHero;
