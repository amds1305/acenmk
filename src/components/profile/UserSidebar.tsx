
import React from 'react';
import { User as UserType, Message } from '@/types/auth';
import UserInfo from './sidebar/UserInfo';
import RecentMessages from './sidebar/RecentMessages';

interface UserSidebarProps {
  user: UserType;
  messages: Message[];
}

const UserSidebar = ({ user, messages }: UserSidebarProps) => {
  return (
    <div className="lg:col-span-4">
      <UserInfo user={user} />
      <RecentMessages messages={messages} />
    </div>
  );
};

export default UserSidebar;
