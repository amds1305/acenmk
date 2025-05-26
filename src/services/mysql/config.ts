
/**
 * Configuration pour l'API MySQL
 */

// URL de base de l'API MySQL
// Si une URL est définie dans le localStorage, elle est utilisée en priorité
export const getApiUrl = (): string => {
  const localStorageUrl = localStorage.getItem('mysqlApiUrl');
  
  // Si l'URL est définie dans le localStorage, l'utiliser
  if (localStorageUrl) {
    return localStorageUrl;
  }
  
  // Déterminer l'URL de l'API en fonction de l'environnement
  const currentUrl = window.location.origin;
  
  // Vérifier si nous sommes sur un domaine de production connu
  if (currentUrl.includes('acenumerik.com') || 
      currentUrl.includes('votre-domaine.fr') || 
      currentUrl.includes('alwaysdata.net')) {
    
    // Sur un serveur de production, l'API est située dans le sous-répertoire /api
    return `${currentUrl}/api`;
  }
  
  // En développement local ou dans un environnement de déploiement non reconnu,
  // utiliser le même hôte que l'application frontend
  return `${currentUrl}/api`;
};

/**
 * Configure l'URL de l'API MySQL
 * @param url - L'URL de l'API MySQL
 */
export const setApiUrl = (url: string): void => {
  if (!url) {
    localStorage.removeItem('mysqlApiUrl');
    console.log('URL de l\'API MySQL supprimée');
    return;
  }
  
  // Normaliser l'URL (supprimer le slash final s'il existe)
  const normalizedUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  localStorage.setItem('mysqlApiUrl', normalizedUrl);
  console.log('URL de l\'API MySQL configurée:', normalizedUrl);
};

/**
 * Teste la connexion à l'API MySQL
 * @returns Promise<boolean> - true si la connexion est établie, false sinon
 */
export const testApiConnection = async (): Promise<boolean> => {
  const apiUrl = getApiUrl();
  
  if (!apiUrl) {
    console.error('URL de l\'API MySQL non configurée');
    return false;
  }
  
  try {
    const timestamp = new Date().getTime();
    const response = await fetch(`${apiUrl}/config.php?test=json&_=${timestamp}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cache-Control': 'no-cache, no-store'
      },
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.error(`Erreur HTTP lors du test de connexion: ${response.status}`);
      return false;
    }
    
    const data = await response.json();
    return data.status === 'ok';
  } catch (error) {
    console.error('Erreur lors du test de connexion à l\'API MySQL:', error);
    return false;
  }
};
