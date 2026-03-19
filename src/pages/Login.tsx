
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight, QrCode, ShieldCheck, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLibrary } from '../context/LibraryContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useLibrary();
  const [activeTab, setActiveTab] = useState<'id' | 'singpass'>('id');
  const [isLoading, setIsLoading] = useState(false);
  const [cardId, setCardId] = useState('NLB-12345678');
  const [password, setPassword] = useState('123456');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    login(activeTab);
    navigate('/');
  };

  const handleSingpassLogin = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    login('singpass');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#1F2B6C] flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-blue-400 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm z-10"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 shadow-xl border border-white/30">
            <ShieldCheck size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">NLB Digital</h1>
          <p className="text-blue-200 text-sm mt-1 font-medium">智慧阅读 · 联接未来</p>
        </div>

        <div className="bg-white rounded-[32px] p-8 shadow-2xl border border-white/20">
          <div className="flex gap-4 mb-8 border-b border-slate-100">
            <button
              onClick={() => setActiveTab('id')}
              className={`pb-3 text-sm font-bold transition-all relative ${activeTab === 'id' ? 'text-blue-600' : 'text-slate-400'}`}
            >
              借书证登录
              {activeTab === 'id' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />}
            </button>
            <button
              onClick={() => setActiveTab('singpass')}
              className={`pb-3 text-sm font-bold transition-all relative ${activeTab === 'singpass' ? 'text-blue-600' : 'text-slate-400'}`}
            >
              Singpass 一键登录
              {activeTab === 'singpass' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />}
            </button>
          </div>

          {activeTab === 'id' ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-1.5">
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={cardId}
                    onChange={(e) => setCardId(e.target.value)}
                    placeholder="借书证号码 / ID"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="密码"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between px-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-xs text-slate-500 font-medium group-hover:text-slate-700">记住我</span>
                </label>
                <button type="button" className="text-xs text-blue-600 font-bold hover:underline">忘记密码？</button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#1F2B6C] text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-900/20 hover:bg-blue-800 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <>
                    立即登录
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center py-6 gap-6">
              <div className="w-24 h-24 bg-rose-50 rounded-3xl flex items-center justify-center border border-rose-100">
                <ShieldCheck size={48} className="text-rose-500" />
              </div>
              <p className="text-center text-sm text-slate-600 leading-relaxed">
                使用您的 Singpass 账号安全登录<br />享受 NLB 提供的所有数字资源
              </p>
              <button
                onClick={handleSingpassLogin}
                disabled={isLoading}
                className="w-full bg-rose-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-rose-900/10 hover:bg-rose-600 transition-all flex items-center justify-center disabled:opacity-70"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Singpass 登录'}
              </button>
            </div>
          )}
        </div>

        <div className="mt-12 flex flex-col items-center gap-6">
          <p className="text-blue-200/60 text-[10px] font-bold uppercase tracking-[0.2em]">或者使用以下方式快速核验</p>
          <div className="flex gap-4 w-full">
            <button className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl py-4 flex items-center justify-center gap-2 text-white text-sm font-bold hover:bg-white/20 transition-all">
              Singpass
            </button>
            <button className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl py-4 flex items-center justify-center gap-2 text-white text-sm font-bold hover:bg-white/20 transition-all">
              <QrCode size={18} />
              扫描借书证
            </button>
          </div>
        </div>

        <div className="mt-12 flex justify-center gap-6 text-[10px] text-blue-200/40 font-bold uppercase tracking-widest">
          <button className="hover:text-white transition-colors">关于 NLB</button>
          <span>•</span>
          <button className="hover:text-white transition-colors">隐私协议</button>
          <span>•</span>
          <button className="hover:text-white transition-colors">家属代绑</button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
