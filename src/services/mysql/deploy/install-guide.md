
# Guide d'installation de l'API MySQL pour OVH

Ce package contient tous les fichiers nécessaires pour déployer rapidement une API REST permettant à votre application de se connecter à une base de données MySQL sur OVH.

## Prérequis

- Un hébergement web OVH avec PHP 7.4+ et MySQL
- Les informations de connexion à votre base de données MySQL OVH

## Instructions d'installation

1. **Téléchargez** le fichier ZIP de ce package
2. **Décompressez** le fichier sur votre ordinateur
3. **Modifiez** le fichier `config.php` avec vos informations de connexion MySQL
4. **Téléchargez** tous les fichiers dans un dossier `api` sur votre hébergement OVH (via FTP)
5. **Exécutez** le script d'installation en accédant à `https://votre-domaine.com/api/install.php`

## Structure des fichiers

- `install.php` - Script d'installation qui crée automatiquement les tables
- `config.php` - Configuration de la connexion à la base de données
- `sections.php` - API pour gérer les sections du site
- `section-data.php` - API pour gérer les données des sections
- `template-config.php` - API pour gérer la configuration du template
- `trusted-clients.php` - API pour gérer les clients de confiance

## Configuration de votre application

Une fois l'API déployée, configurez votre application frontend avec:

```
VITE_MYSQL_API_URL=https://votre-domaine.com/api
```
