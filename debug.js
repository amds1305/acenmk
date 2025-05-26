
// Script de débogage avancé pour identifier les problèmes de chargement
console.log('🔎 Debug script is loading...');

// Fonction pour afficher un message d'erreur visible sur la page
function showVisibleError(message, isJson = false) {
  const errorDiv = document.createElement('div');
  errorDiv.style.position = 'fixed';
  errorDiv.style.top = '0';
  errorDiv.style.left = '0';
  errorDiv.style.right = '0';
  errorDiv.style.backgroundColor = '#ffcccc';
  errorDiv.style.color = '#990000';
  errorDiv.style.padding = '20px';
  errorDiv.style.zIndex = '9999';
  errorDiv.style.maxHeight = '90vh';
  errorDiv.style.overflow = 'auto';
  
  if (isJson) {
    try {
      const formatted = JSON.stringify(JSON.parse(message), null, 2);
      errorDiv.innerHTML = `<pre style="white-space: pre-wrap;">${formatted}</pre>`;
    } catch {
      errorDiv.innerHTML = message;
    }
  } else {
    errorDiv.innerHTML = message;
  }
  
  document.body.appendChild(errorDiv);
  console.error(message);
}

// Vérifier les MIME types des scripts
function checkScriptMimeTypes() {
  const scripts = Array.from(document.querySelectorAll('script'));
  let hasMimeTypeIssues = false;
  
  scripts.forEach(script => {
    if (script.src) {
      fetch(script.src, { method: 'HEAD' })
        .then(response => {
          const contentType = response.headers.get('content-type');
          console.log(`Script ${script.src} has Content-Type: ${contentType}`);
          
          if (script.type === 'module' && !contentType?.includes('javascript')) {
            console.error(`⚠️ MIME Type mismatch: ${script.src} has Content-Type ${contentType} but is loaded as a module`);
            hasMimeTypeIssues = true;
          }
        })
        .catch(err => {
          console.error(`Failed to check MIME type for ${script.src}:`, err);
        });
    }
  });
  
  return hasMimeTypeIssues;
}

// Vérifier si le script s'exécute correctement
window.addEventListener('DOMContentLoaded', () => {
  console.log('✅ Debug script loaded successfully!');
  
  // Vérification de l'élément root
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    showVisibleError("❌ L'élément #root n'a pas été trouvé dans le document");
  } else {
    console.log('✅ Élément #root trouvé');
    
    // Vérifier si l'élément est vide
    setTimeout(() => {
      if (rootElement.children.length === 0) {
        console.warn('⚠️ L\'élément #root est toujours vide après 2 secondes, l\'application n\'a peut-être pas été rendue');
        
        // Vérifier les problèmes MIME
        const hasMimeTypeIssues = checkScriptMimeTypes();
        
        showVisibleError(`
          <h2>Application non rendue</h2>
          <p>L'application ne s'est pas chargée correctement. Vérifiez la console du navigateur pour plus de détails.</p>
          <p>Vérification des erreurs en cours...</p>
          <hr/>
          <h3>Problèmes détectés:</h3>
          <ul>
            ${hasMimeTypeIssues ? '<li><strong>MIME Types incorrects</strong>: Votre serveur envoie les fichiers JavaScript/TypeScript avec un mauvais type MIME</li>' : ''}
            <li>Script principal non chargé correctement</li>
            <li>Erreur de syntaxe JavaScript possible</li>
          </ul>
          <p>Actions possibles:</p>
          <ul>
            <li>Vérifier la configuration de votre serveur (.htaccess, MIME types dans Apache/Nginx)</li>
            <li>Vérifier la syntaxe du fichier main.tsx</li>
            <li>Vérifier que tous les scripts sont correctement servis</li>
          </ul>
          <button onclick="window.location.href='/fallback.html'" style="padding: 8px 16px; background: #0066cc; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Aller à la page de secours
          </button>
        `);

        // Test de chargement de script manuel
        const scriptTest = document.createElement('script');
        scriptTest.type = 'text/javascript';
        scriptTest.text = `console.log("✅ Test de script JavaScript direct réussi");`;
        document.head.appendChild(scriptTest);
        
        // Test manuel de récupération du fichier main.tsx pour diagnostic
        fetch('/src/main.tsx')
          .then(response => {
            console.log("Headers de réponse pour main.tsx:", response.headers);
            console.log("Type MIME reçu:", response.headers.get('content-type'));
            return response.text();
          })
          .then(text => {
            console.log("✓ Contenu de main.tsx récupéré, analyse en cours...");
            // Recherche de problèmes de syntaxe évidents
            if (text.includes("<!DOCTYPE html>")) {
              showVisibleError(`
                <h3>Problème de MIME Type critique détecté</h3>
                <p>Le serveur renvoie du HTML au lieu de JavaScript/TypeScript pour main.tsx</p>
                <p><strong>Solution:</strong> Modifiez la configuration de votre serveur pour servir les fichiers .tsx avec le type MIME application/javascript</p>
              `);
            }
          })
          .catch(err => {
            console.error("❌ Impossible de charger main.tsx:", err);
          });
      }
    }, 2000);
  }
  
  // Vérification du localStorage
  try {
    localStorage.setItem('debug-test', 'test');
    localStorage.getItem('debug-test');
    localStorage.removeItem('debug-test');
    console.log('✅ localStorage fonctionne correctement');
  } catch (error) {
    console.error('❌ Erreur avec localStorage:', error);
    showVisibleError("Erreur d'accès au localStorage. Les cookies sont-ils activés?");
  }
  
  // Vérification des scripts chargés
  const scripts = document.querySelectorAll('script');
  console.log(`✅ ${scripts.length} scripts sont chargés`);
  
  // On affiche les détails des scripts
  scripts.forEach((script) => {
    const src = script.src || 'inline script';
    const type = script.type || 'no type';
    console.log(`Script: ${src} (type: ${type})`);
    
    // Vérifier la présence du script GPT Engineer
    if (src.includes('gptengineer.js')) {
      console.log('✅ Script Lovable (GPT Engineer) trouvé');
    }
    
    // Vérification simple du script principal
    if (src.includes('main.tsx')) {
      console.log('✓ Script principal trouvé:', src);
      
      // Vérifier si le script est correctement chargé
      const testScript = document.createElement('script');
      testScript.textContent = `console.log("✅ Test de script JavaScript réussi");`;
      document.head.appendChild(testScript);
    }
  });
});

// Gestionnaire d'erreurs pour problèmes de chargement de module
document.addEventListener('error', function(e) {
  const target = e.target;
  if (target.tagName === 'SCRIPT') {
    console.error('📛 Erreur de chargement de script:', e);
    if (target.type === 'module') {
      showVisibleError(`
        <h3>Erreur de chargement de module</h3>
        <p>Le script module "${target.src}" n'a pas pu être chargé.</p>
        <p>Cause probable: Type MIME incorrect. Le serveur doit envoyer application/javascript, mais envoie probablement text/html.</p>
        <p><strong>Solution:</strong> Dans le fichier .htaccess ou la configuration de votre serveur, assurez-vous que les fichiers .js, .mjs, .ts et .tsx sont servis avec le type MIME application/javascript.</p>
      `);
    }
  }
}, true);

// Gestionnaire global des erreurs
window.onerror = function(message, source, lineno, colno, error) {
  console.error('🚨 Erreur globale détectée:', { message, source, lineno, colno, error });
  
  if (source?.includes('main.tsx')) {
    showVisibleError(`
      <h3>Erreur dans le script principal (main.tsx)</h3>
      <p><strong>Message:</strong> ${message}</p>
      <p><strong>Ligne:</strong> ${lineno}, <strong>Colonne:</strong> ${colno}</p>
      <p><strong>Solution:</strong> Vérifiez la syntaxe du fichier main.tsx et assurez-vous qu'il n'y a pas d'erreurs.</p>
    `);
  } else {
    // Message d'erreur plus détaillé
    showVisibleError(`
      <h3>Erreur JavaScript détectée</h3>
      <p><strong>Message:</strong> ${message}</p>
      <p><strong>Source:</strong> ${source}</p>
      <p><strong>Ligne:</strong> ${lineno}, <strong>Colonne:</strong> ${colno}</p>
      <p><strong>Détails:</strong> ${error ? error.stack || error.message : 'Non disponible'}</p>
    `);
  }
  
  return false;
};

// Surveiller les erreurs de récupération
window.addEventListener('unhandledrejection', function(event) {
  console.error('🚨 Promise rejetée non gérée:', event.reason);
  showVisibleError(`
    <h3>Erreur asynchrone non gérée</h3>
    <p>${event.reason}</p>
  `);
});

console.log('🏁 Debug script fully initialized');
