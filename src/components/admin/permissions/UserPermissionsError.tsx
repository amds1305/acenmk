
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';

interface UserPermissionsErrorProps {
  message?: string;
  onRetry?: () => void;
}

const UserPermissionsError: React.FC<UserPermissionsErrorProps> = ({ 
  message = "Une erreur est survenue lors du chargement des utilisateurs",
  onRetry 
}) => {
  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="rounded-full bg-destructive/10 p-3 mb-3">
            <Loader2 className="h-6 w-6 text-destructive" />
          </div>
          <h3 className="font-medium">Erreur de chargement</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {message}
          </p>
          {onRetry && (
            <Button variant="outline" className="mt-4" onClick={onRetry}>
              Réessayer
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserPermissionsError;
