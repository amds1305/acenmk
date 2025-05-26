
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { PricingFeature } from './PricingFeature';

interface Feature {
  id: string;
  feature: string;
  is_included: boolean;
}

interface PricingCardProps {
  id: string;
  title: string;
  description: string | null;
  startingPrice: number | null;
  isFeatured: boolean;
  features: Feature[];
}

export const PricingCard = ({
  title,
  description,
  startingPrice,
  isFeatured,
  features,
}: PricingCardProps) => {
  return (
    <Card className={`flex flex-col ${isFeatured ? 'border-primary shadow-lg scale-105' : ''}`}>
      <CardHeader>
        {isFeatured && (
          <div className="text-sm font-medium text-primary mb-2">
            Offre Recommandée
          </div>
        )}
        <h3 className="text-2xl font-bold">{title}</h3>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
        {startingPrice && (
          <div className="mt-4">
            <span className="text-3xl font-bold">
              À partir de {startingPrice}€
            </span>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="flex-grow">
        <ul className="space-y-4">
          {features?.map((feature) => (
            <PricingFeature
              key={feature.id}
              feature={feature.feature}
              isIncluded={feature.is_included}
            />
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <Button className="w-full" variant={isFeatured ? "default" : "outline"}>
          Nous Contacter
        </Button>
      </CardFooter>
    </Card>
  );
};
