
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Feature {
  id: string;
  feature: string;
  is_included: boolean;
  order_index: number;
}

export interface PricingCardProps {
  id: string;
  title: string;
  description: string | null;
  startingPrice: number | null;
  isFeatured: boolean;
  features: Feature[];
}

export const PricingCard: React.FC<PricingCardProps> = ({
  id,
  title,
  description,
  startingPrice,
  isFeatured,
  features,
}) => {
  // Sort features by order_index
  const sortedFeatures = [...features].sort((a, b) => a.order_index - b.order_index);

  return (
    <div
      className={`rounded-xl border p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
        isFeatured ? 'bg-primary/5 border-primary/20' : 'bg-card'
      }`}
    >
      {isFeatured && (
        <div className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          Populaire
        </div>
      )}
      
      <h3 className="text-xl font-bold">{title}</h3>
      {description && <p className="mt-2 text-muted-foreground">{description}</p>}
      
      {startingPrice !== null && (
        <div className="mt-4 flex items-baseline">
          <span className="text-3xl font-bold">
            {startingPrice > 0 ? `${startingPrice}€` : 'Gratuit'}
          </span>
          {startingPrice > 0 && <span className="ml-1 text-muted-foreground">/mois</span>}
        </div>
      )}
      
      <ul className="mt-6 space-y-3 text-sm">
        {sortedFeatures.map((feature) => (
          <li key={feature.id} className="flex items-start">
            <div className={`mr-2 mt-0.5 rounded-full p-0.5 ${feature.is_included ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
              <Check className="h-4 w-4" />
            </div>
            <span className={feature.is_included ? '' : 'text-muted-foreground line-through'}>{feature.feature}</span>
          </li>
        ))}
      </ul>
      
      <Button 
        className={`mt-6 w-full ${isFeatured ? 'bg-primary hover:bg-primary/90' : ''}`}
        variant={isFeatured ? 'default' : 'outline'} 
      >
        Choisir cette offre
      </Button>
    </div>
  );
};
