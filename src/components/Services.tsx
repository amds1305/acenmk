
import React from 'react';
import { cn } from '@/lib/utils';
import { Code, Database, Layout, Smartphone, Globe, BarChart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: <Code className="h-10 w-10 text-white" />,
    title: 'Développement sur mesure',
    description: 'Applications web et mobiles personnalisées selon vos besoins spécifiques et les dernières technologies.',
    delay: 0,
  },
  {
    icon: <Database className="h-10 w-10 text-white" />,
    title: 'Infrastructure cloud',
    description: 'Solutions d\'hébergement sécurisées, évolutives et performantes pour vos applications critiques.',
    delay: 100,
  },
  {
    icon: <Layout className="h-10 w-10 text-white" />,
    title: 'UX/UI Design',
    description: 'Interfaces utilisateur intuitives et esthétiques qui améliorent l\'expérience de vos utilisateurs.',
    delay: 200,
  },
  {
    icon: <Smartphone className="h-10 w-10 text-white" />,
    title: 'Applications mobiles',
    description: 'Applications natives et hybrides pour iOS et Android avec une expérience utilisateur fluide.',
    delay: 300,
  },
  {
    icon: <Globe className="h-10 w-10 text-white" />,
    title: 'Transformation digitale',
    description: 'Accompagnement stratégique pour digitaliser vos processus métier et gagner en efficacité.',
    delay: 400,
  },
  {
    icon: <BarChart className="h-10 w-10 text-white" />,
    title: 'Intelligence artificielle',
    description: 'Intégration de solutions d\'IA et machine learning pour optimiser vos processus et analyses.',
    delay: 500,
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium bg-white/10 text-white px-4 py-1.5 rounded-full mb-4">Nos Expertises</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
            Solutions Digitales Expertes
          </h2>
          <div className="w-20 h-1 bg-white mx-auto"></div>
          <p className="text-lg text-gray-300 mt-8 max-w-3xl mx-auto">
            Des solutions technologiques complètes pour répondre à tous vos besoins numériques
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="mb-6 p-4 rounded-lg bg-white/10 inline-flex">
                {service.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-white">
                {service.title}
              </h3>
              
              <p className="text-gray-300 mb-6">
                {service.description}
              </p>
              
              <a href="#contact" className="text-white font-medium inline-flex items-center gap-1 group underline-animation">
                En savoir plus
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button 
            asChild
            size="lg"
            className="bg-white hover:bg-white/90 text-black rounded-full group"
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
