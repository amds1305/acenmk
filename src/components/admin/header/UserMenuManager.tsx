
import React from 'react';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { UserCircle, LogIn, UserPlus, Save } from 'lucide-react';
import { useUserMenu } from './user-menu/useUserMenu';
import { SaveIndicator } from '@/components/ui/save-indicator';
import { useAdminNotification } from '@/hooks/use-admin-notification';

const UserMenuManager = () => {
  const { saveStatus } = useAdminNotification();
  const { userMenuSettings, updateSetting, saveSettings, isLoading } = useUserMenu();

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
        <div className="flex items-center justify-between">
          <SaveIndicator status={saveStatus} />
          <Button 
            onClick={saveSettings}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            Sauvegarder les modifications
          </Button>
        </div>
      </div>
    </CardContent>
  );
};

export default UserMenuManager;
