import React, { useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import NoteList from '../components/NoteList';
import NoteForm from '../components/NoteForm';

const Notes = () => {
  const { user, logout } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // State for form mode (create or edit)
  const [editingNote, setEditingNote] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await api.get('/notes');
      setNotes(response.data);
    } catch (err) {
      setError('Erreur lors du chargement des notes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleOpenForm = (note = null) => {
    setEditingNote(note);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setEditingNote(null);
    setIsFormOpen(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette note ?')) {
      try {
        await api.delete(`/notes/${id}`);
        setNotes(notes.filter(note => note.id !== id));
      } catch (err) {
        alert('Erreur lors de la suppression de la note.');
      }
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-10 glass-card p-6 animate-slide-up">
          <div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              Mes Notes
            </h1>
            <p className="text-slate-400 text-sm mt-1">Bonjour, {user?.name}</p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <button 
              onClick={() => handleOpenForm()} 
              className="btn-primary flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
              Nouvelle Note
            </button>
            <button 
              onClick={logout} 
              className="btn-secondary flex items-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 hover:border-red-500/30"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
              Déconnexion
            </button>
          </div>
        </header>

        {/* Content */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/50 text-red-400 text-center">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <svg className="animate-spin h-10 w-10 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <NoteList notes={notes} onEdit={handleOpenForm} onDelete={handleDelete} />
        )}

        {/* Modal Form */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
            <div className="w-full max-w-lg">
              <NoteForm 
                note={editingNote} 
                onClose={handleCloseForm} 
                onSuccess={() => {
                  fetchNotes();
                  handleCloseForm();
                }} 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
