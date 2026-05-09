import React, { useState, useEffect } from 'react';
import api from '../api/axios';

const NoteForm = ({ note, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    priority: 'moyenne'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isEditing = !!note;

  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title,
        content: note.content || '',
        priority: note.priority
      });
    }
  }, [note]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.title.trim()) {
      return setError('Le titre est obligatoire.');
    }

    setLoading(true);

    try {
      if (isEditing) {
        await api.put(`/notes/${note.id}`, formData);
      } else {
        await api.post('/notes', formData);
      }
      onSuccess();
    } catch (err) {
      if (err.response?.data?.errors) {
        const messages = Object.values(err.response.data.errors).flat().join(' ');
        setError(messages);
      } else {
        setError(`Erreur lors de ${isEditing ? 'la modification' : 'la création'} de la note.`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card overflow-hidden shadow-2xl ring-1 ring-indigo-500/20 transform transition-all">
      <div className="px-6 py-4 border-b border-slate-700/50 bg-slate-800/50 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-100">
          {isEditing ? 'Modifier la Note' : 'Nouvelle Note'}
        </h2>
        <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <div className="p-6">
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Titre * (max 100 caractères)</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              maxLength={100}
              required
              className="glass-input"
              placeholder="Titre de la note"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Priorité</label>
            <div className="relative">
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="glass-input appearance-none bg-slate-800/80"
              >
                <option value="basse">Basse</option>
                <option value="moyenne">Moyenne</option>
                <option value="haute">Haute</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Contenu</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={5}
              className="glass-input resize-none"
              placeholder="Contenu de votre note..."
            ></textarea>
          </div>

          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-secondary"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-primary flex justify-center items-center"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                isEditing ? 'Enregistrer' : 'Créer'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;
