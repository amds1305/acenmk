
import React from 'react';
import { cn } from '@/lib/utils';
import { Code, Database, Layout, Smartphone, Globe, Shield, ArrowRight, BarChart } from 'lucide-react';

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
    <section id="services" className="section py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="text-center">
        <span className="bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full inline-block mb-4">Nos Services</span>
        <h2 className="section-title heading-underline-center">Solutions Digitales Expertes</h2>
        <p className="section-subtitle mx-auto mt-12 max-w-3xl">
          Des solutions technologiques complètes pour répondre à tous vos besoins numériques
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        {services.map((service, index) => (
          <div 
            key={index}
            className={cn(
              "group glass-panel p-8 card-hover opacity-0 animate-fade-in-up rounded-xl border border-gray-100 relative overflow-hidden",
              "hover:shadow-lg hover:border-primary/30 transition-all duration-300",
              "hover:translate-y-[-5px]",
              `animation-delay-${service.delay}`
            )}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-10 -mt-10 transform transition-transform group-hover:scale-150 duration-500 ease-in-out"></div>
            
            <div className="inline-flex items-center justify-center p-3 rounded-xl bg-primary/10 mb-6 relative z-10">
              {service.icon}
            </div>
            
            <h3 className="text-xl font-semibold mb-4 font-display relative z-10">{service.title}</h3>
            <p className="text-gray-600 mb-6 relative z-10">{service.description}</p>
            
            <a href="#contact" className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors relative z-10">
              En savoir plus
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        ))}
      </div>
      
      <div className="mt-20 text-center">
        <a 
          href="#contact" 
          className={cn(
            "group inline-flex items-center justify-center h-14 px-8 rounded-full",
            "bg-primary text-white font-medium transition-all duration-300",
            "hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
          )}
        >
          Discuter de votre projet
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
};

export default Services;
