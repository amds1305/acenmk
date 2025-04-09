
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getHomepageConfig } from '@/services/sections';

const TekoTrustedClients: React.FC = () => {
  const { data } = useQuery({
    queryKey: ['trustedClientsData'],
    queryFn: async () => {
      const config = getHomepageConfig();
      
      if (config.sectionData && config.sectionData['trusted-clients']) {
        return config.sectionData['trusted-clients'] as any;
      }
      
      return {
        title: 'Ils nous font confiance',
        featuredLabel: 'Featured Clients',
        clients: []
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (!data || data.clients.length === 0) {
    return null;
  }

  return (
    <section id="trusted-clients" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-4 text-xs md:text-sm font-medium bg-rose-50 text-rose-500 px-3 py-1 rounded-full">
            <span className="bg-rose-500 w-2 h-2 rounded-full"></span>
            {data.featuredLabel || 'Featured Clients'}
          </div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          {data.title || 'Brands we\'ve worked with'}
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {data.clients.map((client) => (
            <div key={client.id} className="flex flex-col items-center">
              <div className="h-16 w-auto mb-4">
                {client.websiteUrl ? (
                  <a href={client.websiteUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
                    <img 
                      src={client.logoUrl} 
                      alt={client.name} 
                      className="h-full w-auto transition-all duration-300" 
                      title={client.name}
                    />
                  </a>
                ) : (
                  <img 
                    src={client.logoUrl} 
                    alt={client.name} 
                    className="h-full w-auto transition-all duration-300" 
                    title={client.name}
                  />
                )}
              </div>
              <div className="text-center">
                {client.category && (
                  <p className="text-center text-gray-500">
                    {client.category}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TekoTrustedClients;
