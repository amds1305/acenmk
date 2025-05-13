
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText, Loader2 } from 'lucide-react';

const EstimatesPage = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // Rediriger vers la page de connexion si non authentifié
  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2">Chargement...</span>
      </div>
    );
  }

  // Format de montant
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  // Obtention de la couleur selon le statut
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'expired': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  // Exemple de devis de l'utilisateur (normalement chargés depuis l'API)
  const userEstimates = user?.estimates || [];

  return (
    <>
      <Helmet>
        <title>Mes Devis | Espace personnel</title>
        <meta name="description" content="Consultez vos devis dans votre espace personnel" />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">Mes Devis</h1>
          
          {userEstimates.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <div className="mx-auto my-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold">Aucun devis</h3>
                <p className="text-muted-foreground mt-2">
                  Vous n'avez pas encore reçu de devis. Contactez-nous pour obtenir un devis personnalisé.
                </p>
                <Button className="mt-6" onClick={() => navigate('/contact')}>
                  Demander un devis
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Liste de vos devis</CardTitle>
                <CardDescription>
                  Consultez et gérez tous vos devis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Référence</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Projet</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userEstimates.map((estimate) => (
                      <TableRow key={estimate.id}>
                        <TableCell>#{estimate.reference}</TableCell>
                        <TableCell>{new Date(estimate.date).toLocaleDateString()}</TableCell>
                        <TableCell>{estimate.projectName}</TableCell>
                        <TableCell>{formatAmount(estimate.amount)}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(estimate.status)}>
                            {estimate.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Voir
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default EstimatesPage;
