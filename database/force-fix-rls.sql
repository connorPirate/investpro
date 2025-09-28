-- Script pour forcer la suppression et recr�ation des politiques RLS
-- � ex�cuter dans l'�diteur SQL de Supabase

-- D�sactiver temporairement RLS pour pouvoir supprimer les politiques
ALTER TABLE articles DISABLE ROW LEVEL SECURITY;

-- Supprimer toutes les politiques existantes (avec diff�rents noms possibles)
DROP POLICY IF EXISTS "Articles visibles par tous" ON articles;
DROP POLICY IF EXISTS "Permettre l'ajout d'articles" ON articles;
DROP POLICY IF EXISTS "Permettre la mise � jour d'articles" ON articles;
DROP POLICY IF EXISTS "Permettre la suppression d'articles" ON articles;
DROP POLICY IF EXISTS "Utilisateurs authentifi�s peuvent modifier les articles" ON articles;
DROP POLICY IF EXISTS "articles_select_policy" ON articles;
DROP POLICY IF EXISTS "articles_insert_policy" ON articles;
DROP POLICY IF EXISTS "articles_update_policy" ON articles;
DROP POLICY IF EXISTS "articles_delete_policy" ON articles;

-- R�activer RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Cr�er les nouvelles politiques avec des noms uniques
CREATE POLICY "articles_public_select" ON articles
    FOR SELECT USING (true);

CREATE POLICY "articles_public_insert" ON articles
    FOR INSERT WITH CHECK (true);

CREATE POLICY "articles_public_update" ON articles
    FOR UPDATE USING (true);

CREATE POLICY "articles_public_delete" ON articles
    FOR DELETE USING (true);

-- V�rifier les politiques cr��es
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'articles';
