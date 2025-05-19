
import React from 'react';
import { FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Estimate } from '@/types/auth';
import { Badge } from '@/components/ui/badge';

interface EstimatesListProps {
  estimates: Estimate[];
  getStatusColor: (status: string) => string;
  getStatusText: (status: string) => string;
  formatDate: (dateString: string) => string;
  formatAmount: (amount: number) => string;
}

const EstimatesList: React.FC<EstimatesListProps> = ({ 
  estimates, 
  getStatusColor, 
  getStatusText, 
  formatDate,
  formatAmount 
}) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Devis</CardTitle>
        <CardDescription>
          Consultez vos devis et leurs statuts
        </CardDescription>
      </CardHeader>
      <CardContent>
        {estimates && estimates.length > 0 ? (
          <div className="space-y-4">
            {estimates.map((estimate) => (
              <div key={estimate.id} className="border rounded-lg p-4 bg-card">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <div>
                    <h3 className="font-medium">{estimate.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Client: {estimate.client}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline">{formatAmount(estimate.amount)}</Badge>
                      <div className="flex items-center">
                        <div className={`h-2.5 w-2.5 rounded-full mr-1.5 ${getStatusColor(estimate.status)}`}></div>
                        <span className="text-xs">{getStatusText(estimate.status)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-0 sm:text-right">
                    <p className="text-sm text-muted-foreground">{formatDate(estimate.date)}</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Voir le détail
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
              <FileText className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground mb-4">
              Vous n'avez aucun devis pour le moment
            </p>
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
