-- Script corrigé pour gérer les politiques RLS existantes
-- À exécuter dans l'éditeur SQL de Supabase

-- Supprimer TOUTES les politiques existantes pour la table articles
DROP POLICY IF EXISTS "Articles visibles par tous" ON articles;
DROP POLICY IF EXISTS "Permettre l'ajout d'articles" ON articles;
DROP POLICY IF EXISTS "Permettre la mise à jour d'articles" ON articles;
DROP POLICY IF EXISTS "Permettre la suppression d'articles" ON articles;
DROP POLICY IF EXISTS "Utilisateurs authentifiés peuvent modifier les articles" ON articles;

-- Créer les nouvelles politiques
CREATE POLICY "Articles visibles par tous" ON articles
    FOR SELECT USING (true);

CREATE POLICY "Permettre l'ajout d'articles" ON articles
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Permettre la mise à jour d'articles" ON articles
    FOR UPDATE USING (true);

CREATE POLICY "Permettre la suppression d'articles" ON articles
    FOR DELETE USING (true);

-- Vérifier que RLS est activé
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Afficher les politiques créées pour vérification
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'articles';
