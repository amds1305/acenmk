
<?php
require_once 'config.php';

$conn = connectDB();

// Gérer les requêtes HTTP
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        // Récupérer toutes les sections
        $stmt = $conn->prepare("SELECT * FROM sections ORDER BY `order`");
        $stmt->execute();
        $result = $stmt->get_result();
        
        $sections = [];
        while ($row = $result->fetch_assoc()) {
            $sections[] = [
                'id' => $row['id'],
                'type' => $row['type'],
                'title' => $row['title'],
                'visible' => (bool)$row['visible'],
                'order' => (int)$row['order'],
                'customComponent' => $row['custom_component']
            ];
        }
        
        echo json_encode($sections);
        break;
        
    case 'PUT':
        // Mettre à jour toutes les sections
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!is_array($data)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid data format']);
            break;
        }
        
        // Commencer une transaction
        $conn->begin_transaction();
        
        try {
            // Supprimer toutes les sections existantes
            $conn->query("DELETE FROM sections");
            
            // Insérer les nouvelles sections
            $stmt = $conn->prepare("INSERT INTO sections (id, type, title, visible, `order`, custom_component) VALUES (?, ?, ?, ?, ?, ?)");
            
            foreach ($data as $section) {
                $visible = isset($section['visible']) ? (int)$section['visible'] : 1;
                $customComponent = isset($section['customComponent']) ? $section['customComponent'] : null;
                
                $stmt->bind_param("sssiss", 
                    $section['id'], 
                    $section['type'], 
                    $section['title'], 
                    $visible, 
                    $section['order'], 
                    $customComponent
                );
                
                $stmt->execute();
            }
            
            // Valider la transaction
            $conn->commit();
            echo json_encode(['success' => true]);
            
        } catch (Exception $e) {
            // Annuler la transaction en cas d'erreur
            $conn->rollback();
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}

$conn->close();
