
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';

interface SectionSettingsProps {
  showTrustedClients: boolean;
  setShowTrustedClients: (value: boolean) => void;
  trustedClientsTitle: string;
  setTrustedClientsTitle: (value: string) => void;
  featuredLabel?: string;
  setFeaturedLabel?: (value: string) => void;
}

const SectionSettings = ({
  showTrustedClients,
  setShowTrustedClients,
  trustedClientsTitle,
  setTrustedClientsTitle,
  featuredLabel = "Featured Clients",
  setFeaturedLabel
}: SectionSettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Paramètres de la section</CardTitle>
        <CardDescription>Personnalisez la section "Ils nous font confiance"</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="show-trusted-clients">Afficher la section</Label>
            <p className="text-sm text-muted-foreground">Activez ou désactivez l'affichage de la section</p>
          </div>
          <Switch 
            id="show-trusted-clients" 
            checked={showTrustedClients} 
            onCheckedChange={setShowTrustedClients}
          />
        </div>
        
        <div className="space-y-2 pt-4">
          <Label htmlFor="trusted-clients-title">Titre de la section</Label>
          <Input 
            id="trusted-clients-title" 
            value={trustedClientsTitle} 
            onChange={(e) => setTrustedClientsTitle(e.target.value)}
            placeholder="Ils nous font confiance"
          />
        </div>
        
        {setFeaturedLabel && (
          <div className="space-y-2 pt-2">
            <Label htmlFor="featured-label">Libellé "Featured Clients"</Label>
            <Input 
              id="featured-label" 
              value={featuredLabel} 
              onChange={(e) => setFeaturedLabel(e.target.value)}
              placeholder="Nos clients"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SectionSettings;
