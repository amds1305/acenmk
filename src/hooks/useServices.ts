
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getServices, ServiceItem } from '@/services/supabase/servicesService';

export const useServices = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const { data: services, error, refetch } = useQuery({
    queryKey: ['services'],
    queryFn: getServices,
    staleTime: 5000, // Considérer les données comme périmées après 5 secondes
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
  
  useEffect(() => {
    if (services !== undefined) {
      setIsLoading(false);
    }
    
    // Écouteur d'événements pour les changements administratifs
    const handleAdminChanges = () => {
      console.log("Changements administratifs détectés, rechargement des services...");
      refetch();
    };
    
    window.addEventListener('admin-changes-saved', handleAdminChanges);
    
    return () => {
      window.removeEventListener('admin-changes-saved', handleAdminChanges);
    };
  }, [services, refetch]);
  
  return { 
    services: services || [],
    isLoading,
    error
  };
};
