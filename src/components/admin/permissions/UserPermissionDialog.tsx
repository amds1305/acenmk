
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckSquare, XSquare } from 'lucide-react';
import { User } from '@/types/auth';

interface UserPermissionDialogProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  permissionsMap: Record<string, string[]>;
  onUpdatePermission: (permission: string, hasPermission: boolean) => void;
}

const UserPermissionDialog: React.FC<UserPermissionDialogProps> = ({
  user,
  isOpen,
  onClose,
  onSave,
  permissionsMap,
  onUpdatePermission
}) => {
  if (!user) return null;

  const hasPermission = (permission: string): boolean => {
    return permissionsMap[user.id]?.includes(permission) || false;
  };

  const renderPermissionSection = (title: string, permissions: string[]) => (
    <div>
      <h4 className="text-sm font-medium mb-2">{title}</h4>
      <div className="grid grid-cols-1 gap-2">
        {permissions.map(permission => (
          <div key={permission} className="flex items-center justify-between p-2 border rounded-md">
            <span className="text-sm">{permission}</span>
            <div className="flex gap-2">
              <Button 
                variant={hasPermission(permission) ? "default" : "outline"} 
                size="sm"
                onClick={() => onUpdatePermission(permission, true)}
              >
                <CheckSquare className="h-4 w-4 mr-1" />
                Oui
              </Button>
              <Button 
                variant={!hasPermission(permission) ? "default" : "outline"} 
                size="sm"
                onClick={() => onUpdatePermission(permission, false)}
              >
                <XSquare className="h-4 w-4 mr-1" />
                Non
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Modifier les permissions de {user.name}
          </DialogTitle>
          <DialogDescription>
            Activez ou désactivez les permissions individuelles pour cet utilisateur.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {renderPermissionSection("Permissions de profil", ['view_profile', 'edit_profile'])}
              {renderPermissionSection("Permissions de projets", ['view_projects', 'create_projects', 'edit_projects'])}
              {renderPermissionSection("Permissions d'administration", ['manage_users', 'manage_roles', 'manage_site', 'view_analytics'])}
            </div>
          </ScrollArea>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={onSave}>
            Enregistrer les modifications
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserPermissionDialog;
