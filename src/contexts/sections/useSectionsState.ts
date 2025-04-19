
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { HomepageConfig } from '@/types/sections';
import { getHomepageConfig } from '@/services/mysql';
import { DEFAULT_TEMPLATE_CONFIG } from '@/services/sections/defaultData';
import { useQueryClient } from '@tanstack/react-query';

export function useSectionsState() {
  const [config, setConfig] = useState<HomepageConfig>({ sections: [], sectionData: {}, templateConfig: DEFAULT_TEMPLATE_CONFIG });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const loadConfig = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log('Chargement de la configuration initiale...');
      // Invalidation du cache de React Query pour forcer un rechargement complet
      queryClient.invalidateQueries({ queryKey: ['homeConfig'] });
      
      const initialConfig = await getHomepageConfig();
      console.log('Configuration chargée:', initialConfig);
      setConfig(initialConfig);
    } catch (error) {
      console.error('Erreur lors du chargement de la configuration:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger la configuration du site.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, queryClient]);

  // Load initial configuration
  useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  return {
    config,
    setConfig,
    isLoading,
    setIsLoading,
    loadConfig
  };
}
