
import React from 'react';
import { ArrowRight, Shield, Cpu, Gauge, Settings, BarChart2 } from 'lucide-react';
import { useServices } from '@/hooks/useServices';

// Mapping des noms d'icônes vers les composants Lucide
const iconMap = {
  'Shield': Shield,
  'Cpu': Cpu,
  'Gauge': Gauge,
  'Settings': Settings,
  'BarChart2': BarChart2,
  // Ajoutez d'autres icônes au besoin
};

// Fonction helper pour obtenir des caractéristiques aléatoires
const getRandomFeatures = (count: number = 3) => {
  const allFeatures = [
    'Easy Programming', 'Built-in Safety', 'Flexible Deployment',
    'Process Optimization', 'Custom Integration', 'Remote Monitoring',
    'Real-time Metrics', 'Predictive Maintenance', 'Efficiency Reports',
    'AI Integration', 'Cloud Connectivity', 'Scalable Solutions'
  ];
  
  // Mélanger et prendre les premiers éléments
  return [...allFeatures].sort(() => 0.5 - Math.random()).slice(0, count);
};

const NmkRobotServices = () => {
  const { services, isLoading } = useServices();

  // Services par défaut pour le thème Robot
  const defaultServices = [
    {
      id: '1',
      icon: 'Cpu',
      title: 'Collaborative Robots',
      description: 'Robots designed to work alongside humans, enhancing productivity while ensuring safety in shared workspaces.',
      order_index: 0
    },
    {
      id: '2',
      icon: 'Shield',
      title: 'Industrial Automation',
      description: 'Complete automation solutions for manufacturing processes, improving efficiency and reducing operational costs.',
      order_index: 1
    },
    {
      id: '3',
      icon: 'Gauge',
      title: 'Performance Analytics',
      description: 'Advanced analytics tools to monitor and optimize robotic performance across your production line.',
      order_index: 2
    }
  ];

  // Utiliser les services de Supabase s'ils sont disponibles, sinon utiliser les services par défaut
  const displayServices = services.length > 0 ? services : defaultServices;

  // Afficher un indicateur de chargement si les données sont en cours de chargement
  if (isLoading) {
    return (
      <section id="services" className="py-24 bg-[#1A1F2C]">
        <div className="container mx-auto px-4 text-center">
          <div className="w-12 h-12 border-4 border-[#9b87f5]/30 border-t-[#9b87f5] rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading services...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-24 bg-[#1A1F2C]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-16">
          <span className="text-[#9b87f5] font-mono uppercase tracking-wider">
            Our Solutions
          </span>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-8 text-white">
            Cutting-edge robotics for tomorrow's challenges
          </h2>
          
          <p className="text-gray-300 text-xl">
            Our comprehensive range of robotic solutions delivers precision, reliability, and advanced capabilities for modern industrial environments.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.map((service) => {
            // Génerer des caractéristiques aléatoires pour chaque service
            const features = getRandomFeatures();
            
            // Obtenir le composant d'icône ou utiliser Cpu comme icône par défaut
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Cpu;
            
            return (
              <div 
                key={service.id} 
                className="bg-[#111827]/50 border border-gray-800 p-8 hover:border-[#9b87f5] transition-all duration-300"
              >
                <div className="mb-6">
                  <IconComponent className="h-12 w-12 text-[#9b87f5]" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {service.title}
                </h3>
                
                <p className="text-gray-300 mb-8">
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-8">
                  {features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-300">
                      <span className="w-1.5 h-1.5 bg-[#9b87f5] block"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <a href="#contact" className="text-[#9b87f5] font-medium inline-flex items-center group">
                  <span className="border-b border-[#9b87f5]/30 group-hover:border-[#9b87f5] transition-colors">
                    Learn more
                  </span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            );
          })}
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center justify-center p-8 bg-[#111827]/30 border border-gray-800">
            <div className="text-center">
              <Settings className="h-10 w-10 text-[#9b87f5] mx-auto mb-4" />
              <h3 className="text-xl font-bold">Custom Solutions</h3>
              <p className="text-gray-400 mt-2">Tailored to your specific requirements</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center p-8 bg-[#111827]/30 border border-gray-800">
            <div className="text-center">
              <BarChart2 className="h-10 w-10 text-[#9b87f5] mx-auto mb-4" />
              <h3 className="text-xl font-bold">Data Analytics</h3>
              <p className="text-gray-400 mt-2">Make informed decisions with real-time data</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center p-8 bg-[#111827]/30 border border-gray-800">
            <div className="text-center">
              <Shield className="h-10 w-10 text-[#9b87f5] mx-auto mb-4" />
              <h3 className="text-xl font-bold">Safety Standards</h3>
              <p className="text-gray-400 mt-2">Exceeding industry safety requirements</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NmkRobotServices;
