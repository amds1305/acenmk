
import { HomepageConfig, Section, SectionData } from '@/types/sections';
import { getApiUrl } from './config';

/**
 * Sauvegarde la configuration complète vers l'API MySQL
 * @param config Configuration à sauvegarder
 * @returns Promise<boolean> true en cas de succès, false en cas d'échec
 */
export const saveHomepageConfig = async (config: HomepageConfig): Promise<boolean> => {
  try {
    const apiUrl = getApiUrl();
    if (!apiUrl) {
      console.error('URL de l\'API MySQL non configurée');
      return false;
    }
    
    console.log(`Sauvegarde des données vers l'API MySQL: ${apiUrl}`);
    let success = true;
    
    // 1. Sauvegarder les sections
    try {
      const sectionsResponse = await fetch(`${apiUrl}/sections.php`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config.sections)
      });
      
      const sectionsResult = await sectionsResponse.json();
      if (!sectionsResult.success) {
        console.error('Erreur lors de la sauvegarde des sections:', sectionsResult.message || 'Erreur inconnue');
        success = false;
      }
    } catch (error) {
      console.error('Erreur lors de l\'appel à sections.php:', error);
      success = false;
    }
    
    // 2. Sauvegarder les données des sections
    try {
      const sectionDataResponse = await fetch(`${apiUrl}/section-data.php`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config.sectionData)
      });
      
      const sectionDataResult = await sectionDataResponse.json();
      if (!sectionDataResult.success) {
        console.error('Erreur lors de la sauvegarde des données de sections:', sectionDataResult.message || 'Erreur inconnue');
        success = false;
      }
    } catch (error) {
      console.error('Erreur lors de l\'appel à section-data.php:', error);
      success = false;
    }
    
    // 3. Sauvegarder la configuration du template
    if (config.templateConfig) {
      try {
        const templateConfigResponse = await fetch(`${apiUrl}/template-config.php`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(config.templateConfig)
        });
        
        const templateConfigResult = await templateConfigResponse.json();
        if (!templateConfigResult.success) {
          console.error('Erreur lors de la sauvegarde de la configuration du template:', templateConfigResult.message || 'Erreur inconnue');
          success = false;
        }
      } catch (error) {
        console.error('Erreur lors de l\'appel à template-config.php:', error);
        success = false;
      }
    }
    
    // 4. Sauvegarder les clients en vedette si présents
    if (config.sectionData['trusted-clients']) {
      try {
        const trustedClientsResponse = await fetch(`${apiUrl}/trusted-clients.php`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(config.sectionData['trusted-clients'].clients || [])
        });
        
        const trustedClientsResult = await trustedClientsResponse.json();
        if (!trustedClientsResult.success) {
          console.error('Erreur lors de la sauvegarde des clients en vedette:', trustedClientsResult.message || 'Erreur inconnue');
          success = false;
        }
      } catch (error) {
        console.error('Erreur lors de l\'appel à trusted-clients.php:', error);
        success = false;
      }
    }
    
    return success;
  } catch (error) {
    console.error('Erreur générale lors de la sauvegarde de la configuration:', error);
    return false;
  }
};
