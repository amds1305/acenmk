
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Loader2, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Estimates = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Chargement...</span>
      </div>
    );
  }

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen py-16 px-4 sm:px-6 md:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto pt-10 pb-20">
          <h1 className="text-3xl font-bold mb-8">Mes devis</h1>
          
          <div className="bg-card rounded-lg shadow-sm p-6">
            {user?.estimates && user.estimates.length > 0 ? (
              <div className="space-y-4">
                {user.estimates.map((estimate) => (
                  <div key={estimate.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">{estimate.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        estimate.status === 'accepted' ? 'bg-green-100 text-green-800' :
                        estimate.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {estimate.status === 'accepted' ? 'Accepté' :
                         estimate.status === 'pending' ? 'En attente' :
                         'Refusé'}
                      </span>
                    </div>
                    <p className="text-muted-foreground mt-1">{estimate.description}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div>
                        <span className="text-sm text-muted-foreground">
                          Créé le {new Date(estimate.createdAt).toLocaleDateString()}
                        </span>
                        <p className="font-medium mt-1">
                          {formatAmount(estimate.amount)}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        <span>Voir le devis</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Aucun devis disponible.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Estimates;
