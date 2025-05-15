
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExternalLink {
  id: string;
  name: string;
  url: string;
  description: string;
  icon: string;
  requiredRole: string;
}

const ExternalLinksManager = () => {
  const [links, setLinks] = useState<ExternalLink[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentLink, setCurrentLink] = useState<ExternalLink | null>(null);
  const { toast } = useToast();
  
  // Form state
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');
  const [requiredRole, setRequiredRole] = useState('user');
  
  useEffect(() => {
    // Charger les liens depuis le stockage local ou l'API
    const loadLinks = async () => {
      try {
        const storedLinks = localStorage.getItem('externalLinks');
        if (storedLinks) {
          setLinks(JSON.parse(storedLinks));
        }
      } catch (error) {
        console.error('Erreur lors du chargement des liens externes:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les liens externes",
          variant: "destructive"
        });
      }
    };
    
    loadLinks();
  }, [toast]);
  
  const saveLinks = (newLinks: ExternalLink[]) => {
    try {
      localStorage.setItem('externalLinks', JSON.stringify(newLinks));
      setLinks(newLinks);
      toast({
        title: "Succès",
        description: "Liens externes enregistrés avec succès",
      });
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement des liens:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer les modifications",
        variant: "destructive"
      });
    }
  };
  
  const handleAdd = () => {
    const newLink: ExternalLink = {
      id: Date.now().toString(),
      name,
      url,
      description,
      icon,
      requiredRole
    };
    
    const newLinks = [...links, newLink];
    saveLinks(newLinks);
    resetForm();
    setIsAddDialogOpen(false);
  };
  
  const handleEdit = () => {
    if (!currentLink) return;
    
    const updatedLinks = links.map(link => 
      link.id === currentLink.id ? 
      { ...currentLink, name, url, description, icon, requiredRole } : 
      link
    );
    
    saveLinks(updatedLinks);
    resetForm();
    setIsEditDialogOpen(false);
  };
  
  const handleDelete = (id: string) => {
    const updatedLinks = links.filter(link => link.id !== id);
    saveLinks(updatedLinks);
  };
  
  const openEditDialog = (link: ExternalLink) => {
    setCurrentLink(link);
    setName(link.name);
    setUrl(link.url);
    setDescription(link.description);
    setIcon(link.icon);
    setRequiredRole(link.requiredRole);
    setIsEditDialogOpen(true);
  };
  
  const resetForm = () => {
    setName('');
    setUrl('');
    setDescription('');
    setIcon('');
    setRequiredRole('user');
    setCurrentLink(null);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Liens externes</CardTitle>
              <CardDescription>Gérez les liens vers des applications ou sites externes</CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" /> Ajouter un lien
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ajouter un lien externe</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="url">URL</Label>
                    <Input id="url" value={url} onChange={(e) => setUrl(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="icon">Icône (nom de l'icône Lucide)</Label>
                    <Input id="icon" value={icon} onChange={(e) => setIcon(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Rôle requis</Label>
                    <Input id="role" value={requiredRole} onChange={(e) => setRequiredRole(e.target.value)} />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Annuler</Button>
                  <Button onClick={handleAdd}>Ajouter</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Rôle requis</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {links.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                    Aucun lien externe configuré
                  </TableCell>
                </TableRow>
              )}
              {links.map((link) => (
                <TableRow key={link.id}>
                  <TableCell>{link.name}</TableCell>
                  <TableCell>{link.url}</TableCell>
                  <TableCell>{link.description}</TableCell>
                  <TableCell>{link.requiredRole}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => openEditDialog(link)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(link.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Dialog d'édition */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier un lien externe</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nom</Label>
              <Input id="edit-name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-url">URL</Label>
              <Input id="edit-url" value={url} onChange={(e) => setUrl(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Input id="edit-description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-icon">Icône</Label>
              <Input id="edit-icon" value={icon} onChange={(e) => setIcon(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-role">Rôle requis</Label>
              <Input id="edit-role" value={requiredRole} onChange={(e) => setRequiredRole(e.target.value)} />
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

export default ExternalLinksManager;
