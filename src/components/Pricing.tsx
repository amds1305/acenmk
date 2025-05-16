
import React from 'react';
import { useQuery } from '@tanstack/react-query';
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

// Fonction pour simuler la récupération des packages de pricing
const fetchPricingPackages = async (): Promise<PricingPackage[]> => {
  // Simulation d'un délai réseau
  await new Promise(resolve => setTimeout(resolve, 100));

  // Retourne des données statiques
  return [
    {
      id: '1',
      title: 'Starter',
      description: 'Parfait pour les petits projets et les startups',
      starting_price: 499,
      is_featured: false,
      is_visible: true,
      features: [
        { id: '1-1', feature: 'Site web responsive', is_included: true, order_index: 0 },
        { id: '1-2', feature: '5 pages incluses', is_included: true, order_index: 1 },
        { id: '1-3', feature: 'SEO de base', is_included: true, order_index: 2 },
        { id: '1-4', feature: 'Formulaire de contact', is_included: true, order_index: 3 },
        { id: '1-5', feature: 'Support par email', is_included: true, order_index: 4 },
        { id: '1-6', feature: 'Système de blog', is_included: false, order_index: 5 },
        { id: '1-7', feature: 'E-commerce', is_included: false, order_index: 6 },
      ]
    },
    {
      id: '2',
      title: 'Business',
      description: 'La solution complète pour les entreprises en croissance',
      starting_price: 999,
      is_featured: true,
      is_visible: true,
      features: [
        { id: '2-1', feature: 'Site web responsive', is_included: true, order_index: 0 },
        { id: '2-2', feature: '10 pages incluses', is_included: true, order_index: 1 },
        { id: '2-3', feature: 'SEO avancé', is_included: true, order_index: 2 },
        { id: '2-4', feature: 'Formulaire de contact', is_included: true, order_index: 3 },
        { id: '2-5', feature: 'Support prioritaire', is_included: true, order_index: 4 },
        { id: '2-6', feature: 'Système de blog', is_included: true, order_index: 5 },
        { id: '2-7', feature: 'E-commerce (100 produits)', is_included: true, order_index: 6 },
        { id: '2-8', feature: 'Système de réservation', is_included: false, order_index: 7 },
      ]
    },
    {
      id: '3',
      title: 'Enterprise',
      description: 'Solutions personnalisées pour les grandes entreprises',
      starting_price: 2499,
      is_featured: false,
      is_visible: true,
      features: [
        { id: '3-1', feature: 'Site web responsive', is_included: true, order_index: 0 },
        { id: '3-2', feature: 'Pages illimitées', is_included: true, order_index: 1 },
        { id: '3-3', feature: 'SEO premium', is_included: true, order_index: 2 },
        { id: '3-4', feature: 'Formulaires personnalisés', is_included: true, order_index: 3 },
        { id: '3-5', feature: 'Support dédié 24/7', is_included: true, order_index: 4 },
        { id: '3-6', feature: 'CMS avancé', is_included: true, order_index: 5 },
        { id: '3-7', feature: 'E-commerce illimité', is_included: true, order_index: 6 },
        { id: '3-8', feature: 'Système de réservation', is_included: true, order_index: 7 },
        { id: '3-9', feature: 'Intégration systèmes tiers', is_included: true, order_index: 8 },
      ]
    }
  ];
};

const Pricing = () => {
  const { data: packages, isLoading, error } = useQuery({
    queryKey: ['pricing-packages'],
    queryFn: fetchPricingPackages,
    refetchOnMount: true,
    staleTime: 0,
  });

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
