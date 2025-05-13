
import { UserRole } from "@/types/auth";

/**
 * Vérifie si un rôle est un rôle administratif
 * @param role Le rôle à vérifier
 * @returns true si le rôle est un rôle administratif, false sinon
 */
export const isAdminRole = (role: UserRole): boolean => {
  return ['admin', 'super_admin', 'business_admin'].includes(role);
};

/**
 * Vérifie si un rôle est un rôle contributeur
 * @param role Le rôle à vérifier
 * @returns true si le rôle est un rôle contributeur, false sinon
 */
export const isContributorRole = (role: UserRole): boolean => {
  return ['contributor', 'manager', 'admin', 'super_admin', 'business_admin'].includes(role);
};

/**
 * Vérifie si un rôle est un rôle client
 * @param role Le rôle à vérifier
 * @returns true si le rôle est un rôle client, false sinon
 */
export const isClientRole = (role: UserRole): boolean => {
  return ['client_standard', 'client_premium'].includes(role);
};

/**
 * Vérifie si un rôle a accès aux modules internes
 * @param role Le rôle à vérifier
 * @returns true si le rôle a accès aux modules internes, false sinon
 */
export const hasModuleAccess = (role: UserRole): boolean => {
  return ['admin', 'super_admin', 'business_admin', 'contributor', 'manager'].includes(role);
};

/**
 * Obtient le niveau d'accès d'un rôle (utile pour les comparaisons)
 * Plus la valeur est élevée, plus le niveau d'accès est important
 * @param role Le rôle à évaluer
 * @returns Le niveau d'accès numérique
 */
export const getRoleAccessLevel = (role: UserRole): number => {
  const accessLevels: Record<UserRole, number> = {
    'visitor': 0,
    'user': 1,
    'client_standard': 2,
    'client_premium': 3,
    'external_provider': 4,
    'contributor': 5,
    'manager': 6,
    'business_admin': 7,
    'admin': 8,
    'super_admin': 9
  };
  
  return accessLevels[role] || 0;
};
