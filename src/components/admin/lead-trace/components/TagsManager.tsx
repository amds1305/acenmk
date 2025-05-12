
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Edit2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { LeadTag } from '@/types/lead';

// Mock tags data
const initialTags: LeadTag[] = [
  { id: '1', name: 'urgent', color: '#ef4444' },
  { id: '2', name: 'ecommerce', color: '#3b82f6' },
  { id: '3', name: 'mobile', color: '#8b5cf6' },
  { id: '4', name: 'premium', color: '#f59e0b' },
  { id: '5', name: 'cloud', color: '#10b981' },
  { id: '6', name: 'consulting', color: '#6366f1' },
];

const TagsManager = () => {
  const [tags, setTags] = useState<LeadTag[]>(initialTags);
  const [editingTagId, setEditingTagId] = useState<string | null>(null);
  const [newTag, setNewTag] = useState({ name: '', color: '#3b82f6' });
  const { toast } = useToast();

  const handleAddTag = () => {
    if (!newTag.name.trim()) {
      toast({
        title: 'Erreur',
        description: 'Le nom du tag ne peut pas être vide.',
        variant: 'destructive',
      });
      return;
    }

    const tagExists = tags.some(tag => tag.name.toLowerCase() === newTag.name.toLowerCase());
    if (tagExists) {
      toast({
        title: 'Erreur',
        description: 'Un tag avec ce nom existe déjà.',
        variant: 'destructive',
      });
      return;
    }

    const newTagData: LeadTag = {
      id: `tag-${Date.now()}`,
      name: newTag.name.trim(),
      color: newTag.color,
    };

    setTags([...tags, newTagData]);
    setNewTag({ name: '', color: '#3b82f6' });

    toast({
      title: 'Tag ajouté',
      description: `Le tag "${newTagData.name}" a été ajouté avec succès.`,
    });
  };

  const handleEditTag = (tag: LeadTag) => {
    setEditingTagId(tag.id);
    setNewTag({ name: tag.name, color: tag.color });
  };

  const handleUpdateTag = () => {
    if (!newTag.name.trim()) {
      toast({
        title: 'Erreur',
        description: 'Le nom du tag ne peut pas être vide.',
        variant: 'destructive',
      });
      return;
    }

    const tagExists = tags.some(tag => 
      tag.id !== editingTagId && 
      tag.name.toLowerCase() === newTag.name.toLowerCase()
    );
    
    if (tagExists) {
      toast({
        title: 'Erreur',
        description: 'Un tag avec ce nom existe déjà.',
        variant: 'destructive',
      });
      return;
    }

    setTags(tags.map(tag => 
      tag.id === editingTagId 
        ? { ...tag, name: newTag.name.trim(), color: newTag.color } 
        : tag
    ));
    
    setEditingTagId(null);
    setNewTag({ name: '', color: '#3b82f6' });

    toast({
      title: 'Tag mis à jour',
      description: 'Le tag a été mis à jour avec succès.',
    });
  };

  const handleDeleteTag = (tagId: string) => {
    setTags(tags.filter(tag => tag.id !== tagId));

    toast({
      title: 'Tag supprimé',
      description: 'Le tag a été supprimé avec succès.',
    });
  };

  const handleCancelEdit = () => {
    setEditingTagId(null);
    setNewTag({ name: '', color: '#3b82f6' });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des tags</CardTitle>
        <CardDescription>
          Créez et gérez les tags pour organiser vos leads
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-4 col-span-1 md:col-span-2">
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <div key={tag.id} className="flex items-center border rounded-md pl-2 pr-1 py-1">
                  <Badge style={{ backgroundColor: tag.color }} className="mr-1">{tag.name}</Badge>
                  <div className="flex">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6" 
                      onClick={() => handleEditTag(tag)}
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 text-destructive hover:text-destructive" 
                      onClick={() => handleDeleteTag(tag.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">
                {editingTagId ? 'Éditer le tag' : 'Ajouter un tag'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="tagName" className="text-sm font-medium">Nom du tag</label>
                <Input 
                  id="tagName" 
                  value={newTag.name} 
                  onChange={e => setNewTag({ ...newTag, name: e.target.value })} 
                  placeholder="ex: urgent, premium, etc." 
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="tagColor" className="text-sm font-medium">Couleur</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    id="tagColor"
                    value={newTag.color}
                    onChange={e => setNewTag({ ...newTag, color: e.target.value })}
                    className="w-10 h-10 border-0 rounded"
                  />
                  <Input 
                    value={newTag.color} 
                    onChange={e => setNewTag({ ...newTag, color: e.target.value })} 
                    className="font-mono"
                  />
                </div>
              </div>
              
              <div className="pt-2">
                <label className="text-sm font-medium">Aperçu</label>
                <div className="mt-1">
                  <Badge style={{ backgroundColor: newTag.color }}>
                    {newTag.name || 'Nom du tag'}
                  </Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              {editingTagId ? (
                <div className="flex gap-2 w-full">
                  <Button variant="outline" className="flex-1" onClick={handleCancelEdit}>
                    Annuler
                  </Button>
                  <Button className="flex-1" onClick={handleUpdateTag}>
                    Mettre à jour
                  </Button>
                </div>
              ) : (
                <Button className="w-full" onClick={handleAddTag}>
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter le tag
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default TagsManager;
