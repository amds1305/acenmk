
import { RouteMetadata } from './types';

export const PUBLIC_ROUTES: Record<string, RouteMetadata> = {
  "/": {
    path: "/",
    title: "Accueil",
    description: "Page d'accueil du site web",
    icon: "home",
    showInNav: true,
    order: 1
  },
  "/a-propos": {
    path: "/a-propos",
    title: "À propos",
    description: "En savoir plus sur notre entreprise",
    icon: "info",
    showInNav: true,
    order: 2
  },
  "/about": {
    path: "/about",
    title: "À propos",
    description: "En savoir plus sur notre entreprise",
    icon: "info",
    showInNav: false,
    order: 2
  },
  "/services": {
    path: "/services",
    title: "Services",
    description: "Découvrez nos services",
    icon: "settings",
    showInNav: true,
    order: 3
  },
  "/portfolio": {
    path: "/portfolio",
    title: "Portfolio",
    description: "Nos réalisations",
    icon: "briefcase",
    showInNav: true,
    order: 4
  },
  "/projets": {
    path: "/projets",
    title: "Projets",
    description: "Nos réalisations",
    icon: "briefcase",
    showInNav: true,
    order: 4
  },
  "/contact": {
    path: "/contact",
    title: "Contact",
    description: "Nous contacter",
    icon: "mail",
    showInNav: true,
    order: 99
  },
  "/register": {
    path: "/register",
    title: "Inscription",
    description: "Créer un nouveau compte",
    icon: "user-plus",
    showInNav: false,
    order: 100
  },
  "/login": {
    path: "/login",
    title: "Connexion",
    description: "Se connecter à votre compte",
    icon: "log-in",
    showInNav: false,
    order: 101
  },
  "/profile": {
    path: "/profile",
    title: "Profil",
    description: "Gérer votre profil",
    icon: "user",
    showInNav: false,
    order: 102
  },
  "/reset-password": {
    path: "/reset-password",
    title: "Réinitialiser le mot de passe",
    description: "Réinitialiser votre mot de passe",
    icon: "lock",
    showInNav: false,
    order: 103
  },
  "/ace-job": {
    path: "/ace-job",
    title: "AceJob",
    description: "Module de gestion des candidatures et CVs",
    icon: "graduation-cap",
    showInNav: false,
    order: 50
  },
};
