import React, { useState } from 'react';
import { motion } from 'framer-motion';

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nom: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ nom: '', email: '', message: '' });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-8 mt-8"
    >
      <h2 className="text-2xl font-bold mb-6 text-pink-600 text-center">Contactez-nous</h2>
      {sent && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-4 p-3 bg-green-100 text-green-700 rounded text-center"
        >
          Merci pour votre message ! Nous vous répondrons rapidement.
        </motion.div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Nom</label>
          <input
            type="text"
            name="nom"
            value={form.nom}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition font-semibold"
        >
          Envoyer
        </button>
      </form>
    </motion.section>
  );
}

export default Contact; 