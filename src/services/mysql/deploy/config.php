
<?php
/**
 * Configuration de la connexion à la base de données
 * Modifiez ces valeurs selon vos informations de connexion MySQL OVH
 */

// Activer l'affichage des erreurs pour le débogage
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Journaliser les erreurs
function custom_error_log($message) {
    error_log('[ACENUMERIK API] ' . $message);
}

// Informations de connexion MySQL - À MODIFIER
define('DB_HOST', 'mysql-votre-nom.alwaysdata.net');  // Remplacez par votre serveur MySQL réel
define('DB_USER', 'votre_utilisateur_reel');          // Remplacez par votre nom d'utilisateur réel
define('DB_PASS', 'votre_mot_de_passe_reel');         // Remplacez par votre mot de passe réel 
define('DB_NAME', 'votre_base_de_donnees_reelle');    // Remplacez par le nom de votre base de données réelle

// Configuration CORS pour permettre l'accès depuis n'importe quelle origine
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, Accept');
header('Access-Control-Max-Age: 86400'); // 24 heures de cache pour les requêtes préflight
header('Vary: Origin'); // Important pour la mise en cache correcte des réponses CORS

// Pour les requêtes JSON
if (strpos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== false || 
    isset($_GET['test']) && $_GET['test'] === 'json') {
    header('Content-Type: application/json; charset=UTF-8');
}

// Répondre directement aux requêtes OPTIONS (requêtes préliminaires CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Envoyer 200 OK sans contenu pour les requêtes OPTIONS
    header('HTTP/1.1 200 OK');
    exit(0);
}

// Établir la connexion à la base de données
function connectDB() {
    try {
        custom_error_log('Tentative de connexion à la base de données...');
        $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
        
        if ($conn->connect_error) {
            custom_error_log('Erreur de connexion: ' . $conn->connect_error);
            if (isset($_GET['test'])) {
                if ($_GET['test'] === 'json') {
                    echo json_encode(['error' => 'Connection failed: ' . $conn->connect_error]);
                } else {
                    // Format HTML
                    echo '<p style="color:red;font-weight:bold;">❌ Erreur de connexion: ' . htmlspecialchars($conn->connect_error) . '</p>';
                }
                exit;
            }
            die(json_encode(['error' => 'Connection failed: ' . $conn->connect_error]));
        }
        
        custom_error_log('Connexion à la base de données réussie');
        
        // PHP 5.4 ne supporte pas set_charset avec utf8mb4
        // Utilisons set_charset avec utf8 à la place
        $conn->set_charset('utf8');
        
        return $conn;
    } catch (Exception $e) {
        custom_error_log('Exception lors de la connexion: ' . $e->getMessage());
        if (isset($_GET['test'])) {
            if ($_GET['test'] === 'json') {
                echo json_encode(['error' => 'Exception: ' . $e->getMessage()]);
            } else {
                // Format HTML
                echo '<p style="color:red;font-weight:bold;">❌ Exception: ' . htmlspecialchars($e->getMessage()) . '</p>';
            }
            exit;
        }
        die(json_encode(['error' => 'Exception: ' . $e->getMessage()]));
    }
}

/**
 * FONCTION DE DÉBOGAGE
 * Cette fonction permet de tester la connexion à la base de données
 * et d'afficher les informations de configuration
 */

if (isset($_GET['test'])) {
    try {
        if ($_GET['test'] === 'json') {
            // Tester uniquement la réponse en format JSON
            // Vérifier que la connexion fonctionne
            $conn = connectDB();
            $conn->close();
            
            echo json_encode([
                'status' => 'ok',
                'message' => 'API configuration valide',
                'php_version' => phpversion(),
                'timestamp' => date('Y-m-d H:i:s')
            ]);
            exit;
        }
        
        // Format HTML pour affichage en navigateur
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
        
        echo '<h2>Test d\'un appel API</h2>';
        echo '<p><a href="?test=json">Tester la réponse JSON</a></p>';
        
    } catch (Exception $e) {
        echo '<h1>Erreur lors du test</h1>';
        echo '<p style="color:red;font-weight:bold;">' . htmlspecialchars($e->getMessage()) . '</p>';
    }
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
