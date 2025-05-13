
import { useState, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getHomepageConfig } from '@/services/sections'; // Utiliser la version corrigée
import { DEFAULT_SECTIONS, DEFAULT_TEMPLATE_CONFIG, DEFAULT_HOMEPAGE_CONFIG } from '@/services/sections/defaultData';
import { HomepageConfig } from '@/types/sections';

// Clé pour le cache de configuration
const CONFIG_CACHE_KEY = 'homeConfig';

export const useSectionsState = () => {
  const [config, setConfig] = useState<HomepageConfig>({
    sections: DEFAULT_SECTIONS,
    sectionData: {},
    templateConfig: DEFAULT_TEMPLATE_CONFIG,
  });
  
  const queryClient = useQueryClient();

  // Charger la configuration initiale
  const { 
    isLoading, 
    isError, 
    isRefetching, 
    refetch 
  } = useQuery({
    queryKey: [CONFIG_CACHE_KEY],
    queryFn: getHomepageConfig,
    staleTime: 0, // Toujours considérer comme périmé pour forcer le rechargement
    refetchOnMount: true,
    retry: 2,
    onSuccess: (data) => {
      console.log('Configuration chargée avec succès:', data);
      setConfig(data || DEFAULT_HOMEPAGE_CONFIG);
    },
    onError: (error) => {
      console.error('Erreur lors du chargement de la configuration:', error);
      setConfig(DEFAULT_HOMEPAGE_CONFIG);
    }
  });
  
  // Fonction pour forcer le rechargement de la configuration
  const loadConfig = useCallback(async () => {
    console.log('Forcer le rechargement de la configuration...');
    
    // Nettoyer le cache local si présent
    localStorage.removeItem('cachedHomepageConfig');
    localStorage.removeItem('cachedConfigTimestamp');
    
    // Invalider le cache React Query
    queryClient.invalidateQueries({ queryKey: [CONFIG_CACHE_KEY] });
    
    try {
      // Recharger manuellement les données
      const freshData = await getHomepageConfig();
      console.log('Nouvelles données chargées:', freshData);
      
      // Mettre à jour l'état local
      setConfig(freshData || DEFAULT_HOMEPAGE_CONFIG);
      return freshData;
    } catch (error) {
      console.error('Erreur lors du rechargement forcé:', error);
      return null;
    }
  }, [queryClient]);

  return {
    config,
    setConfig,
    isLoading,
    isError,
    isRefetching,
    loadConfig
  };
};
