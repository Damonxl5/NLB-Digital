
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Plus, History, Bookmark, Search, ChevronRight, DownloadCloud, Edit3, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLibrary } from '../context/LibraryContext';

const Bookshelf: React.FC = () => {
  const navigate = useNavigate();
  const { borrowedBooks, reservedBooks, historyBooks, returnBook, renewBook, cancelReservation, borrowBook, notes } = useLibrary();
  const [activeTab, setActiveTab] = useState<'current' | 'reserved' | 'history'>('current');
  const [pushingBook, setPushingBook] = useState<any>(null);
  const [showSuccess, setShowSuccess] = useState<string | null>(null);
  
  const tabs = [
    { id: 'current', name: '当前借阅', count: borrowedBooks.length },
    { id: 'reserved', name: '预约中', count: reservedBooks.length },
    { id: 'history', name: '历史足迹', count: historyBooks.length },
  ];

  const currentBooks = activeTab === 'current' ? borrowedBooks : activeTab === 'reserved' ? reservedBooks : historyBooks;

  const handlePush = (deviceName: string) => {
    setPushingBook(null);
    setShowSuccess(`已成功推送至 ${deviceName}`);
    setTimeout(() => setShowSuccess(null), 3000);
  };

  const handleRenew = (bookId: string) => {
    renewBook(bookId);
    setShowSuccess('续借成功，借期已延长 21 天');
    setTimeout(() => setShowSuccess(null), 3000);
  };

  const handleReturn = (bookId: string) => {
    returnBook(bookId);
    setShowSuccess('书籍已成功归还');
    setTimeout(() => setShowSuccess(null), 3000);
  };

  const handleCancelReservation = (bookId: string) => {
    cancelReservation(bookId);
    setShowSuccess('预约已取消');
    setTimeout(() => setShowSuccess(null), 3000);
  };

  const handleReborrow = (bookId: string) => {
    borrowBook(bookId);
    setShowSuccess('借阅成功');
    setTimeout(() => setShowSuccess(null), 3000);
  };

  const devices = [
    { name: 'Kindle Paperwhite', type: 'Kindle' },
    { name: 'Kobo Libra 2', type: 'Kobo' },
    { name: 'My Smartphone', type: 'App' },
  ];

  return (
    <div className="flex flex-col gap-8 p-6 bg-white min-h-screen relative">
      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-0 left-1/2 -translate-x-1/2 z-[100] bg-emerald-500 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3"
          >
            <CheckCircle2 size={18} />
            <span className="text-sm font-bold">{showSuccess}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">我的书架</h1>
        <div className="flex gap-4">
          <button 
            onClick={() => navigate('/reading-report')}
            className="p-2 bg-slate-50 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <Clock size={20} />
          </button>
          <button 
            onClick={() => navigate('/search')}
            className="p-2 bg-[#1F2B6C] rounded-full text-white shadow-lg shadow-blue-900/20 hover:bg-blue-800 transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-slate-100">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 text-sm font-bold transition-all relative ${
              activeTab === tab.id ? 'text-blue-600' : 'text-slate-400'
            }`}
          >
            {tab.name} ({tab.count})
            {activeTab === tab.id && (
              <motion.div layoutId="shelfTab" className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-6">
        {currentBooks.length > 0 ? (
          <div className="flex flex-col gap-6">
            {currentBooks.map(book => (
              <motion.div 
                key={book.id} 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[32px] p-4 shadow-sm border border-slate-100 flex gap-4"
              >
                <div 
                  onClick={() => navigate(`/book/${book.id}`)}
                  className="w-24 h-32 rounded-2xl overflow-hidden shadow-md flex-shrink-0 cursor-pointer"
                >
                  <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div 
                    onClick={() => navigate(`/book/${book.id}`)}
                    className="cursor-pointer"
                  >
                    <h3 className="text-sm font-black text-slate-900 line-clamp-1">{book.title}</h3>
                    <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">{book.author}</p>
                  </div>

                  {activeTab === 'current' && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                        <span>阅读进度 (Progress)</span>
                        <span>{book.progress || 0}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${book.progress || 0}%` }} />
                      </div>
                      <div className="flex gap-2 mt-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRenew(book.id);
                          }}
                          className="flex-1 bg-blue-50 text-blue-600 text-[10px] font-black py-2 rounded-xl hover:bg-blue-100 transition-colors"
                        >
                          续借 (Renew)
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReturn(book.id);
                          }}
                          className="flex-1 bg-slate-50 text-slate-500 text-[10px] font-black py-2 rounded-xl hover:bg-slate-100 transition-colors"
                        >
                          归还 (Return)
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setPushingBook(book);
                          }}
                          className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-colors"
                        >
                          <DownloadCloud size={14} />
                        </button>
                      </div>
                    </div>
                  )}

                  {activeTab === 'reserved' && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-orange-500 uppercase tracking-wider">
                        <Clock size={12} />
                        <span>预计 3 天后可借 (Est. 3 days)</span>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCancelReservation(book.id);
                        }}
                        className="w-full bg-orange-50 text-orange-600 text-[10px] font-black py-2 rounded-xl hover:bg-orange-100 transition-colors"
                      >
                        取消预约 (Cancel)
                      </button>
                    </div>
                  )}

                  {activeTab === 'history' && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500 uppercase tracking-wider">
                        <CheckCircle2 size={12} />
                        <span>已归还</span>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReborrow(book.id);
                        }}
                        className="w-full bg-emerald-50 text-emerald-600 text-[10px] font-black py-2 rounded-xl hover:bg-emerald-100 transition-colors"
                      >
                        再次借阅 (Re-borrow)
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 gap-4 opacity-40">
            <Bookmark size={64} className="text-slate-300" />
            <p className="text-sm font-bold text-slate-500">暂无相关记录</p>
          </div>
        )}

        {activeTab === 'current' && borrowedBooks.length < 5 && (
          <div className="mt-8 p-8 bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-4 text-center">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-300 shadow-sm">
              <Search size={32} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">借阅额度充足</p>
              <p className="text-xs text-slate-400 font-medium mt-1">去书城发现更多好书吧</p>
            </div>
            <button 
              onClick={() => navigate('/search')}
              className="bg-[#1F2B6C] text-white text-xs font-bold px-8 py-3 rounded-xl shadow-lg shadow-blue-900/10 hover:bg-blue-800 transition-all"
            >
              前往书城
            </button>
          </div>
        )}
      </div>

      {/* Push to Device Modal */}
      <AnimatePresence>
        {pushingBook && (
          <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPushingBook(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="relative w-full max-w-lg bg-white rounded-t-[40px] sm:rounded-[40px] p-8 shadow-2xl"
            >
              <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-8 sm:hidden" />
              <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2">推送至设备 (Push to Device)</h3>
              <p className="text-xs text-slate-400 font-bold mb-8 uppercase tracking-wider">选择您要推送的阅读终端</p>

              <div className="space-y-4">
                {devices.map((device, i) => (
                  <button 
                    key={i}
                    onClick={() => handlePush(device.name)}
                    className="w-full flex items-center justify-between p-5 bg-slate-50 rounded-[24px] border border-slate-100 hover:bg-blue-50 hover:border-blue-100 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:text-blue-500 shadow-sm">
                        <DownloadCloud size={24} />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-black text-slate-900">{device.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{device.type}</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-500" />
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setPushingBook(null)}
                className="w-full bg-slate-100 text-slate-500 font-black py-4 rounded-2xl mt-8 hover:bg-slate-200 transition-all"
              >
                取消 (Cancel)
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Quick Stats */}
      <div 
        onClick={() => navigate('/reading-notes')}
        className="mt-auto pt-8 flex justify-between items-center px-2 cursor-pointer group"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors">
            <Edit3 size={16} />
          </div>
          <span className="text-xs font-bold text-slate-600">阅读笔记 ({notes.length})</span>
        </div>
        <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
      </div>
    </div>
  );
};

export default Bookshelf;
