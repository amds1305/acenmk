
<?php
// Force le type MIME pour PHP
header('Content-Type: text/html; charset=UTF-8');

// Informations de base
echo '<h1>Test PHP simple</h1>';
echo '<p>Si vous voyez ce message, PHP fonctionne correctement!</p>';
echo '<p>Date actuelle côté serveur: ' . date('Y-m-d H:i:s') . '</p>';
echo '<p>Version de PHP: ' . phpversion() . '</p>';

// Créer un fichier de log pour vérifier les permissions d'écriture
$testLog = 'test_' . time() . '.log';
if (file_put_contents($testLog, "Test d'écriture de fichier\n")) {
    echo '<p style="color:green;">✅ Test d\'écriture de fichier réussi: ' . $testLog . '</p>';
} else {
    echo '<p style="color:red;">❌ Échec du test d\'écriture de fichier</p>';
}

// Afficher les variables serveur pour le débogage
echo '<h2>Variables du serveur</h2>';
echo '<pre>';
print_r($_SERVER);
echo '</pre>';
?>
