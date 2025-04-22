
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User } from "@/types/auth";
import ProfileForm from './profile/ProfileForm';

interface UserProfileDialogProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedUser: Partial<User>) => Promise<void>;
  isEditing?: boolean;
}

const UserProfileDialog = ({ 
  user, 
  isOpen, 
  onClose, 
  onSave,
  isEditing = false 
}: UserProfileDialogProps) => {
  const [formData, setFormData] = React.useState<Partial<User>>({});
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        company: user.company,
        phone: user.phone,
        biography: user.biography,
      });
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Modifier le profil" : "Profil de l'utilisateur"}
          </DialogTitle>
        </DialogHeader>

        <ProfileForm 
          user={user}
          formData={formData}
          setFormData={setFormData}
          isEditing={isEditing}
        />

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          {isEditing && (
            <Button onClick={handleSave} disabled={loading}>
              {loading ? "Enregistrement..." : "Enregistrer"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileDialog;
