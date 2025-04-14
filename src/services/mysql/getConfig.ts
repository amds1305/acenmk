
import { HomepageConfig } from '@/types/sections';
import { loadFromStorage } from '@/services/sections/storageService';

/**
 * Récupère la configuration de la page d'accueil
 * Cette fonction tente d'abord de récupérer les données depuis l'API,
 * puis se rabat sur localStorage en cas d'échec
 */
export const getHomepageConfig = async (): Promise<HomepageConfig> => {
  try {
    // En développement ou déploiement initial, utilisez les données du localStorage
    // Nous retournons immédiatement les données du localStorage sans tenter l'appel API
    // qui échoue sur votre environnement actuel
    return loadFromStorage();
    
    /* 
    // Ce code est commenté pour éviter les erreurs de fetch
    // À décommenter une fois l'API configurée sur votre serveur
    
    // URL de l'API (à configurer selon votre environnement)
    const apiUrl = '/api/sections.php';
    console.log('Tentative de récupération des données depuis:', apiUrl);
    
    // Tentative de récupération des données depuis l'API
    const response = await fetch(apiUrl);
    
    // Vérifier si la réponse est valide
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    // Convertir la réponse en JSON
    const data = await response.json();
    return data;
    */
  } catch (error) {
    // En cas d'erreur, utiliser les données du localStorage
    console.error('Erreur lors de la récupération de la configuration:', error);
    return loadFromStorage();
  }
};
