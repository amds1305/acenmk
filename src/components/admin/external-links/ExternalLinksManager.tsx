
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import useExternalLinks, { ExternalLink } from './useExternalLinks';
import LinkList from './LinkList';
import LinkDialog from './LinkDialog';

const ExternalLinksManager: React.FC = () => {
  const { links, roles, isLoading, saveLink, deleteLink } = useExternalLinks();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentLink, setCurrentLink] = useState<ExternalLink>({
    id: '',
    name: '',
    url: '',
    icon: '',
    requires_auth: false,
    allowed_roles: []
  });
  
  const handleNewLink = () => {
    setCurrentLink({
      id: '',
      name: '',
      url: '',
      icon: '',
      requires_auth: false,
      allowed_roles: []
    });
    setIsDialogOpen(true);
  };
  
  const handleEditLink = (link: ExternalLink) => {
    setCurrentLink(link);
    setIsDialogOpen(true);
  };
  
  const handleSaveLink = async () => {
    const success = await saveLink(currentLink);
    if (success) {
      setIsDialogOpen(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Liens externes</CardTitle>
        <Button onClick={handleNewLink}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un lien
        </Button>
      </CardHeader>
      <CardContent>
        <LinkList 
          links={links} 
          onEdit={handleEditLink} 
          onDelete={deleteLink} 
        />

        <LinkDialog 
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          currentLink={currentLink}
          roles={roles}
          onSave={handleSaveLink}
          onChange={setCurrentLink}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
};

export default ExternalLinksManager;
