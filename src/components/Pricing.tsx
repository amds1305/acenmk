
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { PricingCard } from './pricing/PricingCard';

interface Feature {
  id: string;
  feature: string;
  is_included: boolean;
  order_index: number;
}

interface PricingPackage {
  id: string;
  title: string;
  description: string | null;
  starting_price: number | null;
  is_featured: boolean;
  is_visible: boolean;
  features: Feature[];
}

const Pricing = () => {
  const { data: packages, isLoading, error } = useQuery({
    queryKey: ['pricing-packages'],
    queryFn: async () => {
      console.log("Fetching pricing packages");
      const { data: packagesData, error } = await supabase
        .from('pricing_packages')
        .select('*')
        .eq('is_visible', true)
        .order('order_index');

      if (error) {
        console.error("Error fetching packages:", error);
        throw error;
      }

      const packagesWithFeatures = await Promise.all(
        (packagesData || []).map(async (pkg) => {
          const { data: features, error: featuresError } = await supabase
            .from('package_features')
            .select('*')
            .eq('package_id', pkg.id)
            .order('order_index');
          
          if (featuresError) {
            console.error(`Error fetching features for package ${pkg.id}:`, featuresError);
          }
          
          return { ...pkg, features: features || [] };
        })
      );

      console.log("Fetched packages:", packagesWithFeatures);
      return packagesWithFeatures;
    },
    // Refresh every time component is mounted
    refetchOnMount: true,
    staleTime: 0,
  });

  // Event listener for admin changes
  React.useEffect(() => {
    const handleAdminChanges = () => {
      console.log("Admin changes detected, refreshing pricing packages");
    };
    
    window.addEventListener('admin-changes-saved', handleAdminChanges);
    
    return () => {
      window.removeEventListener('admin-changes-saved', handleAdminChanges);
    };
  }, []);

  if (error) {
    console.error("Error loading packages:", error);
  }

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Nos Offres</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez nos différentes formules adaptées à vos besoins
          </p>
        </div>

        {packages && packages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <PricingCard
                key={pkg.id}
                id={pkg.id}
                title={pkg.title}
                description={pkg.description}
                startingPrice={pkg.starting_price}
                isFeatured={pkg.is_featured}
                features={pkg.features}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucune offre disponible pour le moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Pricing;
