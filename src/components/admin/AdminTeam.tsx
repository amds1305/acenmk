
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Plus, Save, EyeIcon } from 'lucide-react';
import { 
  TeamList,
  TeamMemberEditor, 
  SectionSettingsCard,
  INITIAL_TEAM_MEMBERS,
  INITIAL_SECTION_SETTINGS,
  type TeamMember,
  type SectionSettings
} from './team';

const AdminTeam = () => {
  const { toast } = useToast();
  const [teamMembers, setTeamMembers] = useState(INITIAL_TEAM_MEMBERS);
  const [editingMember, setEditingMember] = useState<null | TeamMember>(null);
  const [memberToDelete, setMemberToDelete] = useState<null | { id: string, name: string }>(null);
  
  const [sectionSettings, setSectionSettings] = useState<SectionSettings>(INITIAL_SECTION_SETTINGS);

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
  };

  const handleSaveMember = () => {
    if (!editingMember) return;
    
    const newTeamMembers = [...teamMembers];
    
    if (editingMember.isNew) {
      newTeamMembers.push({
        ...editingMember,
        id: Date.now().toString(),
      });
    } else {
      const index = newTeamMembers.findIndex(m => m.id === editingMember.id);
      if (index !== -1) {
        newTeamMembers[index] = editingMember;
      }
    }
    
    setTeamMembers(newTeamMembers);
    setEditingMember(null);
    
    toast({
      title: editingMember.isNew ? "Membre ajouté" : "Membre mis à jour",
      description: editingMember.isNew 
        ? "Le nouveau membre a été ajouté avec succès." 
        : "Le membre a été mis à jour avec succès.",
    });
  };

  const handleDeleteMember = (id: string) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
    setMemberToDelete(null);
    
    toast({
      title: "Membre supprimé",
      description: "Le membre a été supprimé avec succès.",
    });
  };

  const handleSaveSection = () => {
    // Ici nous sauvegarderions normalement les données vers une API
    console.log('Section settings', sectionSettings);
    console.log('Team members', teamMembers);
    
    toast({
      title: "Modifications enregistrées",
      description: "La section Équipe a été mise à jour avec succès.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Équipe</h1>
          <p className="text-muted-foreground">
            Gérez les membres de votre équipe qui apparaissent sur le site.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => window.open('/#team', '_blank')}>
            <EyeIcon className="mr-2 h-4 w-4" />
            Voir
          </Button>
          <Button onClick={handleSaveSection}>
            <Save className="mr-2 h-4 w-4" />
            Enregistrer
          </Button>
        </div>
      </div>

      <SectionSettingsCard 
        settings={sectionSettings} 
        onChange={setSectionSettings} 
      />

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Membres de l'équipe</h2>
        <Button 
          onClick={() => handleEdit({ 
            id: '', 
            name: '', 
            role: '', 
            bio: '', 
            image: '', 
            linkedin: '', 
            twitter: '', 
            email: '',
            isNew: true 
          })}
        >
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un membre
        </Button>
      </div>

      <TeamList 
        teamMembers={teamMembers}
        onEdit={handleEdit}
        onDelete={handleDeleteMember}
        memberToDelete={memberToDelete}
        setMemberToDelete={setMemberToDelete}
      />

      <TeamMemberEditor
        editingMember={editingMember}
        setEditingMember={setEditingMember}
        onSave={handleSaveMember}
      />
    </div>
  );
};

export default AdminTeam;
