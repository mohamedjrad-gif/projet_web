import React from 'react';
import NoteItem from './NoteItem';

const NoteList = ({ notes, onEdit, onDelete }) => {
  if (!notes || notes.length === 0) {
    return (
      <div className="glass-card p-12 text-center flex flex-col items-center justify-center border-dashed">
        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
        </div>
        <h3 className="text-xl font-medium text-slate-300">Aucune note pour le moment</h3>
        <p className="text-slate-500 mt-2 max-w-sm">Commencez par créer votre première note en cliquant sur le bouton "Nouvelle Note".</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map(note => (
        <NoteItem 
          key={note.id} 
          note={note} 
          onEdit={() => onEdit(note)} 
          onDelete={() => onDelete(note.id)} 
        />
      ))}
    </div>
  );
};

export default NoteList;
