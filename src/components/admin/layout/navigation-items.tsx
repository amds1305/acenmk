
import React from 'react';
import {
  Home,
  Settings,
  Users,
  FileQuestion,
  MessageSquare,
  Layout,
  Award,
  LayoutTemplate,
  BookOpen,
  CreditCard,
  AlignJustify,
  HelpCircle,
  Building2,
  Newspaper,
  GraduationCap,
  TrendingUp,
  ShieldCheck,
  Paperclip,
  UserSquare,
  Database
} from 'lucide-react';

export const getNavItems = () => [
  {
    path: '/admin',
    label: 'Dashboard',
    icon: <Home className="h-5 w-5" />,
  },
  {
    path: '/admin/home',
    label: 'Accueil',
    icon: <LayoutTemplate className="h-5 w-5" />,
  },
  {
    path: '/admin/hero',
    label: 'Hero',
    icon: <Layout className="h-5 w-5" />,
  },
  {
    path: '/admin/header',
    label: 'En-tête',
    icon: <AlignJustify className="h-5 w-5" />,
  },
  {
    path: '/admin/about',
    label: 'À propos',
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    path: '/admin/services',
    label: 'Services',
    icon: <Award className="h-5 w-5" />,
  },
  {
    path: '/admin/team',
    label: 'Équipe',
    icon: <Users className="h-5 w-5" />,
  },
  {
    path: '/admin/testimonials',
    label: 'Témoignages',
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    path: '/admin/faq',
    label: 'FAQ',
    icon: <HelpCircle className="h-5 w-5" />,
  },
  {
    path: '/admin/trusted-clients',
    label: 'Clients',
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    path: '/admin/ace-job',
    label: 'AceJob',
    icon: <GraduationCap className="h-5 w-5" />,
  },
  {
    path: '/admin/contact',
    label: 'Contacts',
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    path: '/admin/leads',
    label: 'Leads',
    icon: <TrendingUp className="h-5 w-5" />,
  },
  {
    divider: true,
  },
  {
    path: '/admin/users',
    label: 'Utilisateurs',
    icon: <UserSquare className="h-5 w-5" />,
  },
  {
    path: '/admin/roles',
    label: 'Rôles & Permissions',
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    path: '/admin/external-links',
    label: 'Liens externes',
    icon: <Paperclip className="h-5 w-5" />,
  },
  {
    path: '/admin/footer',
    label: 'Pied de page',
    icon: <Newspaper className="h-5 w-5" />,
  },
  {
    path: '/admin/migration',
    label: 'Migration DB',
    icon: <Database className="h-5 w-5" />,
  },
];
