
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getHomepageConfig } from '@/services/sections';
import { TrustedClientsSectionData } from '@/types/sections';

const NmkKinkTrustedClients: React.FC = () => {
  // Récupérer les données des clients depuis la configuration
  const { data } = useQuery({
    queryKey: ['trustedClientsData'],
    queryFn: async () => {
      const config = getHomepageConfig();
      
      if (config.sectionData && config.sectionData['trusted-clients']) {
        return config.sectionData['trusted-clients'] as TrustedClientsSectionData;
      }
      
      return {
        title: 'Ils nous font confiance',
        clients: []
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Si aucune donnée n'est disponible, ne rien afficher
  if (!data || data.clients.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block rounded-full bg-gray-200 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-gray-700">
            Nos clients
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight">
            {data.title || 'Ils nous font confiance'}
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {data.clients.map((client) => (
            <div 
              key={client.id} 
              className="flex flex-col items-center justify-center p-4 filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              {client.websiteUrl ? (
                <a href={client.websiteUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
                  <img 
                    src={client.logoUrl} 
                    alt={client.name} 
                    className="max-h-16 max-w-full mb-3"
                  />
                  {client.category && (
                    <span className="text-xs text-center text-gray-600 font-medium mt-1">
                      {client.category}
                    </span>
                  )}
                </a>
              ) : (
                <>
                  <img 
                    src={client.logoUrl} 
                    alt={client.name} 
                    className="max-h-16 max-w-full mb-3"
                  />
                  {client.category && (
                    <span className="text-xs text-center text-gray-600 font-medium mt-1">
                      {client.category}
                    </span>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NmkKinkTrustedClients;
