
<?php
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
            `order` INT NOT NULL,
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
                'message' => 'L\'installation a déjà été effectuée. Les tables existent déjà.'
            ];
        }
    } catch (Exception $e) {
        return [
            'success' => false,
            'message' => 'Une erreur est survenue lors de l\'installation.',
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
