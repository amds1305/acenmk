
import React from 'react';
import { cn } from '@/lib/utils';
import { Code, Database, Layout, Smartphone, Globe, BarChart, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: <Code className="h-6 w-6 text-primary" />,
    title: 'Développement sur mesure',
    description: 'Applications web et mobiles personnalisées selon vos besoins spécifiques et les dernières technologies.',
    delay: 0,
  },
  {
    icon: <Database className="h-6 w-6 text-primary" />,
    title: 'Infrastructure cloud',
    description: 'Solutions d\'hébergement sécurisées, évolutives et performantes pour vos applications critiques.',
    delay: 100,
  },
  {
    icon: <Layout className="h-6 w-6 text-primary" />,
    title: 'UX/UI Design',
    description: 'Interfaces utilisateur intuitives et esthétiques qui améliorent l\'expérience de vos utilisateurs.',
    delay: 200,
  },
  {
    icon: <Smartphone className="h-6 w-6 text-primary" />,
    title: 'Applications mobiles',
    description: 'Applications natives et hybrides pour iOS et Android avec une expérience utilisateur fluide.',
    delay: 300,
  },
  {
    icon: <Globe className="h-6 w-6 text-primary" />,
    title: 'Transformation digitale',
    description: 'Accompagnement stratégique pour digitaliser vos processus métier et gagner en efficacité.',
    delay: 400,
  },
  {
    icon: <BarChart className="h-6 w-6 text-primary" />,
    title: 'Intelligence artificielle',
    description: 'Intégration de solutions d\'IA et machine learning pour optimiser vos processus et analyses.',
    delay: 500,
  },
];

const Services = () => {
  return (
    <section id="services" className="section bg-gray-50">
      <div className="text-center">
        <span className="inline-block text-sm font-medium text-primary mb-4">Nos Services</span>
        <h2 className="section-title heading-underline-center text-secondary">Solutions Digitales Expertes</h2>
        <p className="section-subtitle mx-auto mt-12 max-w-3xl">
          Des solutions technologiques complètes pour répondre à tous vos besoins numériques
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
        {services.map((service, index) => (
          <div 
            key={index}
            className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="mb-4 inline-flex items-center justify-center p-2 rounded-lg bg-primary/10">
              {service.icon}
            </div>
            
            <h3 className="text-xl font-semibold mb-3 text-secondary">{service.title}</h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            
            <a href="#contact" className="text-primary font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
              En savoir plus
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <a 
          href="#contact" 
          className="btn-primary"
        >
          Discuter de votre projet
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </div>
    </section>
  );
};

export default Services;
