import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from './supabaseClient';

const CategoryManager = ({ onCategorySelect, selectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('nom');
      
      if (error) throw error;
      setCategories(data || []);
    } catch (err) {
      setError('Erreur lors du chargement des catégories');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-2 text-sm">
        {error}
      </div>
    );
  }

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">Catégories</h3>
      <div className="flex flex-wrap gap-2">
        <motion.button
          onClick={() => onCategorySelect('')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === '' 
              ? 'bg-pink-500 text-white shadow-lg' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Toutes
        </motion.button>
        
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => onCategorySelect(category.nom)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category.nom 
                ? 'bg-pink-500 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.nom}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default CategoryManager; 