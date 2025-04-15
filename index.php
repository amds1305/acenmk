
<?php
// Activer la journalisation des erreurs pour le débogage
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Journalisation personnalisée
function logError($message) {
  error_log("[ACENUMERIK ERROR] " . $message);
}

// Désactiver le cache pour le débogage
header("Cache-Control: no-cache, max-age=0");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Répondre directement aux requêtes OPTIONS (requêtes préliminaires CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Journaliser l'URL demandée
$request_uri = $_SERVER['REQUEST_URI'];
logError("Requested URI: " . $request_uri);

// Pour les fichiers statiques, les servir directement
$extension = pathinfo($request_uri, PATHINFO_EXTENSION);

// Liste des extensions de fichiers statiques à servir directement
$static_extensions = ['css', 'js', 'ts', 'tsx', 'jpg', 'jpeg', 'png', 'gif', 'svg', 'ico', 'webp', 'json', 'mjs'];

if (in_array($extension, $static_extensions)) {
    $file_path = '.' . $request_uri;
    logError("Trying to serve static file: " . $file_path);
    
    if (file_exists($file_path)) {
        // Définir le type MIME approprié de manière explicite
        switch ($extension) {
            case 'css':
                header('Content-Type: text/css');
                break;
            case 'js':
            case 'mjs':
            case 'ts':
            case 'tsx':
                header('Content-Type: application/javascript');
                break;
            case 'json':
                header('Content-Type: application/json');
                break;
            case 'jpg':
            case 'jpeg':
                header('Content-Type: image/jpeg');
                break;
            case 'png':
                header('Content-Type: image/png');
                break;
            case 'gif':
                header('Content-Type: image/gif');
                break;
            case 'svg':
                header('Content-Type: image/svg+xml');
                break;
            case 'webp':
                header('Content-Type: image/webp');
                break;
            case 'ico':
                header('Content-Type: image/x-icon');
                break;
        }
        
        // Lire et envoyer le contenu du fichier
        readfile($file_path);
        exit;
    } else {
        logError("File not found: " . $file_path);
        header("HTTP/1.0 404 Not Found");
        exit("File not found");
    }
}

// Pour le fichier debug.js spécifique
if ($request_uri == '/debug.js' || $request_uri == '/src/debug.js') {
    if (file_exists('./debug.js')) {
        header('Content-Type: application/javascript');
        readfile('./debug.js');
        exit;
    } else {
        logError("Debug script not found: ./debug.js");
    }
}

// Pour toutes les autres requêtes, servir index.html (Application SPA)
$html_file = './index.html';
if (file_exists($html_file)) {
    logError("Serving SPA index.html");
    header('Content-Type: text/html; charset=UTF-8');
    include_once($html_file);
} else {
    logError("Main index file not found: " . $html_file);
    header("HTTP/1.0 404 Not Found");
    echo "<!DOCTYPE html><html><head><title>Error</title></head><body><h1>Error: Main index file not found</h1></body></html>";
}
?>
