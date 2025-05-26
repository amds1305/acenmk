
import { Check, X } from 'lucide-react';

interface PricingFeatureProps {
  feature: string;
  isIncluded: boolean;
}

export const PricingFeature = ({ feature, isIncluded }: PricingFeatureProps) => {
  return (
    <li className="flex items-center gap-2">
      {isIncluded ? (
        <Check className="h-5 w-5 text-green-500" />
      ) : (
        <X className="h-5 w-5 text-red-500" />
      )}
      <span>{feature}</span>
    </li>
  );
};
