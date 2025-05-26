
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from 'lucide-react';
import { User, UserRole } from '@/types/auth';
import UserRoleManager from './UserRoleManager';
import { getRoleInfo, getRoleLabel, getRoleBadgeVariant } from '@/utils/roleUtils';

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
  isEditing,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [biography, setBiography] = useState('');
  const [role, setRole] = useState<UserRole | ''>('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setCompany(user.company || '');
      setPhone(user.phone || '');
      setBiography(user.biography || '');
      setRole(user.role || '');
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsLoading(true);
    
    const updatedUser: Partial<User> = {
      name,
      email,
      company,
      phone,
      biography,
      role: role as UserRole
    };
    
    try {
      await onSave(updatedUser);
      onClose();
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleUpdated = (newRole: UserRole) => {
    setRole(newRole);
  };

  if (!user) return null;

  const roleInfo = role ? getRoleInfo(role as UserRole) : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Modifier le profil' : 'Profil utilisateur'}
          </DialogTitle>
          <DialogDescription>
            {isEditing 
              ? 'Modifiez les informations de profil de l\'utilisateur.' 
              : 'Consultez les détails du profil utilisateur.'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col sm:flex-row items-start gap-4 py-4">
          <div className="flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-2">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            {!isEditing && (
              <Badge variant={getRoleBadgeVariant(user.role) as any} className="mt-2">
                {getRoleLabel(user.role)}
              </Badge>
            )}
          </div>
          
          <div className="flex-1 w-full">
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="profile">Profil</TabsTrigger>
                <TabsTrigger value="role">Rôle & Permissions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={!isEditing}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={!isEditing}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">Entreprise</Label>
                      <Input
                        id="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="biography">Biographie</Label>
                    <Textarea
                      id="biography"
                      value={biography}
                      onChange={(e) => setBiography(e.target.value)}
                      disabled={!isEditing}
                      rows={4}
                    />
                  </div>
                  
                  {isEditing && (
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                        Annuler
                      </Button>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Enregistrement...
                          </>
                        ) : (
                          'Enregistrer'
                        )}
                      </Button>
                    </DialogFooter>
                  )}
                </form>
              </TabsContent>
              
              <TabsContent value="role">
                {isEditing ? (
                  <UserRoleManager 
                    userId={user.id} 
                    currentRole={role as UserRole} 
                    onRoleUpdated={handleRoleUpdated} 
                  />
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">Rôle actuel</h3>
                      <div className="mt-2 p-4 border rounded-md">
                        <div className="flex items-center mb-2">
                          <Badge variant={getRoleBadgeVariant(user.role) as any} className="mr-2">
                            {getRoleLabel(user.role)}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {roleInfo?.level === 'internal' ? 'Utilisateur interne' : 'Utilisateur externe'}
                          </span>
                        </div>
                        <p className="text-sm">{roleInfo?.description}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium">Permissions</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Permissions accordées par ce rôle :
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {roleInfo?.permissions.map((perm, index) => (
                          <Badge key={index} variant="outline">
                            {perm}
                          </Badge>
                        ))}
                        {(!roleInfo?.permissions || roleInfo.permissions.length === 0) && (
                          <span className="text-sm text-muted-foreground">
                            Aucune permission spécifique
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                {isEditing && (
                  <DialogFooter className="mt-6">
                    <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                      Annuler
                    </Button>
                    <Button onClick={handleSubmit} disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Enregistrement...
                        </>
                      ) : (
                        'Enregistrer'
                      )}
                    </Button>
                  </DialogFooter>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {!isEditing && (
          <DialogFooter>
            <Button onClick={onClose}>Fermer</Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileDialog;
