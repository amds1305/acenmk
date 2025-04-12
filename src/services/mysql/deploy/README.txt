
# API MySQL pour OVH - Package d'installation automatique

Ce package contient tous les fichiers nécessaires pour déployer facilement une API PHP
permettant à votre application de se connecter à une base de données MySQL OVH.

## Instructions rapides:

1. Modifiez le fichier `config.php` avec vos informations de connexion MySQL
2. Téléchargez tous les fichiers dans un dossier `api` sur votre hébergement OVH
3. Accédez à `https://votre-domaine.com/api/install.php` pour installer automatiquement l'API
4. Configurez votre application avec `VITE_MYSQL_API_URL=https://votre-domaine.com/api`

Pour des instructions plus détaillées, consultez `install-guide.md`

## Contenu du package:

- `install.php` - Script d'installation automatique
- `config.php` - Configuration de la base de données
- `sections.php` - API pour les sections
- `section-data.php` - API pour les données des sections
- `template-config.php` - API pour la configuration du template
- `trusted-clients.php` - API pour les clients de confiance
- `install-guide.md` - Guide d'installation détaillé
- `README.txt` - Ce fichier

## Important:

Pour des raisons de sécurité, il est recommandé de supprimer `install.php`
après l'installation.
