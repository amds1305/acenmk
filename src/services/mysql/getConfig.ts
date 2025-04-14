
import { HomepageConfig } from '@/types/sections';
import { loadFromStorage } from '@/services/sections/storageService';

/**
 * Récupère la configuration de la page d'accueil
 * Cette fonction récupère les données depuis localStorage uniquement
 */
export const getHomepageConfig = async (): Promise<HomepageConfig> => {
  try {
    console.log('Chargement de la configuration depuis localStorage');
    return loadFromStorage();
  } catch (error) {
    console.error('Erreur lors de la récupération de la configuration:', error);
    return loadFromStorage();
  }
};
