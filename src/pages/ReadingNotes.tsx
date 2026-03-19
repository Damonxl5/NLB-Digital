
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, Search, Plus, Trash2, 
  Edit3, BookOpen, Calendar, X, Save
} from 'lucide-react';
import { useLibrary, Note } from '../context/LibraryContext';

const ReadingNotes: React.FC = () => {
  const navigate = useNavigate();
  const { notes, addNote, deleteNote, updateNote, borrowedBooks } = useLibrary();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [newNote, setNewNote] = useState({
    bookId: '',
    bookTitle: '',
    content: '',
    chapter: ''
  });

  const filteredNotes = notes.filter(note => 
    note.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.bookId && newNote.content) {
      addNote(newNote);
      setNewNote({ bookId: '', bookTitle: '', content: '', chapter: '' });
      setIsAdding(false);
    }
  };

  const handleUpdateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNote) {
      updateNote(editingNote.id, editingNote.content);
      setEditingNote(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ChevronLeft size={24} className="text-slate-600" />
          </button>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">阅读笔记</h1>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="p-2 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-900/20 hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
        </button>
      </header>

      <div className="p-6 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text"
            placeholder="搜索笔记内容或书名..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
          />
        </div>

        {/* Notes List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note) => (
                <motion.div
                  key={note.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <BookOpen size={14} className="text-blue-500" />
                        <h3 className="text-sm font-black text-slate-900">{note.bookTitle}</h3>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <Calendar size={12} />
                        <span>{note.date}</span>
                        {note.chapter && (
                          <>
                            <span className="mx-1">•</span>
                            <span>{note.chapter}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setEditingNote(note)}
                        className="p-2 text-slate-300 hover:text-blue-500 transition-colors"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button 
                        onClick={() => deleteNote(note.id)}
                        className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    {note.content}
                  </p>
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 gap-4 opacity-40">
                <Edit3 size={64} className="text-slate-300" />
                <p className="text-sm font-bold text-slate-500">暂无笔记记录</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Add Note Modal */}
      <AnimatePresence>
        {isAdding && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAdding(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white rounded-t-[40px] z-[101] p-8 pb-12 shadow-2xl"
            >
              <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-8" />
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6">添加阅读笔记</h2>
              
              <form onSubmit={handleAddNote} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">选择书籍</label>
                  <select 
                    required
                    value={newNote.bookId}
                    onChange={(e) => {
                      const book = borrowedBooks.find(b => b.id === e.target.value);
                      setNewNote(prev => ({ 
                        ...prev, 
                        bookId: e.target.value,
                        bookTitle: book?.title || ''
                      }));
                    }}
                    className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
                  >
                    <option value="">请选择书籍</option>
                    {borrowedBooks.map(book => (
                      <option key={book.id} value={book.id}>{book.title}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">章节 (可选)</label>
                  <input 
                    type="text"
                    value={newNote.chapter}
                    onChange={(e) => setNewNote(prev => ({ ...prev, chapter: e.target.value }))}
                    placeholder="例如：第一章"
                    className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">笔记内容</label>
                  <textarea 
                    required
                    rows={4}
                    value={newNote.content}
                    onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="记录下您的感悟..."
                    className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="flex-1 py-4 rounded-2xl font-bold text-slate-400 bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    取消
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-4 rounded-2xl font-bold text-white bg-blue-600 shadow-lg shadow-blue-900/20 hover:bg-blue-700 transition-all"
                  >
                    保存笔记
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Edit Note Modal */}
      <AnimatePresence>
        {editingNote && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingNote(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white rounded-t-[40px] z-[101] p-8 pb-12 shadow-2xl"
            >
              <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-8" />
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6">编辑笔记</h2>
              
              <form onSubmit={handleUpdateNote} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">书籍</label>
                  <div className="w-full bg-slate-50 rounded-2xl p-4 text-sm font-bold text-slate-400">
                    {editingNote.bookTitle}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">笔记内容</label>
                  <textarea 
                    required
                    rows={6}
                    value={editingNote.content}
                    onChange={(e) => setEditingNote(prev => prev ? ({ ...prev, content: e.target.value }) : null)}
                    className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setEditingNote(null)}
                    className="flex-1 py-4 rounded-2xl font-bold text-slate-400 bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    取消
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-4 rounded-2xl font-bold text-white bg-blue-600 shadow-lg shadow-blue-900/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                  >
                    <Save size={18} />
                    更新笔记
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReadingNotes;
