
<?php
/**
 * Configuration de la connexion à la base de données
 * Modifiez ces valeurs selon vos informations de connexion MySQL OVH
 */

// Activer l'affichage des erreurs pour le débogage (dans le script directement)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Force l'encodage UTF-8 pour les sorties
header('Content-Type: text/html; charset=UTF-8');

// Informations de connexion MySQL - À MODIFIER
define('DB_HOST', 'mysql-monsite.alwaysdata.net');  // Remplacez par votre serveur MySQL réel
define('DB_USER', 'monsite');                       // Remplacez par votre nom d'utilisateur réel
define('DB_PASS', 'votre_mot_de_passe');            // Remplacez par votre mot de passe réel 
define('DB_NAME', 'monsite_db');                    // Remplacez par le nom de votre base de données réelle

// Configuration CORS pour permettre l'accès depuis n'importe quelle origine
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Répondre directement aux requêtes OPTIONS (requêtes préliminaires CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Fonction de journalisation des erreurs
function logError($message) {
    $logFile = __DIR__ . '/error.log';
    $formattedMessage = date('[Y-m-d H:i:s]') . ' ' . $message . "\n";
    error_log($formattedMessage, 3, $logFile);
}

// Établir la connexion à la base de données
function connectDB() {
    try {
        $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
        
        if ($conn->connect_error) {
            logError('Connection failed: ' . $conn->connect_error);
            die(json_encode(['error' => 'Connection failed: ' . $conn->connect_error]));
        }
        
        $conn->set_charset('utf8mb4');
        return $conn;
    } catch (Exception $e) {
        logError('Exception during connection: ' . $e->getMessage());
        die(json_encode(['error' => 'Exception during connection: ' . $e->getMessage()]));
    }
}

/**
 * FONCTION DE DÉBOGAGE
 * Cette fonction permet de tester la connexion à la base de données
 * et d'afficher les informations de configuration
 */

if (isset($_GET['test'])) {
    // Force le Content-Type HTML pour l'affichage
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
        if ($result && $result->num_rows > 0) {
            $existingTables[] = $table;
        }
    }
    
    return $existingTables;
}
