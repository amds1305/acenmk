
import React from 'react';
import UserProfileDialog from './UserProfileDialog';
import SendMessageDialog from './SendMessageDialog';
import AddUserDialog from './AddUserDialog';
import { User } from '@/types/auth';

interface UsersDialogsProps {
  selectedUser: User | null;
  isProfileOpen: boolean;
  isEditingProfile: boolean;
  isMessageDialogOpen: boolean;
  isAddUserDialogOpen: boolean;
  onProfileDialogClose: () => void;
  onMessageDialogClose: () => void;
  onAddUserDialogClose: () => void;
  onProfileUpdate: (updatedUser: Partial<User>) => void;
  onUserAdded: () => void;
}

export const UsersDialogs: React.FC<UsersDialogsProps> = ({
  selectedUser,
  isProfileOpen,
  isEditingProfile,
  isMessageDialogOpen,
  isAddUserDialogOpen,
  onProfileDialogClose,
  onMessageDialogClose,
  onAddUserDialogClose,
  onProfileUpdate,
  onUserAdded
}) => {
  return (
    <>
      <UserProfileDialog
        user={selectedUser}
        isOpen={isProfileOpen}
        onClose={onProfileDialogClose}
        onSave={onProfileUpdate}
        isEditing={isEditingProfile}
      />

      <SendMessageDialog
        user={selectedUser}
        isOpen={isMessageDialogOpen}
        onClose={onMessageDialogClose}
      />

      <AddUserDialog
        isOpen={isAddUserDialogOpen}
        onClose={onAddUserDialogClose}
        onUserAdded={onUserAdded}
      />
    </>
  );
};
