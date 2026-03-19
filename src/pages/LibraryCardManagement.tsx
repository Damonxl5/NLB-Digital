
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, Plus, CreditCard, ShieldCheck, 
  AlertCircle, Trash2, CheckCircle2, Info
} from 'lucide-react';
import { USER } from '../data/mockData';

const LibraryCardManagement: React.FC = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([
    { id: '1', name: USER.name, number: USER.id, type: '主卡', isPrimary: true },
    { id: '2', name: '李小华', number: 'NLB-98XXXX12', type: '家属卡', isPrimary: false },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newCard, setNewCard] = useState({ name: '', number: '' });

  const removeCard = (id: string) => {
    setCards(prev => prev.filter(c => c.id !== id));
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCard.name && newCard.number) {
      setCards(prev => [...prev, {
        id: Date.now().toString(),
        name: newCard.name,
        number: newCard.number,
        type: '家属卡',
        isPrimary: false
      }]);
      setNewCard({ name: '', number: '' });
      setIsAdding(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-4 flex items-center gap-3">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
        >
          <ChevronLeft size={24} className="text-slate-600" />
        </button>
        <h1 className="text-xl font-black text-slate-900 tracking-tight">借书证管理</h1>
      </header>

      <div className="p-6 space-y-8">
        {/* Card List */}
        <section className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">已绑定的借书证</h3>
            <button className="text-xs font-bold text-blue-600 flex items-center gap-1">
              <Plus size={14} />
              添加新卡
            </button>
          </div>
          
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {cards.map((card) => (
                <motion.div
                  key={card.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 relative overflow-hidden group"
                >
                  <div className="flex justify-between items-start relative z-10">
                    <div className="flex gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        card.isPrimary ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'
                      }`}>
                        <CreditCard size={24} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-black text-slate-900">{card.name}</h4>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            card.isPrimary ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {card.type}
                          </span>
                        </div>
                        <p className="text-[10px] font-mono font-bold text-slate-400 mt-1 tracking-widest">{card.number}</p>
                      </div>
                    </div>
                    {!card.isPrimary && (
                      <button 
                        onClick={() => removeCard(card.id)}
                        className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                  
                  {card.isPrimary && (
                    <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500 uppercase tracking-wider">
                        <ShieldCheck size={14} />
                        <span>实名认证已通过</span>
                      </div>
                      <button className="text-[10px] font-black text-blue-600 uppercase tracking-wider">
                        查看电子证
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Borrowing Rules */}
        <section className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">借阅规则说明</h3>
          <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <p className="text-sm font-black text-slate-900">借阅额度</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">每张借书证最多可同时借阅 16 本电子书，借期为 21 天。</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500 flex-shrink-0">
                <AlertCircle size={20} />
              </div>
              <div>
                <p className="text-sm font-black text-slate-900">续借规则</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">若书籍无人预约，可在到期前 3 天申请续借一次，延长 21 天。</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 flex-shrink-0">
                <Info size={20} />
              </div>
              <div>
                <p className="text-sm font-black text-slate-900">逾期处理</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">电子书到期将自动归还，无需担心逾期罚款。</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Action Button */}
      <div className="p-6 pt-0">
        <button 
          onClick={() => setIsAdding(true)}
          className="w-full bg-[#1F2B6C] text-white font-black py-5 rounded-[24px] shadow-xl shadow-blue-900/20 flex items-center justify-center gap-3 hover:bg-blue-800 transition-all"
        >
          <Plus size={20} />
          绑定新借书证
        </button>
      </div>

      {/* Add Card Modal */}
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
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6">绑定新借书证</h2>
              
              <form onSubmit={handleAddCard} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">持卡人姓名</label>
                  <input 
                    type="text"
                    required
                    value={newCard.name}
                    onChange={(e) => setNewCard(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="请输入姓名"
                    className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">借书证号码</label>
                  <input 
                    type="text"
                    required
                    value={newCard.number}
                    onChange={(e) => setNewCard(prev => ({ ...prev, number: e.target.value }))}
                    placeholder="NLB-XXXXXXXXXX"
                    className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 transition-all"
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
                    确认绑定
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

export default LibraryCardManagement;
