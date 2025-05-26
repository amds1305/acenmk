
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { UserMenuSettings } from './types';
import { UserCircle, LogIn, UserPlus } from 'lucide-react';

const UserMenuManager = () => {
  const { toast } = useToast();
  
  // État des paramètres de l'espace membre
  const [userMenuSettings, setUserMenuSettings] = useState<UserMenuSettings>({
    showLoginButton: true,
    showRegisterButton: true,
    showProfileIcon: true,
    loginButtonLabel: 'Connexion',
    registerButtonLabel: 'Inscription'
  });

  // Mettre à jour un paramètre spécifique
  const updateSetting = <K extends keyof UserMenuSettings>(key: K, value: UserMenuSettings[K]) => {
    setUserMenuSettings({
      ...userMenuSettings,
      [key]: value
    });
  };

  // Sauvegarder les paramètres
  const saveSettings = () => {
    // Ici, vous implémenteriez la sauvegarde vers votre backend
    toast({
      title: "Succès",
      description: "Paramètres de l'espace membre mis à jour"
    });
  };

  return (
    <CardContent>
      <div className="space-y-6">
        {/* Options d'affichage */}
        <div className="space-y-4">
          <h3 className="font-medium">Options d'affichage</h3>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="show-login" className="text-base">Bouton de connexion</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Afficher le bouton de connexion pour les utilisateurs non authentifiés
              </p>
            </div>
            <Switch 
              id="show-login"
              checked={userMenuSettings.showLoginButton} 
              onCheckedChange={(checked) => updateSetting('showLoginButton', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="show-register" className="text-base">Bouton d'inscription</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Afficher le bouton d'inscription pour les utilisateurs non authentifiés
              </p>
            </div>
            <Switch 
              id="show-register"
              checked={userMenuSettings.showRegisterButton} 
              onCheckedChange={(checked) => updateSetting('showRegisterButton', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="show-profile-icon" className="text-base">Icône de profil</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Afficher l'icône de profil pour les utilisateurs authentifiés
              </p>
            </div>
            <Switch 
              id="show-profile-icon"
              checked={userMenuSettings.showProfileIcon} 
              onCheckedChange={(checked) => updateSetting('showProfileIcon', checked)}
            />
          </div>
        </div>
        
        {/* Libellés des boutons */}
        <div className="space-y-4">
          <h3 className="font-medium">Libellés des boutons</h3>
          
          <div className="space-y-2">
            <Label htmlFor="login-label">Texte du bouton de connexion</Label>
            <Input
              id="login-label"
              value={userMenuSettings.loginButtonLabel}
              onChange={(e) => updateSetting('loginButtonLabel', e.target.value)}
              placeholder="Connexion"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="register-label">Texte du bouton d'inscription</Label>
            <Input
              id="register-label"
              value={userMenuSettings.registerButtonLabel}
              onChange={(e) => updateSetting('registerButtonLabel', e.target.value)}
              placeholder="Inscription"
            />
          </div>
        </div>
        
        {/* Prévisualisation */}
        <div className="space-y-2">
          <Label>Prévisualisation (non connecté)</Label>
          <div className="border p-4 rounded-lg bg-gray-50 dark:bg-gray-800 flex justify-end gap-2">
            {userMenuSettings.showLoginButton && (
              <Button variant="outline" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                {userMenuSettings.loginButtonLabel}
              </Button>
            )}
            {userMenuSettings.showRegisterButton && (
              <Button className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                {userMenuSettings.registerButtonLabel}
              </Button>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Prévisualisation (connecté)</Label>
          <div className="border p-4 rounded-lg bg-gray-50 dark:bg-gray-800 flex justify-end">
            {userMenuSettings.showProfileIcon && (
              <Button variant="ghost" className="rounded-full w-10 h-10 p-0">
                <UserCircle className="h-6 w-6" />
              </Button>
            )}
          </div>
        </div>

        {/* Bouton de sauvegarde */}
        <Button onClick={saveSettings} className="w-full">
          Sauvegarder les modifications
        </Button>
      </div>
    </CardContent>
  );
};

export default UserMenuManager;
