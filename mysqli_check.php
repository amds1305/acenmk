
<?php
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

echo "</body></html>";
?>
