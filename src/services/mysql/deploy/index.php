
<?php
/**
 * Page d'accueil pour le déploiement MySQL API
 */

// Activer l'affichage des erreurs
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Rediriger vers le script d'installation
header('Location: install.php');
exit;
