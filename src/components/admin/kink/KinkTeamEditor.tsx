
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Save, Plus, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSections } from '@/contexts/sections/SectionsContext';
import { v4 as uuidv4 } from 'uuid';

const defaultTeamMembers = [
  {
    id: '1',
    name: 'Sarah Martinez',
    role: 'Directrice Créative',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=687',
    social: {
      linkedin: '#',
      twitter: '#',
      email: '#'
    }
  },
  {
    id: '2',
    name: 'David Chen',
    role: 'Lead Développeur',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=687',
    social: {
      linkedin: '#',
      twitter: '#',
      email: '#'
    }
  },
  {
    id: '3',
    name: 'Emma Wilson',
    role: 'Designer UX',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=761',
    social: {
      linkedin: '#',
      twitter: '#',
      email: '#'
    }
  },
  {
    id: '4',
    name: 'Thomas Dubois',
    role: 'Stratège Marketing',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=687',
    social: {
      linkedin: '#',
      twitter: '#',
      email: '#'
    }
  }
];

const KinkTeamEditor = () => {
  const { config, updateExistingSectionData, saveChanges } = useSections();
  const { toast } = useToast();
  
  const [teamData, setTeamData] = useState({
    title: 'Des experts passionnés',
    subtitle: 'Notre équipe talentueuse combine créativité et expertise technique pour donner vie à vos projets numériques.',
    members: config.sectionData.team?.members || defaultTeamMembers.map(member => ({
      ...member,
      id: member.id || uuidv4()
    }))
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTeamData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleMemberChange = (id: string, field: string, value: any) => {
    setTeamData(prev => ({
      ...prev,
      members: prev.members.map(member => 
        member.id === id ? { ...member, [field]: value } : member
      )
    }));
  };
  
  const handleSocialChange = (id: string, field: string, value: string) => {
    setTeamData(prev => ({
      ...prev,
      members: prev.members.map(member => 
        member.id === id ? { 
          ...member, 
          social: {
            ...member.social,
            [field]: value
          } 
        } : member
      )
    }));
  };
  
  const addMember = () => {
    const newMember = {
      id: uuidv4(),
      name: 'Nouveau Membre',
      role: 'Position',
      image: 'https://placehold.co/400x600/lightgray/darkgray?text=Photo',
      social: {
        linkedin: '#',
        twitter: '#',
        email: '#'
      }
    };
    setTeamData(prev => ({
      ...prev,
      members: [...prev.members, newMember]
    }));
  };
  
  const removeMember = (id: string) => {
    setTeamData(prev => ({
      ...prev,
      members: prev.members.filter(member => member.id !== id)
    }));
  };
  
  const handleSave = async () => {
    try {
      // Mise à jour des données dans le contexte
      await updateExistingSectionData('team', teamData);
      await saveChanges();
      
      toast({
        title: "Changements enregistrés",
        description: "Les modifications de l'équipe ont été enregistrées.",
      });
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement des modifications.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuration de la section Équipe</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Titre
          </label>
          <Input 
            id="title" 
            name="title" 
            value={teamData.title} 
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>
        
        <div>
          <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">
            Sous-titre
          </label>
          <Input 
            id="subtitle" 
            name="subtitle" 
            value={teamData.subtitle} 
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Membres de l'équipe</h3>
          <div className="space-y-6">
            {teamData.members.map((member, index) => (
              <div key={member.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Membre #{index + 1}</h4>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => removeMember(member.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-500">
                      Nom
                    </label>
                    <Input 
                      value={member.name} 
                      onChange={(e) => handleMemberChange(member.id, 'name', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-500">
                      Fonction
                    </label>
                    <Input 
                      value={member.role} 
                      onChange={(e) => handleMemberChange(member.id, 'role', e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-500">
                    URL de l'image
                  </label>
                  <Input 
                    value={member.image} 
                    onChange={(e) => handleMemberChange(member.id, 'image', e.target.value)}
                  />
                  {member.image && (
                    <div className="mt-2 border rounded-md overflow-hidden h-28 flex justify-center">
                      <img src={member.image} alt={member.name} className="object-cover" />
                    </div>
                  )}
                </div>
                
                <div>
                  <h5 className="text-sm font-medium mb-2">Liens sociaux</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500">
                        LinkedIn
                      </label>
                      <Input 
                        value={member.social.linkedin} 
                        onChange={(e) => handleSocialChange(member.id, 'linkedin', e.target.value)}
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-500">
                        Twitter
                      </label>
                      <Input 
                        value={member.social.twitter} 
                        onChange={(e) => handleSocialChange(member.id, 'twitter', e.target.value)}
                        placeholder="https://twitter.com/..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-500">
                        Email
                      </label>
                      <Input 
                        value={member.social.email} 
                        onChange={(e) => handleSocialChange(member.id, 'email', e.target.value)}
                        placeholder="mailto:..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <Button 
              variant="outline" 
              onClick={addMember}
              className="w-full flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Ajouter un membre
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          onClick={handleSave}
          className="flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          Enregistrer
        </Button>
      </CardFooter>
    </Card>
  );
};

export default KinkTeamEditor;
