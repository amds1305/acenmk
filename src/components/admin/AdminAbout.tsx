
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Save, EyeIcon, Plus, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminAbout = () => {
  const { toast } = useToast();
  
  const [aboutData, setAboutData] = useState({
    title: 'Notre Histoire',
    subtitle: 'À propos de nous',
    description: 'Fondée en 2015, notre ESN s\'est rapidement imposée comme un acteur incontournable du numérique, combinant expertise technique et vision stratégique.',
    mission: 'Notre mission est d\'accompagner les entreprises dans leur transformation numérique en leur fournissant des solutions technologiques innovantes et adaptées à leurs besoins spécifiques.',
  });
  
  const [achievements, setAchievements] = useState([
    'Plus de 100 projets réalisés avec succès',
    'Une équipe de 50+ experts passionnés',
    'Présence dans 3 pays européens',
    'Partenariats avec les leaders technologiques',
  ]);
  
  const [values, setValues] = useState([
    {
      id: '1',
      icon: 'TrendingUp',
      title: 'Innovation',
      description: 'Nous recherchons constamment de nouvelles technologies et méthodes pour offrir les meilleures solutions.',
    },
    {
      id: '2',
      icon: 'Users',
      title: 'Collaboration',
      description: 'Nous travaillons étroitement avec nos clients comme de véritables partenaires pour atteindre leurs objectifs.',
    },
    {
      id: '3',
      icon: 'Zap',
      title: 'Excellence',
      description: 'Nous visons l\'excellence dans chaque ligne de code, chaque design et chaque interaction client.',
    },
  ]);

  const [newAchievement, setNewAchievement] = useState('');

  const handleAddAchievement = () => {
    if (newAchievement.trim()) {
      setAchievements([...achievements, newAchievement]);
      setNewAchievement('');
    }
  };

  const handleRemoveAchievement = (index: number) => {
    setAchievements(achievements.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    // Ici nous sauvegarderions normalement les données vers une API
    console.log('About data', aboutData);
    console.log('Achievements', achievements);
    console.log('Values', values);
    
    toast({
      title: "Modifications enregistrées",
      description: "La section À propos a été mise à jour avec succès.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">À propos</h1>
          <p className="text-muted-foreground">
            Personnalisez les informations de la section À propos de votre entreprise.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => window.open('/#about', '_blank')}>
            <EyeIcon className="mr-2 h-4 w-4" />
            Voir
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Enregistrer
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations générales</CardTitle>
          <CardDescription>Les détails principaux de votre section À propos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="about-title">Titre</Label>
              <Input 
                id="about-title" 
                value={aboutData.title} 
                onChange={(e) => setAboutData({...aboutData, title: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="about-subtitle">Sous-titre</Label>
              <Input 
                id="about-subtitle" 
                value={aboutData.subtitle} 
                onChange={(e) => setAboutData({...aboutData, subtitle: e.target.value})}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="about-description">Description</Label>
            <Textarea 
              id="about-description" 
              value={aboutData.description} 
              onChange={(e) => setAboutData({...aboutData, description: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="about-mission">Mission</Label>
            <Textarea 
              id="about-mission" 
              value={aboutData.mission} 
              onChange={(e) => setAboutData({...aboutData, mission: e.target.value})}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Réalisations</CardTitle>
          <CardDescription>Mettez en avant les points forts de votre entreprise</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center justify-between border p-3 rounded-md">
                <p>{achievement}</p>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleRemoveAchievement(index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2 mt-4">
            <Input 
              placeholder="Nouvelle réalisation..."
              value={newAchievement} 
              onChange={(e) => setNewAchievement(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddAchievement()}
            />
            <Button onClick={handleAddAchievement}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Nos valeurs</CardTitle>
          <CardDescription>Les principes qui guident votre entreprise</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {values.map((value, index) => (
              <div key={value.id} className="border p-4 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor={`value-title-${index}`}>Titre</Label>
                    <Input 
                      id={`value-title-${index}`} 
                      value={value.title} 
                      onChange={(e) => {
                        const newValues = [...values];
                        newValues[index].title = e.target.value;
                        setValues(newValues);
                      }}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`value-icon-${index}`}>Icône</Label>
                    <Input 
                      id={`value-icon-${index}`} 
                      value={value.icon} 
                      onChange={(e) => {
                        const newValues = [...values];
                        newValues[index].icon = e.target.value;
                        setValues(newValues);
                      }}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`value-description-${index}`}>Description</Label>
                  <Textarea 
                    id={`value-description-${index}`} 
                    value={value.description} 
                    onChange={(e) => {
                      const newValues = [...values];
                      newValues[index].description = e.target.value;
                      setValues(newValues);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAbout;
