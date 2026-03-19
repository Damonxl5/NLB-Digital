
import React, { useState } from 'react';
import { Search, MessageSquare, ChevronRight, ChevronDown, ChevronUp, HelpCircle, ShieldCheck, BookOpen, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

const Help: React.FC = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(1);

  const faqs = [
    {
      id: 1,
      q: '如何找回借书证密码？',
      a: '您可以通过 NLB Mobile 应用程序或前往任意公共图书馆的服务柜台，凭身份证件重置您的借书证密码。',
    },
    {
      id: 2,
      q: '书本无法推送到 Kindle 如何处理？',
      a: '1. 检查已将 nlb.gov.sg 加入亚马逊受信任邮箱。2. 确保设备已连接 WIFI。3. 检查书籍是否为支持的 EPUB/PDF 格式。',
    },
    {
      id: 3,
      q: '什么是“分级阅读”标准？',
      a: 'NLB 采用国际通用的分级阅读体系，根据词汇量、句式复杂度和内容深度将书籍分为 L1-L5 级，帮助读者选择适合自己的读物。',
    },
    {
      id: 4,
      q: '可以导出阅读笔记吗？',
      a: '是的，您可以在“我的书架-阅读笔记”中选择特定书籍，点击“导出”按钮，支持导出为 PDF 或 Markdown 格式。',
    },
  ];

  return (
    <div className="flex flex-col gap-8 p-6 bg-[#1F2B6C] min-h-screen text-white">
      {/* Header */}
      <header className="flex flex-col gap-4 pt-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <HelpCircle size={24} />
          </button>
          <h1 className="text-2xl font-black tracking-tight">帮助与支持</h1>
        </div>
        <p className="text-[10px] text-blue-200 font-bold uppercase tracking-widest">2026年03月19日 · 版本 5.2.0</p>
      </header>

      {/* Search */}
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300" />
        <input
          type="text"
          placeholder="搜索问题：借阅过期、Kindle推送..."
          className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-white/40 transition-all placeholder:text-blue-200/50"
        />
      </div>

      {/* Chat Entry */}
      <button 
        onClick={() => navigate('/ai-chat')}
        className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-[32px] p-6 flex items-center justify-between group hover:bg-white/20 transition-all"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
            <MessageSquare size={24} />
          </div>
          <div className="text-left">
            <p className="font-black text-white">7x24h 智能馆员</p>
            <p className="text-[10px] text-blue-200 font-bold uppercase tracking-wider">目前平均等待时间 &lt; 30秒</p>
          </div>
        </div>
        <ChevronRight size={20} className="text-blue-300 group-hover:translate-x-1 transition-transform" />
      </button>

      {/* FAQ Section */}
      <div className="bg-white rounded-[40px] -mx-6 px-6 py-10 flex flex-col gap-6 text-slate-900 flex-1">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">常见问题排查</h3>
        <div className="space-y-4">
          {faqs.map(faq => (
            <div key={faq.id} className="border-b border-slate-50 last:border-0 pb-4">
              <button
                onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between py-2 text-left group"
              >
                <span className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{faq.q}</span>
                {openFaq === faq.id ? <ChevronUp size={18} className="text-blue-600" /> : <ChevronDown size={18} className="text-slate-300" />}
              </button>
              <AnimatePresence>
                {openFaq === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-xs text-slate-500 leading-relaxed pt-2 pb-4 font-medium">
                      {faq.a}
                    </p>
                    {faq.id === 2 && (
                      <div className="bg-blue-50 rounded-2xl p-4 space-y-2">
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-[10px] font-black mt-0.5">1</div>
                          <p className="text-[10px] text-blue-700 font-bold">检查已将 nlb.gov.sg 加入亚马逊受信任邮箱。</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-[10px] font-black mt-0.5">2</div>
                          <p className="text-[10px] text-blue-700 font-bold">确保设备已连接 WIFI。</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-[10px] font-black mt-0.5">3</div>
                          <p className="text-[10px] text-blue-700 font-bold">检查书籍是否为支持的 EPUB/PDF 格式。</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Help;
