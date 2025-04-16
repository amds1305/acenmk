
<?php
// Script de débogage pour l'API
header('Content-Type: text/html; charset=UTF-8');

// Activer l'affichage des erreurs
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

echo "<h1>Diagnostic de l'API</h1>";

// Vérifier les fichiers essentiels
echo "<h2>Vérification des fichiers</h2>";
$requiredFiles = [
    'index.php', 
    'config.php', 
    'sections.php', 
    'section-data.php', 
    'template-config.php', 
    'install.php'
];

echo "<ul>";
foreach ($requiredFiles as $file) {
    echo "<li>" . $file . ": " . (file_exists(__DIR__ . '/' . $file) ? "✓" : "✗ MANQUANT") . "</li>";
}
echo "</ul>";

// Vérifier la configuration PHP
echo "<h2>Configuration PHP</h2>";
echo "<p>Version PHP: " . phpversion() . "</p>";
echo "<p>Extensions:</p><ul>";
echo "<li>MySQLi: " . (extension_loaded('mysqli') ? "✓" : "✗ MANQUANTE") . "</li>";
echo "<li>JSON: " . (extension_loaded('json') ? "✓" : "✗ MANQUANTE") . "</li>";
echo "</ul>";

// Vérifier l'accès au fichier .htaccess
echo "<h2>Configuration Apache</h2>";
echo "<p>Fichier .htaccess présent: " . (file_exists(__DIR__ . '/.htaccess') ? "✓" : "✗ MANQUANT") . "</p>";
echo "<p>mod_rewrite activé: " . (function_exists('apache_get_modules') && in_array('mod_rewrite', apache_get_modules()) ? "✓" : "inconnu") . "</p>";

// Vérifier les logs d'erreurs
echo "<h2>Logs d'erreurs</h2>";
$logFile = __DIR__ . '/debug.log';
if (file_exists($logFile)) {
    echo "<p>Fichier de log trouvé. Dernières entrées:</p>";
    echo "<pre>";
    $logs = file_get_contents($logFile);
    $logs = explode("\n", $logs);
    $logs = array_slice($logs, -20); // Afficher les 20 dernières lignes
    echo htmlspecialchars(implode("\n", $logs));
    echo "</pre>";
} else {
    echo "<p>Aucun fichier de log trouvé.</p>";
}

// Tests de base de données (si config.php existe)
if (file_exists(__DIR__ . '/config.php')) {
    echo "<h2>Test de connexion à la base de données</h2>";
    
    try {
        require_once __DIR__ . '/config.php';
        $conn = connectDB();
        echo "<p style='color:green;font-weight:bold;'>✅ Connexion réussie à la base de données!</p>";
        $conn->close();
    } catch (Exception $e) {
        echo "<p style='color:red;font-weight:bold;'>❌ Erreur de connexion: " . htmlspecialchars($e->getMessage()) . "</p>";
    }
}

// Afficher les variables PHP pour le débogage
echo "<h2>Variables serveur</h2>";
echo "<pre>";
print_r($_SERVER);
echo "</pre>";
?>
