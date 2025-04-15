
<?php
// Activer la journalisation des erreurs pour le débogage
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Désactiver le cache pour le débogage
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");
header("Expires: 0");

// Gérer les erreurs CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Répondre directement aux requêtes OPTIONS (requêtes préliminaires CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Pour les fichiers statiques, les servir directement
$request_uri = $_SERVER['REQUEST_URI'];
$extension = pathinfo($request_uri, PATHINFO_EXTENSION);

// Liste des extensions de fichiers statiques à servir directement
$static_extensions = ['css', 'js', 'jpg', 'jpeg', 'png', 'gif', 'svg', 'ico', 'webp', 'json'];

if (in_array($extension, $static_extensions)) {
    $file_path = '.' . $request_uri;
    if (file_exists($file_path)) {
        // Définir le type MIME approprié
        switch ($extension) {
            case 'css':
                header('Content-Type: text/css');
                break;
            case 'js':
                header('Content-Type: text/javascript');
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
    }
}

// Pour le fichier debug.js spécifique
if ($request_uri == '/debug.js' || $request_uri == '/src/debug.js') {
    if (file_exists('./debug.js')) {
        header('Content-Type: text/javascript');
        readfile('./debug.js');
        exit;
    }
}

// Pour toutes les autres requêtes, servir index.html (Application SPA)
include_once('./index.html');
?>
