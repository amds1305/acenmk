
import React, { useState } from 'react';
import { User } from '@/types/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, Lock, ShieldCheck, AlertTriangle, Loader2 } from 'lucide-react';

interface SecuritySettingsProps {
  user: User;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  toggleTwoFactor: (enable: boolean) => Promise<void>;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({ user, updatePassword, toggleTwoFactor }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isToggling2FA, setIsToggling2FA] = useState(false);
  const { toast } = useToast();

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset error
    setPasswordError('');
    
    // Simple validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('Tous les champs sont requis');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setPasswordError('Les nouveaux mots de passe ne correspondent pas');
      return;
    }
    
    if (newPassword.length < 8) {
      setPasswordError('Le nouveau mot de passe doit contenir au moins 8 caractères');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await updatePassword(currentPassword, newPassword);
      
      // Reset fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      toast({
        title: "Mot de passe mis à jour",
        description: "Votre mot de passe a été modifié avec succès.",
      });
    } catch (error) {
      setPasswordError('Le mot de passe actuel est incorrect');
      
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la modification du mot de passe."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggle2FA = async (enabled: boolean) => {
    setIsToggling2FA(true);
    
    try {
      await toggleTwoFactor(enabled);
      
      toast({
        title: enabled ? "Authentification à deux facteurs activée" : "Authentification à deux facteurs désactivée",
        description: enabled 
          ? "Votre compte est maintenant plus sécurisé." 
          : "L'authentification à deux facteurs a été désactivée."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la modification des paramètres de sécurité."
      });
    } finally {
      setIsToggling2FA(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Password Change */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Modifier le mot de passe
          </CardTitle>
          <CardDescription>
            Mettez à jour votre mot de passe pour sécuriser votre compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            {passwordError && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Erreur</AlertTitle>
                <AlertDescription>
                  {passwordError}
                </AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Mot de passe actuel</Label>
              <Input 
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newPassword">Nouveau mot de passe</Label>
              <Input 
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmez le nouveau mot de passe</Label>
              <Input 
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mise à jour...
                </>
              ) : (
                "Modifier le mot de passe"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5" />
            Authentification à deux facteurs
          </CardTitle>
          <CardDescription>
            Ajoutez une couche de sécurité supplémentaire à votre compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="text-sm font-medium">
                {user.twoFactorEnabled ? (
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Activée
                  </div>
                ) : (
                  "Désactivée"
                )}
              </h4>
              <p className="text-sm text-muted-foreground">
                L'authentification à deux facteurs ajoute une couche de sécurité supplémentaire à votre compte en demandant un code supplémentaire lors de la connexion.
              </p>
            </div>
            <Switch
              checked={!!user.twoFactorEnabled}
              onCheckedChange={handleToggle2FA}
              disabled={isToggling2FA}
            />
          </div>
          
          {isToggling2FA && (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              <span>Mise à jour des paramètres...</span>
            </div>
          )}
          
          {user.twoFactorEnabled && (
            <Alert className="mt-4">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Sécurité renforcée</AlertTitle>
              <AlertDescription>
                Votre compte bénéficie d'une protection supplémentaire. Un code de vérification sera requis à chaque connexion.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
      
      {/* Session Management */}
      <Card>
        <CardHeader>
          <CardTitle>Sessions actives</CardTitle>
          <CardDescription>
            Gérez les appareils connectés à votre compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">Session actuelle</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Web Browser / {navigator.userAgent.includes('Chrome') ? 'Chrome' : navigator.userAgent.includes('Firefox') ? 'Firefox' : 'Unknown Browser'}
                  </p>
                </div>
                <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 py-1 px-2 rounded-full">
                  Actif
                </span>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">
              Déconnecter toutes les autres sessions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecuritySettings;
