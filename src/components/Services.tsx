
import React from 'react';
import { cn } from '@/lib/utils';
import { Code, Database, Layout, Smartphone, Globe, BarChart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: <Code className="h-10 w-10 text-primary" />,
    title: 'Développement sur mesure',
    description: 'Applications web et mobiles personnalisées selon vos besoins spécifiques et les dernières technologies.',
    delay: 0,
  },
  {
    icon: <Database className="h-10 w-10 text-primary" />,
    title: 'Infrastructure cloud',
    description: 'Solutions d\'hébergement sécurisées, évolutives et performantes pour vos applications critiques.',
    delay: 100,
  },
  {
    icon: <Layout className="h-10 w-10 text-primary" />,
    title: 'UX/UI Design',
    description: 'Interfaces utilisateur intuitives et esthétiques qui améliorent l\'expérience de vos utilisateurs.',
    delay: 200,
  },
  {
    icon: <Smartphone className="h-10 w-10 text-primary" />,
    title: 'Applications mobiles',
    description: 'Applications natives et hybrides pour iOS et Android avec une expérience utilisateur fluide.',
    delay: 300,
  },
  {
    icon: <Globe className="h-10 w-10 text-primary" />,
    title: 'Transformation digitale',
    description: 'Accompagnement stratégique pour digitaliser vos processus métier et gagner en efficacité.',
    delay: 400,
  },
  {
    icon: <BarChart className="h-10 w-10 text-primary" />,
    title: 'Intelligence artificielle',
    description: 'Intégration de solutions d\'IA et machine learning pour optimiser vos processus et analyses.',
    delay: 500,
  },
];

const Services = () => {
  return (
    <section id="services" className="elite-section tech-gradient py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <span className="inline-block text-sm font-medium bg-primary/10 text-primary px-4 py-1.5 rounded-full mb-4">Nos Expertises</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-secondary">Solutions Digitales Expertes</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-8 max-w-3xl mx-auto">
            Des solutions technologiques complètes pour répondre à tous vos besoins numériques
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className={cn(
                "elite-card group h-full transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl opacity-0 animate-fade-in",
                `animation-delay-${service.delay}`
              )}
            >
              <div className="flex flex-col h-full">
                <div className="mb-6 p-4 rounded-lg bg-primary/10 inline-flex group-hover:bg-primary/20 transition-colors">
                  {service.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-secondary group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">{service.description}</p>
                
                <a href="#contact" className="text-primary font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all mt-auto underline-animation">
                  En savoir plus
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Button 
            asChild
            size="lg"
            className="button-animation bg-primary hover:bg-primary/90 text-white group"
          >
            <a href="#contact">
              Discuter de votre projet
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
