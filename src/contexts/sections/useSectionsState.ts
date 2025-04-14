
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { HomepageConfig } from '@/types/sections';
import { getHomepageConfig } from '@/services/mysql';
import { DEFAULT_TEMPLATE_CONFIG } from '@/services/sections/defaultData';

export function useSectionsState() {
  const [config, setConfig] = useState<HomepageConfig>({ sections: [], sectionData: {}, templateConfig: DEFAULT_TEMPLATE_CONFIG });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const loadConfig = async () => {
    try {
      setIsLoading(true);
      const initialConfig = await getHomepageConfig();
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
  };

  // Load initial configuration
  useEffect(() => {
    loadConfig();
  }, []);

  return {
    config,
    setConfig,
    isLoading,
    setIsLoading,
    loadConfig
  };
}
