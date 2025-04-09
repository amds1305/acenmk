
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';
import { TeamMember } from './types';

interface TeamMemberEditorProps {
  editingMember: TeamMember | null;
  setEditingMember: React.Dispatch<React.SetStateAction<TeamMember | null>>;
  onSave: () => void;
}

const TeamMemberEditor = ({ 
  editingMember, 
  setEditingMember, 
  onSave 
}: TeamMemberEditorProps) => {
  if (!editingMember) return null;

  return (
    <Dialog
      open={editingMember !== null}
      onOpenChange={(open) => !open && setEditingMember(null)}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editingMember.isNew ? 'Ajouter un membre' : 'Modifier le membre'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="member-image">Photo</Label>
            <div className="flex items-end gap-4">
              <div className="relative h-20 w-20 rounded-md bg-gray-100 overflow-hidden">
                {editingMember.image ? (
                  <img 
                    src={editingMember.image} 
                    alt="Preview" 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No image
                  </div>
                )}
              </div>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Télécharger
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="member-name">Nom</Label>
            <Input 
              id="member-name" 
              value={editingMember.name || ''} 
              onChange={(e) => setEditingMember(prev => prev ? {...prev, name: e.target.value} : null)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="member-role">Rôle</Label>
            <Input 
              id="member-role" 
              value={editingMember.role || ''} 
              onChange={(e) => setEditingMember(prev => prev ? {...prev, role: e.target.value} : null)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="member-bio">Biographie</Label>
            <Textarea 
              id="member-bio" 
              value={editingMember.bio || ''} 
              onChange={(e) => setEditingMember(prev => prev ? {...prev, bio: e.target.value} : null)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="member-linkedin">LinkedIn</Label>
            <Input 
              id="member-linkedin" 
              value={editingMember.linkedin || ''} 
              onChange={(e) => setEditingMember(prev => prev ? {...prev, linkedin: e.target.value} : null)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="member-twitter">Twitter</Label>
            <Input 
              id="member-twitter" 
              value={editingMember.twitter || ''} 
              onChange={(e) => setEditingMember(prev => prev ? {...prev, twitter: e.target.value} : null)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="member-email">Email</Label>
            <Input 
              id="member-email" 
              value={editingMember.email || ''} 
              onChange={(e) => setEditingMember(prev => prev ? {...prev, email: e.target.value} : null)}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setEditingMember(null)}>
            Annuler
          </Button>
          <Button onClick={onSave}>
            {editingMember.isNew ? 'Ajouter' : 'Enregistrer'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TeamMemberEditor;
