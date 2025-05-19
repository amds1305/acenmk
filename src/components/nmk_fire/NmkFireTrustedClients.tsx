
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
  const sectionData = config?.sections.find(section => section.type === 'trusted-clients');
  const clientsData = config?.sectionData[sectionData?.id || ''];

  // Données par défaut si aucune n'est disponible
  const defaultClients = [
    {
      id: '1',
      name: 'Client 1',
      logoUrl: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3',
    },
    {
      id: '2',
      name: 'Client 2',
      logoUrl: 'https://images.unsplash.com/photo-1614680376408-16afefa3332b?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3',
    },
    {
      id: '3',
      name: 'Client 3',
      logoUrl: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3',
    },
    {
      id: '4',
      name: 'Client 4',
      logoUrl: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3',
    },
    {
      id: '5',
      name: 'Client 5',
      logoUrl: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3',
    },
    {
      id: '6',
      name: 'Client 6',
      logoUrl: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3',
    }
  ];

  // Utiliser les données de la section ou les données par défaut
  const clients = clientsData?.clients || defaultClients;

  return (
    <section id="trusted-clients" className="py-24 bg-[#f5f5f5]">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-xs font-mono uppercase tracking-widest text-[#888] mb-6">
            Our Clients
          </span>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 font-mono text-[#0d0d0d]">
            Trusted by innovative companies
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
