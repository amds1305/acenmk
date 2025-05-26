
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, FileText, BarChart2, User, Settings, Shield, History } from 'lucide-react';
import ProjectsList from './ProjectsList';
import EstimatesList from './EstimatesList';
import StatsContent from './StatsContent';
import ProfileInfo from './ProfileInfo';
import UserPreferences from './UserPreferences';
import SecuritySettings from './SecuritySettings';
import ActivityLog from './ActivityLog';
import { User as UserType, Project, Estimate } from '@/types/auth';
import { getStatusColor, getStatusText, formatDate, formatAmount } from './ProfileUtils';

interface ProfileTabsProps {
  user: UserType;
  updateProfile: (data: Partial<UserType>) => Promise<void>;
  uploadAvatar: (file: File) => Promise<string>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  toggleTwoFactor: (enable: boolean) => Promise<void>;
  updatePreferences: (preferences: any) => Promise<void>;
}

const ProfileTabs = ({
  user,
  updateProfile,
  uploadAvatar,
  updatePassword,
  toggleTwoFactor,
  updatePreferences
}: ProfileTabsProps) => {
  return (
    <Tabs defaultValue="profile" className="space-y-4">
      <TabsList className="grid grid-cols-3 md:grid-cols-7">
        <TabsTrigger value="profile" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span className="hidden md:inline">Profil</span>
        </TabsTrigger>
        <TabsTrigger value="projects" className="flex items-center gap-2">
          <Briefcase className="h-4 w-4" />
          <span className="hidden md:inline">Projets</span>
        </TabsTrigger>
        <TabsTrigger value="estimates" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <span className="hidden md:inline">Devis</span>
        </TabsTrigger>
        <TabsTrigger value="stats" className="flex items-center gap-2">
          <BarChart2 className="h-4 w-4" />
          <span className="hidden md:inline">Statistiques</span>
        </TabsTrigger>
        <TabsTrigger value="preferences" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          <span className="hidden md:inline">Préférences</span>
        </TabsTrigger>
        <TabsTrigger value="security" className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          <span className="hidden md:inline">Sécurité</span>
        </TabsTrigger>
        <TabsTrigger value="activity" className="flex items-center gap-2">
          <History className="h-4 w-4" />
          <span className="hidden md:inline">Activité</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="profile">
        <ProfileInfo 
          user={user} 
          updateProfile={updateProfile} 
          uploadAvatar={uploadAvatar} 
        />
      </TabsContent>
      
      <TabsContent value="projects">
        <ProjectsList 
          projects={user.projects}
          getStatusColor={getStatusColor}
          getStatusText={getStatusText}
          formatDate={formatDate}
        />
      </TabsContent>
      
      <TabsContent value="estimates">
        <EstimatesList 
          estimates={user.estimates}
          getStatusColor={getStatusColor}
          getStatusText={getStatusText}
          formatDate={formatDate}
          formatAmount={formatAmount}
        />
      </TabsContent>
      
      <TabsContent value="stats">
        <StatsContent />
      </TabsContent>
      
      <TabsContent value="preferences">
        <UserPreferences 
          user={user} 
          updatePreferences={updatePreferences} 
        />
      </TabsContent>
      
      <TabsContent value="security">
        <SecuritySettings 
          user={user} 
          updatePassword={updatePassword} 
          toggleTwoFactor={toggleTwoFactor} 
        />
      </TabsContent>
      
      <TabsContent value="activity">
        <ActivityLog loginHistory={user.loginHistory || []} formatDate={formatDate} />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
