
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowUp, ArrowDown, Pencil, Plus, Save, Trash, EyeIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

// Service mock data
const INITIAL_SERVICES = [
  {
    id: '1',
    icon: 'Code',
    title: 'Développement sur mesure',
    description: 'Applications web et mobiles personnalisées selon vos besoins spécifiques et les dernières technologies.',
  },
  {
    id: '2',
    icon: 'Database',
    title: 'Infrastructure cloud',
    description: 'Solutions d\'hébergement sécurisées, évolutives et performantes pour vos applications critiques.',
  },
  {
    id: '3',
    icon: 'Layout',
    title: 'UX/UI Design',
    description: 'Interfaces utilisateur intuitives et esthétiques qui améliorent l\'expérience de vos utilisateurs.',
  },
  {
    id: '4',
    icon: 'Smartphone',
    title: 'Applications mobiles',
    description: 'Applications natives et hybrides pour iOS et Android avec une expérience utilisateur fluide.',
  },
  {
    id: '5',
    icon: 'Globe',
    title: 'Transformation digitale',
    description: 'Accompagnement stratégique pour digitaliser vos processus métier et gagner en efficacité.',
  },
  {
    id: '6',
    icon: 'BarChart',
    title: 'Intelligence artificielle',
    description: 'Intégration de solutions d\'IA et machine learning pour optimiser vos processus et analyses.',
  },
];

// Les icônes disponibles
const AVAILABLE_ICONS = [
  'Code', 'Database', 'Layout', 'Smartphone', 'Globe', 'BarChart', 
  'Shield', 'Users', 'Zap', 'MessageSquare', 'FileText', 'Settings'
];

const AdminServices = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [editingService, setEditingService] = useState<null | {
    id: string;
    icon: string;
    title: string;
    description: string;
    isNew?: boolean;
  }>(null);
  const [serviceToDelete, setServiceToDelete] = useState<null | { id: string, title: string }>(null);
  
  const [sectionSettings, setSectionSettings] = useState({
    title: 'Solutions Digitales Expertes',
    subtitle: 'Des solutions technologiques complètes pour répondre à tous vos besoins numériques',
  });

  const handleMove = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === services.length - 1)
    ) {
      return;
    }
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const newServices = [...services];
    [newServices[index], newServices[newIndex]] = [newServices[newIndex], newServices[index]];
    setServices(newServices);
  };

  const handleEdit = (service: typeof editingService) => {
    setEditingService(service);
  };

  const handleSaveService = () => {
    if (!editingService) return;
    
    const newServices = [...services];
    
    if (editingService.isNew) {
      newServices.push({
        ...editingService,
        id: Date.now().toString(),
      });
    } else {
      const index = newServices.findIndex(s => s.id === editingService.id);
      if (index !== -1) {
        newServices[index] = editingService;
      }
    }
    
    setServices(newServices);
    setEditingService(null);
    
    toast({
      title: editingService.isNew ? "Service ajouté" : "Service mis à jour",
      description: editingService.isNew 
        ? "Le nouveau service a été ajouté avec succès." 
        : "Le service a été mis à jour avec succès.",
    });
  };

  const handleDeleteService = (id: string) => {
    setServices(services.filter(service => service.id !== id));
    setServiceToDelete(null);
    
    toast({
      title: "Service supprimé",
      description: "Le service a été supprimé avec succès.",
    });
  };

  const handleSaveSection = () => {
    // Ici nous sauvegarderions normalement les données vers une API
    console.log('Section settings', sectionSettings);
    console.log('Services', services);
    
    toast({
      title: "Modifications enregistrées",
      description: "La section Services a été mise à jour avec succès.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Services</h1>
          <p className="text-muted-foreground">
            Personnalisez les services que vous proposez à vos clients.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => window.open('/#services', '_blank')}>
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
          <CardDescription>Personnalisez le titre et le sous-titre de la section Services</CardDescription>
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
        <h2 className="text-xl font-semibold">Liste des services</h2>
        <Button onClick={() => handleEdit({ id: '', icon: 'Code', title: '', description: '', isNew: true })}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un service
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service, index) => (
          <Card key={service.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="p-2 rounded-md bg-primary/10 mr-3">
                    <span className="text-primary">{service.icon}</span>
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p className="mb-4">{service.description}</p>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(service)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setServiceToDelete({ id: service.id, title: service.title })}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirmer la suppression</DialogTitle>
                        <DialogDescription>
                          Êtes-vous sûr de vouloir supprimer le service "{serviceToDelete?.title}" ? Cette action est irréversible.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setServiceToDelete(null)}>
                          Annuler
                        </Button>
                        <Button variant="destructive" onClick={() => serviceToDelete && handleDeleteService(serviceToDelete.id)}>
                          Supprimer
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleMove(index, 'up')}
                    disabled={index === 0}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleMove(index, 'down')}
                    disabled={index === services.length - 1}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog for editing services */}
      <Dialog
        open={editingService !== null}
        onOpenChange={(open) => !open && setEditingService(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingService?.isNew ? 'Ajouter un service' : 'Modifier le service'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="service-icon">Icône</Label>
              <select
                id="service-icon"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={editingService?.icon || ''}
                onChange={(e) => setEditingService(prev => prev ? {...prev, icon: e.target.value} : null)}
              >
                {AVAILABLE_ICONS.map(icon => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="service-title">Titre</Label>
              <Input 
                id="service-title" 
                value={editingService?.title || ''} 
                onChange={(e) => setEditingService(prev => prev ? {...prev, title: e.target.value} : null)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="service-description">Description</Label>
              <Textarea 
                id="service-description" 
                value={editingService?.description || ''} 
                onChange={(e) => setEditingService(prev => prev ? {...prev, description: e.target.value} : null)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingService(null)}>
              Annuler
            </Button>
            <Button onClick={handleSaveService}>
              {editingService?.isNew ? 'Ajouter' : 'Enregistrer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminServices;
