
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getHomepageConfig } from '@/services/sections';
import { TrustedClientsSectionData, ClientLogo } from '@/types/sections';

const NmkFireTrustedClients = () => {
  // Utiliser React Query pour récupérer les données
  const { data: config } = useQuery({
    queryKey: ['homeConfig'],
    queryFn: getHomepageConfig,
  });

  // Extraire les données de la section
  const sectionData = config?.sections.find(section => section.type === 'trusted-clients');
  const clientsData = config?.sectionData[sectionData?.id || ''] as TrustedClientsSectionData;

  // Données par défaut si aucune n'est disponible
  const defaultTitle = "Ils nous font confiance";
  const defaultFeaturedLabel = "Clients premium";
  const defaultClients: ClientLogo[] = [
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
    }
  ];

  // Utiliser les données de la section ou les données par défaut
  const title = clientsData?.title || defaultTitle;
  const featuredLabel = clientsData?.featuredLabel || defaultFeaturedLabel;
  const clients = clientsData?.clients || defaultClients;

  // Séparer les clients premium (avec catégorie "featured") des clients standard
  const featuredClients = clients.filter(client => client.category === "featured");
  const standardClients = clients.filter(client => client.category !== "featured");

  return (
    <section id="trusted-clients" className="py-24 bg-purple-50 dark:bg-purple-900/10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-sm font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 px-4 py-1.5 rounded-full mb-4">
            Partenaires
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-indigo-300">
            {title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            Des entreprises de toutes tailles nous font confiance pour leur transformation numérique
          </p>
        </div>

        {/* Affichage des clients premium si présents */}
        {featuredClients.length > 0 && (
          <div className="mb-16">
            <h3 className="text-center text-lg font-medium text-gray-700 dark:text-gray-300 mb-10">
              {featuredLabel}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {featuredClients.map((client) => (
                <div key={client.id} className="flex justify-center">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow w-full flex items-center justify-center h-32">
                    {client.websiteUrl ? (
                      <a 
                        href={client.websiteUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="block w-full h-full flex items-center justify-center"
                      >
                        <img 
                          src={client.logoUrl} 
                          alt={client.name} 
                          className="max-h-16 max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300" 
                          title={client.name}
                        />
                      </a>
                    ) : (
                      <img 
                        src={client.logoUrl} 
                        alt={client.name} 
                        className="max-h-16 max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300" 
                        title={client.name}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Affichage des clients standard */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {(standardClients.length > 0 ? standardClients : clients).map((client) => (
            <div key={client.id} className="flex justify-center">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow h-24 w-full flex items-center justify-center">
                {client.websiteUrl ? (
                  <a 
                    href={client.websiteUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block w-full h-full flex items-center justify-center"
                  >
                    <img 
                      src={client.logoUrl} 
                      alt={client.name} 
                      className="max-h-12 max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300" 
                      title={client.name}
                    />
                  </a>
                ) : (
                  <img 
                    src={client.logoUrl} 
                    alt={client.name} 
                    className="max-h-12 max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300" 
                    title={client.name}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NmkFireTrustedClients;
