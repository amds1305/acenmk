
import React from 'react';
import { cn } from '@/lib/utils';
import { Settings, Database, Layers, BarChart, Globe, Shield, ArrowRight, MonitorSmartphone, Share2 } from 'lucide-react';
import { Card } from './ui/card';

const services = [
  {
    icon: <Layers className="h-10 w-10 text-primary" />,
    title: 'Gestion des actifs',
    description: 'Centralisez et organisez tous vos actifs numériques. Catégorisation intelligente et recherche avancée.',
    delay: 0,
  },
  {
    icon: <Database className="h-10 w-10 text-primary" />,
    title: 'Stockage sécurisé',
    description: 'Stockage cloud sécurisé avec chiffrement de bout en bout et contrôles d\'accès personnalisables.',
    delay: 100,
  },
  {
    icon: <BarChart className="h-10 w-10 text-primary" />,
    title: 'Analyses et rapports',
    description: 'Suivez l\'utilisation et obtenez des insights précieux grâce à des tableaux de bord visuels et intuitifs.',
    delay: 200,
  },
  {
    icon: <Share2 className="h-10 w-10 text-primary" />,
    title: 'Collaboration d\'équipe',
    description: 'Favorisez le travail d\'équipe avec des outils de collaboration en temps réel et des permissions granulaires.',
    delay: 300,
  },
  {
    icon: <MonitorSmartphone className="h-10 w-10 text-primary" />,
    title: 'Multi-plateforme',
    description: 'Accédez à vos ressources depuis n\'importe quel appareil avec nos applications web et mobiles synchronisées.',
    delay: 400,
  },
  {
    icon: <Shield className="h-10 w-10 text-primary" />,
    title: 'Conformité et sécurité',
    description: 'Respect des normes RGPD et implémentation des meilleures pratiques de sécurité pour vos données sensibles.',
    delay: 500,
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Solutions complètes de gestion d'actifs</h2>
          <p className="text-xl text-muted-foreground">
            Notre plateforme offre tous les outils nécessaires pour simplifier et optimiser la gestion de vos ressources numériques
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {services.map((service, index) => (
            <Card 
              key={index}
              className={cn(
                "bg-background p-8 opacity-0 animate-fade-in-up border border-border/50 hover:border-primary/30 transition-all hover:shadow-md",
                `animation-delay-${service.delay}`
              )}
            >
              <div className="inline-flex items-center justify-center p-3 rounded-xl bg-primary/10 mb-6">
                {service.icon}
              </div>
              
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-6">{service.description}</p>
              
              <a href="#" className="inline-flex items-center text-primary font-medium hover:underline">
                En savoir plus
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="#contact" 
            className={cn(
              "inline-flex items-center justify-center h-12 px-8 rounded-full",
              "bg-primary text-primary-foreground font-medium transition-all",
              "hover:bg-primary/90 hover:shadow-md"
            )}
          >
            Explorer toutes nos fonctionnalités
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
