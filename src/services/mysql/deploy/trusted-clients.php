
<?php
require_once 'config.php';

$conn = connectDB();

// Gérer les requêtes HTTP
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        // Récupérer tous les clients de confiance
        $stmt = $conn->prepare("SELECT * FROM trusted_clients");
        $stmt->execute();
        $result = $stmt->get_result();
        
        $clients = [];
        while ($row = $result->fetch_assoc()) {
            $clients[] = [
                'id' => $row['id'],
                'name' => $row['name'],
                'logoUrl' => $row['logo_url'],
                'websiteUrl' => $row['website_url'],
                'category' => $row['category']
            ];
        }
        
        echo json_encode($clients);
        break;
        
    case 'POST':
        // Ajouter un nouveau client de confiance
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['name']) || !isset($data['logoUrl'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Name and logoUrl are required']);
            break;
        }
        
        try {
            $stmt = $conn->prepare("INSERT INTO trusted_clients (id, name, logo_url, website_url, category) VALUES (?, ?, ?, ?, ?)");
            $id = uniqid();
            
            $stmt->bind_param("sssss", 
                $id, 
                $data['name'], 
                $data['logoUrl'],
                $data['websiteUrl'] ?? null,
                $data['category'] ?? null
            );
            
            $stmt->execute();
            echo json_encode([
                'success' => true,
                'id' => $id
            ]);
            
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
        break;
        
    case 'PUT':
        // Mettre à jour un client de confiance existant
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['id']) || !isset($data['name']) || !isset($data['logoUrl'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Id, name and logoUrl are required']);
            break;
        }
        
        try {
            $stmt = $conn->prepare("UPDATE trusted_clients SET name = ?, logo_url = ?, website_url = ?, category = ? WHERE id = ?");
            
            $stmt->bind_param("sssss", 
                $data['name'], 
                $data['logoUrl'],
                $data['websiteUrl'] ?? null,
                $data['category'] ?? null,
                $data['id']
            );
            
            $stmt->execute();
            
            if ($stmt->affected_rows > 0) {
                echo json_encode(['success' => true]);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Client not found']);
            }
            
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
        break;
        
    case 'DELETE':
        // Supprimer un client de confiance
        $id = isset($_GET['id']) ? $_GET['id'] : null;
        
        if (!$id) {
            http_response_code(400);
            echo json_encode(['error' => 'Id is required']);
            break;
        }
        
        try {
            $stmt = $conn->prepare("DELETE FROM trusted_clients WHERE id = ?");
            $stmt->bind_param("s", $id);
            $stmt->execute();
            
            if ($stmt->affected_rows > 0) {
                echo json_encode(['success' => true]);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Client not found']);
            }
            
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
