
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getHomepageConfig } from '@/services/mysql';
import { ClientLogo, TrustedClientsSectionData } from '@/types/sections';

const NmkKinkTrustedClients: React.FC = () => {
  // Récupérer les données des clients depuis la configuration
  const { data: config } = useQuery({
    queryKey: ['homeConfig'],
    queryFn: getHomepageConfig
  });
  
  console.log("NmkKinkTrustedClients - Configuration:", config);
  
  const trustedClientsData = config?.sectionData?.['trusted-clients'] as TrustedClientsSectionData | undefined;
  
  console.log("NmkKinkTrustedClients - Données des clients:", trustedClientsData);

  // Si aucune donnée n'est disponible ou si la section est masquée, ne rien afficher
  if (!trustedClientsData || trustedClientsData.showTrustedClients === false) {
    console.log("NmkKinkTrustedClients - Section masquée");
    return null;
  }
  
  // Utilisez les clients de la base de données via trustedClientsData.clients
  // ou récupérez-les directement de la table trusted_clients
  const { data: clients } = useQuery({
    queryKey: ['trustedClients'],
    queryFn: async () => {
      const { data, error } = await supabase.from('trusted_clients').select('*');
      if (error) throw error;
      return data as ClientLogo[];
    },
    enabled: !trustedClientsData.clients || trustedClientsData.clients.length === 0
  });
  
  // Utilisez soit les clients configurés, soit les clients de la base de données
  const displayClients = trustedClientsData.clients?.length > 0 
    ? trustedClientsData.clients 
    : clients || [];
  
  console.log("NmkKinkTrustedClients - Clients à afficher:", displayClients);
  
  // Si aucun client n'est disponible, ne rien afficher
  if (displayClients.length === 0) {
    console.log("NmkKinkTrustedClients - Pas de clients à afficher");
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block rounded-full bg-gray-200 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-gray-700">
            {trustedClientsData.featuredLabel || 'Nos clients'}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight">
            {trustedClientsData.title || 'Ils nous font confiance'}
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {displayClients.map((client) => (
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
