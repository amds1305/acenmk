
<?php
// Activer la journalisation des erreurs pour le débogage
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Désactiver le cache pour le débogage
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");
header("Expires: 0");

// Définir le charset UTF-8 par défaut pour tous les types MIME
header('Content-Type: text/html; charset=UTF-8');

// Pour les fichiers JavaScript
if (preg_match('/\.js$/', $_SERVER['REQUEST_URI'])) {
    header('Content-Type: text/javascript; charset=UTF-8');
    return false;
}

// Pour les fichiers CSS
if (preg_match('/\.css$/', $_SERVER['REQUEST_URI'])) {
    header('Content-Type: text/css; charset=UTF-8');
    return false;
}

// Pour les fichiers TypeScript et TSX - servir comme JavaScript pour le navigateur
if (preg_match('/\.tsx?$/', $_SERVER['REQUEST_URI'])) {
    header('Content-Type: text/javascript; charset=UTF-8');
    return false;
}

// Pour les images 
if (preg_match('/\.(jpg|jpeg|png|gif|svg|webp)$/', $_SERVER['REQUEST_URI'])) {
    $ext = pathinfo($_SERVER['REQUEST_URI'], PATHINFO_EXTENSION);
    header("Content-Type: image/$ext");
    return false;
}

// Vérifier si le fichier debug.js est demandé
if ($_SERVER['REQUEST_URI'] == '/debug.js') {
    header('Content-Type: text/javascript; charset=UTF-8');
    readfile('debug.js');
    exit;
}

// Pour les autres ressources, inclure index.html
include_once('./index.html');
?>
