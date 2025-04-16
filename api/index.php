
<?php
// Activer la journalisation des erreurs pour le débogage
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Journalisation personnalisée
function logDebug($message) {
  $logFile = __DIR__ . '/debug.log';
  $formattedMessage = date('[Y-m-d H:i:s] ') . $message . "\n";
  file_put_contents($logFile, $formattedMessage, FILE_APPEND);
}

logDebug("API Request: " . $_SERVER['REQUEST_URI']);

// Force les headers CORS pour permettre les requêtes depuis n'importe quelle origine
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Répondre directement aux requêtes OPTIONS (requêtes préliminaires CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('HTTP/1.1 200 OK');
    exit(0);
}

// Extraire le chemin de la requête
$requestPath = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$requestPath = str_replace('/api/', '', $requestPath);
$requestPath = trim($requestPath, '/');

logDebug("Processed path: " . $requestPath);

// Router vers le bon fichier PHP en fonction de la requête
$validEndpoints = [
    'sections' => 'sections.php',
    'section-data' => 'section-data.php',
    'template-config' => 'template-config.php',
    'trusted-clients' => 'trusted-clients.php',
    'install' => 'install.php',
    'config' => 'config.php',
    'debug_install' => 'debug_install.php',
    'test' => 'test.php',
    'test_php' => 'test_php.php',
    'mysqli_check' => 'mysqli_check.php',
    'php_info' => 'php_info.php'
];

// Première partie du chemin (ex: sections, section-data, etc.)
$firstSegment = explode('/', $requestPath)[0];

if (empty($requestPath) || $requestPath === 'index.php') {
    // Page d'accueil de l'API
    include 'install.php';
} else if (isset($validEndpoints[$firstSegment])) {
    // Endpoint valide
    include $validEndpoints[$firstSegment];
} else {
    // Endpoint non reconnu
    header('HTTP/1.1 404 Not Found');
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode(['error' => 'Endpoint non trouvé']);
    logDebug("Endpoint non trouvé: " . $firstSegment);
}
?>
