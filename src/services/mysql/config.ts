
import { HomepageConfig } from '@/types/sections';
import { loadFromStorage } from '../sections/storageService';

/**
 * Récupère l'URL de l'API MySQL à partir de la variable d'environnement
 * ou du localStorage si elle a été configurée manuellement
 */
export const getApiUrl = (): string | null => {
  // Vérifier d'abord la variable d'environnement
  const envApiUrl = import.meta.env.VITE_MYSQL_API_URL;
  if (envApiUrl) {
    return envApiUrl;
  }
  
  // Sinon, vérifier le localStorage pour une configuration manuelle
  const storedApiUrl = localStorage.getItem('mysqlApiUrl');
  return storedApiUrl;
};

/**
 * Définir manuellement l'URL de l'API MySQL dans le localStorage
 * Utile lorsque les variables d'environnement ne sont pas accessibles
 */
export const setApiUrl = (url: string): void => {
  localStorage.setItem('mysqlApiUrl', url);
};

/**
 * Récupère la configuration depuis le localStorage
 */
export const getFromLocalStorage = (): HomepageConfig => {
  return loadFromStorage();
};
