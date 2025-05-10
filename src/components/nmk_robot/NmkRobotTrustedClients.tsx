
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getHomepageConfig } from '@/services/sections';

const NmkRobotTrustedClients = () => {
  // Utiliser React Query pour récupérer les données
  const { data: config } = useQuery({
    queryKey: ['homeConfig'],
    queryFn: getHomepageConfig,
  });

  // Extraire les données de la section
  const sectionData = config?.sectionData['trusted-clients'];
  
  // Données par défaut si aucune n'est disponible ou utiliser les données existantes
  const clients = sectionData?.clients || [
    { 
      id: '1', 
      name: 'ace nümerik', 
      logoUrl: 'https://placehold.co/200x80/111827/9b87f5?text=ace+nümerik',
      websiteUrl: 'https://www.acenumerik.com'
    },
    { 
      id: '2', 
      name: 'TechVision', 
      logoUrl: 'https://placehold.co/200x80/111827/9b87f5?text=TechVision',
      websiteUrl: 'https://example.com'
    },
    { 
      id: '3', 
      name: 'DataSphere', 
      logoUrl: 'https://placehold.co/200x80/111827/9b87f5?text=DataSphere',
      websiteUrl: 'https://example.com'
    },
    { 
      id: '4', 
      name: 'CloudNova', 
      logoUrl: 'https://placehold.co/200x80/111827/9b87f5?text=CloudNova',
      websiteUrl: 'https://example.com'
    },
    { 
      id: '5', 
      name: 'SecureNet', 
      logoUrl: 'https://placehold.co/200x80/111827/9b87f5?text=SecureNet',
      websiteUrl: 'https://example.com'
    },
    { 
      id: '6', 
      name: 'DevMatrix', 
      logoUrl: 'https://placehold.co/200x80/111827/9b87f5?text=DevMatrix',
      websiteUrl: 'https://example.com'
    }
  ];

  return (
    <section className="py-20 bg-[#111827]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-[#9b87f5] font-mono uppercase tracking-wider">
            {sectionData?.featuredLabel || 'Nos clients'}
          </span>
          
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 text-white">
            {sectionData?.title || 'Ils nous font confiance'}
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {clients.map((client) => (
            <div 
              key={client.id} 
              className="flex items-center justify-center p-4 filter grayscale hover:grayscale-0 hover:filter-none transition-all duration-300"
            >
              {client.websiteUrl ? (
                <a href={client.websiteUrl} target="_blank" rel="noopener noreferrer">
                  <img 
                    src={client.logoUrl} 
                    alt={client.name} 
                    className="max-h-16 max-w-full"
                    title={client.name}
                  />
                </a>
              ) : (
                <img 
                  src={client.logoUrl} 
                  alt={client.name} 
                  className="max-h-16 max-w-full"
                />
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-16 p-8 bg-[#1A1F2C] border border-gray-800 text-center">
          <p className="text-xl text-gray-300 mb-6">
            "ace nümerik a transformé nos capacités de fabrication avec leurs robots collaboratifs avancés, augmentant notre productivité de 35%."
          </p>
          <div className="text-white font-bold">Michael Thompson</div>
          <div className="text-[#9b87f5]">Directeur des Opérations, Global Manufacturing</div>
        </div>
      </div>
    </section>
  );
};

export default NmkRobotTrustedClients;
