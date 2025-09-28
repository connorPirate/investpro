import { createClient } from '@supabase/supabase-js';
 
// Configuration Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://tdxymrpslyihajtnylcu.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkeHltcnBzbHlpaGFqdG55bGN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwNDk1MTIsImV4cCI6MjA3MTYyNTUxMn0.wStW2zpqExQ4K6PYZdrnuQNjVMgxMJkaZOouRAdY83s';

// Création du client Supabase
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Fonctions utilitaires pour la base de données
export const dbUtils = {
  // Récupérer tous les articles
  async getArticles() {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Erreur lors de la récupération des articles:', error);
      throw error;
    }
    
    return data || [];
  },

  // Ajouter un nouvel article
  async addArticle(article) {
    const { data, error } = await supabase
      .from('articles')
      .insert([article])
      .select();
    
    if (error) {
      console.error('Erreur lors de l\'ajout de l\'article:', error);
      throw error;
    }
    
    return data[0];
  },

  // Supprimer un article
  async deleteArticle(id) {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Erreur lors de la suppression de l\'article:', error);
      throw error;
    }
  },

  // Mettre à jour un article
  async updateArticle(id, updates) {
    const { data, error } = await supabase
      .from('articles')
      .update(updates)
      .eq('id', id)
      .select();
    
    if (error) {
      console.error('Erreur lors de la mise à jour de l\'article:', error);
      throw error;
    }
    
    return data[0];
  },

  // Upload d'image
  async uploadImage(file, fileName) {
    const { data, error } = await supabase.storage
      .from('images')
      .upload(fileName, file);
    
    if (error) {
      console.error('Erreur lors de l\'upload de l\'image:', error);
      throw error;
    }
    
    return data;
  },

  // Obtenir l'URL publique d'une image
  getImageUrl(fileName) {
    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(fileName);
    
    return data.publicUrl;
  }
}; 