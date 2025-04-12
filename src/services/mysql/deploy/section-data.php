
<?php
require_once 'config.php';

$conn = connectDB();

// Gérer les requêtes HTTP
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        // Récupérer toutes les données des sections
        $stmt = $conn->prepare("SELECT section_id, data FROM section_data");
        $stmt->execute();
        $result = $stmt->get_result();
        
        $sectionData = [];
        while ($row = $result->fetch_assoc()) {
            $sectionData[] = [
                'section_id' => $row['section_id'],
                'data' => json_decode($row['data'], true)
            ];
        }
        
        echo json_encode($sectionData);
        break;
        
    case 'PUT':
        // Mettre à jour toutes les données des sections
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!is_array($data)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid data format']);
            break;
        }
        
        // Commencer une transaction
        $conn->begin_transaction();
        
        try {
            // Supprimer toutes les données des sections existantes
            $conn->query("DELETE FROM section_data");
            
            // Insérer les nouvelles données des sections
            $stmt = $conn->prepare("INSERT INTO section_data (id, section_id, data) VALUES (?, ?, ?)");
            
            foreach ($data as $item) {
                $id = uniqid();
                $jsonData = json_encode($item['data']);
                
                $stmt->bind_param("sss", 
                    $id, 
                    $item['section_id'], 
                    $jsonData
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
