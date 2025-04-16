
<?php
// Activer l'affichage des erreurs
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Vérification de l'extension MySQLi
echo "<!DOCTYPE html>";
echo "<html><head><title>MySQLi Extension Check</title>";
echo "<style>body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }</style>";
echo "</head><body>";
echo "<h1>MySQLi Extension Check</h1>";

// Vérification de l'extension chargée
if (extension_loaded('mysqli')) {
    echo "<h2 style='color: green;'>✅ MySQLi Extension est activée</h2>";
    
    // Informations supplémentaires
    echo "<h3>Détails de l'extension :</h3>";
    echo "<ul>";
    echo "<li><strong>Version :</strong> " . mysqli_get_client_info() . "</li>";
    echo "<li><strong>Version cliente :</strong> " . mysqli_get_client_version() . "</li>";
    echo "</ul>";
} else {
    echo "<h2 style='color: red;'>❌ MySQLi Extension n'est PAS activée</h2>";
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

echo "</body></html>";
?>
