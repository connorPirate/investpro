-- Script pour corriger les politiques RLS et permettre l'ajout d'articles
-- À exécuter dans l'éditeur SQL de Supabase

-- Supprimer les anciennes politiques si elles existent
DROP POLICY IF EXISTS "Articles visibles par tous" ON articles;

-- Créer une nouvelle politique pour permettre la lecture publique
CREATE POLICY "Articles visibles par tous" ON articles
    FOR SELECT USING (true);

-- Créer une politique pour permettre l'insertion (ajout d'articles)
CREATE POLICY "Permettre l'ajout d'articles" ON articles
    FOR INSERT WITH CHECK (true);

-- Créer une politique pour permettre la mise à jour
CREATE POLICY "Permettre la mise à jour d'articles" ON articles
    FOR UPDATE USING (true);

-- Créer une politique pour permettre la suppression
CREATE POLICY "Permettre la suppression d'articles" ON articles
    FOR DELETE USING (true);

-- Vérifier que RLS est activé
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Afficher les politiques créées
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'articles'; 