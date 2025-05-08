
import React, { useState, useEffect } from 'react';
import { usePermissions } from '@/contexts/PermissionsContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { SaveIndicator } from '@/components/ui/save-indicator';
import { Search, Filter, Save, RefreshCw, AlertCircle } from 'lucide-react';
import { UserRole } from '@/types/auth';

// Liste des rôles disponibles
const availableRoles: { id: UserRole; label: string }[] = [
  { id: 'user', label: 'Client' },
  { id: 'client_premium', label: 'Client Premium' },
  { id: 'admin', label: 'Admin' },
  { id: 'super_admin', label: 'Super Admin' },
];

const RoutePermissionsManager = () => {
  const { 
    accessConfig, 
    isLoading,
    updateRouteAccess,
    savePermissions,
    scanAndUpdateRoutes
  } = usePermissions();

  const [activeTab, setActiveTab] = useState('app');
  const [searchTerm, setSearchTerm] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  
  // État pour gérer les permissions éditées mais non sauvegardées
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Filtrer les routes en fonction du terme de recherche
  const filteredRoutes = React.useMemo(() => {
    if (activeTab === 'app') {
      return Object.entries(accessConfig.routes || {})
        .filter(([path]) => path.toLowerCase().includes(searchTerm.toLowerCase()));
    } else {
      return Object.entries(accessConfig.adminRoutes || {})
        .filter(([path]) => path.toLowerCase().includes(searchTerm.toLowerCase()));
    }
  }, [activeTab, accessConfig, searchTerm]);

  // Gestionnaire pour mettre à jour l'accès public à une route
  const handleTogglePublic = (route: string, isPublic: boolean) => {
    const routeConfig = activeTab === 'app' 
      ? accessConfig.routes[route]
      : accessConfig.adminRoutes[route];
      
    if (!routeConfig) return;
    
    const updatedPermission = {
      ...routeConfig,
      isPublic,
      allowedRoles: routeConfig.allowedRoles
    };
    
    updateRouteAccess(activeTab === 'app' ? route : `/admin/${route}`, updatedPermission);
    setHasUnsavedChanges(true);
  };

  // Gestionnaire pour mettre à jour les rôles autorisés pour une route
  const handleToggleRole = (route: string, role: UserRole, isAllowed: boolean) => {
    const routeConfig = activeTab === 'app' 
      ? accessConfig.routes[route]
      : accessConfig.adminRoutes[route];
      
    if (!routeConfig) return;
    
    let updatedRoles: UserRole[];
    
    if (isAllowed) {
      updatedRoles = [...routeConfig.allowedRoles, role];
    } else {
      updatedRoles = routeConfig.allowedRoles.filter(r => r !== role);
    }
    
    const updatedPermission = {
      ...routeConfig,
      isPublic: routeConfig.isPublic,
      allowedRoles: updatedRoles
    };
    
    updateRouteAccess(activeTab === 'app' ? route : `/admin/${route}`, updatedPermission);
    setHasUnsavedChanges(true);
  };

  // Fonction pour sauvegarder les modifications
  const handleSaveChanges = async () => {
    try {
      setSaveStatus('saving');
      await savePermissions();
      setSaveStatus('success');
      setHasUnsavedChanges(false);
      
      // Déclencher l'événement de sauvegarde
      window.dispatchEvent(new CustomEvent('admin-changes-saved'));
      
      // Réinitialiser le statut après un délai
      setTimeout(() => {
        setSaveStatus('idle');
      }, 3000);
    } catch (error) {
      setSaveStatus('error');
      console.error('Erreur lors de l\'enregistrement des permissions:', error);
      
      // Réinitialiser le statut après un délai même en cas d'erreur
      setTimeout(() => {
        setSaveStatus('idle');
      }, 3000);
    }
  };

  // Fonction pour scanner les nouvelles routes
  const handleScanRoutes = async () => {
    try {
      setSaveStatus('saving');
      await scanAndUpdateRoutes();
      setSaveStatus('success');
      
      // Réinitialiser le statut après un délai
      setTimeout(() => {
        setSaveStatus('idle');
      }, 3000);
    } catch (error) {
      setSaveStatus('error');
      console.error('Erreur lors de l\'analyse des routes:', error);
      
      // Réinitialiser le statut après un délai même en cas d'erreur
      setTimeout(() => {
        setSaveStatus('idle');
      }, 3000);
    }
  };

  // Effacer le message "modifications non sauvegardées" lors du changement d'onglet
  useEffect(() => {
    setHasUnsavedChanges(false);
  }, [activeTab]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Contrôle d'accès aux rubriques</h2>
          <p className="text-sm text-muted-foreground">
            Gérez les permissions d'accès aux différentes rubriques du site
          </p>
        </div>
        <div className="flex items-center gap-4">
          <SaveIndicator status={saveStatus} />
          <Button onClick={handleScanRoutes} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Scanner les routes
          </Button>
          <Button onClick={handleSaveChanges} disabled={!hasUnsavedChanges || saveStatus === 'saving'}>
            <Save className="mr-2 h-4 w-4" />
            Enregistrer
          </Button>
        </div>
      </div>

      {hasUnsavedChanges && (
        <Alert className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
          <AlertCircle className="h-4 w-4 text-amber-500" />
          <AlertTitle className="text-amber-800 dark:text-amber-400">
            Modifications non enregistrées
          </AlertTitle>
          <AlertDescription className="text-amber-700 dark:text-amber-300">
            Vos modifications n'ont pas été enregistrées. Cliquez sur "Enregistrer" pour les appliquer.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <Tabs defaultValue="app" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="app">Interface utilisateur</TabsTrigger>
                <TabsTrigger value="admin">Interface admin</TabsTrigger>
              </TabsList>
              
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Rechercher une route..." 
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-8 w-[250px]"
                />
              </div>
            </div>
          </Tabs>
        </CardHeader>
        
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full"></div>
            </div>
          ) : filteredRoutes.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Aucune route trouvée pour "{searchTerm}"
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRoutes.map(([route, permissions]) => (
                <Card key={route} className="overflow-hidden">
                  <div className="bg-muted/50 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{route}</span>
                      {permissions.isPublic ? (
                        <Badge variant="secondary">Public</Badge>
                      ) : (
                        <Badge>Restreint</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`public-${route}`} className="text-sm">Public</Label>
                      <Switch 
                        id={`public-${route}`}
                        checked={permissions.isPublic} 
                        onCheckedChange={(isChecked) => handleTogglePublic(route, isChecked)}
                      />
                    </div>
                  </div>
                  
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Rôles autorisés :</div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {availableRoles.map(role => (
                          <div key={role.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`${route}-${role.id}`}
                              disabled={permissions.isPublic}
                              checked={permissions.isPublic || permissions.allowedRoles.includes(role.id)}
                              onCheckedChange={(isChecked) => handleToggleRole(route, role.id, !!isChecked)}
                            />
                            <Label 
                              htmlFor={`${route}-${role.id}`}
                              className={permissions.isPublic ? "text-muted-foreground" : ""}
                            >
                              {role.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {permissions.description && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {permissions.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RoutePermissionsManager;
