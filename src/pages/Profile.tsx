
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header'; // Fixed import
import Footer from '@/components/Footer'; // Fixed import
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, Briefcase, FileText, BarChart2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Import components
import UserSidebar from '@/components/profile/UserSidebar';
import ProjectsList from '@/components/profile/ProjectsList';
import EstimatesList from '@/components/profile/EstimatesList';
import StatsContent from '@/components/profile/StatsContent';

// Import utility functions
import { 
  getStatusColor, 
  getStatusText, 
  formatDate, 
  formatAmount 
} from '@/components/profile/ProfileUtils';

const Profile = () => {
  const { user, isLoading, updateProfile, messages, isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, navigate]);

  const handleUpdateProfile = async (data: Partial<typeof user>) => {
    try {
      await updateProfile(data);
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été enregistrées avec succès.",
      });
      return Promise.resolve();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour de votre profil.",
      });
      return Promise.reject(error);
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

  return (
    <>
      <Header />
      <main className="min-h-screen py-16 px-4 sm:px-6 md:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto pt-10 pb-20">
          <h1 className="text-3xl font-bold mb-8">Mon compte</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sidebar / Profile Info */}
            <UserSidebar 
              user={user}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              updateProfile={handleUpdateProfile}
              messages={messages}
              formatDate={formatDate}
            />
            
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
                  <ProjectsList 
                    projects={user.projects}
                    getStatusColor={getStatusColor}
                    getStatusText={getStatusText}
                    formatDate={formatDate}
                  />
                </TabsContent>
                
                <TabsContent value="estimates" className="mt-6">
                  <EstimatesList 
                    estimates={user.estimates}
                    getStatusColor={getStatusColor}
                    getStatusText={getStatusText}
                    formatDate={formatDate}
                    formatAmount={formatAmount}
                  />
                </TabsContent>
                
                <TabsContent value="stats" className="mt-6">
                  <StatsContent />
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
