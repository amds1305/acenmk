import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User } from '@/types/auth';
import { Shield, Key, AlertTriangle } from 'lucide-react';

const passwordFormSchema = z.object({
  currentPassword: z.string().min(1, 'Mot de passe actuel requis'),
  newPassword: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  confirmPassword: z.string().min(8, 'Veuillez confirmer votre mot de passe'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

interface SecuritySettingsProps {
  user: User;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  toggleTwoFactor: (enable: boolean) => Promise<void>;
}

const SecuritySettings = ({ user, updatePassword, toggleTwoFactor }: SecuritySettingsProps) => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [is2FALoading, setIs2FALoading] = useState(false);
  
  const form = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });
  
  const onTwoFactorToggle = async (checked: boolean) => {
    setIs2FALoading(true);
    try {
      await toggleTwoFactor(checked);
    } catch (error) {
      console.error('Error toggling 2FA:', error);
    } finally {
      setIs2FALoading(false);
    }
  };
  
  const onSubmitPasswordChange = async (values: z.infer<typeof passwordFormSchema>) => {
    setIsChangingPassword(true);
    try {
      await updatePassword(values.currentPassword, values.newPassword);
      form.reset();
    } catch (error) {
      // Error handling is done in the updatePassword function
    } finally {
      setIsChangingPassword(false);
    }
  };
  
  const twoFactorEnabled = user?.twoFactorEnabled || false;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Paramètres de sécurité
        </CardTitle>
        <CardDescription>
          Gérez la sécurité de votre compte
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Password Change Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Key className="h-4 w-4" /> Changer le mot de passe
          </h3>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitPasswordChange)} className="space-y-4">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe actuel</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nouveau mot de passe</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmer le mot de passe</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full"
                disabled={isChangingPassword}
              >
                {isChangingPassword ? 'Mise à jour...' : 'Mettre à jour le mot de passe'}
              </Button>
            </form>
          </Form>
        </div>
        
        {/* Two Factor Authentication */}
        <div className="pt-6 border-t">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Shield className="h-4 w-4" /> Authentification à deux facteurs
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Ajoutez une couche de sécurité supplémentaire à votre compte.
              </p>
            </div>
            <Switch 
              checked={twoFactorEnabled}
              onCheckedChange={onTwoFactorToggle}
              disabled={is2FALoading}
            />
          </div>
          
          {!twoFactorEnabled && (
            <div className="bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-900 rounded-lg p-4 flex gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-yellow-800 dark:text-yellow-300 font-medium">
                  Sécurité améliorée recommandée
                </p>
                <p className="text-xs mt-1 text-yellow-700 dark:text-yellow-400">
                  L'authentification à deux facteurs ajoute une couche de sécurité supplémentaire à votre compte en demandant une autre forme de vérification en plus de votre mot de passe.
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Account Activity Section */}
        <div className="pt-6 border-t">
          <h3 className="text-lg font-medium mb-4">Sessions actives</h3>
          <div className="rounded-lg border p-4 mb-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">Session actuelle</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Chrome sur Windows • Paris, France
                </p>
              </div>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Actif maintenant
              </span>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            Se déconnecter des autres appareils
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecuritySettings;
