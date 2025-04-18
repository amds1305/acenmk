
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

// Contenu des fichiers PHP pour l'installation
const phpFiles = {
  'install.php': `<?php
require_once 'config.php';

// Vérifier si l'installation a déjà été effectuée
function checkIfInstalled($conn) {
    $result = $conn->query("SHOW TABLES LIKE 'sections'");
    return $result->num_rows > 0;
}

// Créer les tables nécessaires
function createTables($conn) {
    $tables = [
        "CREATE TABLE IF NOT EXISTS sections (
            id VARCHAR(36) PRIMARY KEY,
            type VARCHAR(50) NOT NULL,
            title VARCHAR(255) NOT NULL,
            visible BOOLEAN DEFAULT 1,
            \`order\` INT NOT NULL,
            custom_component VARCHAR(255) NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );",
        
        "CREATE TABLE IF NOT EXISTS section_data (
            id VARCHAR(36) PRIMARY KEY,
            section_id VARCHAR(36) NOT NULL,
            data JSON NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (section_id) REFERENCES sections(id) ON DELETE CASCADE,
            UNIQUE KEY (section_id)
        );",
        
        "CREATE TABLE IF NOT EXISTS trusted_clients (
            id VARCHAR(36) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            logo_url VARCHAR(255) NOT NULL,
            website_url VARCHAR(255) NULL,
            category VARCHAR(100) NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );",
        
        "CREATE TABLE IF NOT EXISTS template_config (
            id VARCHAR(36) PRIMARY KEY,
            active_template VARCHAR(50) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );"
    ];
    
    $success = true;
    $errors = [];
    
    foreach ($tables as $sql) {
        if (!$conn->query($sql)) {
            $success = false;
            $errors[] = $conn->error;
        }
    }
    
    return ['success' => $success, 'errors' => $errors];
}

// Insérer des données par défaut si nécessaire
function insertDefaultData($conn) {
    // Vérifier si la table template_config est vide
    $result = $conn->query("SELECT COUNT(*) as count FROM template_config");
    $row = $result->fetch_assoc();
    
    if ($row['count'] == 0) {
        // Insérer la configuration par défaut
        $id = uniqid();
        $stmt = $conn->prepare("INSERT INTO template_config (id, active_template) VALUES (?, 'default')");
        $stmt->bind_param("s", $id);
        $stmt->execute();
    }
    
    return true;
}

// Exécuter l'installation
function runInstallation() {
    try {
        $conn = connectDB();
        
        // Vérifier si l'installation est déjà faite
        $isInstalled = checkIfInstalled($conn);
        
        if (!$isInstalled) {
            // Créer les tables
            $result = createTables($conn);
            
            if ($result['success']) {
                // Insérer les données par défaut
                insertDefaultData($conn);
                
                return [
                    'success' => true,
                    'message' => 'Installation réussie. Les tables ont été créées avec succès.'
                ];
            } else {
                return [
                    'success' => false,
                    'message' => 'Erreur lors de la création des tables.',
                    'errors' => $result['errors']
                ];
            }
        } else {
            return [
                'success' => true,
                'message' => 'L\\'installation a déjà été effectuée. Les tables existent déjà.'
            ];
        }
    } catch (Exception $e) {
        return [
            'success' => false,
            'message' => 'Une erreur est survenue lors de l\\'installation.',
            'error' => $e->getMessage()
        ];
    }
}

// Format HTML pour la page d'installation
function displayInstallationPage($result) {
    ?>
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Installation de l'API MySQL</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
            }
            .container {
                border: 1px solid #ddd;
                padding: 20px;
                border-radius: 5px;
                margin-top: 20px;
            }
            .success {
                color: #155724;
                background-color: #d4edda;
                border-color: #c3e6cb;
                padding: 15px;
                border-radius: 5px;
            }
            .error {
                color: #721c24;
                background-color: #f8d7da;
                border-color: #f5c6cb;
                padding: 15px;
                border-radius: 5px;
            }
            h1 {
                color: #333;
            }
            code {
                background: #f4f4f4;
                padding: 2px 5px;
                border-radius: 3px;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
            }
            table, th, td {
                border: 1px solid #ddd;
            }
            th, td {
                padding: 10px;
                text-align: left;
            }
            th {
                background-color: #f2f2f2;
            }
        </style>
    </head>
    <body>
        <h1>Installation de l'API MySQL pour OVH</h1>
        
        <div class="container">
            <?php if ($result['success']): ?>
                <div class="success">
                    <strong>✅ <?php echo $result['message']; ?></strong>
                </div>
            <?php else: ?>
                <div class="error">
                    <strong>❌ <?php echo $result['message']; ?></strong>
                    <?php if (isset($result['errors']) && !empty($result['errors'])): ?>
                        <ul>
                            <?php foreach ($result['errors'] as $error): ?>
                                <li><?php echo htmlspecialchars($error); ?></li>
                            <?php endforeach; ?>
                        </ul>
                    <?php endif; ?>
                </div>
            <?php endif; ?>
            
            <h2>Prochaines étapes</h2>
            <?php if ($result['success']): ?>
                <p>Votre API est maintenant prête à être utilisée. Configurez votre application frontend avec l'URL de l'API:</p>
                <code>VITE_MYSQL_API_URL=https://votre-domaine.com/api</code>
                
                <h3>Endpoints API disponibles:</h3>
                <table>
                    <tr>
                        <th>Endpoint</th>
                        <th>Méthode</th>
                        <th>Description</th>
                    </tr>
                    <tr>
                        <td>/sections.php</td>
                        <td>GET</td>
                        <td>Récupérer toutes les sections</td>
                    </tr>
                    <tr>
                        <td>/sections.php</td>
                        <td>PUT</td>
                        <td>Mettre à jour toutes les sections</td>
                    </tr>
                    <tr>
                        <td>/section-data.php</td>
                        <td>GET</td>
                        <td>Récupérer toutes les données des sections</td>
                    </tr>
                    <tr>
                        <td>/section-data.php</td>
                        <td>PUT</td>
                        <td>Mettre à jour toutes les données des sections</td>
                    </tr>
                    <tr>
                        <td>/template-config.php</td>
                        <td>GET</td>
                        <td>Récupérer la configuration du template</td>
                    </tr>
                    <tr>
                        <td>/template-config.php</td>
                        <td>PUT</td>
                        <td>Mettre à jour la configuration du template</td>
                    </tr>
                </table>
                
                <p><strong>Important:</strong> Pour des raisons de sécurité, il est recommandé de supprimer ce fichier d'installation (install.php) après utilisation.</p>
            <?php else: ?>
                <p>Veuillez corriger les erreurs ci-dessus et réessayer l'installation.</p>
                <p>Vérifiez que:</p>
                <ul>
                    <li>Les informations de connexion à la base de données sont correctes dans le fichier config.php</li>
                    <li>L'utilisateur MySQL a les droits suffisants pour créer des tables</li>
                    <li>La version de MySQL supporte les colonnes de type JSON</li>
                </ul>
            <?php endif; ?>
        </div>
        
        <div class="container">
            <h2>Test de connexion</h2>
            <?php 
            try {
                $conn = connectDB();
                echo '<div class="success">✅ La connexion à la base de données fonctionne correctement.</div>';
                $conn->close();
            } catch (Exception $e) {
                echo '<div class="error">❌ Erreur de connexion: ' . htmlspecialchars($e->getMessage()) . '</div>';
            }
            ?>
        </div>
    </body>
    </html>
    <?php
}

// Si c'est une requête API, retourner du JSON
if (isset($_GET['format']) && $_GET['format'] === 'json') {
    $result = runInstallation();
    echo json_encode($result);
} else {
    // Sinon, afficher la page HTML
    $result = runInstallation();
    displayInstallationPage($result);
}
`,
  'config.php': `<?php
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
        
        echo '<h2>Test d\\'un appel API</h2>';
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
}`,
  'sections.php': `<?php
require_once 'config.php';

// Gestion des sections (GET, PUT)
$method = $_SERVER['REQUEST_METHOD'];

// Fonction pour obtenir toutes les sections
function getSections($conn) {
    $stmt = $conn->prepare("SELECT * FROM sections ORDER BY `order`");
    $stmt->execute();
    $result = $stmt->get_result();
    
    $sections = array();
    while ($row = $result->fetch_assoc()) {
        // Convertir le champ 'visible' en booléen
        $row['visible'] = (bool)$row['visible'];
        $row['order'] = (int)$row['order'];
        $sections[] = $row;
    }
    
    return $sections;
}

// Fonction pour mettre à jour toutes les sections
function updateSections($conn, $sections) {
    // Commencer une transaction
    $conn->begin_transaction();
    
    try {
        // Supprimer toutes les sections existantes
        $stmt = $conn->prepare("DELETE FROM sections");
        $stmt->execute();
        
        // Préparer la requête d'insertion
        $stmt = $conn->prepare("INSERT INTO sections (id, type, title, visible, `order`, custom_component, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())");
        
        // Insérer chaque section
        foreach ($sections as $section) {
            $visible = $section['visible'] ? 1 : 0;
            $customComponent = isset($section['customComponent']) ? $section['customComponent'] : null;
            
            $stmt->bind_param("ssssis", 
                $section['id'],
                $section['type'],
                $section['title'],
                $visible,
                $section['order'],
                $customComponent
            );
            
            if (!$stmt->execute()) {
                throw new Exception("Erreur lors de l'insertion de la section {$section['id']}: " . $stmt->error);
            }
        }
        
        // Valider la transaction
        $conn->commit();
        return true;
        
    } catch (Exception $e) {
        // Annuler la transaction en cas d'erreur
        $conn->rollback();
        return array("error" => $e->getMessage());
    }
}

// Traitement de la requête en fonction de la méthode HTTP
switch ($method) {
    case 'GET':
        $conn = connectDB();
        $sections = getSections($conn);
        echo json_encode($sections);
        $conn->close();
        break;
        
    case 'PUT':
        // Obtenir les données JSON de la requête
        $json = file_get_contents('php://input');
        $sections = json_decode($json, true);
        
        if ($sections === null) {
            http_response_code(400);
            echo json_encode(array("error" => "JSON invalide"));
            break;
        }
        
        $conn = connectDB();
        $result = updateSections($conn, $sections);
        
        if ($result === true) {
            echo json_encode(array("success" => true));
        } else {
            http_response_code(500);
            echo json_encode($result);
        }
        
        $conn->close();
        break;
        
    default:
        http_response_code(405);
        echo json_encode(array("error" => "Méthode non autorisée"));
        break;
}`,
  'section-data.php': `<?php
require_once 'config.php';

// Gestion des données de section (GET, PUT)
$method = $_SERVER['REQUEST_METHOD'];

// Fonction pour obtenir toutes les données des sections
function getSectionData($conn) {
    $stmt = $conn->prepare("SELECT * FROM section_data");
    $stmt->execute();
    $result = $stmt->get_result();
    
    $sectionData = array();
    while ($row = $result->fetch_assoc()) {
        // Convertir les données JSON en tableau PHP
        $data = json_decode($row['data'], true);
        
        // Créer un objet avec les informations nécessaires
        $sectionData[] = array(
            'id' => $row['id'],
            'section_id' => $row['section_id'],
            'data' => $data,
            'created_at' => $row['created_at'],
            'updated_at' => $row['updated_at']
        );
    }
    
    return $sectionData;
}

// Fonction pour mettre à jour toutes les données des sections
function updateSectionData($conn, $sectionData) {
    // Commencer une transaction
    $conn->begin_transaction();
    
    try {
        // Supprimer toutes les données de section existantes
        $stmt = $conn->prepare("DELETE FROM section_data");
        $stmt->execute();
        
        // Préparer la requête d'insertion
        $stmt = $conn->prepare("INSERT INTO section_data (id, section_id, data, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())");
        
        // Insérer chaque donnée de section
        foreach ($sectionData as $key => $value) {
            // Générer un ID unique si non fourni
            $id = isset($value['id']) ? $value['id'] : uniqid();
            
            // Le section_id est la clé du tableau
            $sectionId = $key;
            
            // Convertir les données en JSON
            $jsonData = json_encode($value);
            
            $stmt->bind_param("sss", 
                $id,
                $sectionId,
                $jsonData
            );
            
            if (!$stmt->execute()) {
                throw new Exception("Erreur lors de l'insertion des données pour la section {$sectionId}: " . $stmt->error);
            }
        }
        
        // Valider la transaction
        $conn->commit();
        return true;
        
    } catch (Exception $e) {
        // Annuler la transaction en cas d'erreur
        $conn->rollback();
        return array("error" => $e->getMessage());
    }
}

// Traitement de la requête en fonction de la méthode HTTP
switch ($method) {
    case 'GET':
        $conn = connectDB();
        $sectionData = getSectionData($conn);
        echo json_encode($sectionData);
        $conn->close();
        break;
        
    case 'PUT':
        // Obtenir les données JSON de la requête
        $json = file_get_contents('php://input');
        $sectionData = json_decode($json, true);
        
        if ($sectionData === null) {
            http_response_code(400);
            echo json_encode(array("error" => "JSON invalide"));
            break;
        }
        
        $conn = connectDB();
        $result = updateSectionData($conn, $sectionData);
        
        if ($result === true) {
            echo json_encode(array("success" => true));
        } else {
            http_response_code(500);
            echo json_encode($result);
        }
        
        $conn->close();
        break;
        
    default:
        http_response_code(405);
        echo json_encode(array("error" => "Méthode non autorisée"));
        break;
}`,
  'template-config.php': `<?php
require_once 'config.php';

// Gestion de la configuration du template (GET, PUT)
$method = $_SERVER['REQUEST_METHOD'];

// Fonction pour obtenir la configuration du template
function getTemplateConfig($conn) {
    $stmt = $conn->prepare("SELECT * FROM template_config LIMIT 1");
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        return array(
            'id' => $row['id'],
            'activeTemplate' => $row['active_template'],
            'created_at' => $row['created_at'],
            'updated_at' => $row['updated_at']
        );
    } else {
        // Si aucune configuration n'existe, retourner la valeur par défaut
        return array(
            'activeTemplate' => 'default'
        );
    }
}

// Fonction pour mettre à jour la configuration du template
function updateTemplateConfig($conn, $config) {
    // Vérifier si une configuration existe déjà
    $stmt = $conn->prepare("SELECT COUNT(*) as count FROM template_config");
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    
    if ($row['count'] > 0) {
        // Mettre à jour la configuration existante
        $stmt = $conn->prepare("UPDATE template_config SET active_template = ?, updated_at = NOW()");
        $stmt->bind_param("s", $config['activeTemplate']);
    } else {
        // Insérer une nouvelle configuration
        $id = uniqid();
        $stmt = $conn->prepare("INSERT INTO template_config (id, active_template, created_at, updated_at) VALUES (?, ?, NOW(), NOW())");
        $stmt->bind_param("ss", $id, $config['activeTemplate']);
    }
    
    if ($stmt->execute()) {
        return true;
    } else {
        return array("error" => "Erreur lors de la mise à jour de la configuration: " . $stmt->error);
    }
}

// Traitement de la requête en fonction de la méthode HTTP
switch ($method) {
    case 'GET':
        $conn = connectDB();
        $config = getTemplateConfig($conn);
        echo json_encode($config);
        $conn->close();
        break;
        
    case 'PUT':
        // Obtenir les données JSON de la requête
        $json = file_get_contents('php://input');
        $config = json_decode($json, true);
        
        if ($config === null) {
            http_response_code(400);
            echo json_encode(array("error" => "JSON invalide"));
            break;
        }
        
        $conn = connectDB();
        $result = updateTemplateConfig($conn, $config);
        
        if ($result === true) {
            echo json_encode(array("success" => true));
        } else {
            http_response_code(500);
            echo json_encode($result);
        }
        
        $conn->close();
        break;
        
    default:
        http_response_code(405);
        echo json_encode(array("error" => "Méthode non autorisée"));
        break;
}`,
  'trusted-clients.php': `<?php
require_once 'config.php';

// Gestion des clients de confiance (GET, POST, PUT, DELETE)
$method = $_SERVER['REQUEST_METHOD'];

// Fonction pour obtenir tous les clients de confiance
function getTrustedClients($conn) {
    $stmt = $conn->prepare("SELECT * FROM trusted_clients ORDER BY name");
    $stmt->execute();
    $result = $stmt->get_result();
    
    $trustedClients = array();
    while ($row = $result->fetch_assoc()) {
        $trustedClients[] = $row;
    }
    
    return $trustedClients;
}

// Fonction pour ajouter un client de confiance
function addTrustedClient($conn, $client) {
    // Générer un ID unique
    $id = uniqid();
    
    // Préparer la requête d'insertion
    $stmt = $conn->prepare("INSERT INTO trusted_clients (id, name, logo_url, website_url, category, created_at) VALUES (?, ?, ?, ?, ?, NOW())");
    
    $stmt->bind_param("sssss", 
        $id,
        $client['name'],
        $client['logo_url'],
        $client['website_url'],
        $client['category']
    );
    
    if ($stmt->execute()) {
        return array("id" => $id, "success" => true);
    } else {
        return array("error" => "Erreur lors de l'ajout du client: " . $stmt->error);
    }
}

// Fonction pour mettre à jour un client de confiance
function updateTrustedClient($conn, $id, $client) {
    // Préparer la requête de mise à jour
    $stmt = $conn->prepare("UPDATE trusted_clients SET name = ?, logo_url = ?, website_url = ?, category = ? WHERE id = ?");
    
    $stmt->bind_param("sssss", 
        $client['name'],
        $client['logo_url'],
        $client['website_url'],
        $client['category'],
        $id
    );
    
    if ($stmt->execute()) {
        return true;
    } else {
        return array("error" => "Erreur lors de la mise à jour du client: " . $stmt->error);
    }
}

// Fonction pour supprimer un client de confiance
function deleteTrustedClient($conn, $id) {
    // Préparer la requête de suppression
    $stmt = $conn->prepare("DELETE FROM trusted_clients WHERE id = ?");
    $stmt->bind_param("s", $id);
    
    if ($stmt->execute()) {
        return true;
    } else {
        return array("error" => "Erreur lors de la suppression du client: " . $stmt->error);
    }
}

// Traitement de la requête en fonction de la méthode HTTP
switch ($method) {
    case 'GET':
        $conn = connectDB();
        $trustedClients = getTrustedClients($conn);
        echo json_encode($trustedClients);
        $conn->close();
        break;
        
    case 'POST':
        // Obtenir les données JSON de la requête
        $json = file_get_contents('php://input');
        $client = json_decode($json, true);
        
        if ($client === null) {
            http_response_code(400);
            echo json_encode(array("error" => "JSON invalide"));
            break;
        }
        
        $conn = connectDB();
        $result = addTrustedClient($conn, $client);
        
        if (isset($result['success'])) {
            echo json_encode($result);
        } else {
            http_response_code(500);
            echo json_encode($result);
        }
        
        $conn->close();
        break;
        
    case 'PUT':
        // Obtenir l'ID du client à mettre à jour
        $id = isset($_GET['id']) ? $_GET['id'] : null;
        
        if ($id === null) {
            http_response_code(400);
            echo json_encode(array("error" => "ID non spécifié"));
            break;
        }
        
        // Obtenir les données JSON de la requête
        $json = file_get_contents('php://input');
        $client = json_decode($json, true);
        
        if ($client === null) {
            http_response_code(400);
            echo json_encode(array("error" => "JSON invalide"));
            break;
        }
        
        $conn = connectDB();
        $result = updateTrustedClient($conn, $id, $client);
        
        if ($result === true) {
            echo json_encode(array("success" => true));
        } else {
            http_response_code(500);
            echo json_encode($result);
        }
        
        $conn->close();
        break;
        
    case 'DELETE':
        // Obtenir l'ID du client à supprimer
        $id = isset($_GET['id']) ? $_GET['id'] : null;
        
        if ($id === null) {
            http_response_code(400);
            echo json_encode(array("error" => "ID non spécifié"));
            break;
        }
        
        $conn = connectDB();
        $result = deleteTrustedClient($conn, $id);
        
        if ($result === true) {
            echo json_encode(array("success" => true));
        } else {
            http_response_code(500);
            echo json_encode($result);
        }
        
        $conn->close();
        break;
        
    default:
        http_response_code(405);
        echo json_encode(array("error" => "Méthode non autorisée"));
        break;
}`,
  'README.txt': `# API MySQL pour OVH - Package d'installation automatique

Ce package contient tous les fichiers nécessaires pour déployer facilement une API PHP
permettant à votre application de se connecter à une base de données MySQL OVH.

## Instructions rapides:

1. Modifiez le fichier \`config.php\` avec vos informations de connexion MySQL
2. Téléchargez tous les fichiers dans un dossier \`api\` sur votre hébergement OVH
3. Accédez à \`https://votre-domaine.com/api/install.php\` pour installer automatiquement l'API
4. Configurez votre application avec \`VITE_MYSQL_API_URL=https://votre-domaine.com/api\`

## Déploiement complet sur OVH:

1. Connectez-vous à votre hébergement OVH via FTP
2. Pour l'API MySQL:
   - Créez un dossier \`api\` dans la racine de votre espace web
   - Téléchargez uniquement les fichiers PHP du dossier \`src/services/mysql/deploy\` dans ce dossier
   - Configurez \`config.php\` avec vos informations de connexion
   - Testez l'installation en accédant à \`https://votre-domaine.com/api/install.php?test=1\`

3. Pour l'application React:
   - Exécutez \`npm run build\` sur votre machine locale pour générer les fichiers de production
   - Téléchargez tout le contenu du dossier \`dist\` à la racine de votre espace web OVH
   - Créez un fichier \`.htaccess\` à la racine avec le contenu suivant:
   
   \`\`\`
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   \`\`\`

Pour des instructions plus détaillées, consultez \`install-guide.md\`

## Contenu du package:

- \`install.php\` - Script d'installation automatique
- \`config.php\` - Configuration de la base de données
- \`sections.php\` - API pour les sections
- \`section-data.php\` - API pour les données des sections
- \`template-config.php\` - API pour la configuration du template
- \`trusted-clients.php\` - API pour les clients de confiance
- \`install-guide.md\` - Guide d'installation détaillé
- \`README.txt\` - Ce fichier

## Important:

Pour des raisons de sécurité, il est recommandé de supprimer \`install.php\`
après l'installation ou de restreindre son accès.`,
  'install-guide.md': `# Guide d'installation de l'API MySQL pour OVH

Ce package contient tous les fichiers nécessaires pour déployer rapidement une API REST permettant à votre application de se connecter à une base de données MySQL sur OVH.

## Prérequis

- Un hébergement web OVH avec PHP 7.4+ et MySQL
- Les informations de connexion à votre base de données MySQL OVH

## Instructions d'installation

1. **Téléchargez** le fichier ZIP de ce package
2. **Décompressez** le fichier sur votre ordinateur
3. **Modifiez** le fichier \`config.php\` avec vos informations de connexion MySQL
4. **Téléchargez** tous les fichiers dans un dossier \`api\` sur votre hébergement OVH (via FTP)
5. **Exécutez** le script d'installation en accédant à \`https://votre-domaine.com/api/install.php\`

## Structure des fichiers

- \`install.php\` - Script d'installation qui crée automatiquement les tables
- \`config.php\` - Configuration de la connexion à la base de données
- \`sections.php\` - API pour gérer les sections du site
- \`section-data.php\` - API pour gérer les données des sections
- \`template-config.php\` - API pour gérer la configuration du template
- \`trusted-clients.php\` - API pour gérer les clients de confiance

## Configuration de votre application

Une fois l'API déployée, configurez votre application frontend avec:

\`\`\`
VITE_MYSQL_API_URL=https://votre-domaine.com/api
\`\`\``
};

const ApiPackageDownload: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const zip = new JSZip();
      
      // Ajouter chaque fichier au ZIP directement depuis notre objet phpFiles
      for (const [fileName, content] of Object.entries(phpFiles)) {
        zip.file(fileName, content);
      }
      
      // Générer le ZIP et le télécharger
      const blob = await zip.generateAsync({ type: "blob" });
      saveAs(blob, "mysql-api-package.zip");
      
      toast({
        title: "Téléchargement terminé",
        description: "Le package API MySQL a été téléchargé avec succès."
      });
    } catch (error) {
      console.error("Erreur lors de la création du package:", error);
      toast({
        title: "Erreur",
        description: "Impossible de créer le package. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Package d'installation automatique</CardTitle>
        <CardDescription>
          Téléchargez un package complet avec tous les fichiers nécessaires pour déployer l'API sur votre hébergement OVH
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Ce package contient tous les fichiers PHP nécessaires pour créer automatiquement les tables MySQL et 
          configurer l'API REST qui sera utilisée par votre application. Il vous suffit de modifier le fichier de 
          configuration avec vos informations de connexion MySQL et de télécharger les fichiers sur votre hébergement.
        </p>
        
        <Button 
          onClick={handleDownload} 
          disabled={isLoading} 
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Préparation du package...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Télécharger le package d'installation
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ApiPackageDownload;
