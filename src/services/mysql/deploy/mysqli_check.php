
<?php
// Activer l'affichage des erreurs
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Force la sortie HTML
header('Content-Type: text/html; charset=UTF-8');

// Fonction de journalisation pour débogage
function debug_log($message) {
    file_put_contents('debug.log', date('[Y-m-d H:i:s] ') . $message . "\n", FILE_APPEND);
}

debug_log('Script mysqli_check.php démarré');

// Vérification de l'extension MySQLi
echo "<!DOCTYPE html>";
echo "<html><head><title>MySQLi Extension Check</title>";
echo "<style>body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }</style>";
echo "</head><body>";
echo "<h1>MySQLi Extension Check</h1>";

// Vérifier si PHP est correctement configuré
echo "<h2>Test d'exécution PHP</h2>";
echo "<p>Si vous voyez cette ligne, PHP s'exécute correctement.</p>";

// Vérification de l'extension chargée
echo "<h2>Vérification de l'extension MySQLi</h2>";
if (extension_loaded('mysqli')) {
    echo "<h3 style='color: green;'>✅ MySQLi Extension est activée</h3>";
    
    // Informations supplémentaires
    echo "<h3>Détails de l'extension :</h3>";
    echo "<ul>";
    echo "<li><strong>Version :</strong> " . mysqli_get_client_info() . "</li>";
    echo "<li><strong>Version cliente :</strong> " . mysqli_get_client_version() . "</li>";
    echo "</ul>";
} else {
    echo "<h3 style='color: red;'>❌ MySQLi Extension n'est PAS activée</h3>";
    echo "<p>Contactez votre hébergeur pour activer l'extension MySQLi.</p>";
}

// Afficher les extensions PHP chargées
echo "<h3>Extensions PHP chargées :</h3>";
echo "<pre>";
print_r(get_loaded_extensions());
echo "</pre>";

// Afficher les informations PHP détaillées
echo "<h3>Configuration PHP:</h3>";
echo "<p>Version PHP: " . phpversion() . "</p>";
echo "<p>Interface SAPI: " . php_sapi_name() . "</p>";

// Vérifier les configurations importantes
echo "<h3>Configurations importantes:</h3>";
echo "<ul>";
echo "<li>display_errors: " . ini_get('display_errors') . "</li>";
echo "<li>error_reporting: " . ini_get('error_reporting') . "</li>";
echo "<li>max_execution_time: " . ini_get('max_execution_time') . "</li>";
echo "<li>memory_limit: " . ini_get('memory_limit') . "</li>";
echo "<li>post_max_size: " . ini_get('post_max_size') . "</li>";
echo "<li>upload_max_filesize: " . ini_get('upload_max_filesize') . "</li>";
echo "<li>allow_url_fopen: " . (ini_get('allow_url_fopen') ? 'Activé' : 'Désactivé') . "</li>";
echo "</ul>";

// Tester si un fichier .htaccess est pris en compte
echo "<h3>Test de prise en charge .htaccess:</h3>";
echo "<p>Si vous voyez cette section, le script PHP s'exécute. Cela ne garantit pas que .htaccess est correctement interprété.</p>";

// Informations sur le serveur
echo "<h3>Informations sur le serveur:</h3>";
echo "<ul>";
echo "<li>SERVER_SOFTWARE: " . $_SERVER['SERVER_SOFTWARE'] . "</li>";
echo "<li>DOCUMENT_ROOT: " . $_SERVER['DOCUMENT_ROOT'] . "</li>";
echo "<li>SCRIPT_FILENAME: " . $_SERVER['SCRIPT_FILENAME'] . "</li>";
echo "</ul>";

debug_log('Script mysqli_check.php terminé');
echo "</body></html>";
?>
