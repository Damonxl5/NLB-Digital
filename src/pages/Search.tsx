
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Search as SearchIcon, Filter, BookOpen, Bot, Sparkles,
  TrendingUp, Zap, Smile, History, Palette, Cpu, Heart, Map, Coffee
} from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';
import { CATEGORIES } from '../data/mockData';
import BookCard from '../components/BookCard';
import { motion, AnimatePresence } from 'motion/react';

const Search: React.FC = () => {
  const { books } = useLibrary();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('q') || '';
  const initialCat = queryParams.get('cat') || 'all';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState(initialCat);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchHistory, setSearchHistory] = useState(['三体', '新加坡历史', 'Python编程', '东野圭吾']);
  const [hotSearches] = useState(['流浪地球', '哈利波特', '理财入门', '心理学', '美食摄影', '人工智能']);
  const ITEMS_PER_PAGE = 10;

  const categoryFilters = [
    { id: 'all', name: '全部', icon: 'BookOpen' },
    ...CATEGORIES
  ];

  const getCategoryIcon = (iconName: string, size = 14) => {
    const props = { size };
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

  const filteredBooks = books.filter(book => {
    const matchesSearch = 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTab = 
      activeTab === 'all' || book.category === activeTab;

    return matchesSearch && matchesTab;
  });

  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);
  const currentBooks = filteredBooks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setSearchQuery(initialQuery);
    setCurrentPage(1);
  }, [initialQuery]);

  useEffect(() => {
    setActiveTab(initialCat);
    setCurrentPage(1);
  }, [initialCat]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setCurrentPage(1);
    const params = new URLSearchParams(location.search);
    if (tabId === 'all') {
      params.delete('cat');
    } else {
      params.set('cat', tabId);
    }
    navigate(`/search?${params.toString()}`, { replace: true });
  };

  const clearHistory = () => setSearchHistory([]);

  return (
    <div className="flex flex-col gap-6 p-6 bg-white min-h-screen pb-24">
      {/* Search Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <SearchIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索书名、作者或关键词"
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
          />
        </div>
        <button 
          onClick={() => setIsFilterOpen(true)}
          className="p-4 bg-slate-50 rounded-2xl text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <Filter size={20} />
        </button>
      </div>

      {/* Filter Modal */}
      <AnimatePresence>
        {isFilterOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="relative w-full max-w-lg bg-white rounded-t-[40px] sm:rounded-[40px] p-8 shadow-2xl"
            >
              <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-8 sm:hidden" />
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">筛选条件 (Filters)</h3>
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="text-xs font-bold text-blue-600"
                >
                  重置
                </button>
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">语言 (Language)</h4>
                  <div className="flex flex-wrap gap-3">
                    {['中文', 'English', 'Malay', 'Tamil'].map(lang => (
                      <button key={lang} className="px-4 py-2 rounded-xl bg-slate-50 text-slate-600 text-xs font-bold border border-slate-100 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-all">
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">格式 (Format)</h4>
                  <div className="flex flex-wrap gap-3">
                    {['EPUB', 'PDF', 'Audiobook', 'Magazine'].map(fmt => (
                      <button key={fmt} className="px-4 py-2 rounded-xl bg-slate-50 text-slate-600 text-xs font-bold border border-slate-100 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-all">
                        {fmt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">出版年份 (Year)</h4>
                  <div className="flex flex-wrap gap-3">
                    {['2024', '2023', '2022', '2021', '更早'].map(year => (
                      <button key={year} className="px-4 py-2 rounded-xl bg-slate-50 text-slate-600 text-xs font-bold border border-slate-100 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-all">
                        {year}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setIsFilterOpen(false)}
                className="w-full bg-[#1F2B6C] text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-900/20 mt-10 hover:bg-blue-800 transition-all"
              >
                应用筛选 (Apply)
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Search Suggestions (History & Hot) */}
      {!searchQuery && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          {searchHistory.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <History size={14} />
                  搜索历史
                </h3>
                <button onClick={clearHistory} className="text-[10px] font-bold text-slate-400 hover:text-rose-500">清空</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {searchHistory.map(item => (
                  <button 
                    key={item}
                    onClick={() => setSearchQuery(item)}
                    className="px-4 py-2 bg-slate-50 text-slate-600 text-xs font-bold rounded-xl border border-slate-100 hover:bg-slate-100 transition-all"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
              <TrendingUp size={14} />
              热门搜索
            </h3>
            <div className="flex flex-wrap gap-2">
              {hotSearches.map((item, i) => (
                <button 
                  key={item}
                  onClick={() => setSearchQuery(item)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all flex items-center gap-2 ${
                    i < 3 
                      ? 'bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100' 
                      : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100'
                  }`}
                >
                  {i < 3 && <Sparkles size={12} />}
                  {item}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* AI Recommendation Banner */}
      {searchQuery && (
        <motion.div 
          whileHover={{ scale: 1.01 }}
          onClick={() => navigate('/ai-chat')}
          className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center gap-4 cursor-pointer group"
        >
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <Bot size={24} />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-black text-blue-900">AI 智能荐书</h4>
            <p className="text-[10px] text-blue-600/70 font-bold">没找到想读的？让 AI 帮您精准匹配</p>
          </div>
          <Sparkles size={16} className="text-blue-400 group-hover:animate-spin" />
        </motion.div>
      )}

      {/* Filter Tabs */}
      {searchQuery && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-6 px-6">
          {categoryFilters.map(filter => (
            <button
              key={filter.id}
              onClick={() => handleTabChange(filter.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === filter.id 
                  ? 'bg-[#1F2B6C] text-white shadow-lg shadow-blue-900/20' 
                  : 'bg-slate-50 text-slate-500 border border-slate-100 hover:bg-slate-100'
              }`}
            >
              {getCategoryIcon(filter.icon, 14)}
              {filter.name}
            </button>
          ))}
        </div>
      )}

      {/* Results Info */}
      {searchQuery && (
        <div className="px-1 flex justify-between items-center">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
            找到 {filteredBooks.length} 本相关书籍
          </p>
          {totalPages > 1 && (
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              第 {currentPage} / {totalPages} 页
            </p>
          )}
        </div>
      )}

      {/* Results */}
      {searchQuery && (
        <div className="flex flex-col gap-6">
          {currentBooks.map(book => (
            <BookCard key={book.id} book={book} variant="horizontal" />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {searchQuery && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-50 text-slate-600 border border-slate-100 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 transition-all"
          >
            上一页
          </button>
          
          <div className="flex gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum = currentPage;
              if (currentPage <= 3) pageNum = i + 1;
              else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
              else pageNum = currentPage - 2 + i;
              
              if (pageNum <= 0 || pageNum > totalPages) return null;

              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                    currentPage === pageNum
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                      : 'bg-slate-50 text-slate-500 border border-slate-100 hover:bg-slate-100'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-50 text-slate-600 border border-slate-100 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 transition-all"
          >
            下一页
          </button>
        </div>
      )}

      {/* Empty State */}
      {searchQuery && filteredBooks.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4 opacity-40">
          <BookOpen size={64} className="text-slate-300" />
          <p className="text-sm font-bold text-slate-500">未找到相关书籍</p>
        </div>
      )}
    </div>
  );
};

export default Search;
