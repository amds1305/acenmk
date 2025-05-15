import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, 
  DialogDescription, DialogFooter 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, Pencil, MoveUp, MoveDown, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

interface TrustedClient {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl?: string;
  isVisible: boolean;
  order: number;
}

const AdminTrustedClientsMain = () => {
  const [clients, setClients] = useState<TrustedClient[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState<TrustedClient | null>(null);
  const { toast } = useToast();
  
  // Form state
  const [name, setName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    // Load clients from local storage
    const loadClients = () => {
      try {
        const storedClients = localStorage.getItem('trustedClients');
        if (storedClients) {
          setClients(JSON.parse(storedClients));
        }
      } catch (error) {
        console.error('Error loading clients:', error);
        toast({
          title: "Error",
          description: "Could not load trusted clients",
          variant: "destructive"
        });
      }
    };
    
    loadClients();
  }, [toast]);
  
  const saveClients = (newClients: TrustedClient[]) => {
    try {
      localStorage.setItem('trustedClients', JSON.stringify(newClients));
      
      // Trigger an event to update the home page
      const event = new CustomEvent('admin-changes-saved', {
        detail: { section: 'trusted-clients', data: newClients }
      });
      window.dispatchEvent(event);
      
      setClients(newClients);
      toast({
        title: "Success",
        description: "Trusted clients saved successfully"
      });
    } catch (error) {
      console.error('Error saving clients:', error);
      toast({
        title: "Error",
        description: "Could not save changes",
        variant: "destructive"
      });
    }
  };
  
  const handleAdd = () => {
    if (!name || !logoUrl) {
      toast({
        title: "Error",
        description: "Name and logo are required",
        variant: "destructive"
      });
      return;
    }
    
    const newClient: TrustedClient = {
      id: Date.now().toString(),
      name,
      logoUrl,
      websiteUrl,
      isVisible,
      order: clients.length
    };
    
    const newClients = [...clients, newClient];
    saveClients(newClients);
    resetForm();
    setIsAddDialogOpen(false);
  };
  
  const handleEdit = () => {
    if (!currentClient || !name || !logoUrl) {
      toast({
        title: "Error",
        description: "Name and logo are required",
        variant: "destructive"
      });
      return;
    }
    
    const updatedClients = clients.map(client => 
      client.id === currentClient.id ? 
      { ...currentClient, name, logoUrl, websiteUrl, isVisible } : 
      client
    );
    
    saveClients(updatedClients);
    resetForm();
    setIsEditDialogOpen(false);
  };
  
  const handleDelete = (id: string) => {
    const updatedClients = clients.filter(client => client.id !== id);
    
    // Reorder remaining clients
    const reorderedClients = updatedClients.map((client, index) => ({
      ...client,
      order: index
    }));
    
    saveClients(reorderedClients);
  };
  
  const toggleVisibility = (id: string) => {
    const updatedClients = clients.map(client => 
      client.id === id ? { ...client, isVisible: !client.isVisible } : client
    );
    
    saveClients(updatedClients);
  };
  
  const moveClient = (id: string, direction: 'up' | 'down') => {
    const index = clients.findIndex(client => client.id === id);
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === clients.length - 1)) {
      return;
    }
    
    const newClients = [...clients];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap the clients
    [newClients[index], newClients[targetIndex]] = [newClients[targetIndex], newClients[index]];
    
    // Update order properties
    const reorderedClients = newClients.map((client, idx) => ({
      ...client,
      order: idx
    }));
    
    saveClients(reorderedClients);
  };
  
  const openEditDialog = (client: TrustedClient) => {
    setCurrentClient(client);
    setName(client.name);
    setLogoUrl(client.logoUrl);
    setWebsiteUrl(client.websiteUrl || '');
    setIsVisible(client.isVisible);
    setIsEditDialogOpen(true);
  };
  
  const resetForm = () => {
    setName('');
    setLogoUrl('');
    setWebsiteUrl('');
    setIsVisible(true);
    setCurrentClient(null);
  };
  
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(clients);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    // Update order properties
    const reorderedClients = items.map((client, idx) => ({
      ...client,
      order: idx
    }));
    
    saveClients(reorderedClients);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Clients de confiance</CardTitle>
              <CardDescription>Gérez les logos de clients à afficher sur la page d'accueil</CardDescription>
            </div>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Ajouter un client
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {clients.length === 0 ? (
            <div className="text-center py-10 border rounded-md">
              <p className="text-muted-foreground">
                Aucun client à afficher. Ajoutez votre premier client !
              </p>
            </div>
          ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="trusted-clients">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-4"
                  >
                    {clients
                      .sort((a, b) => a.order - b.order)
                      .map((client, index) => (
                        <Draggable key={client.id} draggableId={client.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`flex items-center justify-between p-4 rounded-md border ${
                                client.isVisible ? 'bg-card' : 'bg-muted'
                              }`}
                            >
                              <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 bg-gray-100 flex items-center justify-center rounded overflow-hidden">
                                  {client.logoUrl ? (
                                    <img 
                                      src={client.logoUrl} 
                                      alt={client.name} 
                                      className="max-w-full max-h-full object-contain"
                                    />
                                  ) : (
                                    <span className="text-muted-foreground">No logo</span>
                                  )}
                                </div>
                                <div>
                                  <p className="font-medium">{client.name}</p>
                                  {client.websiteUrl && (
                                    <a 
                                      href={client.websiteUrl} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-sm text-blue-500 hover:underline"
                                    >
                                      {client.websiteUrl}
                                    </a>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => toggleVisibility(client.id)}
                                >
                                  {client.isVisible ? (
                                    <Eye className="h-4 w-4" />
                                  ) : (
                                    <EyeOff className="h-4 w-4" />
                                  )}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => moveClient(client.id, 'up')}
                                  disabled={index === 0}
                                >
                                  <MoveUp className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => moveClient(client.id, 'down')}
                                  disabled={index === clients.length - 1}
                                >
                                  <MoveDown className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => openEditDialog(client)}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDelete(client.id)}
                                  className="text-red-500"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </CardContent>
      </Card>
      
      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un client</DialogTitle>
            <DialogDescription>
              Ajoutez un nouveau client de confiance à afficher sur votre site.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom de l'entreprise</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="logoUrl">URL du logo</Label>
              <Input id="logoUrl" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="websiteUrl">URL du site web (optionnel)</Label>
              <Input id="websiteUrl" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="visible" checked={isVisible} onCheckedChange={(checked) => setIsVisible(!!checked)} />
              <Label htmlFor="visible">Afficher sur le site</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Annuler</Button>
            <Button onClick={handleAdd}>Ajouter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier un client</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nom de l'entreprise</Label>
              <Input id="edit-name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-logoUrl">URL du logo</Label>
              <Input id="edit-logoUrl" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-websiteUrl">URL du site web (optionnel)</Label>
              <Input id="edit-websiteUrl" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="edit-visible" checked={isVisible} onCheckedChange={(checked) => setIsVisible(!!checked)} />
              <Label htmlFor="edit-visible">Afficher sur le site</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Annuler</Button>
            <Button onClick={handleEdit}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTrustedClientsMain;
