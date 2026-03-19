
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ChevronLeft, Award, BookOpen, Clock, 
  TrendingUp, Share2, Star, DownloadCloud 
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { USER } from '../data/mockData';

const ReadingReport: React.FC = () => {
  const navigate = useNavigate();

  const data = [
    { month: '1月', minutes: 120 },
    { month: '2月', minutes: 450 },
    { month: '3月', minutes: 890 },
    { month: '4月', minutes: 320 },
    { month: '5月', minutes: 560 },
    { month: '6月', minutes: 780 },
    { month: '7月', minutes: 1200 },
    { month: '8月', minutes: 950 },
    { month: '9月', minutes: 1100 },
    { month: '10月', minutes: 1300 },
    { month: '11月', minutes: 1450 },
    { month: '12月', minutes: 1890 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-black/50 backdrop-blur-md px-4 py-4 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <ChevronLeft size={24} className="text-white" />
        </button>
        <h1 className="text-lg font-black tracking-tight">2025 年度阅读报告</h1>
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <Share2 size={20} className="text-white" />
        </button>
      </header>

      <div className="p-6 space-y-12 pb-24">
        {/* Hero Section */}
        <section className="text-center space-y-6 pt-8">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-32 h-32 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-[40px] mx-auto flex items-center justify-center shadow-2xl shadow-blue-500/20"
          >
            <Award size={64} className="text-white" />
          </motion.div>
          <div className="space-y-2">
            <h2 className="text-3xl font-black tracking-tight">阅读达人</h2>
            <p className="text-sm text-white/50 font-bold uppercase tracking-widest">超越了 98% 的新加坡读者</p>
          </div>
        </section>

        {/* Core Stats */}
        <section className="grid grid-cols-2 gap-4">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-white/5 rounded-[32px] p-6 border border-white/10"
          >
            <BookOpen size={24} className="text-blue-400 mb-4" />
            <p className="text-2xl font-black">{USER.stats.booksRead}</p>
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider mt-1">借阅图书 (Books)</p>
          </motion.div>
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-white/5 rounded-[32px] p-6 border border-white/10"
          >
            <Clock size={24} className="text-emerald-400 mb-4" />
            <p className="text-2xl font-black">{USER.stats.readingMinutes}</p>
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider mt-1">阅读时长 (Minutes)</p>
          </motion.div>
        </section>

        {/* Chart Section */}
        <section className="space-y-6">
          <div className="flex justify-between items-end px-2">
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest">阅读趋势 (Monthly Trend)</h3>
            <TrendingUp size={16} className="text-emerald-400" />
          </div>
          <div className="bg-white/5 rounded-[40px] p-6 border border-white/10 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} 
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#1A1A1A', border: 'none', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="minutes" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Highlights */}
        <section className="space-y-4">
          <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest px-2">年度高光 (Highlights)</h3>
          <div className="space-y-4">
            <div className="bg-white/5 rounded-[32px] p-6 border border-white/10 flex items-center gap-6">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 flex-shrink-0">
                <Star size={32} />
              </div>
              <div>
                <p className="text-sm font-black">最爱品类：科幻 (Sci-Fi)</p>
                <p className="text-xs text-white/40 mt-1">您今年阅读了 42 本科幻类书籍</p>
              </div>
            </div>
            <div className="bg-white/5 rounded-[32px] p-6 border border-white/10 flex items-center gap-6">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400 flex-shrink-0">
                <Clock size={32} />
              </div>
              <div>
                <p className="text-sm font-black">阅读高峰：深夜</p>
                <p className="text-xs text-white/40 mt-1">23:00 - 01:00 是您最专注的时刻</p>
              </div>
            </div>
          </div>
        </section>

        {/* Action Button */}
        <button className="w-full bg-white text-black font-black py-5 rounded-[24px] shadow-xl shadow-white/10 flex items-center justify-center gap-3 hover:bg-white/90 transition-all">
          <DownloadCloud size={20} />
          生成高清报告图片
        </button>
      </div>
    </div>
  );
};

export default ReadingReport;
