
import React from 'react';
import { cn } from '@/lib/utils';
import { Code, Database, Layout, Smartphone, Globe, BarChart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useServices } from '@/hooks/useServices';
import { useToast } from '@/hooks/use-toast';

// Mapping des noms d'icônes vers les composants Lucide
const iconMap = {
  'Code': Code,
  'Database': Database,
  'Layout': Layout,
  'Smartphone': Smartphone,
  'Globe': Globe,
  'BarChart': BarChart,
  // Ajoutez d'autres icônes au besoin
};

const Services = () => {
  const { services, isLoading, error } = useServices();
  const { toast } = useToast();

  // Afficher un message d'erreur si le chargement échoue
  if (error) {
    console.error("Erreur lors du chargement des services:", error);
  }

  // Utiliser les données de services depuis Supabase ou des services par défaut si vide
  const defaultServices = [
    {
      id: '1',
      icon: 'Code',
      title: 'Développement sur mesure',
      description: 'Applications web et mobiles personnalisées selon vos besoins spécifiques et les dernières technologies.',
      order_index: 0,
    },
    {
      id: '2',
      icon: 'Database',
      title: 'Infrastructure cloud',
      description: 'Solutions d\'hébergement sécurisées, évolutives et performantes pour vos applications critiques.',
      order_index: 1,
    },
    {
      id: '3',
      icon: 'Layout',
      title: 'UX/UI Design',
      description: 'Interfaces utilisateur intuitives et esthétiques qui améliorent l\'expérience de vos utilisateurs.',
      order_index: 2,
    },
    {
      id: '4',
      icon: 'Smartphone',
      title: 'Applications mobiles',
      description: 'Applications natives et hybrides pour iOS et Android avec une expérience utilisateur fluide.',
      order_index: 3,
    },
    {
      id: '5',
      icon: 'Globe',
      title: 'Transformation digitale',
      description: 'Accompagnement stratégique pour digitaliser vos processus métier et gagner en efficacité.',
      order_index: 4,
    },
    {
      id: '6',
      icon: 'BarChart',
      title: 'Intelligence artificielle',
      description: 'Intégration de solutions d\'IA et machine learning pour optimiser vos processus et analyses.',
      order_index: 5,
    },
  ];

  // Utiliser les services de Supabase s'ils sont disponibles, sinon utiliser les services par défaut
  const displayServices = services.length > 0 ? services : defaultServices;

  return (
    <section id="services" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium bg-primary/10 text-primary px-4 py-1.5 rounded-full mb-4">Nos Expertises</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 dark:from-white dark:via-gray-100 dark:to-gray-200 bg-clip-text text-transparent">
            Solutions Digitales Expertes
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-8 max-w-3xl mx-auto">
            Des solutions technologiques complètes pour répondre à tous vos besoins numériques
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.map((service, index) => {
            // Obtenir le composant d'icône ou utiliser Code comme icône par défaut
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Code;
            
            return (
              <div 
                key={service.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mb-6 p-4 rounded-lg bg-primary/10 inline-flex">
                  <IconComponent className="h-10 w-10 text-primary" />
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {service.description}
                </p>
                
                <a href="#contact" className="text-primary font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all mt-auto underline-animation">
                  En savoir plus
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            );
          })}
        </div>
        
        <div className="mt-16 text-center">
          <Button 
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white group"
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
