
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon, Save, CheckCircle, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { setApiUrl, getApiUrl } from '@/services/mysql/config';
import { useToast } from '@/hooks/use-toast';

const MySQLConfigInfo: React.FC = () => {
  const { toast } = useToast();
  const [apiUrl, setApiUrlState] = useState(getApiUrl() || '');
  const [isUrlValid, setIsUrlValid] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testSuccess, setTestSuccess] = useState(false);
  const [testError, setTestError] = useState<string | null>(null);

  useEffect(() => {
    // Vérifier le format de l'URL quand elle change
    try {
      if (apiUrl) {
        new URL(apiUrl);
        setIsUrlValid(true);
      } else {
        setIsUrlValid(false);
      }
    } catch (error) {
      setIsUrlValid(false);
    }
  }, [apiUrl]);

  const testConnection = async () => {
    if (!isUrlValid) return;
    
    setIsTesting(true);
    setTestSuccess(false);
    setTestError(null);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 secondes timeout
      
      const testUrl = `${apiUrl}/config.php?test=json&_=${Date.now()}`; // Ajouter un timestamp pour éviter le cache
      console.log(`Test de l'API: ${testUrl}`);
      
      const response = await fetch(testUrl, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        signal: controller.signal,
        mode: 'cors',
        cache: 'no-store'
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        try {
          const data = await response.json();
          console.log('Réponse de test reçue:', data);
          setTestSuccess(true);
          setTestError(null);
          toast({
            title: "Connexion réussie",
            description: "La connexion à l'API MySQL a été établie avec succès."
          });
        } catch (e) {
          console.error('Erreur de parsing JSON:', e);
          const rawText = await response.text();
          console.error('Réponse brute:', rawText);
          setTestError(`Format de réponse invalide: ${rawText.substring(0, 100)}${rawText.length > 100 ? '...' : ''}`);
          toast({
            title: "Format de réponse invalide",
            description: "Le serveur a répondu, mais le format n'est pas valide. Vérifiez votre configuration PHP.",
            variant: "destructive"
          });
        }
      } else {
        const errorText = await response.text();
        console.error(`Statut: ${response.status}, Réponse:`, errorText);
        setTestError(`Erreur HTTP ${response.status}: ${errorText.substring(0, 100)}${errorText.length > 100 ? '...' : ''}`);
        toast({
          title: "Échec de connexion",
          description: `Le serveur a répondu avec l'erreur: ${response.status} ${response.statusText}`,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      if (error.name === 'AbortError') {
        setTestError("La connexion a expiré après 30 secondes");
        toast({
          title: "Délai d'attente dépassé",
          description: "La connexion à l'API a expiré. Vérifiez que l'URL est correcte et que le serveur répond.",
          variant: "destructive"
        });
      } else {
        setTestError(error.message || "Erreur inconnue");
        toast({
          title: "Erreur de connexion",
          description: `Impossible de se connecter à l'API: ${error.message}`,
          variant: "destructive"
        });
      }
    } finally {
      setIsTesting(false);
    }
  };

  const handleSave = () => {
    if (!isUrlValid) {
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
    
    // Tester la connexion automatiquement après sauvegarde
    testConnection();
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
                className={`flex-1 ${isUrlValid ? 'border-green-400' : apiUrl ? 'border-red-400' : ''}`}
              />
              <Button onClick={handleSave} disabled={!isUrlValid}>
                <Save className="h-4 w-4 mr-2" />
                Enregistrer
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              L'URL doit pointer vers le dossier contenant les fichiers PHP de l'API.
              Si vous avez placé les fichiers à la racine de votre site, l'URL sera simplement votre domaine.
            </p>
          </div>

          <div className="flex justify-between items-center">
            <Button 
              variant="outline" 
              onClick={testConnection} 
              disabled={!isUrlValid || isTesting}
              className="mt-2"
            >
              {isTesting ? "Test en cours..." : "Tester la connexion"}
            </Button>
            
            {testSuccess && (
              <div className="flex items-center text-green-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                <span className="text-sm">Connexion réussie</span>
              </div>
            )}
          </div>
          
          {testError && (
            <Alert variant="destructive" className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erreur de connexion</AlertTitle>
              <AlertDescription className="break-words">
                {testError}
              </AlertDescription>
            </Alert>
          )}
          
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Remarques</AlertTitle>
            <AlertDescription>
              <ul className="list-disc pl-4 space-y-1">
                <li>Si votre site utilise HTTPS, votre API doit également utiliser HTTPS pour que la connexion fonctionne.</li>
                <li>Assurez-vous que les fichiers PHP ont les permissions correctes (644 pour les fichiers, 755 pour les dossiers).</li>
                <li>Vous pouvez également définir l'URL de l'API en utilisant la variable d'environnement VITE_MYSQL_API_URL dans votre fichier .env.</li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
  );
};

export default MySQLConfigInfo;
