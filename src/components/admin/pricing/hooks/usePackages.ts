
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const usePackages = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: packages, isLoading } = useQuery({
    queryKey: ['admin-pricing-packages'],
    queryFn: async () => {
      const { data: packagesData, error } = await supabase
        .from('pricing_packages')
        .select('*, package_features(*)');

      if (error) throw error;
      return packagesData;
    }
  });

  const handleSavePackage = async (packageData: any) => {
    try {
      if (packageData.id) {
        // Update existing package
        const { error: packageError } = await supabase
          .from('pricing_packages')
          .update({
            title: packageData.title,
            description: packageData.description,
            starting_price: packageData.starting_price,
            is_featured: packageData.is_featured,
            is_visible: packageData.is_visible,
          })
          .eq('id', packageData.id);

        if (packageError) throw packageError;

        // Update features
        const { error: featuresError } = await supabase
          .from('package_features')
          .delete()
          .eq('package_id', packageData.id);

        if (featuresError) throw featuresError;
      } else {
        // Create new package
        const { data: newPackage, error: packageError } = await supabase
          .from('pricing_packages')
          .insert({
            title: packageData.title,
            description: packageData.description,
            starting_price: packageData.starting_price,
            is_featured: packageData.is_featured,
            is_visible: packageData.is_visible,
          })
          .select()
          .single();

        if (packageError) throw packageError;
        packageData.id = newPackage.id;
      }

      // Insert new features
      if (packageData.features?.length > 0) {
        const { error: featuresError } = await supabase
          .from('package_features')
          .insert(
            packageData.features.map((feature: any, index: number) => ({
              package_id: packageData.id,
              feature: feature.feature,
              is_included: feature.is_included,
              order_index: index,
            }))
          );

        if (featuresError) throw featuresError;
      }

      queryClient.invalidateQueries({ queryKey: ['admin-pricing-packages'] });
      toast({
        title: "Succès",
        description: "Le package a été enregistré avec succès.",
      });
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde.",
        variant: "destructive",
      });
    }
  };

  const handleDeletePackage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('pricing_packages')
        .delete()
        .eq('id', id);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['admin-pricing-packages'] });
      toast({
        title: "Succès",
        description: "Le package a été supprimé avec succès.",
      });
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression.",
        variant: "destructive",
      });
    }
  };

  return {
    packages,
    isLoading,
    handleSavePackage,
    handleDeletePackage
  };
};
