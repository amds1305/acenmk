
import React from 'react';
import { ArrowRight, Package, BarChart3, Users, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { getHomepageConfig } from '@/services/sectionsService';
import { Button } from './ui/button';

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
    <section id="hero" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-background dark:bg-gray-950">
      {/* Container principal */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Partie texte */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary">
                Solution Tout-en-Un
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {heroData?.title || 'Simplifiez la gestion de vos actifs numériques'}
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl">
                {heroData?.subtitle || 'Plateforme complète de gestion, suivi et optimisation de vos ressources digitales. Efficace, simple, sécurisée.'}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="h-12 px-6 gap-2 rounded-full">
                {heroData?.ctaText || 'Commencer gratuitement'}
                <ArrowRight className="h-5 w-5" />
              </Button>
              
              <Button variant="outline" size="lg" className="h-12 px-6 rounded-full">
                {heroData?.ctaSecondaryText || 'Voir la démo'}
              </Button>
            </div>
            
            {/* Bannière de confiance */}
            <div className="pt-8 border-t border-border">
              <p className="text-sm font-medium text-muted-foreground mb-4">
                Ils nous font déjà confiance :
              </p>
              <div className="flex flex-wrap gap-8">
                <img src="https://via.placeholder.com/120x40?text=Logo" alt="Client" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
                <img src="https://via.placeholder.com/120x40?text=Logo" alt="Client" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
                <img src="https://via.placeholder.com/120x40?text=Logo" alt="Client" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
                <img src="https://via.placeholder.com/120x40?text=Logo" alt="Client" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
          
          {/* Partie illustration/dashboard */}
          <div className="relative">
            <div className="rounded-2xl bg-gradient-to-br from-background to-muted border border-border shadow-xl overflow-hidden">
              <div className="aspect-[4/3] relative">
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                <img 
                  src="https://via.placeholder.com/800x600?text=Dashboard" 
                  alt="Dashboard" 
                  className="w-full h-full object-cover rounded-xl"
                />
                
                {/* Badges flottants */}
                <div className="absolute -left-6 top-1/4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg animate-float">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute right-12 top-12 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg animate-float animation-delay-300">
                  <BarChart3 className="h-6 w-6 text-green-500" />
                </div>
                <div className="absolute -right-4 bottom-1/4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg animate-float animation-delay-200">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bannière de fonctionnalités */}
        <div className="mt-16 pt-10 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Package className="h-6 w-6" />, title: "Gestion d'actifs", desc: "Suivez et gérez tous vos actifs numériques en un seul endroit." },
              { icon: <BarChart3 className="h-6 w-6" />, title: "Analyses avancées", desc: "Tableaux de bord et visualisations pour des décisions éclairées." },
              { icon: <Users className="h-6 w-6" />, title: "Collaboration", desc: "Travaillez en équipe avec des permissions et workflows adaptés." },
              { icon: <CheckCircle className="h-6 w-6" />, title: "Sécurité intégrée", desc: "Protection des données et contrôle d'accès avancé." },
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-start space-y-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Background decorations */}
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-primary/5 to-transparent -z-10"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-200/10 rounded-full blur-3xl -z-10"></div>
    </section>
  );
};

export default Hero;
