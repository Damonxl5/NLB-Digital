
import React from 'react';
import { User, Settings, Bell, ChevronRight, BookOpen, Clock, Award, Smartphone, Calendar, HelpCircle, LogOut } from 'lucide-react';
import { motion } from 'motion/react';
import { useLibrary } from '../context/LibraryContext';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user, logout } = useLibrary();

  const handleLogout = () => {
    logout();
  };

  if (!user) return null;

  return (
    <div className="flex flex-col gap-8 p-6 bg-slate-50 min-h-screen">
      {/* User Info */}
      <header className="flex flex-col items-center gap-6 pt-8">
        <div className="relative">
          <div className="w-24 h-24 rounded-[32px] overflow-hidden border-4 border-white shadow-2xl">
            <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-500 rounded-2xl flex items-center justify-center text-white border-4 border-slate-50 shadow-lg">
            <Award size={20} />
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">{user.name}</h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">新加坡国家图书馆 资深读者</p>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center gap-1 p-5 bg-white rounded-[32px] shadow-sm border border-slate-100">
          <span className="text-xl font-black text-slate-900">{user.stats.booksRead}</span>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">已读完</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-5 bg-white rounded-[32px] shadow-sm border border-slate-100">
          <span className="text-xl font-black text-slate-900">{user.stats.readingMinutes}</span>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">阅读(分)</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-5 bg-white rounded-[32px] shadow-sm border border-slate-100">
          <span className="text-xl font-black text-slate-900">{user.stats.badges}</span>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">社区勋章</span>
        </div>
      </div>

      {/* Library Card & Quota */}
      <section className="space-y-4">
        <div className="bg-[#1F2B6C] rounded-[40px] p-8 shadow-2xl shadow-blue-900/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 space-y-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="text-white font-black text-lg tracking-tight">借书证 (Digital Card)</h3>
                <p className="text-blue-200 text-[10px] font-bold uppercase tracking-widest">NLB Singapore Mobile</p>
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white backdrop-blur-md border border-white/20">
                <BookOpen size={24} />
              </div>
            </div>
            
            {/* Barcode Mock */}
            <div className="bg-white p-4 rounded-2xl flex flex-col items-center gap-2">
              <div className="w-full h-12 flex gap-1 items-center justify-center">
                {[...Array(30)].map((_, i) => (
                  <div 
                    key={i} 
                    className="bg-slate-900 h-full" 
                    style={{ width: `${Math.random() * 3 + 1}px` }} 
                  />
                ))}
              </div>
              <p className="text-[10px] font-mono font-bold text-slate-400 tracking-[0.3em]">S1234567A</p>
            </div>

            {/* Quota Visualization */}
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-xs font-bold text-blue-100">借阅额度 (Quota)</span>
                <span className="text-sm font-black text-white">8 / 16 <span className="text-[10px] font-bold text-blue-300 ml-1">BOOKS</span></span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '50%' }}
                  className="h-full bg-emerald-400 rounded-full shadow-[0_0_12px_rgba(52,211,153,0.4)]" 
                />
              </div>
              <p className="text-[10px] text-blue-300 font-medium">您本月还有 8 本图书的借阅额度</p>
            </div>
          </div>
        </div>
      </section>

      {/* Account Management */}
      <section className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">账号与管理</h3>
        <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-100">
          <Link to="/library-card" className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors border-b border-slate-50">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                <User size={20} />
              </div>
              <span className="text-sm font-bold text-slate-700">借书证管理</span>
            </div>
            <ChevronRight size={18} className="text-slate-300" />
          </Link>
          <Link to="/devices" className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors border-b border-slate-50">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500 relative">
                <Smartphone size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
              </div>
              <span className="text-sm font-bold text-slate-700">设备与推送</span>
            </div>
            <ChevronRight size={18} className="text-slate-300" />
          </Link>
          <Link to="/reading-notes" className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors border-b border-slate-50">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                <BookOpen size={20} />
              </div>
              <span className="text-sm font-bold text-slate-700">阅读笔记</span>
            </div>
            <ChevronRight size={18} className="text-slate-300" />
          </Link>
          <Link to="/reading-report" className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500">
                <Calendar size={20} />
              </div>
              <span className="text-sm font-bold text-slate-700">年度阅读报告</span>
            </div>
            <ChevronRight size={18} className="text-slate-300" />
          </Link>
        </div>
      </section>

      {/* General Settings */}
      <section className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">通用</h3>
        <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-100">
          <Link to="/settings" className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors border-b border-slate-50">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500">
                <Settings size={20} />
              </div>
              <span className="text-sm font-bold text-slate-700">偏好设置</span>
            </div>
            <ChevronRight size={18} className="text-slate-300" />
          </Link>
          <Link to="/help" className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500">
                <HelpCircle size={20} />
              </div>
              <span className="text-sm font-bold text-slate-700">帮助与反馈</span>
            </div>
            <ChevronRight size={18} className="text-slate-300" />
          </Link>
        </div>
      </section>

      {/* Logout */}
      <button 
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 p-5 bg-white rounded-[32px] text-rose-500 font-bold text-sm shadow-sm border border-slate-100 hover:bg-rose-50 transition-colors"
      >
        <LogOut size={20} />
        退出登录
      </button>
    </div>
  );
};

export default Profile;
