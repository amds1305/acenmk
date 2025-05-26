
<?php
require_once 'config.php';

$conn = connectDB();

// Gérer les requêtes HTTP
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        // Récupérer la configuration du template
        $stmt = $conn->prepare("SELECT * FROM template_config LIMIT 1");
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($row = $result->fetch_assoc()) {
            echo json_encode([
                'activeTemplate' => $row['active_template']
            ]);
        } else {
            echo json_encode([
                'activeTemplate' => 'default'
            ]);
        }
        break;
        
    case 'PUT':
        // Mettre à jour la configuration du template
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['activeTemplate'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Active template is required']);
            break;
        }
        
        try {
            // Supprimer la configuration existante
            $conn->query("DELETE FROM template_config");
            
            // Insérer la nouvelle configuration
            $stmt = $conn->prepare("INSERT INTO template_config (id, active_template) VALUES (?, ?)");
            $id = uniqid();
            
            $stmt->bind_param("ss", 
                $id, 
                $data['activeTemplate']
            );
            
            $stmt->execute();
            echo json_encode(['success' => true]);
            
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}

$conn->close();
