import React from 'react';

const NoteItem = ({ note, onEdit, onDelete }) => {
  // Format date
  const date = new Date(note.created_at);
  const formattedDate = new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);

  // Determine priority color
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'haute':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'moyenne':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'basse':
      default:
        return 'bg-green-500/20 text-green-400 border-green-500/30';
    }
  };

  return (
    <div className="glass-card flex flex-col h-full overflow-hidden group hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(99,102,241,0.2)] hover:border-indigo-500/50 transition-all duration-300">
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getPriorityStyle(note.priority)} capitalize`}>
            {note.priority}
          </span>
          <span className="text-xs text-slate-500 font-medium">
            {formattedDate}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-slate-200 mb-3 line-clamp-2">
          {note.title}
        </h3>
        
        <p className="text-slate-400 text-sm whitespace-pre-wrap line-clamp-4">
          {note.content || <span className="italic opacity-50">Aucun contenu</span>}
        </p>
      </div>
      
      <div className="px-6 py-4 border-t border-slate-700/50 bg-slate-800/30 flex justify-end gap-3">
        <button 
          onClick={onEdit}
          className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors"
          title="Modifier"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
        </button>
        <button 
          onClick={onDelete}
          className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          title="Supprimer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
        </button>
      </div>
    </div>
  );
};

export default NoteItem;
