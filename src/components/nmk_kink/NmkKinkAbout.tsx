
import React from 'react';
import { Check } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getHomepageConfig } from '@/services/mysql';

const NmkKinkAbout: React.FC = () => {
  // Récupérer les données about depuis la configuration
  const { data: config } = useQuery({
    queryKey: ['homeConfig'],
    queryFn: getHomepageConfig
  });

  const defaultBenefits = [
    'Design moderne et responsive',
    'Optimisation SEO intégrée',
    'Performance et vitesse optimales',
    'Sécurité et confidentialité des données',
    'Compatibilité multiplateforme',
    'Support technique dédié'
  ];

  const defaultStats = {
    yearsExperience: 12,
    projectsDelivered: 200,
    clientSatisfaction: 98
  };

  // Définir les données par défaut et les fusionner avec les données de configuration
  const aboutData = {
    title: 'Nous créons des expériences numériques impactantes',
    description: 'Depuis plus de 10 ans, notre agence aide les entreprises à transformer leurs idées en solutions numériques performantes. Notre approche centrée sur l\'utilisateur garantit des projets qui non seulement impressionnent visuellement, mais atteignent également vos objectifs commerciaux.',
    benefits: defaultBenefits,
    stats: defaultStats,
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1470',
    ...(config?.sectionData.about || {})
  };

  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <span className="inline-block rounded-full bg-gray-200 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-gray-700">
              À propos de nous
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              {aboutData.title}
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              {aboutData.description}
            </p>
            
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {aboutData.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-gray-900" />
                  </div>
                  <p className="ml-3 text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-10 flex items-center gap-4">
              <div>
                <p className="text-4xl font-bold text-gray-900">{aboutData.stats.yearsExperience}+</p>
                <p className="text-sm text-gray-600">Années d'expérience</p>
              </div>
              <div className="h-12 w-px bg-gray-300"></div>
              <div>
                <p className="text-4xl font-bold text-gray-900">{aboutData.stats.projectsDelivered}+</p>
                <p className="text-sm text-gray-600">Projets livrés</p>
              </div>
              <div className="h-12 w-px bg-gray-300"></div>
              <div>
                <p className="text-4xl font-bold text-gray-900">{aboutData.stats.clientSatisfaction}%</p>
                <p className="text-sm text-gray-600">Clients satisfaits</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-gray-200"></div>
            <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-gray-900"></div>
            
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <img
                src={aboutData.imageUrl}
                alt="Notre équipe en pleine collaboration"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NmkKinkAbout;
