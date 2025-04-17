
# API MySQL pour OVH - Package d'installation automatique

Ce package contient tous les fichiers nécessaires pour déployer facilement une API PHP
permettant à votre application de se connecter à une base de données MySQL OVH.

## Instructions rapides:

1. Modifiez le fichier `config.php` avec vos informations de connexion MySQL
2. Téléchargez tous les fichiers dans un dossier `api` sur votre hébergement OVH
3. Accédez à `https://votre-domaine.com/api/install.php` pour installer automatiquement l'API
4. Configurez votre application avec `VITE_MYSQL_API_URL=https://votre-domaine.com/api`

## Déploiement complet sur OVH:

1. Connectez-vous à votre hébergement OVH via FTP
2. Pour l'API MySQL:
   - Créez un dossier `api` dans la racine de votre espace web
   - Téléchargez uniquement les fichiers PHP du dossier `src/services/mysql/deploy` dans ce dossier
   - Configurez `config.php` avec vos informations de connexion
   - Testez l'installation en accédant à `https://votre-domaine.com/api/install.php?test=1`

3. Pour l'application React:
   - Exécutez `npm run build` sur votre machine locale pour générer les fichiers de production
   - Téléchargez tout le contenu du dossier `dist` à la racine de votre espace web OVH
   - Créez un fichier `.htaccess` à la racine avec le contenu suivant:
   
   ```
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

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
après l'installation ou de restreindre son accès.
