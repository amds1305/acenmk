
<?php
// Activer la journalisation des erreurs pour le débogage
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Journalisation personnalisée
function logError($message) {
  error_log("[ACENUMERIK ERROR] " . $message);
}

// Force les types MIME corrects pour les extensions clés
function setCorrectMimeType($extension) {
  switch($extension) {
    case 'js':
    case 'mjs':
    case 'jsx':
    case 'ts':
    case 'tsx':
      header('Content-Type: application/javascript; charset=UTF-8');
      break;
    case 'css':
      header('Content-Type: text/css; charset=UTF-8');
      break;
    case 'json':
      header('Content-Type: application/json; charset=UTF-8');
      break;
    case 'html':
      header('Content-Type: text/html; charset=UTF-8');
      break;
    case 'svg':
      header('Content-Type: image/svg+xml; charset=UTF-8');
      break;
    case 'png':
      header('Content-Type: image/png');
      break;
    case 'jpg':
    case 'jpeg':
      header('Content-Type: image/jpeg');
      break;
    case 'gif':
      header('Content-Type: image/gif');
      break;
    case 'webp':
      header('Content-Type: image/webp');
      break;
    case 'ico':
      header('Content-Type: image/x-icon');
      break;
    default:
      return false;
  }
  return true;
}

// Désactiver le cache pour le débogage
header("Cache-Control: no-store, max-age=0");
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
$static_extensions = ['css', 'js', 'jsx', 'ts', 'tsx', 'jpg', 'jpeg', 'png', 'gif', 'svg', 'ico', 'webp', 'json', 'mjs'];

if (in_array($extension, $static_extensions)) {
    $file_path = '.' . parse_url($request_uri, PHP_URL_PATH);
    logError("Trying to serve static file: " . $file_path . " of type " . $extension);
    
    if (file_exists($file_path)) {
        // Définir le type MIME de manière explicite
        if (setCorrectMimeType($extension)) {
            // Lire et envoyer le contenu du fichier
            readfile($file_path);
            exit;
        } else {
            logError("Unknown file extension: " . $extension);
        }
    } else {
        logError("File not found: " . $file_path);
        header("HTTP/1.0 404 Not Found");
        exit("File not found");
    }
}

// Traitement spécial pour debug.js
if (strpos($request_uri, 'debug.js') !== false) {
    $debug_file = './debug.js';
    if (file_exists($debug_file)) {
        header('Content-Type: application/javascript; charset=UTF-8');
        readfile($debug_file);
        exit;
    } else {
        logError("Debug script not found");
    }
}

// Traitement spécial pour main.tsx
if (strpos($request_uri, 'main.tsx') !== false) {
    $tsx_file = './src/main.tsx';
    if (file_exists($tsx_file)) {
        header('Content-Type: application/javascript; charset=UTF-8');
        readfile($tsx_file);
        exit;
    } else {
        logError("TypeScript file not found: " . $tsx_file);
    }
}

// Pour toutes les autres requêtes, servir index.html (Application SPA)
$html_file = './index.html';
if (file_exists($html_file)) {
    logError("Serving SPA index.html");
    header('Content-Type: text/html; charset=UTF-8');
    readfile($html_file);
} else {
    logError("Main index file not found: " . $html_file);
    header("HTTP/1.0 404 Not Found");
    echo "<!DOCTYPE html><html><head><title>Error</title></head><body><h1>Error: Main index file not found</h1></body></html>";
}
?>
