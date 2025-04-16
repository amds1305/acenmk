
<?php
/**
 * Script de débogage pour l'installation
 * Utilisez ce script pour diagnostiquer les problèmes d'installation
 */

echo '<h1>Diagnostic d\'installation</h1>';

// 1. Vérifier les paramètres PHP
echo '<h2>1. Configuration PHP</h2>';
echo '<p>Version PHP: ' . phpversion() . '</p>';
echo '<p>Affichage des erreurs: ' . (ini_get('display_errors') ? 'Activé' : 'Désactivé') . '</p>';
echo '<p>Extensions requises:</p>';
echo '<ul>';
echo '<li>MySQLi: ' . (extension_loaded('mysqli') ? '✓' : '✗ MANQUANTE') . '</li>';
echo '<li>JSON: ' . (extension_loaded('json') ? '✓' : '✗ MANQUANTE') . '</li>';
echo '</ul>';

// 2. Vérifier les fichiers requis
echo '<h2>2. Vérification des fichiers</h2>';
$required_files = ['config.php', 'install.php', 'sections.php', 'section-data.php'];
echo '<ul>';
foreach ($required_files as $file) {
    echo '<li>' . $file . ': ' . (file_exists($file) ? '✓' : '✗ MANQUANT') . '</li>';
}
echo '</ul>';

// 3. Tester la connexion à la base de données
echo '<h2>3. Test de connexion à la base de données</h2>';
require_once 'config.php';

try {
    $conn = connectDB();
    echo '<p style="color:green;font-weight:bold;">✅ Connexion réussie à la base de données!</p>';
    
    // 4. Vérifier les permissions MySQL
    echo '<h2>4. Vérification des permissions MySQL</h2>';
    
    // Test CREATE TABLE
    $test_result = $conn->query("CREATE TABLE IF NOT EXISTS _test_permissions (id INT)");
    echo '<p>Permission CREATE TABLE: ' . ($test_result ? '✓' : '✗ MANQUANTE') . '</p>';
    
    // Test INSERT
    $test_result = $conn->query("INSERT INTO _test_permissions (id) VALUES (1)");
    echo '<p>Permission INSERT: ' . ($test_result ? '✓' : '✗ MANQUANTE') . '</p>';
    
    // Test DROP TABLE
    $test_result = $conn->query("DROP TABLE _test_permissions");
    echo '<p>Permission DROP TABLE: ' . ($test_result ? '✓' : '✗ MANQUANTE') . '</p>';
    
    // 5. Vérifier si les tables existent déjà
    echo '<h2>5. Tables existantes</h2>';
    $existing_tables = tablesExist($conn);
    
    if (count($existing_tables) > 0) {
        echo '<p>Les tables suivantes existent déjà:</p>';
        echo '<ul>';
        foreach ($existing_tables as $table) {
            echo '<li>' . $table . '</li>';
        }
        echo '</ul>';
        echo '<p>L\'installation a peut-être déjà été effectuée.</p>';
    } else {
        echo '<p>Aucune table d\'installation n\'existe actuellement.</p>';
    }
    
    $conn->close();
} catch (Exception $e) {
    echo '<p style="color:red;font-weight:bold;">❌ Erreur de connexion: ' . htmlspecialchars($e->getMessage()) . '</p>';
    echo '<p>Vérifiez les informations de connexion dans config.php:</p>';
    echo '<ul>';
    echo '<li>Serveur MySQL: ' . htmlspecialchars(DB_HOST) . '</li>';
    echo '<li>Utilisateur: ' . htmlspecialchars(DB_USER) . '</li>';
    echo '<li>Base de données: ' . htmlspecialchars(DB_NAME) . '</li>';
    echo '</ul>';
}

echo '<h2>Actions:</h2>';
echo '<ol>';
echo '<li><a href="config.php?test=1">Tester la connexion</a></li>';
echo '<li><a href="install.php">Exécuter l\'installation</a></li>';
echo '</ol>';

echo '<h2>Messages d\'erreurs PHP:</h2>';
echo '<pre>';
echo 'Si vous voyez cette ligne, PHP fonctionne correctement.';
echo '</pre>';
