
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
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

      if (error) {
        console.error("Error fetching packages:", error);
        throw error;
      }
      return packagesData;
    }
  });

  const handleSavePackage = async (packageData: any) => {
    try {
      console.log("Saving package data:", packageData);
      
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

        // Delete existing features to replace them
        const { error: featuresError } = await supabase
          .from('package_features')
          .delete()
          .eq('package_id', packageData.id);

        if (featuresError) throw featuresError;
        
        // Add new features
        if (packageData.features?.length > 0) {
          const { error: insertError } = await supabase
            .from('package_features')
            .insert(
              packageData.features.map((feature: any, index: number) => ({
                package_id: packageData.id,
                feature: feature.feature,
                is_included: feature.is_included,
                order_index: index,
              }))
            );
          
          if (insertError) throw insertError;
        }
      } else {
        // Create new package
        console.log("Creating new package:", packageData);
        const { data: newPackage, error: packageError } = await supabase
          .from('pricing_packages')
          .insert({
            title: packageData.title,
            description: packageData.description,
            starting_price: parseFloat(packageData.starting_price) || null,
            is_featured: packageData.is_featured,
            is_visible: packageData.is_visible,
          })
          .select()
          .single();

        if (packageError) {
          console.error("Error creating package:", packageError);
          throw packageError;
        }
        
        console.log("New package created:", newPackage);
        
        // Add new features
        if (packageData.features?.length > 0) {
          const { error: featuresError } = await supabase
            .from('package_features')
            .insert(
              packageData.features.map((feature: any, index: number) => ({
                package_id: newPackage.id,
                feature: feature.feature,
                is_included: feature.is_included,
                order_index: index,
              }))
            );

          if (featuresError) {
            console.error("Error adding features:", featuresError);
            throw featuresError;
          }
        }
      }

      // Invalidate query to refresh data
      queryClient.invalidateQueries({ queryKey: ['admin-pricing-packages'] });
      queryClient.invalidateQueries({ queryKey: ['pricing-packages'] });
      
      toast({
        title: "Succès",
        description: "Le package a été enregistré avec succès.",
      });
      
      // Trigger an event for the frontend to update
      window.dispatchEvent(new CustomEvent('admin-changes-saved'));
      
      return true;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde.",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleDeletePackage = async (id: string) => {
    try {
      // Delete features first (foreign key constraint)
      const { error: featuresError } = await supabase
        .from('package_features')
        .delete()
        .eq('package_id', id);

      if (featuresError) throw featuresError;

      // Then delete the package
      const { error } = await supabase
        .from('pricing_packages')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['admin-pricing-packages'] });
      queryClient.invalidateQueries({ queryKey: ['pricing-packages'] });
      
      toast({
        title: "Succès",
        description: "Le package a été supprimé avec succès.",
      });
      
      // Trigger an event for the frontend to update
      window.dispatchEvent(new CustomEvent('admin-changes-saved'));
      
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    packages,
    isLoading,
    handleSavePackage,
    handleDeletePackage
  };
};
