
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

// Configuration CORS pour permettre l'accès depuis votre application
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
