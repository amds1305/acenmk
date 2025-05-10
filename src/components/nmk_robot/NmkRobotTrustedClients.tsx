
import React from 'react';
import { ClientLogo } from '@/types/sections';
import { useQuery } from '@tanstack/react-query';
import { getHomepageConfig } from '@/services/mysql';
import { supabase } from '@/lib/supabase';

const NmkRobotTrustedClients = () => {
  const { data: config } = useQuery({
    queryKey: ['homeConfig'],
    queryFn: getHomepageConfig
  });

  const trustedClientsData = config?.sectionData?.['trusted-clients'] as {
    title: string;
    clients: ClientLogo[];
    showTrustedClients?: boolean;
  } | undefined;

  // Pour le débogage
  console.log('NmkRobotTrustedClients - données:', trustedClientsData);

  // Récupérer les clients directement depuis la base de données
  const { data: dbClients } = useQuery({
    queryKey: ['trustedClientsDb'],
    queryFn: async () => {
      const { data, error } = await supabase.from('trusted_clients').select('*');
      if (error) {
        console.error('Erreur lors de la récupération des clients:', error);
        return [];
      }
      return data as ClientLogo[];
    },
    enabled: !trustedClientsData?.clients || trustedClientsData.clients.length === 0
  });

  // Utiliser soit les clients configurés, soit les clients de la base de données
  const displayClients = trustedClientsData?.clients?.length ? 
    trustedClientsData.clients : dbClients || [];

  console.log('NmkRobotTrustedClients - clients à afficher:', displayClients);

  // Skip rendering if no data or section is explicitly hidden
  if ((trustedClientsData && trustedClientsData.showTrustedClients === false) || (!displayClients.length)) {
    console.log('NmkRobotTrustedClients - ne s\'affiche pas, données manquantes ou section masquée');
    return null;
  }

  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
          {trustedClientsData?.title || 'Ils nous font confiance'}
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {displayClients.map((client) => (
            <div key={client.id} className="flex flex-col items-center">
              <div className="h-24 flex items-center justify-center mb-4">
                {client.websiteUrl ? (
                  <a href={client.websiteUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <img 
                      src={client.logoUrl} 
                      alt={client.name} 
                      className="h-16 w-auto object-contain filter brightness-0 invert transition-transform hover:scale-110" 
                    />
                  </a>
                ) : (
                  <img 
                    src={client.logoUrl} 
                    alt={client.name} 
                    className="h-16 w-auto object-contain filter brightness-0 invert" 
                  />
                )}
              </div>
              {client.category && (
                <p className="text-sm text-gray-400 text-center">{client.category}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NmkRobotTrustedClients;
