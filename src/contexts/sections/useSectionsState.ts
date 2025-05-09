
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { HomepageConfig } from '@/types/sections';
import { getHomepageConfig } from '@/services/mysql';
import { DEFAULT_TEMPLATE_CONFIG } from '@/services/sections/defaultData';
import { useQueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

export function useSectionsState() {
  const [config, setConfig] = useState<HomepageConfig>({ sections: [], sectionData: {}, templateConfig: DEFAULT_TEMPLATE_CONFIG });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Use React Query to fetch the config
  const { data: fetchedConfig, refetch } = useQuery({
    queryKey: ['homeConfig'],
    queryFn: getHomepageConfig,
    staleTime: 0, // Always consider as stale to force reload
    refetchOnWindowFocus: true,
    onSuccess: (data) => {
      console.log('Config fetched successfully:', data);
      if (data) {
        setConfig(data);
        setIsLoading(false);
      }
    },
    onError: (error) => {
      console.error('Error fetching config:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger la configuration du site.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  });

  // Update config state when fetched data changes
  useEffect(() => {
    if (fetchedConfig) {
      setConfig(fetchedConfig);
    }
  }, [fetchedConfig]);

  const loadConfig = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log('Chargement manuel de la configuration...');
      
      // Invalidate the cache and force a refetch
      queryClient.invalidateQueries({ queryKey: ['homeConfig'] });
      await refetch();
      
      console.log('Configuration rechargée manuellement');
    } catch (error) {
      console.error('Erreur lors du chargement manuel de la configuration:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger la configuration du site.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, queryClient, refetch]);

  // Load initial configuration
  useEffect(() => {
    console.log('Chargement initial de la configuration...');
    loadConfig();
    
    // Set up a refresh interval
    const intervalId = setInterval(() => {
      console.log('Rafraîchissement périodique de la configuration...');
      queryClient.invalidateQueries({ queryKey: ['homeConfig'] });
    }, 60000); // Refresh every minute
    
    return () => clearInterval(intervalId);
  }, [loadConfig, queryClient]);

  return {
    config,
    setConfig,
    isLoading,
    setIsLoading,
    loadConfig
  };
}
