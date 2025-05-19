import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from '@/types/auth';
import ProfileInfo from './ProfileInfo';
import UserPreferences from './UserPreferences';
import ProjectsList from './ProjectsList';
import EstimatesList from './EstimatesList';

// Add props interface for ProfileInfo
interface ProfileInfoProps {
  user: User;
  updateProfile: (data: Partial<User>) => Promise<void>;
  uploadAvatar: (file: File) => Promise<string>;
}

// Add props interface for UserPreferences
interface UserPreferencesProps {
  user: User;
  updatePreferences: (preferences: any) => Promise<void>;
}

const ProfileTabs: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = async (data: Partial<User>) => {
    // Placeholder for update profile logic
    console.log('Update profile:', data);
  };

  const updatePreferences = async (preferences: any) => {
    // Placeholder for update preferences logic
    console.log('Update preferences:', preferences);
  };

  const uploadAvatar = async (file: File) => {
    // Placeholder for upload avatar logic
    console.log('Upload avatar:', file);
    return 'avatar_url';
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
          <ProjectsList />
        </TabsContent>

        <TabsContent value="estimates" className="space-y-6">
          <EstimatesList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileTabs;
