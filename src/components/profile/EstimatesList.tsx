
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Estimate } from '@/types/auth';

interface EstimatesListProps {
  estimates: Estimate[] | undefined;
  getStatusColor: (status: string) => string;
  getStatusText: (status: string) => string;
  formatDate: (dateString: string) => string;
  formatAmount: (amount: number) => string;
}

const EstimatesList = ({ 
  estimates, 
  getStatusColor, 
  getStatusText, 
  formatDate, 
  formatAmount 
}: EstimatesListProps) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Devis et propositions</CardTitle>
        <CardDescription>
          Consultez et gérez vos devis
        </CardDescription>
      </CardHeader>
      <CardContent>
        {estimates && estimates.length > 0 ? (
          <div className="space-y-4">
            {estimates.map((estimate) => (
              <div key={estimate.id} className="border rounded-lg p-4 bg-card">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{estimate.title}</h3>
                    <div className="flex items-center mt-2">
                      <div className={`h-2.5 w-2.5 rounded-full mr-2 ${getStatusColor(estimate.status)}`}></div>
                      <span className="text-sm text-muted-foreground">
                        {getStatusText(estimate.status)}
                      </span>
                    </div>
                    <div className="mt-2 text-sm">
                      <span className="font-medium">Montant:</span> {formatAmount(estimate.amount)}
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">Détails</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{estimate.title}</DialogTitle>
                        <DialogDescription>
                          Devis créé le: {formatDate(estimate.date)}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center">
                            <div className={`h-3 w-3 rounded-full mr-2 ${getStatusColor(estimate.status)}`}></div>
                            <span>Statut: {getStatusText(estimate.status)}</span>
                          </div>
                          <div className="font-medium">{formatAmount(estimate.amount)}</div>
                        </div>
                        <Separator className="my-4" />
                        <h4 className="text-sm font-medium mb-2">Détails du devis</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Détails complets de votre devis et des services proposés.
                        </p>
                        <div className="rounded-md bg-muted p-4">
                          <p className="text-sm">
                            Dans une application réelle, le détail complet du devis
                            serait affiché ici, y compris les prestations, tarifs, 
                            conditions, etc.
                          </p>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button 
                          variant="outline" 
                          onClick={() => navigate(`/estimates/${estimate.id}`)}
                        >
                          Télécharger le PDF
                        </Button>
                        {estimate.status === 'pending' && (
                          <Button>
                            Approuver le devis
                          </Button>
                        )}
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Date: {formatDate(estimate.date)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">Vous n'avez pas encore de devis</p>
            <Button onClick={() => navigate('/estimate')}>
              Demander un devis
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EstimatesList;
