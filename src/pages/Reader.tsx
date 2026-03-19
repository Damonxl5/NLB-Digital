
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X, Settings, List, Bookmark, Share2, Send, Type, Check, Plus, Edit3 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLibrary } from '../context/LibraryContext';

const Reader: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { books, updateProgress, readerSettings, updateReaderSettings, notes, addNote } = useLibrary();
  const book = books.find(b => b.id === id) || books[0];
  
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showToc, setShowToc] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [progress, setProgress] = useState(book.progress || 0);

  const { fontSize, theme } = readerSettings;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showControls && !showSettings && !showToc && !showNotes) {
      timer = setTimeout(() => {
        setShowControls(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showControls, showSettings, showToc, showNotes]);

  const toggleControls = () => {
    if (showSettings || showToc || showNotes) {
      setShowSettings(false);
      setShowToc(false);
      setShowNotes(false);
    } else {
      setShowControls(!showControls);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setProgress(val);
    updateProgress(book.id, val);
  };

  const themes = {
    light: {
      bg: 'bg-white',
      text: 'text-slate-900',
      controls: 'bg-white/90 border-slate-100',
      accent: 'bg-slate-100',
      sub: 'text-slate-400'
    },
    dark: {
      bg: 'bg-slate-950',
      text: 'text-slate-200',
      controls: 'bg-slate-900/90 border-slate-800',
      accent: 'bg-slate-800',
      sub: 'text-slate-500'
    },
    sepia: {
      bg: 'bg-[#F4ECD8]',
      text: 'text-[#5B4636]',
      controls: 'bg-[#E8DFCA]/90 border-[#D8CDB5]',
      accent: 'bg-[#E8DFCA]',
      sub: 'text-[#8C7A66]'
    },
  };

  const currentTheme = themes[theme];

  const toc = [
    { title: '第一章：智能的黎明', page: 1 },
    { title: '第二章：从算法到共情', page: 24 },
    { title: '第三章：数字伦理的边界', page: 56 },
    { title: '第四章：共生时代的开启', page: 89 },
  ];

  const bookNotes = notes.filter(n => n.bookId === book.id);

  const handleAddNote = () => {
    if (!newNoteContent.trim()) return;
    addNote({
      bookId: book.id,
      bookTitle: book.title,
      content: newNoteContent
    });
    setNewNoteContent('');
    setIsAddingNote(false);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${currentTheme.bg} ${currentTheme.text}`}>
      {/* Top Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className={`fixed top-0 w-full max-w-md ${currentTheme.controls} backdrop-blur-md border-b flex justify-between items-center p-4 z-50 ${currentTheme.text}`}
          >
            <button onClick={() => navigate(-1)} className={`p-2 hover:${currentTheme.accent} rounded-full transition-colors`}>
              <X size={24} />
            </button>
            <div className="flex flex-col items-center">
              <span className={`text-[10px] font-black ${currentTheme.sub} uppercase tracking-widest`}>第一章：智能的黎明</span>
              <h1 className="text-xs font-bold line-clamp-1 max-w-[150px]">{book.title}</h1>
            </div>
            <button onClick={() => setShowSettings(!showSettings)} className={`p-2 hover:${currentTheme.accent} rounded-full transition-colors ${showSettings ? 'text-blue-500' : ''}`}>
              <Settings size={24} />
            </button>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Content Area */}
      <main 
        className="flex-1 p-8 pt-24 pb-32 overflow-y-auto scrollbar-hide cursor-pointer"
        onClick={toggleControls}
      >
        <div className="max-w-prose mx-auto space-y-8 select-none">
          <h2 className="font-black tracking-tight mb-12 leading-tight" style={{ fontSize: `${fontSize + 8}px` }}>第一节：重构感知系统的逻辑</h2>
          
          <p className="leading-relaxed font-medium" style={{ fontSize: `${fontSize}px` }}>
            在 2026 年的今天，正如我们所见，感知系统已不仅仅是数据的搬运工。它正在成为一个能够自主过滤干扰、识别语境的“神经网络”。新加坡智能实验室的研究表明...
          </p>
          
          <p className="leading-relaxed font-medium" style={{ fontSize: `${fontSize}px` }}>
            每一个节点，都在尝试模拟人类大脑在处理复杂视觉信号时的优先选择过程。这种重构意味着，未来的数字交互将不再依赖于硬性的指令集，而是基于极高弹性的模糊逻辑。
          </p>

          <blockquote className={`border-l-4 border-blue-500 pl-6 py-2 italic ${currentTheme.sub}`}>
            “技术不应该是冰冷的壁垒，而应该是感知的扩音器。” —— 智能研究前沿 (2025)
          </blockquote>

          <p className="leading-relaxed font-medium" style={{ fontSize: `${fontSize}px` }}>
            当我们谈论重构时，我们谈论的是一种范式的转移。从“被动接收”到“主动理解”，这不仅是算法的进步，更是人类对机器认知边界的重新定义。
          </p>
          
          <p className="leading-relaxed font-medium" style={{ fontSize: `${fontSize}px` }}>
            感知系统的重构还涉及到跨模态的数据融合。通过将视觉、听觉甚至触觉反馈整合进统一的认知模型，我们能够创造出更加自然、直观的交互体验。
          </p>

          <p className="leading-relaxed font-medium" style={{ fontSize: `${fontSize}px` }}>
            在新加坡这个高度数字化的城市国家，这种技术的应用场景无处不在。从智能交通管理到个性化的医疗建议，重构后的感知系统正在悄然改变着我们的生活方式。
          </p>

          <div className="py-12 flex justify-center">
            <div className={`w-12 h-1 rounded-full ${currentTheme.accent}`}></div>
          </div>

          <h2 className="font-black tracking-tight mb-8 leading-tight" style={{ fontSize: `${fontSize + 6}px` }}>第二节：从算法到共情的跨越</h2>

          <p className="leading-relaxed font-medium" style={{ fontSize: `${fontSize}px` }}>
            如果说第一阶段是逻辑的重构，那么第二阶段则是情感的注入。我们不再仅仅追求机器的“聪明”，而开始探索机器的“共情”。
          </p>
        </div>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {showToc && (
          <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center p-0 sm:p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowToc(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className={`relative w-full max-w-lg ${currentTheme.controls} rounded-t-[40px] sm:rounded-[40px] p-8 shadow-2xl`}
            >
              <h3 className="text-xl font-black mb-8 tracking-tight">目录 (Contents)</h3>
              <div className="space-y-4">
                {toc.map((item, i) => (
                  <button 
                    key={i}
                    onClick={() => setShowToc(false)}
                    className={`w-full flex justify-between items-center p-4 rounded-2xl hover:${currentTheme.accent} transition-colors`}
                  >
                    <span className="text-sm font-bold">{item.title}</span>
                    <span className={`text-[10px] font-bold ${currentTheme.sub}`}>PAGE {item.page}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {showNotes && (
          <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center p-0 sm:p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setShowNotes(false); setIsAddingNote(false); }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className={`relative w-full max-w-lg ${currentTheme.controls} rounded-t-[40px] sm:rounded-[40px] p-8 shadow-2xl flex flex-col max-h-[80vh]`}
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black tracking-tight">阅读笔记 (Notes)</h3>
                <button 
                  onClick={() => setIsAddingNote(!isAddingNote)}
                  className="p-2 bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-500/20"
                >
                  <Plus size={20} />
                </button>
              </div>

              <div className="space-y-4 overflow-y-auto pr-2 flex-1">
                <AnimatePresence>
                  {isAddingNote && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-3 mb-6"
                    >
                      <textarea 
                        autoFocus
                        value={newNoteContent}
                        onChange={(e) => setNewNoteContent(e.target.value)}
                        placeholder="写下您的感悟..."
                        className={`w-full p-4 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none ${currentTheme.accent}`}
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setIsAddingNote(false)}
                          className="flex-1 py-3 rounded-xl font-bold text-xs bg-slate-100 text-slate-500"
                        >
                          取消
                        </button>
                        <button 
                          onClick={handleAddNote}
                          className="flex-1 py-3 rounded-xl font-bold text-xs bg-blue-500 text-white"
                        >
                          保存笔记
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {bookNotes.length > 0 ? (
                  bookNotes.map((note) => (
                    <div key={note.id} className={`p-4 rounded-2xl ${currentTheme.accent} space-y-2`}>
                      <p className="text-sm font-medium leading-relaxed italic">“{note.content}”</p>
                      <p className={`text-[10px] font-bold ${currentTheme.sub}`}>{note.date}</p>
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center space-y-2">
                    <Edit3 className={`w-12 h-12 mx-auto ${currentTheme.sub} opacity-20`} />
                    <p className={`text-sm font-bold ${currentTheme.sub}`}>暂无笔记，点击右上角添加</p>
                  </div>
                )}
              </div>
              
              {bookNotes.length > 0 && (
                <button className="w-full bg-blue-500 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-900/20 mt-6">
                  导出全部 (Export)
                </button>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.footer
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className={`fixed bottom-0 w-full max-w-md ${currentTheme.controls} backdrop-blur-md border-t p-6 z-50 ${currentTheme.text}`}
          >
            <div className="flex flex-col gap-6">
              {/* Settings Panel */}
              <AnimatePresence>
                {showSettings && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-6 pb-4 overflow-hidden"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold ${currentTheme.sub} uppercase tracking-wider`}>字体大小</span>
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={(e) => { e.stopPropagation(); updateReaderSettings({ fontSize: Math.max(12, fontSize - 2) }); }} 
                          className={`w-8 h-8 rounded-lg ${currentTheme.accent} flex items-center justify-center font-bold`}
                        >-</button>
                        <span className="text-sm font-black w-6 text-center">{fontSize}</span>
                        <button 
                          onClick={(e) => { e.stopPropagation(); updateReaderSettings({ fontSize: Math.min(32, fontSize + 2) }); }} 
                          className={`w-8 h-8 rounded-lg ${currentTheme.accent} flex items-center justify-center font-bold`}
                        >+</button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold ${currentTheme.sub} uppercase tracking-wider`}>阅读主题</span>
                      <div className="flex gap-3">
                        {(['light', 'sepia', 'dark'] as const).map(t => (
                          <button 
                            key={t}
                            onClick={(e) => { e.stopPropagation(); updateReaderSettings({ theme: t }); }}
                            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                              t === 'light' ? 'bg-white' : t === 'sepia' ? 'bg-[#F4ECD8]' : 'bg-slate-900'
                            } ${theme === t ? 'border-blue-500 scale-110' : 'border-transparent'}`}
                          >
                            {theme === t && <Check size={16} className={t === 'dark' ? 'text-white' : 'text-blue-500'} />}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Progress Slider */}
              <div className="flex items-center gap-4" onClick={(e) => e.stopPropagation()}>
                <span className={`text-[10px] font-bold ${currentTheme.sub}`}>{progress}%</span>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={progress} 
                  onChange={handleProgressChange}
                  className={`flex-1 h-1.5 ${currentTheme.accent} rounded-full appearance-none cursor-pointer accent-blue-600`}
                />
                <span className={`text-[10px] font-bold ${currentTheme.sub}`}>{100 - progress}%</span>
              </div>

              {/* Toolbar */}
              <div className="flex justify-between items-center">
                <button 
                  onClick={(e) => { e.stopPropagation(); setShowToc(true); }}
                  className={`flex flex-col items-center gap-1 ${showToc ? 'text-blue-600' : currentTheme.sub} hover:text-blue-600 transition-colors`}
                >
                  <List size={22} />
                  <span className="text-[10px] font-bold">目录</span>
                </button>
                <button className={`flex flex-col items-center gap-1 ${currentTheme.sub} hover:text-blue-600 transition-colors`}>
                  <Bookmark size={22} />
                  <span className="text-[10px] font-bold">书签</span>
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setShowSettings(!showSettings); }} 
                  className={`flex flex-col items-center gap-1 transition-colors ${showSettings ? 'text-blue-600' : currentTheme.sub}`}
                >
                  <Type size={22} />
                  <span className="text-[10px] font-bold">设置</span>
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setShowNotes(true); }}
                  className={`flex flex-col items-center gap-1 ${showNotes ? 'text-blue-600' : currentTheme.sub} hover:text-blue-600 transition-colors`}
                >
                  <Share2 size={22} />
                  <span className="text-[10px] font-bold">笔记</span>
                </button>
                <button className={`flex flex-col items-center gap-1 ${currentTheme.sub} hover:text-blue-600 transition-colors`}>
                  <Send size={22} />
                  <span className="text-[10px] font-bold">推送</span>
                </button>
              </div>
            </div>
          </motion.footer>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Reader;
