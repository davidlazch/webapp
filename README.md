# Application Web avec un système de connexion/inscription



## Configuration de l'environnement

1. Executer le code sql depuis le fichier **dbConfig.sql** dans votre SGBD **MySQL**
    - *Si vous souhaitez, vous pouvez changer le nom de la bd par défaut (webapp)*
    
2. Dans le dossier du projet, créer un fichier .env avec:
     - MYSQL_HOST=localhost*
     - MYSQL_USER=root* 
     - MYSQL_PASSWORD=1234*
     - MYSQL_DB=webapp*
     
    ***Remplacer les valeurs dans le pair avec vos informations d'identification (votre mdp, nom de la base,...)***
  
3. Ouvrez un terminal dans le dossier du projet et executer la commande *npm install* pour installer les dépendances

## Comment démarrer l'application

Si vous souhaitez a le démarrer en mode de développement:
  - *npm run dev*

Quand vous avez réussi l'exercice, vous pouvez le construire avec [1] et le démarrer avec [2]:
  1. *npm run build*
  2. *node build*
