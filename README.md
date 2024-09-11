# Memopus

Le projet **Memopus** est une application Angular qui reproduit partiellement l’interface et les comportements associés de l’application [memopus.com](https://memopus.com). Cette application permet aux utilisateurs de créer, voir, modifier, et supprimer des cartes (ou *cards*) après s'être connectés. Les cartes sont classées par *tags* et par *colonnes*.

## Démonstration

Pour accéder à la démonstration, vous pouvez utiliser les identifiants suivants :
- **Login** : `y`
- **Mot de passe** : `y`

## Définition des Objets

### Card (Carte)
Une carte est un objet contenant à minima les propriétés suivantes :
- `id` : Identifiant unique de la carte.
- `question` : Question de la carte.
- `answer` : Réponse de la carte.
- `description` : Description de la carte.
- `tag` : Tag associé à la carte.
- `column` : Colonne où la carte est placée.

### Tag
Un tag est un objet contenant à minima les propriétés suivantes :
- `id` : Identifiant unique du tag.
- `label` : Nom du tag.
- `emoji` : (Ajouté) Emoji associé au tag.
- `color` : (Ajouté) Couleur associée au tag.

### User (Utilisateur)
Un utilisateur est un objet contenant à minima les propriétés suivantes :
- `id` : Identifiant unique de l'utilisateur.
- `login` : Identifiant de connexion de l'utilisateur.
- `pwd` : Mot de passe de l'utilisateur.

### Column (Colonne)
Une colonne est un objet contenant à minima les propriétés suivantes :
- `id` : Identifiant unique de la colonne.
- `label` : Nom de la colonne.
- `order` : Ordre de la colonne.

## Fonctionnalités Clés Implémentées

1. **Connexion de l'utilisateur** : Un utilisateur doit se connecter avec son login et son mot de passe pour accéder aux fonctionnalités de gestion des cartes.

2. **Gestion des cartes par tag et colonne** : Les cartes sont classées par *tags* et par *colonnes*. Par défaut, toutes les cartes sont affichées et aucun bouton de tag n'est sélectionné.

3. **Filtrage par tag** : Au clic sur un bouton de tag, seules les cartes correspondant à ce tag sont visibles.

4. **Affichage de la réponse** : Au clic sur la question d'une carte, la réponse associée apparaît.

5. **Déplacement de carte entre colonnes** : Un utilisateur peut déplacer une carte d'une colonne à une autre via des boutons de déplacement dans la colonne (ajouté), permettant une gestion intuitive des cartes.

6. **Comparaison de réponse** : L'utilisateur peut proposer une réponse via un formulaire, et celle-ci sera comparée caractère par caractère avec la réponse stockée dans la carte.

7. **Ajout et gestion des tags avec emoji et couleur** : L'application permet d'ajouter des tags avec des emojis et des couleurs personnalisées pour une meilleure organisation visuelle.

8. **Gestion des colonnes** :
  - Ajout et modification de colonnes avec possibilité de choisir la position (ordre) de la colonne.
  - Mise à jour des positions de colonnes via des boutons de déplacement (flèches) pour un contrôle précis sur l'affichage des colonnes.

## Spécifications Techniques

### Version d'Angular
Le projet utilise Angular version 17 ou supérieure.

### Persistance des Données
Les données sont persistées via une API REST fournie par **json-server**.

## Installation

Pour installer et exécuter ce projet localement, veuillez suivre les étapes suivantes :

### Prérequis

- **Node.js** version 14 ou supérieure
- **Angular CLI** version 17 ou supérieure

### Étapes d'installation

1. **Cloner le projet depuis le dépôt GitHub :**

   ```bash
   git clone https://github.com/ramyozi/memopus.git
   cd memopus
    ```
   
2. **Installer les dépendances :**
    ```bash
    npm install
    ```
3. **Lancer le serveur JSON :**
    ```bash
    npm run start:json-server
    ```

4. **Lancer l'application Angular :**
    ```bash
    npm start
    ```

Cette commande démarre l'application Angular sur http://localhost:4200.

### Utilisation
Une fois l'application lancée, ouvrez votre navigateur et accédez à http://localhost:4200. Connectez-vous en utilisant les identifiants de démonstration ou enregistrez un nouvel utilisateur.

### Points Clés Techniques
- **Gestion d'état avec RxJS et services Angular** pour la gestion des utilisateurs, des cartes, des tags, et des colonnes.
- **Filtrage et gestion des données** par tag et colonne.
- **Utilisation de `ngx-emoji-mart`** pour la sélection d'emoji dans la gestion des tags.
- **Gestion de la couleur des tags** avec un sélecteur de couleur Angular Material.
- **Déplacement de cartes** avec une gestion dynamique de l'ordre et de la position.
- **Comparaison de réponses** avec la bibliothèque `string-similarity`.

### Fonctionnalités à venir
Pour les futures versions de l'application, l'ajout de colonnes et la sélection de l'ordre des colonnes seront complétés. Ces fonctionnalités sont actuellement en cours de développement dans la branche `feature/add-column-management-and-manage-order`. Cette branche est dédiée à l'amélioration de l'interface de gestion des colonnes pour permettre un contrôle plus précis de l'ordre d'affichage.

### Organisation et Méthodologie
- **Versionnement avec Git** et **README.md** détaillé pour faciliter l'installation et l'utilisation de l'application.
