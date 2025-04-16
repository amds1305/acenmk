
===================================
API MySQL pour ESN Showcase Garden
===================================

Cette API permet de connecter votre application React à une base de données MySQL
hébergée chez OVH ou tout autre hébergeur supportant PHP et MySQL.

== Installation ==

1. Téléchargez tous les fichiers PHP dans un dossier sur votre hébergement
   (par exemple, dans un dossier "api" à la racine de votre site)

2. Modifiez le fichier config.php pour y inclure vos informations de connexion MySQL:
   - DB_HOST: l'adresse du serveur MySQL (ex: mysql-votre-nom.alwaysdata.net pour AlwaysData)
   - DB_USER: votre nom d'utilisateur MySQL
   - DB_PASS: votre mot de passe MySQL
   - DB_NAME: le nom de votre base de données

3. Accédez à la page install.php via votre navigateur pour créer les tables nécessaires:
   https://votre-domaine.com/api/install.php

4. Une fois l'installation réussie, configurez l'URL de l'API dans votre application React
   en créant un fichier .env.local à la racine de votre projet avec:
   VITE_MYSQL_API_URL=https://votre-domaine.com/api
   
== Sécurité ==

Une fois l'installation terminée, il est recommandé de:

1. Supprimer le fichier install.php de votre serveur
2. Configurer des mesures d'authentification pour protéger votre API

== Structure de la base de données ==

Cette API crée les tables suivantes:
- sections: stocke les sections de la page d'accueil
- section_data: stocke les données associées à chaque section
- trusted_clients: stocke les informations des clients en vedette
- template_config: stocke la configuration du template actif

== Débogage ==

Si vous avez une page blanche lors de l'installation :

1. Vérifiez les logs d'erreur de votre hébergeur
2. Assurez-vous que les informations dans config.php sont correctes
3. Testez la connexion à la base de données avec : 
   https://votre-domaine.com/api/config.php?test=1
4. Vérifiez que le type JSON est supporté par votre version MySQL (5.7+ recommandé)
5. Vérifiez que les extensions PHP requises sont activées :
   - mysqli
   - json
6. Vérifiez les permissions du dossier et des fichiers (644 pour les fichiers, 755 pour les dossiers)

== Support ==

Si vous rencontrez des problèmes, vérifiez:
1. Les identifiants de connexion à la base de données
2. Les permissions de l'utilisateur MySQL (il doit avoir les droits CREATE, INSERT, UPDATE, DELETE)
3. La compatibilité de votre hébergeur avec JSON (MySQL 5.7+ recommandé)
4. Les logs d'erreur PHP sur votre hébergement

Pour obtenir de l'aide supplémentaire, veuillez consulter les forums d'OVH ou contacter votre hébergeur.
