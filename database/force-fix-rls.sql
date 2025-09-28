-- Script pour forcer la suppression et recréation des politiques RLS
-- À exécuter dans l'éditeur SQL de Supabase

-- Désactiver temporairement RLS pour pouvoir supprimer les politiques
ALTER TABLE articles DISABLE ROW LEVEL SECURITY;

-- Supprimer toutes les politiques existantes (avec différents noms possibles)
DROP POLICY IF EXISTS "Articles visibles par tous" ON articles;
DROP POLICY IF EXISTS "Permettre l'ajout d'articles" ON articles;
DROP POLICY IF EXISTS "Permettre la mise à jour d'articles" ON articles;
DROP POLICY IF EXISTS "Permettre la suppression d'articles" ON articles;
DROP POLICY IF EXISTS "Utilisateurs authentifiés peuvent modifier les articles" ON articles;
DROP POLICY IF EXISTS "articles_select_policy" ON articles;
DROP POLICY IF EXISTS "articles_insert_policy" ON articles;
DROP POLICY IF EXISTS "articles_update_policy" ON articles;
DROP POLICY IF EXISTS "articles_delete_policy" ON articles;

-- Réactiver RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Créer les nouvelles politiques avec des noms uniques
CREATE POLICY "articles_public_select" ON articles
    FOR SELECT USING (true);

CREATE POLICY "articles_public_insert" ON articles
    FOR INSERT WITH CHECK (true);

CREATE POLICY "articles_public_update" ON articles
    FOR UPDATE USING (true);

CREATE POLICY "articles_public_delete" ON articles
    FOR DELETE USING (true);

-- Vérifier les politiques créées
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'articles';
