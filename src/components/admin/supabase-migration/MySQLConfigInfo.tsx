
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon, AlertTriangle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const MySQLConfigInfo: React.FC = () => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Configuration pour MySQL</CardTitle>
        <CardDescription>
          Instructions pour configurer l'intégration avec votre base de données MySQL chez OVH
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Information importante</AlertTitle>
          <AlertDescription>
            Pour utiliser une base de données MySQL hébergée chez OVH, vous devrez créer une API intermédiaire
            pour connecter votre application front-end à votre base MySQL.
          </AlertDescription>
        </Alert>
        
        <div className="space-y-2">
          <h3 className="font-medium">1. Créez les tables MySQL nécessaires</h3>
          <div className="bg-muted p-3 rounded-md text-sm overflow-auto">
            <pre>{`CREATE TABLE sections (
  id VARCHAR(36) PRIMARY KEY,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  visible BOOLEAN DEFAULT 1,
  \`order\` INT NOT NULL,
  custom_component VARCHAR(255) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE section_data (
  id VARCHAR(36) PRIMARY KEY,
  section_id VARCHAR(36) NOT NULL,
  data JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY (section_id)
);

CREATE TABLE trusted_clients (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  logo_url VARCHAR(255) NOT NULL,
  website_url VARCHAR(255) NULL,
  category VARCHAR(100) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE template_config (
  id VARCHAR(36) PRIMARY KEY,
  active_template VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);`}</pre>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <h3 className="font-medium">2. Créez une API REST pour accéder à votre base MySQL</h3>
          <p className="text-sm text-muted-foreground">
            Vous devrez créer une API (en PHP, Node.js ou autre) hébergée sur votre serveur OVH qui exposera
            des endpoints pour interagir avec votre base MySQL:
          </p>
          <ul className="list-disc pl-6 text-sm space-y-1">
            <li><code>GET /sections</code> - Récupérer toutes les sections</li>
            <li><code>PUT /sections</code> - Mettre à jour toutes les sections</li>
            <li><code>GET /section-data</code> - Récupérer toutes les données des sections</li>
            <li><code>PUT /section-data</code> - Mettre à jour toutes les données des sections</li>
            <li><code>GET /template-config</code> - Récupérer la configuration du template</li>
            <li><code>PUT /template-config</code> - Mettre à jour la configuration du template</li>
          </ul>
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <h3 className="font-medium">3. Configurez l'URL de votre API</h3>
          <p className="text-sm text-muted-foreground">
            Créez un fichier <code>.env.local</code> à la racine de votre projet avec la variable suivante:
          </p>
          <div className="bg-muted p-3 rounded-md text-sm">
            <pre>{`VITE_MYSQL_API_URL=https://votre-api.exemple.com`}</pre>
          </div>
        </div>
        
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            Assurez-vous que votre API inclut des mesures de sécurité appropriées (authentification, CORS, etc.) 
            pour protéger votre base de données MySQL contre les accès non autorisés.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default MySQLConfigInfo;
