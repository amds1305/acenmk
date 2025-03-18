
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash, Save, EyeIcon, Upload, Pencil } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const INITIAL_TEAM_MEMBERS = [
  {
    id: '1',
    name: 'Sophie Martin',
    role: 'Directrice générale',
    bio: 'Plus de 15 ans d\'expérience dans le développement de solutions digitales pour les grandes entreprises.',
    image: 'https://i.pravatar.cc/300?img=1',
    linkedin: 'https://linkedin.com/in/sophiemartin',
    twitter: 'https://twitter.com/sophiemartin',
    email: 'sophie@example.com',
  },
  {
    id: '2',
    name: 'Thomas Dubois',
    role: 'Directeur technique',
    bio: 'Expert en architecture de systèmes complexes et en optimisation des performances.',
    image: 'https://i.pravatar.cc/300?img=2',
    linkedin: 'https://linkedin.com/in/thomasdubois',
    twitter: 'https://twitter.com/thomasdubois',
    email: 'thomas@example.com',
  },
  {
    id: '3',
    name: 'Emma Leclerc',
    role: 'Lead Designer UX/UI',
    bio: 'Passionnée de design d\'expérience utilisateur avec un portfolio impressionnant de projets innovants.',
    image: 'https://i.pravatar.cc/300?img=3',
    linkedin: 'https://linkedin.com/in/emmaleclerc',
    twitter: 'https://twitter.com/emmaleclerc',
    email: 'emma@example.com',
  },
  {
    id: '4',
    name: 'Lucas Bernard',
    role: 'Développeur Full-Stack',
    bio: 'Maîtrise des technologies web modernes et spécialiste en développement d\'applications réactives.',
    image: 'https://i.pravatar.cc/300?img=4',
    linkedin: 'https://linkedin.com/in/lucasbernard',
    twitter: '',
    email: 'lucas@example.com',
  },
];

const AdminTeam = () => {
  const { toast } = useToast();
  const [teamMembers, setTeamMembers] = useState(INITIAL_TEAM_MEMBERS);
  const [editingMember, setEditingMember] = useState<null | typeof INITIAL_TEAM_MEMBERS[0] & { isNew?: boolean }>(null);
  const [memberToDelete, setMemberToDelete] = useState<null | { id: string, name: string }>(null);
  
  const [sectionSettings, setSectionSettings] = useState({
    title: 'Notre Équipe d\'Experts',
    subtitle: 'Une équipe talentueuse et passionnée dédiée à votre réussite',
  });

  const handleEdit = (member: typeof editingMember) => {
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

      <Card>
        <CardHeader>
          <CardTitle>Paramètres de la section</CardTitle>
          <CardDescription>Personnalisez le titre et le sous-titre de la section Équipe</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="section-title">Titre</Label>
            <Input 
              id="section-title" 
              value={sectionSettings.title} 
              onChange={(e) => setSectionSettings({...sectionSettings, title: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="section-subtitle">Sous-titre</Label>
            <Textarea 
              id="section-subtitle" 
              value={sectionSettings.subtitle} 
              onChange={(e) => setSectionSettings({...sectionSettings, subtitle: e.target.value})}
            />
          </div>
        </CardContent>
      </Card>

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamMembers.map((member) => (
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
                onClick={() => handleEdit(member)}
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
                  <Button variant="outline" size="sm" onClick={() => handleEdit(member)}>
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
                        <Button variant="destructive" onClick={() => memberToDelete && handleDeleteMember(memberToDelete.id)}>
                          Supprimer
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog for editing team members */}
      <Dialog
        open={editingMember !== null}
        onOpenChange={(open) => !open && setEditingMember(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingMember?.isNew ? 'Ajouter un membre' : 'Modifier le membre'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="member-image">Photo</Label>
              <div className="flex items-end gap-4">
                <div className="relative h-20 w-20 rounded-md bg-gray-100 overflow-hidden">
                  {editingMember?.image ? (
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
                value={editingMember?.name || ''} 
                onChange={(e) => setEditingMember(prev => prev ? {...prev, name: e.target.value} : null)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="member-role">Rôle</Label>
              <Input 
                id="member-role" 
                value={editingMember?.role || ''} 
                onChange={(e) => setEditingMember(prev => prev ? {...prev, role: e.target.value} : null)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="member-bio">Biographie</Label>
              <Textarea 
                id="member-bio" 
                value={editingMember?.bio || ''} 
                onChange={(e) => setEditingMember(prev => prev ? {...prev, bio: e.target.value} : null)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="member-linkedin">LinkedIn</Label>
              <Input 
                id="member-linkedin" 
                value={editingMember?.linkedin || ''} 
                onChange={(e) => setEditingMember(prev => prev ? {...prev, linkedin: e.target.value} : null)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="member-twitter">Twitter</Label>
              <Input 
                id="member-twitter" 
                value={editingMember?.twitter || ''} 
                onChange={(e) => setEditingMember(prev => prev ? {...prev, twitter: e.target.value} : null)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="member-email">Email</Label>
              <Input 
                id="member-email" 
                value={editingMember?.email || ''} 
                onChange={(e) => setEditingMember(prev => prev ? {...prev, email: e.target.value} : null)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingMember(null)}>
              Annuler
            </Button>
            <Button onClick={handleSaveMember}>
              {editingMember?.isNew ? 'Ajouter' : 'Enregistrer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTeam;
