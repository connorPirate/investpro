-- Script SQL pour initialiser la base de données ALVINA SHOP
-- À exécuter dans l'éditeur SQL de Supabase

-- Table des articles
CREATE TABLE IF NOT EXISTS articles (
    id BIGSERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    description TEXT,
    prix DECIMAL(10,2) NOT NULL,
    image_url TEXT,
    stock INTEGER DEFAULT 0,
    categorie VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des utilisateurs (pour l'authentification future)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    nom VARCHAR(255),
    prenom VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des commandes
CREATE TABLE IF NOT EXISTS commandes (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    total DECIMAL(10,2) NOT NULL,
    statut VARCHAR(50) DEFAULT 'en_attente',
    adresse_livraison TEXT,
    telephone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des détails de commande
CREATE TABLE IF NOT EXISTS commande_details (
    id BIGSERIAL PRIMARY KEY,
    commande_id BIGINT REFERENCES commandes(id) ON DELETE CASCADE,
    article_id BIGINT REFERENCES articles(id),
    quantite INTEGER NOT NULL,
    prix_unitaire DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des catégories
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertion de quelques catégories par défaut
INSERT INTO categories (nom, description) VALUES
    ('Vêtements', 'Vêtements traditionnels et modernes'),
    ('Accessoires', 'Sacs, bijoux et autres accessoires'),
    ('Chaussures', 'Chaussures élégantes et confortables')
ON CONFLICT (nom) DO NOTHING;

-- Insertion d'articles de démonstration
INSERT INTO articles (nom, description, prix, categorie, stock) VALUES
    ('Robe Africaine Traditionnelle', 'Robe colorée aux motifs traditionnels africains', 4000, 'Vêtements', 10),
    ('Sac à Main Tendance', 'Sac élégant en cuir véritable', 3000, 'Accessoires', 15),
    ('Chaussures Élégantes', 'Chaussures confortables pour toutes occasions', 5999, 'Chaussures', 8),
    ('Collier Traditionnel', 'Collier aux perles colorées', 1999, 'Accessoires', 20),
    ('Bracelet Moderne', 'Bracelet en métal doré', 1000, 'Accessoires', 25)
ON CONFLICT DO NOTHING;

-- Création d'un bucket de stockage pour les images
-- Note: Ceci doit être fait manuellement dans l'interface Supabase
-- Nom du bucket: 'images'
-- Permissions: publiques pour la lecture

-- Politique RLS (Row Level Security) pour les articles
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Permettre la lecture publique des articles
CREATE POLICY "Articles visibles par tous" ON articles
    FOR SELECT USING (true);

-- Permettre l'insertion, mise à jour et suppression seulement aux utilisateurs authentifiés
-- (à décommenter quand l'authentification sera implémentée)
-- CREATE POLICY "Utilisateurs authentifiés peuvent modifier les articles" ON articles
--     FOR ALL USING (auth.role() = 'authenticated');

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour mettre à jour automatiquement updated_at
CREATE TRIGGER update_articles_updated_at 
    BEFORE UPDATE ON articles 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_articles_categorie ON articles(categorie);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON articles(created_at);
CREATE INDEX IF NOT EXISTS idx_commandes_user_id ON commandes(user_id);
CREATE INDEX IF NOT EXISTS idx_commande_details_commande_id ON commande_details(commande_id); 