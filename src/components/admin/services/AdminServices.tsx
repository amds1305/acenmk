
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const AdminServices = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Services</h1>
          <p className="text-muted-foreground">
            Gérez les services que vous proposez à vos clients.
          </p>
        </div>
        <Button onClick={() => navigate('/admin/services')}>
          Gérer les services
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configuration des services</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Cette section vous permet de gérer les services affichés sur votre site.</p>
          <p>Vous pouvez ajouter, modifier ou supprimer des services depuis cette interface.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminServices;
