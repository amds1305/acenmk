
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getHomepageConfig } from '@/services/mysql';

const NmkKinkHero = () => {
  const { data: config } = useQuery({
    queryKey: ['homeConfig'],
    queryFn: getHomepageConfig
  });

  // Get hero data from config or use defaults
  const defaultHeroData = {
    title: "Conception Innovante & Solutions Numériques",
    subtitle: "Des solutions digitales sur mesure pour transformer votre vision en réalité.",
    ctaText: "Nos services",
    ctaUrl: "#services",
    secondaryCtaText: "Contactez-nous",
    secondaryCtaUrl: "#contact"
  };

  const heroData = config?.sectionData?.hero 
    ? { ...defaultHeroData, ...config.sectionData.hero } 
    : defaultHeroData;

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-[#121212] text-white">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589652717521-10c0d092dea9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3')] bg-cover bg-center opacity-30"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block mb-8 px-3 py-1 border border-white/20 rounded-full text-sm font-medium bg-white/5 backdrop-blur-sm">
            Design • Développement • Innovation
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            {heroData.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
            {heroData.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-black hover:bg-gray-200 rounded-full">
              <a href={heroData.ctaUrl || "#services"}>
                {heroData.ctaText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            
            {heroData.secondaryCtaText && (
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10 rounded-full">
                <a href={heroData.secondaryCtaUrl || "#contact"}>
                  {heroData.secondaryCtaText}
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#121212] to-transparent"></div>
    </section>
  );
};

export default NmkKinkHero;
