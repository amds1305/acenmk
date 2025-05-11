
import React from 'react';
import { 
  LayoutDashboard, 
  Home, 
  Layers, 
  ShoppingBag, 
  FileText, 
  Users, 
  Settings, 
  Calendar, 
  LifeBuoy, 
  Briefcase,
  Navigation,
  UserCog,
  Shield,
  MessagesSquare,
  Newspaper,
  MessageCircleQuestion,
  PanelBottom,
  PanelTop,
  Database
} from 'lucide-react';
import { NavItem } from './types';

export const getNavItems = (): NavItem[] => {
  return [
    { path: '/admin', label: 'Tableau de bord', icon: <LayoutDashboard className="h-5 w-5" /> },
    { path: '/admin/home', label: 'Page d\'accueil', icon: <Home className="h-5 w-5" /> },
    { path: '/admin/hero', label: 'Hero', icon: <Layers className="h-5 w-5" /> },
    { path: '/admin/services', label: 'Services', icon: <ShoppingBag className="h-5 w-5" /> },
    { path: '/admin/pricing', label: 'Tarifs', icon: <FileText className="h-5 w-5" /> },
    { path: '/admin/about', label: 'À propos', icon: <LifeBuoy className="h-5 w-5" /> },
    { path: '/admin/team', label: 'Équipe', icon: <Users className="h-5 w-5" /> },
    { path: '/admin/testimonials', label: 'Témoignages', icon: <MessagesSquare className="h-5 w-5" /> },
    { path: '/admin/faq', label: 'FAQ', icon: <MessageCircleQuestion className="h-5 w-5" /> },
    { path: '/admin/blog', label: 'Blog', icon: <Newspaper className="h-5 w-5" /> },
    { path: '/admin/careers', label: 'Carrières', icon: <Briefcase className="h-5 w-5" /> },
    { path: '/admin/appointments', label: 'Rendez-vous', icon: <Calendar className="h-5 w-5" /> },
    { path: '/admin/header', label: 'En-tête', icon: <PanelTop className="h-5 w-5" /> },
    { path: '/admin/footer', label: 'Pied de page', icon: <PanelBottom className="h-5 w-5" /> },
    { divider: true },
    { path: '/admin/users', label: 'Utilisateurs', icon: <UserCog className="h-5 w-5" /> },
    { path: '/admin/roles', label: 'Rôles et Permissions', icon: <Shield className="h-5 w-5" /> },
    { path: '/admin/template', label: 'Template', icon: <Settings className="h-5 w-5" /> },
    { path: '/admin/trusted-clients', label: 'Clients fiables', icon: <Navigation className="h-5 w-5" /> },
    { path: '/admin/supabase-migration', label: 'Migration Supabase', icon: <Database className="h-5 w-5" /> },
  ];
};
