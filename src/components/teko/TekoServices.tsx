
import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useServices } from '@/hooks/useServices';

// Import dynamique des icônes depuis Lucide React
import { 
  Code, Database, Layout, Smartphone, Globe, BarChart, 
  Shield, Users, Zap, MessageSquare, FileText, Settings 
} from 'lucide-react';

// Mapping des noms d'icônes vers les composants Lucide
const iconMap = {
  'Code': Code,
  'Database': Database,
  'Layout': Layout,
  'Smartphone': Smartphone,
  'Globe': Globe,
  'BarChart': BarChart,
  'Shield': Shield,
  'Users': Users,
  'Zap': Zap,
  'MessageSquare': MessageSquare,
  'FileText': FileText,
  'Settings': Settings
};

const TekoServices: React.FC = () => {
  const { services, isLoading } = useServices();

  // Services par défaut pour le thème Teko
  const defaultServices = [
    {
      id: '1',
      icon: 'Code',
      title: 'Développement sur mesure',
      description: 'Applications web et mobiles personnalisées selon vos besoins spécifiques et les dernières technologies.',
      order_index: 0
    },
    {
      id: '2',
      icon: 'Database',
      title: 'Infrastructure cloud',
      description: 'Solutions d\'hébergement sécurisées, évolutives et performantes pour vos applications critiques.',
      order_index: 1
    },
    {
      id: '3',
      icon: 'BarChart',
      title: 'Intelligence artificielle',
      description: 'Intégration de solutions d\'IA et machine learning pour optimiser vos processus et analyses.',
      order_index: 2
    }
  ];

  // Utiliser les services de Supabase s'ils sont disponibles, sinon utiliser les services par défaut
  const displayServices = services.length > 0 ? services : defaultServices;

  // Liste de caractéristiques par défaut pour chaque carte
  const getFeatures = (index: number) => {
    const featuresList = [
      ['Design UI/UX intuitif', 'Solutions évolutives', 'Support technique 24/7'],
      ['Haute disponibilité', 'Sécurité renforcée', 'Scalabilité automatique'],
      ['Analyse prédictive', 'Automatisation intelligente', 'Personnalisation avancée']
    ];
    
    return featuresList[index % featuresList.length];
  };

  // Obtenir les couleurs pour chaque carte
  const getColor = (index: number) => {
    const colors = ['teal', 'indigo', 'amber'];
    return colors[index % colors.length];
  };

  // Afficher un indicateur de chargement si les données sont en cours de chargement
  if (isLoading) {
    return (
      <section id="services" className="py-24 bg-[#f8fafc]">
        <div className="container mx-auto px-4 text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des services...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-24 bg-[#f8fafc]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0a0c10]">
            Services sur mesure pour votre transformation digitale
          </h2>
          <p className="text-gray-600 md:text-lg">
            Des solutions complètes pour répondre à tous vos besoins numériques, conçues par nos experts pour maximiser votre impact
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.map((service, index) => {
            // Obtenir le composant d'icône ou utiliser Code comme icône par défaut
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Code;
            const color = getColor(index);
            const features = getFeatures(index);
            
            return (
              <div 
                key={service.id} 
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
              >
                <div className={`w-12 h-12 bg-${color}-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-${color}-500 group-hover:text-white transition-colors`}>
                  <IconComponent className={`h-6 w-6 text-${color}-500 group-hover:text-white`} />
                </div>
                
                <h3 className={`text-xl font-bold mb-3 text-[#0a0c10] group-hover:text-${color}-500 transition-colors`}>
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className={`h-4 w-4 text-${color}-500`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <a href="#contact" className={`text-${color}-500 font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all`}>
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
            className="bg-[#0a0c10] text-white hover:bg-[#0a0c10]/90 rounded-full py-6 px-8 text-base font-medium"
          >
            <a href="#contact">
              Discuter de votre projet
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TekoServices;
