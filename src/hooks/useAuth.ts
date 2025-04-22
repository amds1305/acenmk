
import { useSession } from './auth/useSession';
import { useAuthentication } from './auth/useAuthentication';
import { useProfile } from './auth/useProfile';
import { useSecuritySettings } from './auth/useSecuritySettings';
import { useMessages } from './auth/useMessages';

export const useAuthProvider = () => {
  const { user, isLoading: sessionLoading, isAuthenticated, isAdmin } = useSession();
  const { login, logout, register, isLoading: authLoading } = useAuthentication();
  const { updateProfile, uploadAvatar, isLoading: profileLoading } = useProfile(user);
  const {
    updatePassword,
    toggleTwoFactor,
    updatePreferences,
    isLoading: securityLoading
  } = useSecuritySettings();
  const { messages, unreadMessages } = useMessages();

  return {
    user,
    isLoading: sessionLoading || authLoading || profileLoading || securityLoading,
    login,
    logout,
    register,
    updateProfile,
    uploadAvatar,
    updatePassword,
    toggleTwoFactor,
    updatePreferences,
    isAuthenticated,
    isAdmin,
    messages,
    unreadMessages
  };
};
