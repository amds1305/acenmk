
import React, { useState, useEffect } from 'react';
import { User } from '@/types/auth';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Loader2, Mail, Phone, Building, Calendar, UserIcon, Shield } from 'lucide-react';
import UserRoleManager from './UserRoleManager';

interface UserProfileDialogProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedUser: Partial<User>) => Promise<void>;
  isEditing: boolean;
}

const UserProfileDialog: React.FC<UserProfileDialogProps> = ({
  user,
  isOpen,
  onClose,
  onSave,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState<Partial<User>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        company: user.company || '',
        phone: user.phone || '',
        biography: user.biography || '',
      });
    }
  }, [user]);

  if (!user) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRoleUpdate = (newRole: any) => {
    setFormData(prev => ({
      ...prev,
      role: newRole
    }));
    
    // Appliquer immédiatement la mise à jour
    onSave({...formData, role: newRole});
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getRoleBadgeVariant = (role: string) => {
    switch(role) {
      case 'super_admin': return 'destructive';
      case 'admin': return 'default';
      case 'client_premium': return 'orange';
      default: return 'secondary';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Modifier le profil' : 'Profil utilisateur'}</DialogTitle>
          <DialogDescription>
            {isEditing 
              ? 'Modifiez les informations du profil utilisateur.' 
              : 'Détails du compte utilisateur.'}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="security">Sécurité & Rôles</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4 py-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col items-center gap-2">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Badge variant={getRoleBadgeVariant(user.role)}>
                  {user.role === 'super_admin' ? 'Super Admin' : 
                   user.role === 'admin' ? 'Administrateur' : 
                   user.role === 'client_premium' ? 'Client Premium' : 'Client'}
                </Badge>
              </div>
              
              <div className="flex-1">
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nom</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name || ''}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          value={formData.email || ''}
                          onChange={handleChange}
                          required
                          type="email"
                          readOnly
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Entreprise</Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company || ''}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone || ''}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="biography">Biographie</Label>
                      <Textarea
                        id="biography"
                        name="biography"
                        value={formData.biography || ''}
                        onChange={handleChange}
                        rows={3}
                      />
                    </div>
                  </form>
                ) : (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-start gap-2">
                        <UserIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Nom</p>
                          <p>{user.name}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Email</p>
                          <p>{user.email}</p>
                        </div>
                      </div>
                      {user.company && (
                        <div className="flex items-start gap-2">
                          <Building className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Entreprise</p>
                            <p>{user.company}</p>
                          </div>
                        </div>
                      )}
                      {user.phone && (
                        <div className="flex items-start gap-2">
                          <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Téléphone</p>
                            <p>{user.phone}</p>
                          </div>
                        </div>
                      )}
                      <div className="flex items-start gap-2">
                        <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Date d'inscription</p>
                          <p>{formatDate(user.createdAt)}</p>
                        </div>
                      </div>
                      {user.lastLoginDate && (
                        <div className="flex items-start gap-2">
                          <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Dernière connexion</p>
                            <p>{formatDate(user.lastLoginDate)}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    {user.biography && (
                      <div className="pt-2">
                        <p className="text-sm font-medium mb-1">Biographie</p>
                        <p className="text-sm text-muted-foreground">{user.biography}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6 py-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <p className="font-medium">Rôle utilisateur</p>
                </div>
                <Badge variant={getRoleBadgeVariant(user.role)}>
                  {user.role === 'super_admin' ? 'Super Admin' : 
                   user.role === 'admin' ? 'Administrateur' : 
                   user.role === 'client_premium' ? 'Client Premium' : 'Client'}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Le rôle détermine les permissions et l'accès de l'utilisateur aux fonctionnalités.
              </p>
            </div>
            
            <UserRoleManager 
              userId={user.id} 
              currentRole={user.role} 
              onRoleUpdated={handleRoleUpdate}
            />
            
            <div className="border-t pt-4">
              <p className="text-sm font-medium mb-2">Identifiant utilisateur:</p>
              <code className="text-xs bg-muted px-2 py-1 rounded">{user.id}</code>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          {isEditing ? (
            <>
              <Button 
                variant="outline" 
                onClick={onClose}
                disabled={isSubmitting}
              >
                Annuler
              </Button>
              <Button 
                type="submit" 
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Enregistrement...
                  </>
                ) : (
                  'Enregistrer'
                )}
              </Button>
            </>
          ) : (
            <Button onClick={onClose}>Fermer</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileDialog;
