
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon, Save } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { setApiUrl, getApiUrl } from '@/services/mysql/config';
import { useToast } from '@/hooks/use-toast';

const MySQLConfigInfo: React.FC = () => {
  const { toast } = useToast();
  const [apiUrl, setApiUrlState] = useState(getApiUrl() || '');

  const handleSave = () => {
    if (!apiUrl) {
      toast({
        title: "Erreur",
        description: "L'URL de l'API ne peut pas être vide",
        variant: "destructive"
      });
      return;
    }

    // Vérifier le format de l'URL
    try {
      new URL(apiUrl);
    } catch (error) {
      toast({
        title: "URL invalide",
        description: "Veuillez entrer une URL valide (ex: https://www.exemple.com/api)",
        variant: "destructive"
      });
      return;
    }

    // Sauvegarder l'URL
    setApiUrl(apiUrl);
    
    toast({
      title: "Configuration sauvegardée",
      description: "L'URL de l'API MySQL a été enregistrée avec succès.",
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Configuration de l'API MySQL</CardTitle>
        <CardDescription>
          Configurez l'URL de l'API MySQL pour la connexion à votre base de données
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="mb-4">
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Information importante</AlertTitle>
          <AlertDescription>
            Pour utiliser la migration vers MySQL, vous devez déployer l'API PHP sur votre hébergement OVH.
            Téléchargez le package d'installation ci-dessus et installez-le sur votre hébergement,
            puis configurez l'URL ci-dessous.
          </AlertDescription>
        </Alert>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">URL de l'API MySQL</p>
            <div className="flex gap-2">
              <Input 
                value={apiUrl} 
                onChange={(e) => setApiUrlState(e.target.value)} 
                placeholder="https://www.votre-site.com/api"
                className="flex-1"
              />
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Enregistrer
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              L'URL doit pointer vers le dossier contenant les fichiers PHP de l'API.
              Si vous avez placé les fichiers à la racine de votre site, l'URL sera simplement votre domaine.
            </p>
          </div>
          
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Remarque</AlertTitle>
            <AlertDescription>
              Vous pouvez également définir l'URL de l'API en utilisant la variable d'environnement VITE_MYSQL_API_URL dans votre fichier .env.
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
  );
};

export default MySQLConfigInfo;
