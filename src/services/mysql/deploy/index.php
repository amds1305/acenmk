
<?php
/**
 * Page d'accueil pour le déploiement MySQL API
 */

// Activer l'affichage des erreurs
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Fonction de journalisation pour débogage
function debug_log($message) {
    file_put_contents('debug.log', date('[Y-m-d H:i:s] ') . $message . "\n", FILE_APPEND);
}

debug_log('Script index.php démarré');

// Vérifier si l'extension MySQLi est disponible
if (!extension_loaded('mysqli')) {
    echo '<h1>Erreur: Extension MySQLi manquante</h1>';
    echo '<p>L\'extension MySQLi n\'est pas disponible sur ce serveur.</p>';
    echo '<p>Veuillez vérifier votre configuration PHP ou contacter votre hébergeur.</p>';
    echo '<p><a href="mysqli_check.php">Vérifier les extensions PHP disponibles</a></p>';
    debug_log('Extension MySQLi non disponible');
    exit;
}

// Rediriger vers le script d'installation
debug_log('Redirection vers install.php');
header('Location: install.php');
exit;
