
<?php
/**
 * Configuration de la connexion à la base de données
 * Modifiez ces valeurs selon vos informations de connexion MySQL OVH
 */

// Informations de connexion MySQL - À MODIFIER
define('DB_HOST', 'votre-serveur-mysql.mysql.db');  // Exemple: cl1-012.mysql.db
define('DB_USER', 'votre_utilisateur');
define('DB_PASS', 'votre_mot_de_passe');
define('DB_NAME', 'votre_base_de_donnees');

// Configuration CORS pour permettre l'accès depuis n'importe quelle origine
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=UTF-8');

// Répondre directement aux requêtes OPTIONS (requêtes préliminaires CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Établir la connexion à la base de données
function connectDB() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    
    if ($conn->connect_error) {
        die(json_encode(['error' => 'Connection failed: ' . $conn->connect_error]));
    }
    
    $conn->set_charset('utf8mb4');
    return $conn;
}

/**
 * FONCTION DE DÉBOGAGE
 * Cette fonction permet de tester la connexion à la base de données
 * et d'afficher les informations de configuration
 */

if (isset($_GET['test'])) {
    header('Content-Type: text/html; charset=UTF-8');
    echo '<h1>Test de connexion MySQL</h1>';
    
    try {
        $conn = connectDB();
        echo '<p style="color:green;font-weight:bold;">✅ Connexion réussie à la base de données!</p>';
        echo '<p>Serveur MySQL: ' . htmlspecialchars(DB_HOST) . '</p>';
        echo '<p>Utilisateur: ' . htmlspecialchars(DB_USER) . '</p>';
        echo '<p>Base de données: ' . htmlspecialchars(DB_NAME) . '</p>';
        $conn->close();
    } catch (Exception $e) {
        echo '<p style="color:red;font-weight:bold;">❌ Erreur de connexion: ' . htmlspecialchars($e->getMessage()) . '</p>';
    }
    
    echo '<h2>Informations PHP</h2>';
    echo '<p>Version PHP: ' . phpversion() . '</p>';
    echo '<p>Extensions:</p><ul>';
    echo '<li>MySQLi: ' . (extension_loaded('mysqli') ? '✓' : '✗') . '</li>';
    echo '<li>JSON: ' . (extension_loaded('json') ? '✓' : '✗') . '</li>';
    echo '</ul>';
    
    exit;
}

// Fonction pour vérifier si des tables existent déjà
function tablesExist($conn) {
    $tables = ['sections', 'section_data', 'trusted_clients', 'template_config'];
    $existingTables = [];
    
    foreach ($tables as $table) {
        $result = $conn->query("SHOW TABLES LIKE '$table'");
        if ($result->num_rows > 0) {
            $existingTables[] = $table;
        }
    }
    
    return $existingTables;
}
