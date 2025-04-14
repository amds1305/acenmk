
<?php
// Définir les types MIME
header('Content-Type: text/html; charset=UTF-8');

// Pour les fichiers JavaScript
if (preg_match('/\.js$/', $_SERVER['REQUEST_URI'])) {
    header('Content-Type: application/javascript');
    return false;
}

// Pour les fichiers CSS
if (preg_match('/\.css$/', $_SERVER['REQUEST_URI'])) {
    header('Content-Type: text/css');
    return false;
}

// Pour les fichiers TypeScript et TSX
if (preg_match('/\.(ts|tsx)$/', $_SERVER['REQUEST_URI'])) {
    header('Content-Type: application/javascript');
    return false;
}

// Pour les autres ressources, rediriger vers index.html
include_once('./index.html');
?>
