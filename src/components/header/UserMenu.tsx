
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface UserMenuProps {
  config?: {
    show_login_button?: boolean;
    show_register_button?: boolean;
    login_button_label?: string;
    register_button_label?: string;
  };
}

const UserMenu: React.FC<UserMenuProps> = ({ config }) => {
  // Component vide - plus de menu utilisateur
  return null;
};

export default UserMenu;
