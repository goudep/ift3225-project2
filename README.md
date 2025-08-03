# Projet 2: Application de gestion de profils

**Université**: Université de Montréal
**Département**: DIRO
**Cours**: IFT 3225 - Technologie de l'Internet

---
## 1. Coordonnées du Binôme (Team Information)

* **Membre 1 (Member 1):**
    * **Nom (Name):** `Yudi Ma`
    * **Matricule (Student ID):** `20236724`
    * **Courriel (Email):** `yudi.ma@umontreal.ca`
  
---

## 2. Protocole d'Installation et d'Exécution (Installation and Run Protocol)

Pour installer et exécuter cette application MERN, veuillez suivre les étapes ci-dessous.

### 2.1 Prérequis (Prerequisites)

-   Node.js (v18 ou supérieur)
-   npm (v9 ou supérieur)
-   Git
### 2.2 Principales Dépendances (Key Dependencies) 
Notre projet utilise les technologies et librairies principales suivantes. Toutes ces dépendances seront automatiquement installées en exécutant la commande `npm install` dans les dossiers `frontend` et `backend` respectivement. 

**Backend:** 
* Express.js 
* Mongoose 
* JSON Web Token (jsonwebtoken) 
* Bcrypt.js 
* CORS 
* Axios 
* Dotenv 

**Frontend:** 
* React 
* React Router DOM 
* Axios 
* Bootstrap & React-Bootstrap 
* Bootstrap Icons 
* JWT-Decode
### 2.3 Étape 1 : Obtenir le Code Source (Get the Source Code)

Clonez le projet depuis notre dépôt Git.
```bash
git clone https://github.com/goudep/ift3225-project2.git
cd ift3225-project2
```
### 3.3 Étape 2 : Configuration du Backend

1.  Naviguez vers le dossier du backend.
    ```bash
    cd backend
    ```

2.  Créez un fichier `.env` à la racine du dossier `backend`. Ce fichier contiendra les clés secrètes.

3.  Ajoutez le contenu suivant au fichier `.env` en remplaçant les valeurs par les vôtres :
    ```
    # Clé de connexion MongoDB
    MONGO_URI=mongodb+srv://mayudi69:RE0hccNDHKrFycQB@cluster0.ki6zved.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

    # Secret pour signer les JWT
    JWT_SECRET=mysecretkey20253225E

    # Clé API pour la validation des courriels (SendGrid)
    SENDGRID_API_KEY=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
    ```

4.  Installez les dépendances du backend.
    ```bash
    npm install
    ```

### 3.4 Étape 3 : Configuration du Frontend

1.  Ouvrez un **nouveau terminal**.
2.  Naviguez vers le dossier du frontend.
    ```bash
    cd frontend
    ```
3.  Installez les dépendances du frontend.
    ```bash
    npm install
    ```

### 3.5 Étape 4 : Exécution de l'Application

L'application nécessite l'exécution simultanée du serveur backend et du client frontend dans deux terminaux séparés.

-   **Dans le premier terminal (pour le Backend):**
    ```bash
    # Assurez-vous d'être dans le dossier /backend
    node server.js
    ```
    *Vous devriez voir les messages suivants : `Server started on port 5000` et `MongoDB Connected`.*

-   **Dans le deuxième terminal (pour le Frontend):**
    ```bash
    # Assurez-vous d'être dans le dossier /frontend
    npm start
    ```
    *Un onglet de navigateur devrait s'ouvrir automatiquement à l'adresse `http://localhost:3000`.*

L'application est maintenant prête à être utilisée.

