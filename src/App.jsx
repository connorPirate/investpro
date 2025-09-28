import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './index.css';

import img1 from './assets/femme-africaine-traditionnelle-excitee-faisant-achats-ligne-aide-smartphone-orange_116547-50288.jpg';
import img2 from './assets/onlineshop-erstellen.jpg';
import img3 from './assets/pngtree-d-render-of-purple-background-with-shopping-bags-on-smartphone-online-image_3719672.jpg';
import img4 from './assets/IMG-20250724-WA0001.jpg';
import img5 from './assets/telechargement-32.jpeg';
import Contact from './Contact';
import CategoryManager from './CategoryManager';
import { supabase, dbUtils } from './supabaseClient';

const images = [img1, img2, img3, img4, img5];

const produits = [
  {
    id: 1,
    nom: 'Robe Africaine',
    prix: 49.99,
    image: img1,
  },
  {
    id: 2,
    nom: 'Sac � main tendance',
    prix: 29.99,
    image: img2,
  },
  {
    id: 3,
    nom: 'Chaussures �l�gantes',
    prix: 39.99,
    image: img3,
  },
  {
    id: 4,
    nom: 'Accessoire chic',
    prix: 19.99,
    image: img4,
  },
  {
    id: 5,
    nom: 'Bijoux modernes',
    prix: 14.99,
    image: img5,
  },
];

function App() {
  const [page, setPage] = useState('accueil');
  const [panier, setPanier] = useState([]);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [produitsState, setProduitsState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Charger les articles depuis Supabase au chargement
  React.useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await dbUtils.getArticles();
        setProduitsState(data);
      } catch (error) {
        setError("Erreur lors du chargement des articles");
        console.error('Erreur:', error);
      }
      setLoading(false);
    };
    fetchArticles();
  }, []);

  // Slider automatique
  React.useEffect(() => {
    const interval = setInterval(() => {
      setSliderIndex((i) => (i + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const ajouterAuPanier = (produit) => {
    setPanier((prev) => {
      const exist = prev.find((item) => item.id === produit.id);
      if (exist) {
        return prev.map((item) =>
          item.id === produit.id ? { ...item, quantite: item.quantite + 1 } : item
        );
      }
      return [...prev, { ...produit, quantite: 1 }];
    });
  };

  const retirerDuPanier = (id) => {
    setPanier((prev) => prev.filter((item) => item.id !== id));
  };

  const changerQuantite = (id, qte) => {
    setPanier((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantite: Math.max(1, qte) } : item
      )
    );
  };

  const total = panier.reduce((sum, item) => sum + item.prix * item.quantite, 0);

  const commanderViaWhatsApp = () => {
    if (panier.length === 0) return;

    let message = " *NOUVELLE COMMANDE - ALVINA SHOP* \n\n";
    message += " *Détails de la commande :*\n";

    panier.forEach((item, index) => {
      message += `${index + 1}. ${item.nom}\n`;
      message += `   Prix unitaire: ${item.prix.toFixed(2)} FCFA\n`;
      message += `   Quantité: ${item.quantite}\n`;
      message += `   Sous-total: ${(item.prix * item.quantite).toFixed(2)} FCFA\n\n`;
    });

    message += ` *TOTAL: ${total.toFixed(2)} FCFA*\n\n`;
    message += " *Informations client:*\n";
    message += "Nom: [à compléter]\n";
    message += "Téléphone: [à compléter]\n";
    message += "Adresse de livraison: [à compléter]\n\n";
    message += "Merci pour votre commande ! ";

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "237674328747";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-pink-50 flex flex-col">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-center p-6 bg-white/90 backdrop-blur-md shadow-soft sticky top-0 z-10 gap-2 sm:gap-0 border-b border-pink-100">
        <h1 className="text-2xl sm:text-3xl font-bold text-gradient cursor-pointer hover:scale-105 transition-transform" onClick={() => setPage('accueil')}>ALVINA SHOP</h1>
        <nav className="flex flex-wrap gap-2 sm:gap-4">
          <button onClick={() => setPage('accueil')} className="hover:text-primary-600 text-sm sm:text-base font-medium transition-colors duration-200 hover:scale-105">Accueil</button>
          <button onClick={() => setPage('boutique')} className="hover:text-primary-600 text-sm sm:text-base font-medium transition-colors duration-200 hover:scale-105">Boutique</button>
          <button onClick={() => setPage('panier')} className="relative text-sm sm:text-base font-medium transition-colors duration-200 hover:scale-105">Panier{panier.length > 0 && (<span className="absolute -top-2 -right-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full px-2 text-xs animate-bounce-slow shadow-lg">{panier.length}</span>)}</button>
          <button onClick={() => setPage('contact')} className="hover:text-primary-600 text-sm sm:text-base font-medium transition-colors duration-200 hover:scale-105">Contact</button>
        </nav>
      </header>

      {/* Contenu principal */}
      <main className="flex-1 w-full max-w-5xl mx-auto p-2 sm:p-4">
        <AnimatePresence mode="wait">
          {page === 'accueil' && (
            <motion.section
              key="accueil"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              {/* Slider anim� */}
              <div className="relative w-full h-48 sm:h-64 rounded-2xl overflow-hidden shadow-soft mb-8 animate-float">
                <motion.img
                  key={sliderIndex}
                  src={images[sliderIndex]}
                  alt="slider"
                  className="object-cover w-full h-full"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.8 }}
                />
                {/* Points du slider */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${sliderIndex === i ? 'bg-pink-500' : 'bg-gray-300'}`}
                      onClick={() => setSliderIndex(i)}
                    />
                  ))}
                </div>
              </div>
              <h2 className="text-xl sm:text-3xl font-bold mb-4 text-center text-gradient">Bienvenue sur ALVINA SHOP !</h2>
              <p className="text-center mb-8 text-sm sm:text-base">Découvrez nos vètements et accessoires tendance, avec une expérience d'achat animée et moderne.</p>
              <div className="flex justify-center">
                <button onClick={() => setPage('boutique')} className="btn-primary">Voir la boutique</button>
              </div>
            </motion.section>
          )}

          {page === 'boutique' && (
            <motion.section
              key="boutique"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-6 text-pink-600">Nos produits</h2>
              
              {/* Gestionnaire de cat�gories */}
              <CategoryManager 
                onCategorySelect={setSelectedCategory}
                selectedCategory={selectedCategory}
              />
              
              <div className="bg-gradient-to-br from-pink-50 via-white to-purple-50 rounded-xl p-2 sm:p-4 min-h-[200px]">
                {loading ? (
                  <div className="flex justify-center items-center py-8">
                    <span className="text-pink-400 animate-pulse font-semibold">Chargement...</span>
                  </div>
                ) : error ? (
                  <div className="text-red-500 text-center py-4">{error}</div>
                ) : produitsState.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <svg width="80" height="80" fill="none" viewBox="0 0 24 24"><path fill="#f472b6" d="M7 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM7.42 6l.89-2.68A2 2 0 0 1 10.18 2h3.64a2 2 0 0 1 1.87 1.32L16.58 6H21a1 1 0 0 1 .96 1.27l-2.2 8.8A3 3 0 0 1 16.87 18H7.13a3 3 0 0 1-2.89-2.13l-2.2-8.8A1 1 0 0 1 3 6h4.42ZM10.18 4l-.72 2.18A1 1 0 0 1 8.52 7H4.21l2.01 8.03A1 1 0 0 0 7.13 16h9.74a1 1 0 0 0 .91-.97l2.01-8.03h-4.31a1 1 0 0 1-.94-.82L13.82 4h-3.64Z"/></svg>
                    <p className="text-pink-400 mt-4 text-lg font-semibold">Aucun article pour le moment</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
                    {produitsState
                      .filter(prod => !selectedCategory || prod.categorie === selectedCategory)
                      .map((prod, idx) => (
                      <motion.div
                        key={prod.id}
                        className="relative card p-4 flex flex-col items-center cursor-pointer group overflow-hidden card-hover"
                        initial={{ opacity: 0, y: 40, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: idx * 0.07, duration: 0.5, type: 'spring', bounce: 0.3 }}
                        whileHover={{ scale: 1.07, boxShadow: '0 8px 32px 0 rgba(236,72,153,0.25)', filter: 'brightness(1.08)' }}
                        whileTap={{ scale: 0.97 }}
                      >
                        {/* Animation effet de lumi�re */}
                        <motion.div
                          className="absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-br from-pink-200 via-white to-purple-200 opacity-30 rounded-full blur-2xl pointer-events-none"
                          animate={{ x: [0, 20, -10, 0], y: [0, 10, -10, 0] }}
                          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                        />
                        {/* Badge Nouveau */}
                        {prod.id > Date.now() - 1000 * 60 * 5 && (
                          <span className="absolute top-2 left-2 bg-pink-400 text-white text-xs px-2 py-0.5 rounded-full shadow">Nouveau</span>
                        )}
                        <div className="w-full flex-1 flex items-center justify-center mb-3">
                          <img src={prod.image_url} alt={prod.nom} className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl shadow-soft group-hover:scale-110 group-hover:rotate-2 transition-transform duration-300" />
                        </div>
                        <h3 className="font-semibold text-xs sm:text-base mb-1 text-center line-clamp-2">{prod.nom}</h3>
                        <div className="flex items-center gap-1 mb-3">
                          <span className="text-gradient font-bold text-lg sm:text-xl">{prod.prix.toFixed(2)}</span>
                          <span className="text-gray-500 text-xs font-semibold">FCFA</span>
                        </div>
                        <motion.button
                          onClick={() => ajouterAuPanier(prod)}
                          className="btn-primary text-xs sm:text-sm w-full"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Ajouter au panier
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.section>
          )}

          {page === 'panier' && (
            <motion.section
              key="panier"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-6 text-pink-600">Votre panier</h2>
              {panier.length === 0 ? (
                <p className="text-center">Votre panier est vide.</p>
              ) : (
                <div className="space-y-4">
                  {panier.map((item) => (
                    <motion.div
                      key={item.id}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <img src={item.image} alt={item.nom} className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded" />
                      <div className="flex-1 text-center sm:text-left">
                        <h4 className="font-semibold text-sm sm:text-base">{item.nom}</h4>
                        <p className="text-pink-600 text-sm sm:text-base">{item.prix.toFixed(2)} FCFA</p>
                        <div className="flex items-center justify-center sm:justify-start mt-2">
                          <button onClick={() => changerQuantite(item.id, item.quantite - 1)} className="px-2 bg-gray-200 rounded-l">-</button>
                          <span className="px-3">{item.quantite}</span>
                          <button onClick={() => changerQuantite(item.id, item.quantite + 1)} className="px-2 bg-gray-200 rounded-r">+</button>
                        </div>
                      </div>
                      <button onClick={() => retirerDuPanier(item.id)} className="text-red-500 hover:underline text-sm sm:text-base">Retirer</button>
                    </motion.div>
                  ))}
                  <div className="text-right font-bold text-base sm:text-lg mt-4">Total : {total.toFixed(2)} FCFA</div>
                  <div className="flex justify-end">
                    <button className="btn-primary" onClick={commanderViaWhatsApp}> Commander via WhatsApp</button>
                  </div>
                </div>
              )}
            </motion.section>
          )}
          {page === 'contact' && (
            <Contact />
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="text-center p-6 text-gray-500 mt-8 text-sm sm:text-base bg-white/50 backdrop-blur-sm border-t border-pink-100">
        <p className="text-gradient font-semibold"> 2024 ALVINA SHOP. Tous droits réservés.</p>
      </footer>
    </div>
  );
}

export default App;
