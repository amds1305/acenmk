
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User } from "@/types/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileFormProps {
  user: User;
  formData: Partial<User>;
  setFormData: (data: Partial<User>) => void;
  isEditing: boolean;
}

const ProfileForm = ({ user, formData, setFormData, isEditing }: ProfileFormProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold">{user.name}</h3>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <span className="inline-block px-2 py-1 mt-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
            {user.role}
          </span>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Nom</Label>
          <Input
            id="name"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={!isEditing}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="company">Entreprise</Label>
          <Input
            id="company"
            value={formData.company || ''}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            disabled={!isEditing}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="phone">Téléphone</Label>
          <Input
            id="phone"
            value={formData.phone || ''}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            disabled={!isEditing}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="biography">Biographie</Label>
          <Textarea
            id="biography"
            value={formData.biography || ''}
            onChange={(e) => setFormData({ ...formData, biography: e.target.value })}
            disabled={!isEditing}
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
