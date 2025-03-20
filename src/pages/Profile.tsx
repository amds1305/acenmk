
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header'; // Fixed import
import Footer from '@/components/Footer'; // Fixed import
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, User, Briefcase, Phone, Mail, Edit2, Save, MessageSquare, BarChart2, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const formSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  company: z.string().optional(),
  phone: z.string().optional(),
});

const Profile = () => {
  const { user, isLoading, updateProfile, messages, isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Rediriger si non authentifié
  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, navigate]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      company: user?.company || '',
      phone: user?.phone || '',
    },
  });

  React.useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
        company: user.company || '',
        phone: user.phone || '',
      });
    }
  }, [user, form]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await updateProfile(data);
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été enregistrées avec succès.",
      });
      setIsEditing(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour de votre profil.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Chargement...</span>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'in-progress': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'approved': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'in-progress': return 'En cours';
      case 'completed': return 'Terminé';
      case 'approved': return 'Approuvé';
      case 'rejected': return 'Rejeté';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

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
          <h1 className="text-3xl font-bold mb-8">Mon compte</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sidebar / Profile Info */}
            <div className="lg:col-span-4">
              <Card>
                <CardHeader className="text-center pb-0">
                  <Avatar className="h-20 w-20 mx-auto mb-4">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-xl">{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <CardTitle>{user.name}</CardTitle>
                  <CardDescription>{user.role === 'admin' ? 'Administrateur' : 'Client'}</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  {isEditing ? (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nom</FormLabel>
                              <FormControl>
                                <Input placeholder="Votre nom" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="Votre email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Entreprise</FormLabel>
                              <FormControl>
                                <Input placeholder="Votre entreprise" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Téléphone</FormLabel>
                              <FormControl>
                                <Input placeholder="Votre téléphone" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex justify-between pt-2">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setIsEditing(false)}
                          >
                            Annuler
                          </Button>
                          <Button type="submit">
                            <Save className="mr-2 h-4 w-4" />
                            Enregistrer
                          </Button>
                        </div>
                      </form>
                    </Form>
                  ) : (
                    <>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 opacity-70" />
                          <span>{user.email}</span>
                        </div>
                        {user.company && (
                          <div className="flex items-center">
                            <Briefcase className="h-4 w-4 mr-2 opacity-70" />
                            <span>{user.company}</span>
                          </div>
                        )}
                        {user.phone && (
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2 opacity-70" />
                            <span>{user.phone}</span>
                          </div>
                        )}
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 opacity-70" />
                          <span>Membre depuis {formatDate(user.createdAt)}</span>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full mt-6" 
                        onClick={() => setIsEditing(true)}
                      >
                        <Edit2 className="mr-2 h-4 w-4" />
                        Modifier mon profil
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
              
              {/* Messages récents */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Messages récents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {messages.length > 0 ? (
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div 
                          key={message.id} 
                          className={`p-3 rounded-lg border ${!message.read ? 'bg-primary/5 border-primary/20' : 'bg-card border-border'}`}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <div className="flex items-center">
                              <Badge variant={message.sender === 'admin' ? "default" : "secondary"} className="text-xs">
                                {message.sender === 'admin' ? 'Support' : 'Vous'}
                              </Badge>
                              {!message.read && message.sender === 'admin' && (
                                <Badge variant="outline" className="ml-2 text-xs bg-primary/10 text-primary border-primary/30">
                                  Non lu
                                </Badge>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {new Date(message.date).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                          <p className="text-sm">{message.content}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">Aucun message</p>
                  )}
                  
                  <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/messages')}>
                    Voir tous les messages
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Main content */}
            <div className="lg:col-span-8">
              <Tabs defaultValue="projects">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="projects">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Mes projets
                  </TabsTrigger>
                  <TabsTrigger value="estimates">
                    <FileText className="h-4 w-4 mr-2" />
                    Mes devis
                  </TabsTrigger>
                  <TabsTrigger value="stats">
                    <BarChart2 className="h-4 w-4 mr-2" />
                    Statistiques
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="projects" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Projets en cours</CardTitle>
                      <CardDescription>
                        Suivez l'avancement de vos projets en temps réel
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {user.projects && user.projects.length > 0 ? (
                        <div className="space-y-4">
                          {user.projects.map((project) => (
                            <div key={project.id} className="border rounded-lg p-4 bg-card">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium">{project.title}</h3>
                                  <div className="flex items-center mt-2">
                                    <div className={`h-2.5 w-2.5 rounded-full mr-2 ${getStatusColor(project.status)}`}></div>
                                    <span className="text-sm text-muted-foreground">
                                      {getStatusText(project.status)}
                                    </span>
                                  </div>
                                </div>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="sm">Détails</Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>{project.title}</DialogTitle>
                                      <DialogDescription>
                                        Dernière mise à jour: {formatDate(project.lastUpdated)}
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="py-4">
                                      <div className="flex items-center mb-4">
                                        <div className={`h-3 w-3 rounded-full mr-2 ${getStatusColor(project.status)}`}></div>
                                        <span>Statut: {getStatusText(project.status)}</span>
                                      </div>
                                      <Separator className="my-4" />
                                      <h4 className="text-sm font-medium mb-2">Détails du projet</h4>
                                      <p className="text-sm text-muted-foreground mb-4">
                                        Informations détaillées sur votre projet et son avancement.
                                      </p>
                                      <div className="rounded-md bg-muted p-4">
                                        <p className="text-sm">
                                          Dans une application réelle, des détails complets sur le projet
                                          seraient affichés ici, y compris les étapes du projet, les livrables,
                                          l'équipe, etc.
                                        </p>
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <Button onClick={() => navigate(`/projects/${project.id}`)}>
                                        Voir la page du projet
                                      </Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              </div>
                              <div className="mt-2 text-sm text-muted-foreground">
                                Dernière mise à jour: {formatDate(project.lastUpdated)}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground mb-4">Vous n'avez pas encore de projets</p>
                          <Button onClick={() => navigate('/estimate')}>
                            Demander un devis
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="estimates" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Devis et propositions</CardTitle>
                      <CardDescription>
                        Consultez et gérez vos devis
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {user.estimates && user.estimates.length > 0 ? (
                        <div className="space-y-4">
                          {user.estimates.map((estimate) => (
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
                </TabsContent>
                
                <TabsContent value="stats" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Statistiques et activité</CardTitle>
                      <CardDescription>
                        Visualisez l'activité liée à vos projets
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="min-h-[300px] flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-muted-foreground mb-2">
                          Dans une application complète, des graphiques et statistiques
                          sur vos projets seraient affichés ici.
                        </p>
                        <Button variant="outline" onClick={() => navigate('/dashboard')}>
                          Voir le tableau de bord
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Profile;
