Projet 2: Application de gestion de profils
Informations sur le Cours

Université: Université de Montréal 


Département: DIRO 


Cours: IFT 3225 - Technologie de l'Internet, Section A 


Professeurs: Axel Seguin, Théo Louvet 


Date de Remise: 8 août 2025 

1.
Coordonnées du Binôme (Team Information)


Membre 1 (Member 1):

Nom (Name): Yudi Ma

Matricule (Student ID): 20236724

Courriel (Email): yudi.ma@umontreal.ca


2.
Clé de Connexion MongoDB (MongoDB Connection Key)


Voici la clé de connexion pour notre base de données MongoDB Atlas.
MONGO_URI=mongodb+srv://mayudi69:RE0hccNDHKrFycQB@cluster0.ki6zved.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

3.
Protocole d'Installation et d'Exécution (Installation and Run Protocol)


Pour installer et exécuter cette application MERN, veuillez suivre les étapes ci-dessous.

3.1 Prérequis (Prerequisites)
Node.js (v18 ou supérieur)

npm (v9 ou supérieur)

Git

3.2 Étape 1 : Obtenir le Code Source (Get the Source Code)
Clonez le projet depuis notre dépôt Git.

Bash

git clone [l'URL de votre dépôt GitHub]
cd [le nom du dossier du projet]
3.3 Étape 2 : Configuration du Backend
Naviguez vers le dossier du backend.

Bash

cd backend
Créez un fichier .env à la racine du dossier backend. Ce fichier contiendra les clés secrètes.

Ajoutez le contenu suivant au fichier .env en remplaçant les valeurs par les vôtres (la clé MONGO_URI est celle fournie dans la section 2 de ce rapport) :

# Clé de connexion MongoDB
MONGO_URI=[votre_clé_de_connexion_mongodb]

# Secret pour signer les JWT (générez une chaîne aléatoire longue et complexe)
JWT_SECRET=[votre_secret_jwt_personnalisé]

# Clé API pour la validation des courriels (SendGrid)
SENDGRID_API_KEY=[votre_clé_api_sendgrid]
Installez les dépendances du backend.

Bash

npm install
3.4 Étape 3 : Configuration du Frontend
Ouvrez un nouveau terminal.

Naviguez vers le dossier du frontend.

Bash

cd frontend
Installez les dépendances du frontend.

Bash

npm install
3.5 Étape 4 : Exécution de l'Application
L'application nécessite l'exécution simultanée du serveur backend et du client frontend dans deux terminaux séparés.

Dans le premier terminal (pour le Backend):

Bash

# Assurez-vous d'être dans le dossier /backend
node server.js
Vous devriez voir les messages suivants : Server started on port 5000 et MongoDB Connected.

Dans le deuxième terminal (pour le Frontend):

Bash

# Assurez-vous d'être dans le dossier /frontend
npm start
Un onglet de navigateur devrait s'ouvrir automatiquement à l'adresse http://localhost:3000, affichant la page de connexion de l'application.

L'application est maintenant prête à être utilisée.
