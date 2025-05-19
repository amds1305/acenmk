
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Import components
import UserSidebar from '@/components/profile/UserSidebar';
import ProfileTabs from '@/components/profile/ProfileTabs';
import DashboardOverview from '@/components/profile/DashboardOverview';

const Profile = () => {
  const { 
    user, 
    isLoading, 
    updateProfile, 
    isAuthenticated, 
    updatePreferences 
  } = useAuth();
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

  // Mock functions for avatar upload and security features
  const uploadAvatar = async (file: File): Promise<string> => {
    // Simulate upload delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const url = URL.createObjectURL(file);
        resolve(url);
      }, 1500);
    });
  };

  const updatePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock validation
        if (currentPassword === newPassword) {
          reject(new Error("Le nouveau mot de passe doit être différent de l'ancien"));
          return;
        }
        resolve();
      }, 1000);
    });
  };

  const toggleTwoFactor = async (enable: boolean): Promise<void> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if (user) {
          updateProfile({
            ...user,
            twoFactorEnabled: enable
          });
        }
        resolve();
      }, 1000);
    });
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
          <h1 className="text-3xl font-bold mb-8">Tableau de bord</h1>
          
          {/* Dashboard Overview */}
          <DashboardOverview />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
            {/* Sidebar / Profile Info */}
            <UserSidebar 
              user={user}
              messages={[]}
            />
            
            {/* Main content */}
            <div className="lg:col-span-8">
              <ProfileTabs 
                user={user}
                updateProfile={handleUpdateProfile}
                uploadAvatar={uploadAvatar}
                updatePassword={updatePassword}
                toggleTwoFactor={toggleTwoFactor}
                updatePreferences={updatePreferences}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Profile;
