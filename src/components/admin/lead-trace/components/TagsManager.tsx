
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, X, Edit, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { LeadTag } from '@/types/lead';

// Mock tags data
const initialTags: LeadTag[] = [
  { id: '1', name: 'urgent', color: '#ef4444' },
  { id: '2', name: 'e-commerce', color: '#3b82f6' },
  { id: '3', name: 'app', color: '#8b5cf6' },
  { id: '4', name: 'design', color: '#ec4899' },
  { id: '5', name: 'cloud', color: '#10b981' },
  { id: '6', name: 'infrastructure', color: '#f59e0b' },
];

const TagsManager: React.FC = () => {
  const { toast } = useToast();
  const [tags, setTags] = useState<LeadTag[]>(initialTags);
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('#3b82f6');
  const [editingTag, setEditingTag] = useState<LeadTag | null>(null);

  const handleAddTag = () => {
    if (!newTagName.trim()) {
      toast({
        title: 'Erreur',
        description: 'Le nom du tag ne peut pas être vide',
        variant: 'destructive',
      });
      return;
    }

    const tagExists = tags.some(tag => 
      tag.name.toLowerCase() === newTagName.toLowerCase()
    );

    if (tagExists) {
      toast({
        title: 'Erreur',
        description: 'Un tag avec ce nom existe déjà',
        variant: 'destructive',
      });
      return;
    }

    const newTag: LeadTag = {
      id: Date.now().toString(),
      name: newTagName.trim(),
      color: newTagColor,
    };

    setTags([...tags, newTag]);
    setNewTagName('');
    
    toast({
      title: 'Tag ajouté',
      description: `Le tag "${newTag.name}" a été ajouté avec succès`,
    });
  };

  const handleDeleteTag = (id: string) => {
    setTags(tags.filter(tag => tag.id !== id));
    
    toast({
      title: 'Tag supprimé',
      description: 'Le tag a été supprimé avec succès',
    });
  };

  const startEditTag = (tag: LeadTag) => {
    setEditingTag({ ...tag });
  };

  const cancelEdit = () => {
    setEditingTag(null);
  };

  const saveEdit = () => {
    if (!editingTag?.name.trim()) {
      toast({
        title: 'Erreur',
        description: 'Le nom du tag ne peut pas être vide',
        variant: 'destructive',
      });
      return;
    }

    const tagExists = tags.some(tag => 
      tag.id !== editingTag.id && 
      tag.name.toLowerCase() === editingTag.name.toLowerCase()
    );

    if (tagExists) {
      toast({
        title: 'Erreur',
        description: 'Un tag avec ce nom existe déjà',
        variant: 'destructive',
      });
      return;
    }

    setTags(tags.map(tag => 
      tag.id === editingTag.id ? editingTag : tag
    ));
    
    toast({
      title: 'Tag modifié',
      description: `Le tag "${editingTag.name}" a été modifié avec succès`,
    });
    
    setEditingTag(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-grow space-y-2">
          <label className="text-sm font-medium">Nom du tag</label>
          <Input
            placeholder="Nom du tag"
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
          />
        </div>
        
        <div className="space-y-2 w-full sm:w-32">
          <label className="text-sm font-medium">Couleur</label>
          <div className="flex">
            <Input
              type="color"
              className="w-full h-10 p-1"
              value={newTagColor}
              onChange={(e) => setNewTagColor(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex items-end">
          <Button onClick={handleAddTag} className="w-full sm:w-auto gap-2">
            <PlusCircle className="h-4 w-4" />
            <span>Ajouter</span>
          </Button>
        </div>
      </div>
      
      <div className="border rounded-md">
        <div className="p-4 border-b">
          <h3 className="font-medium">Tags existants ({tags.length})</h3>
        </div>
        
        <div className="p-4 divide-y">
          {tags.length > 0 ? (
            tags.map(tag => (
              <div key={tag.id} className="py-2 flex items-center justify-between">
                {editingTag?.id === tag.id ? (
                  <>
                    <div className="flex items-center gap-3 flex-1">
                      <Input
                        type="color"
                        className="w-10 h-10 p-1"
                        value={editingTag.color}
                        onChange={(e) => setEditingTag({...editingTag, color: e.target.value})}
                      />
                      <Input
                        className="flex-1"
                        value={editingTag.name}
                        onChange={(e) => setEditingTag({...editingTag, name: e.target.value})}
                      />
                    </div>
                    <div className="flex gap-2 ml-2">
                      <Button size="icon" variant="outline" onClick={saveEdit}>
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="outline" onClick={cancelEdit}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded" style={{ backgroundColor: tag.color }}></div>
                      <span>{tag.name}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" onClick={() => startEditTag(tag)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="text-red-500" onClick={() => handleDeleteTag(tag.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              Aucun tag n'a été créé
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TagsManager;
