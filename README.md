# ALVINA SHOP - Configuration Base de Données SQL

## 🚀 Configuration de la Base de Données

Ce projet utilise **Supabase** comme base de données SQL. Voici comment configurer votre base de données :

### 1. Créer un projet Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Notez votre URL de projet et votre clé anon publique

### 2. Configuration des Variables d'Environnement

Créez un fichier `.env` à la racine du projet avec le contenu suivant :

```env
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre_cle_anon_publique
```

### 3. Initialisation de la Base de Données

1. Dans votre projet Supabase, allez dans **SQL Editor**
2. Copiez et exécutez le contenu du fichier `database/schema.sql`
3. Cela créera toutes les tables nécessaires

### 4. Configuration du Stockage

1. Dans Supabase, allez dans **Storage**
2. Créez un nouveau bucket nommé `images`
3. Configurez les permissions :
   - **Public** : Lecture autorisée
   - **Authenticated** : Écriture autorisée

### 5. Structure de la Base de Données

#### Tables Principales :

- **`articles`** : Produits de la boutique
  - `id` : Identifiant unique
  - `nom` : Nom du produit
  - `description` : Description détaillée
  - `prix` : Prix en FCFA
  - `image_url` : URL de l'image
  - `stock` : Quantité disponible
  - `categorie` : Catégorie du produit
  - `created_at` : Date de création
  - `updated_at` : Date de modification

- **`users`** : Utilisateurs (pour l'authentification future)
- **`commandes`** : Commandes des clients
- **`commande_details`** : Détails des commandes
- **`categories`** : Catégories de produits

### 6. Fonctions Utilitaires

Le fichier `src/supabaseClient.js` contient des fonctions utilitaires :

```javascript
import { dbUtils } from './supabaseClient';

// Récupérer tous les articles
const articles = await dbUtils.getArticles();

// Ajouter un article
const nouvelArticle = await dbUtils.addArticle({
  nom: 'Nouveau Produit',
  prix: 29.99,
  categorie: 'Accessoires'
});

// Supprimer un article
await dbUtils.deleteArticle(1);

// Mettre à jour un article
await dbUtils.updateArticle(1, { prix: 39.99 });
```

### 7. Sécurité

- **RLS (Row Level Security)** est activé sur toutes les tables
- Les articles sont visibles par tous (lecture publique)
- La modification nécessite une authentification (à configurer)

### 8. Démarrage du Projet

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

### 9. Fonctionnalités Disponibles

- ✅ Affichage des produits depuis la base de données
- ✅ Ajout de nouveaux produits avec upload d'images
- ✅ Gestion du panier
- ✅ Interface responsive et animée
- ✅ Stockage sécurisé des images

### 10. Prochaines Étapes

- [ ] Implémenter l'authentification utilisateur
- [ ] Ajouter la gestion des commandes
- [ ] Implémenter le système de paiement
- [ ] Ajouter des filtres par catégorie
- [ ] Système de recherche

## 🛠️ Technologies Utilisées

- **Frontend** : React + Vite
- **Base de données** : Supabase (PostgreSQL)
- **Stockage** : Supabase Storage
- **Styling** : Tailwind CSS
- **Animations** : Framer Motion

## 📞 Support

Pour toute question concernant la configuration de la base de données, consultez la [documentation Supabase](https://supabase.com/docs). 