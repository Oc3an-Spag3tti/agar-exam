# Prototype du Jeu Agario

Ce projet est une version prototype du jeu _Agario_ en utilisant les modules `express`, `socket.io`, la bibliothèque de rendu client `p5.js`, et `uuid` pour générer des identifiants uniques pour les aliments. Le jeu est conçu pour fonctionner dans un environnement multi-utilisateurs avec une gestion dynamique des joueurs et des objets du jeu.

## Prérequis

Avant de commencer, vous devez installer les dépendances nécessaires. Assurez-vous d'avoir installé Node.js (version 12.x ou plus récente) sur votre machine.

### Dépendances

- `express` : Pour créer le serveur web.
- `socket.io` : Pour la communication en temps réel entre le serveur et les clients.
- `p5.js` : Pour rendre les graphiques du jeu côté client.
- `uuid` : Pour générer des identifiants uniques pour les objets (comme les aliments).

## Installation

1. Clonez ce dépôt sur votre machine locale :

   ```bash
   git clone https://github.com/votre-utilisateur/nom-du-depot.git
   cd nom-du-depot
   ```

2. Installez les dépendances en exécutant la commande suivante :

   ```bash
   npm install
   ```

3. Lancez le serveur en exécutant la commande suivante dans le dossier du serveur :
   ```bash
   node server.js
   ```

## Fonctionnalités

- **Multi-utilisateur** : Chaque onglet du navigateur représente un joueur distinct. Si vous rechargez la page, un nouveau joueur est créé et l'ancien est désactivé.
- **UUID pour les objets** : La bibliothèque uuid est utilisée pour générer des identifiants uniques pour chaque aliment afin d'éviter les conflits dans l'environnement multi-utilisateurs.
- **Communication en temps réel** : Utilisation de socket.io pour synchroniser les joueurs et les objets dans le jeu en temps réel.
- **Rendu graphique** : Le rendu du jeu est effectué via p5.js, permettant une animation fluide et un rendu dynamique des joueurs et des objets.
