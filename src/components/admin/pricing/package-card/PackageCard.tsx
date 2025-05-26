
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Trash2, GripVertical } from 'lucide-react';

interface PackageCardProps {
  pkg: any;
  onEdit: (pkg: any) => void;
  onDelete: (id: string) => void;
}

export const PackageCard = ({ pkg, onEdit, onDelete }: PackageCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">{pkg.title}</CardTitle>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(pkg)}
          >
            <Star className={`h-4 w-4 ${pkg.is_featured ? 'fill-yellow-400' : ''}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(pkg.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{pkg.description}</p>
        <p className="mt-2 font-medium">
          Prix de départ : {pkg.starting_price}€
        </p>
      </CardContent>
    </Card>
  );
};
