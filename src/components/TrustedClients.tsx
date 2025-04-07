
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getHomepageConfig } from '@/services/sections';
import { TrustedClientsSectionData } from '@/types/sections';

const fetchTrustedClientsData = async (): Promise<TrustedClientsSectionData> => {
  const config = getHomepageConfig();
  
  // D'abord, vérifier si on a des données spécifiques pour la section trusted-clients
  if (config.sectionData && config.sectionData['trusted-clients']) {
    return config.sectionData['trusted-clients'] as TrustedClientsSectionData;
  }
  
  // Sinon, récupérer les données du hero pour la rétrocompatibilité
  if (config.sectionData && config.sectionData.hero) {
    const heroData = config.sectionData.hero;
    if (heroData.trustedClients) {
      return {
        title: heroData.trustedClientsTitle || 'Ils nous font confiance',
        clients: heroData.trustedClients || []
      };
    }
  }
  
  return {
    title: 'Ils nous font confiance',
    clients: []
  };
};

const TrustedClients: React.FC = () => {
  const { data } = useQuery({
    queryKey: ['trustedClientsData'],
    queryFn: fetchTrustedClientsData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (!data || data.clients.length === 0) {
    return null;
  }

  return (
    <section id="trusted-clients" className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 dark:from-white dark:via-gray-100 dark:to-gray-200 bg-clip-text text-transparent">{data.title}</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-16">
          {data.clients.map((client) => (
            <div key={client.id} className="h-16 w-auto transition-all duration-300 hover:scale-105">
              {client.websiteUrl ? (
                <a href={client.websiteUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
                  <img 
                    src={client.logoUrl} 
                    alt={client.name} 
                    className="h-full w-auto grayscale hover:grayscale-0 transition-all duration-300" 
                    title={client.name}
                  />
                </a>
              ) : (
                <img 
                  src={client.logoUrl} 
                  alt={client.name} 
                  className="h-full w-auto grayscale hover:grayscale-0 transition-all duration-300" 
                  title={client.name}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedClients;
