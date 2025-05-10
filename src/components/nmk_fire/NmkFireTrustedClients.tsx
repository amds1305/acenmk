
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getHomepageConfig } from '@/services/sections';

const NmkFireTrustedClients = () => {
  // Utiliser React Query pour récupérer les données
  const { data: config } = useQuery({
    queryKey: ['homeConfig'],
    queryFn: getHomepageConfig,
  });

  // Extraire les données de la section
  const sectionData = config?.sectionData['trusted-clients'];
  
  // Ne pas afficher la section si elle est explicitement désactivée ou s'il n'y a pas de clients
  if (!sectionData || sectionData.showTrustedClients === false || !sectionData.clients || sectionData.clients.length === 0) {
    return null;
  }

  const clients = sectionData.clients;

  return (
    <section id="trusted-clients" className="py-24 bg-[#f5f5f5]">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-xs font-mono uppercase tracking-widest text-[#888] mb-6">
            {sectionData.featuredLabel || 'Nos clients'}
          </span>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 font-mono text-[#0d0d0d]">
            {sectionData.title || 'Ils nous font confiance'}
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {clients.map((client) => (
              <div key={client.id} className="flex justify-center">
                {client.websiteUrl ? (
                  <a 
                    href={client.websiteUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block grayscale hover:grayscale-0 transition-all"
                  >
                    <img 
                      src={client.logoUrl} 
                      alt={client.name} 
                      className="max-h-12 w-auto object-contain" 
                      title={client.name}
                    />
                  </a>
                ) : (
                  <img 
                    src={client.logoUrl} 
                    alt={client.name} 
                    className="max-h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all" 
                    title={client.name}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NmkFireTrustedClients;
