
import React from 'react';
import { ArrowRight, Code, Database, Layout, Smartphone, Globe, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: <Code className="h-10 w-10 text-purple-500" />,
    title: 'Développement sur mesure',
    description: 'Applications web et mobiles personnalisées selon vos besoins spécifiques et les dernières technologies.',
  },
  {
    icon: <Database className="h-10 w-10 text-purple-500" />,
    title: 'Infrastructure cloud',
    description: 'Solutions d\'hébergement sécurisées, évolutives et performantes pour vos applications critiques.',
  },
  {
    icon: <Layout className="h-10 w-10 text-purple-500" />,
    title: 'UX/UI Design',
    description: 'Interfaces utilisateur intuitives et esthétiques qui améliorent l\'expérience de vos utilisateurs.',
  },
  {
    icon: <Smartphone className="h-10 w-10 text-purple-500" />,
    title: 'Applications mobiles',
    description: 'Applications natives et hybrides pour iOS et Android avec une expérience utilisateur fluide.',
  },
  {
    icon: <Globe className="h-10 w-10 text-purple-500" />,
    title: 'Transformation digitale',
    description: 'Accompagnement stratégique pour digitaliser vos processus métier et gagner en efficacité.',
  },
  {
    icon: <BarChart className="h-10 w-10 text-purple-500" />,
    title: 'Intelligence artificielle',
    description: 'Intégration de solutions d\'IA et machine learning pour optimiser vos processus et analyses.',
  },
];

const NmkFireServices = () => {
  return (
    <section id="services" className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-sm font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 px-4 py-1.5 rounded-full mb-4">
            Nos Expertises
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-indigo-300">
            Solutions Digitales Expertes
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
            Des solutions technologiques complètes pour répondre à tous vos besoins numériques
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group"
            >
              {/* Décoration d'arrière-plan */}
              <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-purple-50 dark:bg-purple-900/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="mb-6 p-4 rounded-lg bg-purple-50 dark:bg-purple-900/30 inline-flex">
                  {service.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {service.description}
                </p>
                
                <a 
                  href="#contact" 
                  className="text-purple-600 dark:text-purple-400 font-medium inline-flex items-center group"
                >
                  <span className="border-b border-transparent group-hover:border-purple-600 dark:group-hover:border-purple-400 transition-all">
                    En savoir plus
                  </span>
                  <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button 
            asChild
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white group"
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

export default NmkFireServices;
