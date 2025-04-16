
<?php
// Force le Content-Type pour l'affichage HTML
header('Content-Type: text/html; charset=UTF-8');

echo "<!DOCTYPE html>";
echo "<html><head><title>Test PHP de base</title></head><body>";
echo "<h1>Test PHP très simple</h1>";
echo "<p>Si vous voyez ce message, PHP fonctionne.</p>";
echo "<p>Date serveur: " . date('Y-m-d H:i:s') . "</p>";
echo "</body></html>";
?>
