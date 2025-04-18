
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
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
  features: Feature[];
}

const Pricing = () => {
  const { data: packages, isLoading } = useQuery({
    queryKey: ['pricing-packages'],
    queryFn: async () => {
      const { data: packagesData } = await supabase
        .from('pricing_packages')
        .select('*')
        .eq('is_visible', true)
        .order('order_index');

      const packagesWithFeatures = await Promise.all(
        (packagesData || []).map(async (pkg) => {
          const { data: features } = await supabase
            .from('package_features')
            .select('*')
            .eq('package_id', pkg.id)
            .order('order_index');
          
          return { ...pkg, features: features || [] };
        })
      );

      return packagesWithFeatures;
    }
  });

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages?.map((pkg) => (
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
      </div>
    </section>
  );
};

export default Pricing;
