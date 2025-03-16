
import React from 'react';
import { cn } from '@/lib/utils';
import { Code, Database, Layout, Smartphone, Globe, Shield, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: <Code className="h-8 w-8 text-primary" />,
    title: 'Développement sur mesure',
    description: 'Applications web et mobiles personnalisées selon vos besoins spécifiques et les dernières technologies.',
    delay: 0,
  },
  {
    icon: <Database className="h-8 w-8 text-primary" />,
    title: 'Infrastructure cloud',
    description: 'Solutions d\'hébergement sécurisées, évolutives et performantes pour vos applications critiques.',
    delay: 100,
  },
  {
    icon: <Layout className="h-8 w-8 text-primary" />,
    title: 'UX/UI Design',
    description: 'Interfaces utilisateur intuitives et esthétiques qui améliorent l\'expérience de vos utilisateurs.',
    delay: 200,
  },
  {
    icon: <Smartphone className="h-8 w-8 text-primary" />,
    title: 'Applications mobiles',
    description: 'Applications natives et hybrides pour iOS et Android avec une expérience utilisateur fluide.',
    delay: 300,
  },
  {
    icon: <Globe className="h-8 w-8 text-primary" />,
    title: 'Transformation digitale',
    description: 'Accompagnement stratégique pour digitaliser vos processus métier et gagner en efficacité.',
    delay: 400,
  },
  {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: 'Cybersécurité',
    description: 'Protection de vos données et systèmes contre les menaces avec des solutions de pointe.',
    delay: 500,
  },
];

const Services = () => {
  return (
    <section id="services" className="section bg-white">
      <div className="text-center">
        <h2 className="section-title heading-underline-center">Nos services</h2>
        <p className="section-subtitle mx-auto mt-12">
          Des solutions technologiques complètes pour répondre à tous vos besoins numériques
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        {services.map((service, index) => (
          <div 
            key={index}
            className={cn(
              "glass-panel p-8 card-hover opacity-0 animate-fade-in-up",
              "border border-gray-100 hover:border-primary/20 transition-all",
              `animation-delay-${service.delay}`
            )}
          >
            <div className="inline-flex items-center justify-center p-3 rounded-lg bg-primary/10 mb-5">
              {service.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3 font-display">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-20 text-center">
        <a 
          href="#contact" 
          className={cn(
            "group inline-flex items-center justify-center h-12 px-6 rounded-full",
            "bg-primary text-white font-medium transition-all duration-300",
            "hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
          )}
        >
          Discuter de votre projet
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
};

export default Services;
