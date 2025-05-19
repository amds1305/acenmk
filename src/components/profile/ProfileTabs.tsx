
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from '@/types/auth';
import ProfileInfo from './ProfileInfo';
import UserPreferences from './UserPreferences';
import ProjectsList from './ProjectsList';
import EstimatesList from './EstimatesList';

// Add props interface for ProfileTabs
interface ProfileTabsProps {
  user: User;
  updateProfile: (data: Partial<User>) => Promise<void>;
  uploadAvatar: (file: File) => Promise<string>;
  updatePreferences: (preferences: any) => Promise<void>;
  updatePassword?: (currentPassword: string, newPassword: string) => Promise<void>;
  toggleTwoFactor?: (enable: boolean) => Promise<void>;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ 
  user, 
  updateProfile, 
  uploadAvatar, 
  updatePreferences,
  updatePassword,
  toggleTwoFactor
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Format date helper
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  // Format amount helper
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'accepted':
        return 'bg-green-500';
      case 'pending':
      case 'in_review':
      case 'in_progress':
        return 'bg-amber-500';
      case 'completed':
        return 'bg-blue-500';
      case 'rejected':
        return 'bg-red-500';
      case 'onhold':
        return 'bg-gray-500';
      default:
        return 'bg-gray-300';
    }
  };

  // Get status text
  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'completed': return 'Terminé';
      case 'onhold': return 'En pause';
      case 'in_progress': return 'En cours';
      case 'pending': return 'En attente';
      case 'accepted': return 'Accepté';
      case 'rejected': return 'Rejeté';
      case 'in_review': return 'En révision';
      default: return status;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs defaultValue="profile" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="estimates">Estimates</TabsTrigger>
        </TabsList>
      
      <TabsContent value="profile" className="space-y-6">
        {user && (
          <ProfileInfo 
            user={user} 
            updateProfile={updateProfile} 
            uploadAvatar={uploadAvatar} 
          />
        )}
      </TabsContent>
      
      <TabsContent value="preferences" className="space-y-6">
        {user && (
          <UserPreferences 
            user={user} 
            updatePreferences={updatePreferences} 
          />
        )}
      </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <ProjectsList 
            projects={user?.projects || []} 
            getStatusColor={getStatusColor}
            getStatusText={getStatusText}
            formatDate={formatDate}
          />
        </TabsContent>

        <TabsContent value="estimates" className="space-y-6">
          <EstimatesList 
            estimates={user?.estimates || []} 
            getStatusColor={getStatusColor}
            getStatusText={getStatusText}
            formatDate={formatDate}
            formatAmount={formatAmount}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileTabs;
