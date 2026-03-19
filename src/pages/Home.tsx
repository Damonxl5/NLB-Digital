
import React, { useState } from 'react';
import { 
  Search, Bell, ChevronRight, BookOpen, TrendingUp, Zap, Smile, 
  History, Palette, Cpu, Heart, Map, Coffee, ChevronDown, ChevronUp, Bot
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import { useLibrary } from '../context/LibraryContext';
import { CATEGORIES, TOPICS } from '../data/mockData';
import BookCard from '../components/BookCard';

const Home: React.FC = () => {
  const { books, user, borrowedBooks } = useLibrary();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllCategories, setShowAllCategories] = useState(false);

  const featuredBooks = books.filter(b => b.tags.includes('NLB 联合推荐') || b.id === '1').slice(0, 3);
  const recommendedBooks = books.filter(b => b.status === 'available').slice(0, 5);

  const getCategoryIcon = (iconName: string) => {
    const props = { size: 24 };
    switch (iconName) {
      case 'BookOpen': return <BookOpen {...props} />;
      case 'TrendingUp': return <TrendingUp {...props} />;
      case 'Zap': return <Zap {...props} />;
      case 'Smile': return <Smile {...props} />;
      case 'History': return <History {...props} />;
      case 'Palette': return <Palette {...props} />;
      case 'Cpu': return <Cpu {...props} />;
      case 'Heart': return <Heart {...props} />;
      case 'Map': return <Map {...props} />;
      case 'Coffee': return <Coffee {...props} />;
      default: return <BookOpen {...props} />;
    }
  };

  const getCategoryColor = (idx: number) => {
    const colors = [
      'bg-orange-50 text-orange-500',
      'bg-blue-50 text-blue-500',
      'bg-emerald-50 text-emerald-500',
      'bg-purple-50 text-purple-500',
      'bg-rose-50 text-rose-500',
      'bg-amber-50 text-amber-500',
      'bg-indigo-50 text-indigo-500',
      'bg-pink-50 text-pink-500',
      'bg-cyan-50 text-cyan-500',
      'bg-slate-50 text-slate-500',
    ];
    return colors[idx % colors.length];
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="flex flex-col gap-8 p-6 bg-white min-h-screen pb-24">
      {/* Header */}
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-100 shadow-sm">
            <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-900 leading-tight">NLB Digital</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">智慧阅读 · 联接未来</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => navigate('/notifications')}
            className="relative p-2 bg-slate-50 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
          </button>
        </div>
      </header>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="搜索关键词 / 书名 / 作者 / ISBN"
          className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-slate-400"
        />
      </form>

      {/* Continue Reading */}
      {borrowedBooks.length > 0 && (
        <section className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">继续阅读 (Continue)</h3>
            <Link to="/bookshelf" className="text-xs font-bold text-blue-600">查看全部</Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6">
            {borrowedBooks.slice(0, 2).map(book => (
              <motion.div 
                key={book.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/reader/${book.id}`)}
                className="flex-shrink-0 w-[280px] bg-white rounded-[32px] p-4 shadow-sm border border-slate-100 flex gap-4"
              >
                <div className="w-16 h-24 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                  <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-center gap-2">
                  <h4 className="text-xs font-black text-slate-900 line-clamp-1">{book.title}</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[8px] font-bold text-blue-500 uppercase tracking-wider">
                      <span>已读 45%</span>
                      <span>第 12 章</span>
                    </div>
                    <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '45%' }} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* AI Assistant Banner */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        onClick={() => navigate('/ai-chat')}
        className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl cursor-pointer group"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Bot size={120} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-white/20 backdrop-blur-md rounded text-[10px] font-black uppercase tracking-widest">AI Powered</span>
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          </div>
          <h3 className="text-xl font-black mb-1">智能 AI 助手</h3>
          <p className="text-white/70 text-xs font-medium mb-4">不知道读什么？试试让 AI 为您推荐专属书单</p>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest group-hover:gap-3 transition-all">
            立即咨询 <ChevronRight size={14} />
          </div>
        </div>
      </motion.div>

      {/* Categories */}
      <section className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-lg font-black text-slate-900 tracking-tight">热门分类</h3>
          <button 
            onClick={() => setShowAllCategories(!showAllCategories)}
            className="text-xs text-blue-600 font-bold flex items-center gap-1 hover:underline"
          >
            {showAllCategories ? '收起' : '全部'} {showAllCategories ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
        
        <AnimatePresence mode="wait">
          {showAllCategories ? (
            <motion.div 
              key="grid"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-4 gap-y-6 gap-x-4 overflow-hidden"
            >
              {CATEGORIES.map((cat, idx) => (
                <motion.button
                  key={cat.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/search?cat=${cat.id}`)}
                  className="flex flex-col items-center gap-2"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border border-slate-50 ${getCategoryColor(idx)}`}>
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <span className="text-xs font-bold text-slate-600 text-center">{cat.name}</span>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="row"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-6 px-6"
            >
              {CATEGORIES.map((cat, idx) => (
                <motion.button
                  key={cat.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/search?cat=${cat.id}`)}
                  className="flex flex-col items-center gap-2 min-w-[64px]"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border border-slate-50 ${getCategoryColor(idx)}`}>
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <span className="text-xs font-bold text-slate-600 text-center">{cat.name}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 精选专题 */}
      <section className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">精选专题</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Special Curations</p>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {TOPICS.map(topic => (
            <motion.div 
              key={topic.id}
              whileHover={{ y: -4 }}
              className="group relative h-48 w-full rounded-3xl overflow-hidden shadow-sm border border-slate-100"
            >
              <img 
                src={topic.image} 
                alt={topic.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="flex gap-2 mb-2">
                  {topic.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-blue-500/80 backdrop-blur-sm text-white text-[8px] font-bold rounded uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
                <h4 className="text-white font-black text-lg leading-tight mb-1">{topic.title}</h4>
                <div className="flex justify-between items-center">
                  <p className="text-white/70 text-[10px] font-medium line-clamp-1 flex-1 mr-4">{topic.subtitle}</p>
                  <button 
                    onClick={() => navigate(`/topic/${topic.id}`)}
                    className="px-3 py-1.5 bg-white text-slate-900 text-[10px] font-black rounded-full hover:bg-blue-50 transition-colors whitespace-nowrap"
                  >
                    查看专题
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 基于您的兴趣推荐 */}
      <section className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-lg font-black text-slate-900 tracking-tight">基于您的兴趣推荐</h3>
        </div>
        <div className="flex flex-col gap-4">
          {recommendedBooks.map(book => (
            <BookCard key={book.id} book={book} variant="horizontal" />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
