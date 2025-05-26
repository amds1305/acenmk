
import { SocialLink } from '../types';
import { LucideIcon } from 'lucide-react';

export interface SocialLinkFormProps {
  editingSocialLink: SocialLink | null;
  newSocialIcon: string;
  newSocialHref: string;
  newSocialAriaLabel: string;
  newSocialVisible: boolean;
  setNewSocialIcon: (value: string) => void;
  setNewSocialHref: (value: string) => void;
  setNewSocialAriaLabel: (value: string) => void;
  setNewSocialVisible: (value: boolean) => void;
  handleSaveSocialLink: () => void;
  handleCancelEdit: () => void;
  availableSocialIcons: Record<string, LucideIcon>;
}

export interface SocialLinkListProps {
  socialLinks: SocialLink[];
  handleEditSocialLink: (link: SocialLink) => void;
  handleDeleteSocialLink: (link: SocialLink) => void;
  handleToggleVisibility: (link: SocialLink) => void;
  renderSocialIcon: (icon: LucideIcon) => React.ReactNode;
}

export interface UseSocialLinksReturn {
  socialLinks: SocialLink[];
  editingSocialLink: SocialLink | null;
  newSocialIcon: string;
  newSocialHref: string;
  newSocialAriaLabel: string;
  newSocialVisible: boolean;
  availableSocialIcons: Record<string, LucideIcon>;
  setNewSocialIcon: (value: string) => void;
  setNewSocialHref: (value: string) => void;
  setNewSocialAriaLabel: (value: string) => void;
  setNewSocialVisible: (value: boolean) => void;
  handleSaveSocialLink: () => Promise<void>;
  handleDeleteSocialLink: (link: SocialLink) => Promise<void>;
  handleEditSocialLink: (link: SocialLink) => void;
  handleToggleVisibility: (link: SocialLink) => Promise<void>;
  handleCancelEdit: () => void;
  renderSocialIcon: (icon: LucideIcon) => React.ReactNode;
}
