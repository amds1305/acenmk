
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { ArrowRight } from 'lucide-react';

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

const NmkKinkPricing: React.FC = () => {
  const { data: packages, isLoading, error } = useQuery({
    queryKey: ['pricing-packages-kink'],
    queryFn: async () => {
      console.log("Fetching pricing packages for Kink template");
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

      console.log("Fetched packages for Kink:", packagesWithFeatures);
      return packagesWithFeatures;
    },
    refetchOnMount: true,
    staleTime: 0,
  });

  if (isLoading) return (
    <section id="pricing" className="py-24 bg-white">
      <div className="container mx-auto">
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </div>
    </section>
  );

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block rounded-full bg-gray-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-gray-700">
            Tarification
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Nos Offres
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Découvrez nos différentes formules adaptées à vos besoins et à votre budget.
          </p>
        </div>

        {packages && packages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div 
                key={pkg.id} 
                className={`flex flex-col rounded-lg border p-8 relative ${
                  pkg.is_featured ? 'bg-gray-50 border-gray-900 shadow-lg' : 'bg-white border-gray-200'
                }`}
              >
                {pkg.is_featured && (
                  <span className="absolute top-0 right-0 bg-gray-900 text-white text-xs font-semibold px-4 py-1 rounded-bl-lg">
                    Recommandé
                  </span>
                )}
                
                <h3 className="text-2xl font-bold">{pkg.title}</h3>
                <p className="text-gray-600 mt-2">{pkg.description}</p>
                
                {pkg.starting_price && (
                  <div className="mt-4 mb-6">
                    <span className="text-3xl font-bold">{pkg.starting_price}€</span>
                    <span className="text-gray-500"> / projet</span>
                  </div>
                )}
                
                <div className="flex-grow">
                  <ul className="space-y-3">
                    {pkg.features?.map((feature) => (
                      <li key={feature.id} className="flex items-start">
                        {feature.is_included ? (
                          <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        )}
                        <span className={feature.is_included ? "" : "text-gray-400"}>{feature.feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-8">
                  <a 
                    href="#contact" 
                    className={`inline-flex items-center justify-center w-full py-3 px-6 rounded-full ${
                      pkg.is_featured 
                        ? 'bg-gray-900 text-white hover:bg-gray-700' 
                        : 'border-2 border-gray-900 text-gray-900 hover:bg-gray-50'
                    } transition-colors font-medium`}
                  >
                    Nous contacter
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
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

export default NmkKinkPricing;
