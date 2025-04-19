
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
    let errorMessages = [];
    
    // 1. Sauvegarder les sections
    try {
      const sectionsResponse = await fetch(`${apiUrl}/sections.php`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config.sections)
      });
      
      if (!sectionsResponse.ok) {
        console.error(`Erreur HTTP lors de la sauvegarde des sections: ${sectionsResponse.status}`);
        errorMessages.push(`Erreur HTTP ${sectionsResponse.status} pour sections.php`);
        success = false;
      } else {
        const sectionsResult = await sectionsResponse.json();
        if (!sectionsResult.success) {
          console.error('Erreur lors de la sauvegarde des sections:', sectionsResult.message || 'Erreur inconnue');
          errorMessages.push(sectionsResult.message || 'Erreur de sauvegarde des sections');
          success = false;
        }
      }
    } catch (error) {
      console.error('Erreur lors de l\'appel à sections.php:', error);
      errorMessages.push(`Erreur de connexion à sections.php: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
      success = false;
    }
    
    // 2. Sauvegarder les données des sections
    try {
      // Transformer les données pour l'API
      const sectionDataArray = Object.entries(config.sectionData).map(([section_id, data]) => ({
        section_id,
        data
      }));
      
      const sectionDataResponse = await fetch(`${apiUrl}/section-data.php`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sectionDataArray)
      });
      
      if (!sectionDataResponse.ok) {
        console.error(`Erreur HTTP lors de la sauvegarde des données de sections: ${sectionDataResponse.status}`);
        errorMessages.push(`Erreur HTTP ${sectionDataResponse.status} pour section-data.php`);
        success = false;
      } else {
        const sectionDataResult = await sectionDataResponse.json();
        if (!sectionDataResult.success) {
          console.error('Erreur lors de la sauvegarde des données de sections:', sectionDataResult.message || 'Erreur inconnue');
          errorMessages.push(sectionDataResult.message || 'Erreur de sauvegarde des données de sections');
          success = false;
        }
      }
    } catch (error) {
      console.error('Erreur lors de l\'appel à section-data.php:', error);
      errorMessages.push(`Erreur de connexion à section-data.php: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
      success = false;
    }
    
    // 3. Sauvegarder la configuration du template
    if (config.templateConfig) {
      try {
        console.log('Sauvegarde de la configuration du template:', config.templateConfig);
        const templateConfigResponse = await fetch(`${apiUrl}/template-config.php`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(config.templateConfig)
        });
        
        if (!templateConfigResponse.ok) {
          console.error(`Erreur HTTP lors de la sauvegarde de la configuration du template: ${templateConfigResponse.status}`);
          errorMessages.push(`Erreur HTTP ${templateConfigResponse.status} pour template-config.php`);
          success = false;
        } else {
          const templateConfigResult = await templateConfigResponse.json();
          if (!templateConfigResult.success) {
            console.error('Erreur lors de la sauvegarde de la configuration du template:', templateConfigResult.message || 'Erreur inconnue');
            errorMessages.push(templateConfigResult.message || 'Erreur de sauvegarde de la configuration du template');
            success = false;
          }
        }
      } catch (error) {
        console.error('Erreur lors de l\'appel à template-config.php:', error);
        errorMessages.push(`Erreur de connexion à template-config.php: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
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
        
        if (!trustedClientsResponse.ok) {
          console.error(`Erreur HTTP lors de la sauvegarde des clients en vedette: ${trustedClientsResponse.status}`);
          errorMessages.push(`Erreur HTTP ${trustedClientsResponse.status} pour trusted-clients.php`);
          success = false;
        } else {
          const trustedClientsResult = await trustedClientsResponse.json();
          if (!trustedClientsResult.success) {
            console.error('Erreur lors de la sauvegarde des clients en vedette:', trustedClientsResult.message || 'Erreur inconnue');
            errorMessages.push(trustedClientsResult.message || 'Erreur de sauvegarde des clients en vedette');
            success = false;
          }
        }
      } catch (error) {
        console.error('Erreur lors de l\'appel à trusted-clients.php:', error);
        errorMessages.push(`Erreur de connexion à trusted-clients.php: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
        success = false;
      }
    }
    
    // Journaliser toutes les erreurs
    if (errorMessages.length > 0) {
      console.error('Erreurs lors de la sauvegarde:', errorMessages.join(', '));
    }
    
    return success;
  } catch (error) {
    console.error('Erreur générale lors de la sauvegarde de la configuration:', error);
    return false;
  }
};
