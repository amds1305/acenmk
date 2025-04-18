
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
            <Card key={pkg.id} className={`flex flex-col ${pkg.is_featured ? 'border-primary shadow-lg scale-105' : ''}`}>
              <CardHeader>
                {pkg.is_featured && (
                  <div className="text-sm font-medium text-primary mb-2">Offre Recommandée</div>
                )}
                <h3 className="text-2xl font-bold">{pkg.title}</h3>
                {pkg.description && (
                  <p className="text-muted-foreground">{pkg.description}</p>
                )}
                {pkg.starting_price && (
                  <div className="mt-4">
                    <span className="text-3xl font-bold">
                      À partir de {pkg.starting_price}€
                    </span>
                  </div>
                )}
              </CardHeader>
              
              <CardContent className="flex-grow">
                <ul className="space-y-4">
                  {pkg.features?.map((feature) => (
                    <li key={feature.id} className="flex items-center gap-2">
                      {feature.is_included ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <X className="h-5 w-5 text-red-500" />
                      )}
                      <span>{feature.feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button className="w-full" variant={pkg.is_featured ? "default" : "outline"}>
                  Nous Contacter
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
