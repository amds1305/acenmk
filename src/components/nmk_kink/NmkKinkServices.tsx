
import React from 'react';
import { ArrowRight, Code, Palette, Globe, BarChart, Settings, Smartphone } from 'lucide-react';

const NmkKinkServices: React.FC = () => {
  const services = [
    {
      icon: <Code className="h-8 w-8" />,
      title: 'Développement Web',
      description: 'Sites web sur mesure, applications web progressives et intégration de systèmes.',
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: 'Design UI/UX',
      description: 'Interfaces élégantes et expériences utilisateur intuitives et engageantes.',
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: 'E-commerce',
      description: 'Solutions de commerce en ligne personnalisées avec gestion des paiements et du stock.',
    },
    {
      icon: <BarChart className="h-8 w-8" />,
      title: 'Marketing Digital',
      description: 'SEO, campagnes publicitaires et stratégies de contenu pour augmenter votre visibilité.',
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: 'Maintenance & Support',
      description: 'Services de maintenance continue pour garder votre site web rapide et sécurisé.',
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: 'Applications Mobiles',
      description: 'Applications natives et hybrides pour iOS et Android avec fonctionnalités avancées.',
    },
  ];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full bg-gray-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-gray-700">
            Nos services IT
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Modulaires, fiables et orientés résultats
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Choisissez, composez, évoluez à votre rythme — l’infogérance devient un levier stratégique, pas une contrainte.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:shadow-xl"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-900 transition-colors group-hover:bg-gray-900 group-hover:text-white">
                {service.icon}
              </div>
              <h3 className="mb-3 text-xl font-bold">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
              <div className="mt-6">
                <a 
                  href="#" 
                  className="group inline-flex items-center text-sm font-medium text-gray-900"
                >
                  En savoir plus
                  <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
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
