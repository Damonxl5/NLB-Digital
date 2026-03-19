
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Share2, Bookmark, Star, BookOpen, Clock, ArrowRight, Smartphone, Tablet, DownloadCloud, Bot, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLibrary } from '../context/LibraryContext';

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { books, borrowBook, reserveBook, cancelReservation } = useLibrary();
  const book = books.find(b => b.id === id) || books[0];
  
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showPushModal, setShowPushModal] = useState(false);
  const [isPushing, setIsPushing] = useState(false);

  const handleAction = () => {
    if (book.status === 'available') {
      borrowBook(book.id);
      navigate(`/reader/${book.id}`);
    } else if (book.status === 'borrowed') {
      navigate(`/reader/${book.id}`);
    } else if (book.status === 'reserved') {
      cancelReservation(book.id);
    } else {
      reserveBook(book.id);
    }
  };

  const handlePush = () => {
    setIsPushing(true);
    setTimeout(() => {
      setIsPushing(false);
      setShowPushModal(false);
      alert('推送成功！请在您的设备上查看。');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative pb-12">
      {/* Header Overlay */}
      <header className="fixed top-0 w-full max-w-md flex justify-between items-center p-6 z-50">
        <button onClick={() => navigate(-1)} className="p-3 bg-white/80 backdrop-blur-md rounded-full text-slate-900 shadow-sm border border-slate-100 hover:bg-white transition-colors">
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-3">
          <button onClick={() => setIsBookmarked(!isBookmarked)} className={`p-3 bg-white/80 backdrop-blur-md rounded-full shadow-sm border border-slate-100 transition-colors ${isBookmarked ? 'text-blue-600' : 'text-slate-900'}`}>
            <Bookmark size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>
          <button className="p-3 bg-white/80 backdrop-blur-md rounded-full text-slate-900 shadow-sm border border-slate-100 hover:bg-white transition-colors">
            <Share2 size={20} />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative w-full h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/90 z-10" />
        <img src={book.cover} alt={book.title} className="w-full h-full object-cover blur-[2px] scale-110 opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center z-20 pt-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-48 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
          >
            <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-t-[40px] -mt-12 relative z-30 p-8 flex flex-col gap-8 shadow-2xl">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-black text-slate-900 leading-tight tracking-tight">{book.title}</h1>
          <p className="text-sm font-bold text-blue-600 uppercase tracking-widest">{book.author} · {book.tags[0]}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center gap-1 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-1 text-amber-400">
              <Star size={14} fill="currentColor" />
              <span className="text-sm font-black text-slate-900">{book.rating}</span>
            </div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">评分</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-sm font-black text-slate-900">{book.pages}p</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">页数</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-sm font-black text-slate-900">{book.language}</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">语种</span>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-3">
          <h3 className="text-lg font-black text-slate-900 tracking-tight">内容简介</h3>
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            {book.description}
          </p>
        </div>

        {/* Push to Device */}
        <div className="space-y-4">
          <h3 className="text-lg font-black text-slate-900 tracking-tight">设备推送</h3>
          <div className="flex gap-4">
            <button onClick={() => setShowPushModal(true)} className="flex-1 flex items-center justify-center gap-2 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors">
              <Tablet size={18} /> 推送至 Kindle
            </button>
            <button onClick={() => setShowPushModal(true)} className="flex-1 flex items-center justify-center gap-2 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors">
              <Smartphone size={18} /> 手机离线下载
            </button>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 space-y-4">
          <button
            onClick={handleAction}
            className={`w-full font-bold py-5 rounded-2xl shadow-xl flex items-center justify-center gap-3 group transition-all ${
              book.status === 'available' ? 'bg-[#1F2B6C] text-white shadow-blue-900/20 hover:bg-blue-800' :
              book.status === 'borrowed' ? 'bg-emerald-500 text-white shadow-emerald-900/20 hover:bg-emerald-600' :
              book.status === 'reserved' ? 'bg-rose-500 text-white shadow-rose-900/20 hover:bg-rose-600' :
              'bg-slate-200 text-slate-500'
            }`}
          >
            <BookOpen size={22} />
            {book.status === 'available' ? '立即借阅并阅读' : 
             book.status === 'borrowed' ? '继续阅读' : 
             book.status === 'reserved' ? '取消预约' : '立即预约'}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          {/* AI Help Entry */}
          <button 
            onClick={() => navigate('/ai-chat')}
            className="w-full flex items-center justify-center gap-2 py-3 bg-slate-50 rounded-xl text-slate-500 text-xs font-bold hover:bg-slate-100 transition-colors border border-slate-100"
          >
            <Bot size={16} className="text-blue-500" />
            遇到借阅问题？咨询 AI 助手
            <HelpCircle size={14} className="text-slate-300" />
          </button>

          <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-4">
            {book.status === 'borrowed' ? `借阅中 · 还书日期 ${book.returnDate}` : '借阅期限 21 天 · 剩余借阅额度 8/16'}
          </p>
        </div>
      </div>


      {/* Push Modal */}
      <AnimatePresence>
        {showPushModal && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPushModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="w-full max-w-md bg-white rounded-[40px] p-8 z-10 space-y-6 shadow-2xl"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">选择推送设备</h3>
                <button onClick={() => setShowPushModal(false)} className="text-slate-400 font-bold">关闭</button>
              </div>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-5 bg-blue-50 border-2 border-blue-500 rounded-3xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white">
                      <Tablet size={24} />
                    </div>
                    <div className="text-left">
                      <p className="font-black text-slate-900">My Kindle Paperwhite</p>
                      <p className="text-[10px] text-blue-600 font-bold uppercase">在线 · 刚刚同步过</p>
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full border-2 border-blue-500 flex items-center justify-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  </div>
                </button>
                <button className="w-full flex items-center justify-between p-5 bg-slate-50 border-2 border-transparent rounded-3xl opacity-60">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-200 rounded-2xl flex items-center justify-center text-slate-500">
                      <Smartphone size={24} />
                    </div>
                    <div className="text-left">
                      <p className="font-black text-slate-900">文石 Leaf 3</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">离线 · 2026-03-15</p>
                    </div>
                  </div>
                </button>
              </div>
              <button 
                onClick={handlePush}
                disabled={isPushing}
                className="w-full bg-[#1F2B6C] text-white font-bold py-5 rounded-2xl shadow-xl shadow-blue-900/20 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isPushing ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  >
                    <DownloadCloud size={20} />
                  </motion.div>
                ) : (
                  <DownloadCloud size={20} />
                )}
                {isPushing ? '正在推送...' : '确认推送'}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookDetails;
