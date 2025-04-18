
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

// Liste des fichiers à télécharger depuis le répertoire /deploy
const files = [
  'install.php',
  'config.php',
  'sections.php',
  'section-data.php',
  'template-config.php',
  'trusted-clients.php',
  'install-guide.md',
  'README.txt'
];

const ApiPackageDownload: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const zip = new JSZip();
      
      // Ajouter chaque fichier au ZIP
      for (const file of files) {
        try {
          // Utiliser un chemin relatif au site actuel, sans /src
          const response = await fetch(`/services/mysql/deploy/${file}`);
          if (!response.ok) {
            throw new Error(`Impossible de charger ${file} (statut: ${response.status})`);
          }
          const content = await response.text();
          zip.file(file, content);
        } catch (error) {
          console.error(`Erreur lors du chargement de ${file}:`, error);
          toast({
            title: "Erreur",
            description: `Impossible de charger ${file}. Erreur: ${error instanceof Error ? error.message : 'Inconnue'}`,
            variant: "destructive"
          });
          setIsLoading(false);
          return;
        }
      }
      
      // Générer le ZIP et le télécharger
      const blob = await zip.generateAsync({ type: "blob" });
      saveAs(blob, "mysql-api-package.zip");
      
      toast({
        title: "Téléchargement terminé",
        description: "Le package API MySQL a été téléchargé avec succès."
      });
    } catch (error) {
      console.error("Erreur lors de la création du package:", error);
      toast({
        title: "Erreur",
        description: "Impossible de créer le package. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Package d'installation automatique</CardTitle>
        <CardDescription>
          Téléchargez un package complet avec tous les fichiers nécessaires pour déployer l'API sur votre hébergement OVH
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Ce package contient tous les fichiers PHP nécessaires pour créer automatiquement les tables MySQL et 
          configurer l'API REST qui sera utilisée par votre application. Il vous suffit de modifier le fichier de 
          configuration avec vos informations de connexion MySQL et de télécharger les fichiers sur votre hébergement.
        </p>
        
        <Button 
          onClick={handleDownload} 
          disabled={isLoading} 
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Préparation du package...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Télécharger le package d'installation
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ApiPackageDownload;
