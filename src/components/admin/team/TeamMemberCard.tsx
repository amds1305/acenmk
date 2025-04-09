
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Edit, Trash, Pencil } from 'lucide-react';
import { TeamMember } from './types';

interface TeamMemberCardProps {
  member: TeamMember;
  onEdit: (member: TeamMember) => void;
  onDelete: (id: string) => void;
  memberToDelete: { id: string; name: string } | null;
  setMemberToDelete: React.Dispatch<React.SetStateAction<{ id: string; name: string } | null>>;
}

const TeamMemberCard = ({ 
  member, 
  onEdit, 
  onDelete, 
  memberToDelete, 
  setMemberToDelete 
}: TeamMemberCardProps) => {
  return (
    <Card key={member.id} className="overflow-hidden">
      <div className="relative aspect-square bg-gray-100">
        {member.image ? (
          <img 
            src={member.image} 
            alt={member.name} 
            className="w-full h-full object-cover" 
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Aucune image
          </div>
        )}
        <Button 
          variant="secondary" 
          size="icon" 
          className="absolute bottom-2 right-2 bg-white/80 hover:bg-white"
          onClick={() => onEdit(member)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg">{member.name}</h3>
        <p className="text-primary text-sm">{member.role}</p>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{member.bio}</p>
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(member)}>
              <Edit className="h-4 w-4 mr-1" />
              Modifier
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setMemberToDelete({ id: member.id, name: member.name })}
                >
                  <Trash className="h-4 w-4 mr-1" />
                  Supprimer
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirmer la suppression</DialogTitle>
                  <DialogDescription>
                    Êtes-vous sûr de vouloir supprimer {memberToDelete?.name} de l'équipe ? Cette action est irréversible.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setMemberToDelete(null)}>
                    Annuler
                  </Button>
                  <Button variant="destructive" onClick={() => memberToDelete && onDelete(memberToDelete.id)}>
                    Supprimer
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamMemberCard;
