
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useServices } from '@/hooks/useServices';

// Import des icônes Lucide
import { 
  Code, Palette, Globe, BarChart, Settings, Smartphone,
  Database, Layout, Shield, Users, Zap, MessageSquare, FileText
} from 'lucide-react';

// Mapping des noms d'icônes vers les composants Lucide
const iconMap = {
  'Code': Code,
  'Palette': Palette,
  'Globe': Globe,
  'BarChart': BarChart,
  'Settings': Settings,
  'Smartphone': Smartphone,
  'Database': Database,
  'Layout': Layout,
  'Shield': Shield,
  'Users': Users,
  'Zap': Zap,
  'MessageSquare': MessageSquare,
  'FileText': FileText,
};

const NmkKinkServices: React.FC = () => {
  const { services, isLoading } = useServices();

  // Services par défaut si aucun n'est défini dans Supabase
  const defaultServices = [
    {
      id: '1',
      icon: 'Code',
      title: 'Développement Web',
      description: 'Sites web sur mesure, applications web progressives et intégration de systèmes.',
      order_index: 0
    },
    {
      id: '2',
      icon: 'Palette',
      title: 'Design UI/UX',
      description: 'Interfaces élégantes et expériences utilisateur intuitives et engageantes.',
      order_index: 1
    },
    {
      id: '3',
      icon: 'Globe',
      title: 'E-commerce',
      description: 'Solutions de commerce en ligne personnalisées avec gestion des paiements et du stock.',
      order_index: 2
    },
    {
      id: '4',
      icon: 'BarChart',
      title: 'Marketing Digital',
      description: 'SEO, campagnes publicitaires et stratégies de contenu pour augmenter votre visibilité.',
      order_index: 3
    },
    {
      id: '5',
      icon: 'Settings',
      title: 'Maintenance & Support',
      description: 'Services de maintenance continue pour garder votre site web rapide et sécurisé.',
      order_index: 4
    },
    {
      id: '6',
      icon: 'Smartphone',
      title: 'Applications Mobiles',
      description: 'Applications natives et hybrides pour iOS et Android avec fonctionnalités avancées.',
      order_index: 5
    },
  ];

  // Utiliser les services de Supabase s'ils sont disponibles, sinon utiliser les services par défaut
  const displayServices = services.length > 0 ? services : defaultServices;

  // Afficher un indicateur de chargement si les données sont en cours de chargement
  if (isLoading) {
    return (
      <section id="services" className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des services...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full bg-gray-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-gray-700">
            Nos services
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Solutions numériques complètes
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Notre équipe d'experts fournit des services de haute qualité pour vous aider à réaliser vos ambitions numériques.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayServices.map((service) => {
            // Obtenir le composant d'icône ou utiliser Code comme icône par défaut
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Code;
            
            return (
              <div 
                key={service.id}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:shadow-xl"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-900 transition-colors group-hover:bg-gray-900 group-hover:text-white">
                  <IconComponent className="h-8 w-8" />
                </div>
                <h3 className="mb-3 text-xl font-bold">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
                <div className="mt-6">
                  <a 
                    href="#contact" 
                    className="group inline-flex items-center text-sm font-medium text-gray-900"
                  >
                    En savoir plus
                    <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <a 
            href="#contact" 
            className="inline-flex items-center rounded-full border-2 border-gray-900 bg-gray-900 px-8 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-transparent hover:text-gray-900"
          >
            Discutez de votre projet avec nous
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default NmkKinkServices;
