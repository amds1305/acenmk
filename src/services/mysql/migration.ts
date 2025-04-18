
import { HomepageConfig } from '@/types/sections';
import { saveHomepageConfig } from './saveConfig';
import { loadFromStorage } from '../sections/storageService';
import { getApiUrl } from './config';

/**
 * Migre les données du localStorage vers MySQL via l'API
 * @returns {Promise<boolean>} true en cas de succès, false en cas d'échec
 */
export const migrateLocalStorageToSupabase = async (): Promise<boolean> => {
  try {
    console.log('Début de la migration vers MySQL...');
    
    // Vérifier si l'URL de l'API est configurée
    const apiUrl = getApiUrl();
    if (!apiUrl) {
      console.error('URL de l\'API MySQL non configurée. Veuillez configurer l\'URL de l\'API dans les paramètres.');
      return false;
    }
    
    console.log(`URL de l'API configurée: ${apiUrl}`);
    
    // Tester la connexion à l'API avec un timeout
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 secondes timeout
      
      console.log(`Test de connexion à l'API: ${apiUrl}/config.php?test=json`);
      const testResponse = await fetch(`${apiUrl}/config.php?test=json`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        // Ajouter ce paramètre pour éviter les problèmes de cache
        cache: 'no-store'
      });
      
      clearTimeout(timeoutId);
      
      if (!testResponse.ok) {
        console.error(`Impossible de se connecter à l'API MySQL (statut: ${testResponse.status})`);
        console.error('Réponse:', await testResponse.text());
        return false;
      }
      
      // Tester que la réponse est du JSON valide
      try {
        const jsonResponse = await testResponse.json();
        console.log('Réponse de test reçue:', jsonResponse);
      } catch (e) {
        console.error('La réponse du serveur n\'est pas un JSON valide. Vérifiez que le fichier config.php est correctement configuré.');
        console.error('Réponse brute:', await testResponse.text());
        return false;
      }
    } catch (error) {
      console.error('Erreur lors du test de connexion à l\'API MySQL:', error);
      if (error.name === 'AbortError') {
        console.error('La connexion a expiré. Vérifiez que l\'URL de l\'API est correcte et que le serveur répond.');
      }
      return false;
    }
    
    // Récupérer les données du localStorage
    const localConfig: HomepageConfig = loadFromStorage();
    
    // Si aucune donnée n'est disponible, ne rien faire
    if (localConfig.sections.length === 0 && Object.keys(localConfig.sectionData).length === 0) {
      console.log('Aucune donnée trouvée dans localStorage');
      return false;
    }
    
    console.log(`Données à migrer: ${localConfig.sections.length} sections et ${Object.keys(localConfig.sectionData).length} sections de données`);
    
    // Sauvegarder la configuration dans MySQL via l'API
    const success = await saveHomepageConfig(localConfig);
    
    if (success) {
      console.log('Migration vers MySQL réussie');
    } else {
      console.error('Erreur de migration: la sauvegarde a échoué');
    }
    
    return success;
  } catch (error) {
    console.error('Erreur lors de la migration des données vers MySQL:', error);
    return false;
  }
};
