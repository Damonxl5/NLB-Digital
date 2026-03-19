
import React from 'react';
import { ChevronLeft, Tablet, Smartphone, Settings, RefreshCw, Plus, DownloadCloud, CheckCircle2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { USER, BOOKS } from '../data/mockData';

const Devices: React.FC = () => {
  const navigate = useNavigate();
  const pushHistory = BOOKS.filter(b => b.status === 'borrowed').slice(0, 1);

  return (
    <div className="flex flex-col gap-8 p-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <header className="flex items-center gap-4 pt-8">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-white rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">推送与设备管理</h1>
      </header>

      {/* Bound Devices */}
      <section className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">已绑定的设备</h3>
        <div className="flex flex-col gap-4">
          {USER.devices.map(device => (
            <div key={device.id} className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${
                  device.status === 'Online' ? 'bg-blue-50 text-blue-500' : 'bg-slate-50 text-slate-400'
                }`}>
                  {device.type === 'Kindle' ? <Tablet size={28} /> : <Smartphone size={28} />}
                </div>
                <div className="text-left">
                  <p className="font-black text-slate-900">{device.name}</p>
                  <p className={`text-[10px] font-bold uppercase tracking-wider ${
                    device.status === 'Online' ? 'text-blue-500' : 'text-slate-400'
                  }`}>
                    {device.status} · {device.lastSync}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {device.status === 'Online' && (
                  <button className="p-2 bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-900/20 hover:bg-blue-600 transition-all">
                    <RefreshCw size={18} />
                  </button>
                )}
                <button className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-all">
                  <Settings size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Push History */}
      <section className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">当前推送任务</h3>
        <div className="flex flex-col gap-4">
          {pushHistory.map(book => (
            <div key={book.id} className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 flex items-center gap-4">
              <div className="w-16 h-20 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-black text-slate-900 line-clamp-1">{book.title}</h4>
                  <button className="p-1 bg-slate-50 rounded-full text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors">
                    <Plus size={14} className="rotate-45" />
                  </button>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                    <span>正在推送至 Kindle...</span>
                    <span>75%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden relative">
                    <div className="absolute h-full bg-blue-500 rounded-full" style={{ width: '75%' }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Add New Device */}
      <section className="mt-4 p-8 bg-[#1F2B6C] rounded-[40px] shadow-2xl shadow-blue-900/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-black text-white tracking-tight">如何连接新设备？</h3>
            <p className="text-xs text-blue-200 leading-relaxed font-medium">
              NLB 现在支持 EPUB 自动推送到 Kindle 邮箱或通过 WebDAV 协议关联离线阅读器。点击下方按钮开始配置。
            </p>
          </div>
          <button className="w-full bg-white text-[#1F2B6C] font-black py-4 rounded-2xl shadow-xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
            <Plus size={20} />
            添加新设备
          </button>
        </div>
      </section>
    </div>
  );
};

export default Devices;
