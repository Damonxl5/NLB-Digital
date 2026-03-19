
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ChevronLeft, Bell, Moon, Globe, 
  Shield, Info, ChevronRight, CheckCircle2 
} from 'lucide-react';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoRenew: true,
    language: '简体中文',
  });

  const toggleSetting = (key: keyof typeof settings) => {
    if (typeof settings[key] === 'boolean') {
      setSettings(prev => ({ ...prev, [key]: !prev[key] }));
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
        <h1 className="text-xl font-black text-slate-900 tracking-tight">偏好设置</h1>
      </header>

      <div className="p-6 space-y-8">
        {/* Notification Settings */}
        <section className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">通知与提醒</h3>
          <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-100">
            <div className="flex items-center justify-between p-5 border-b border-slate-50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <Bell size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700">推送通知</p>
                  <p className="text-[10px] text-slate-400 font-medium">借阅到期、预约提醒等</p>
                </div>
              </div>
              <button 
                onClick={() => toggleSetting('notifications')}
                className={`w-12 h-6 rounded-full transition-all relative ${
                  settings.notifications ? 'bg-blue-500' : 'bg-slate-200'
                }`}
              >
                <motion.div 
                  animate={{ x: settings.notifications ? 24 : 4 }}
                  className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm" 
                />
              </button>
            </div>
            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700">自动续借</p>
                  <p className="text-[10px] text-slate-400 font-medium">符合条件时自动延长借期</p>
                </div>
              </div>
              <button 
                onClick={() => toggleSetting('autoRenew')}
                className={`w-12 h-6 rounded-full transition-all relative ${
                  settings.autoRenew ? 'bg-blue-500' : 'bg-slate-200'
                }`}
              >
                <motion.div 
                  animate={{ x: settings.autoRenew ? 24 : 4 }}
                  className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm" 
                />
              </button>
            </div>
          </div>
        </section>

        {/* Display Settings */}
        <section className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">显示与语言</h3>
          <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-100">
            <div className="flex items-center justify-between p-5 border-b border-slate-50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500">
                  <Moon size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700">深色模式</p>
                  <p className="text-[10px] text-slate-400 font-medium">跟随系统设置</p>
                </div>
              </div>
              <button 
                onClick={() => toggleSetting('darkMode')}
                className={`w-12 h-6 rounded-full transition-all relative ${
                  settings.darkMode ? 'bg-blue-500' : 'bg-slate-200'
                }`}
              >
                <motion.div 
                  animate={{ x: settings.darkMode ? 24 : 4 }}
                  className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm" 
                />
              </button>
            </div>
            <button className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500">
                  <Globe size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700">语言设置</p>
                  <p className="text-[10px] text-slate-400 font-medium">{settings.language}</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-slate-300" />
            </button>
          </div>
        </section>

        {/* Privacy & Security */}
        <section className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">隐私与安全</h3>
          <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-100">
            <button className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors border-b border-slate-50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500">
                  <Shield size={20} />
                </div>
                <span className="text-sm font-bold text-slate-700">隐私协议</span>
              </div>
              <ChevronRight size={18} className="text-slate-300" />
            </button>
            <button className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500">
                  <Info size={20} />
                </div>
                <span className="text-sm font-bold text-slate-700">关于 NLB Digital</span>
              </div>
              <ChevronRight size={18} className="text-slate-300" />
            </button>
          </div>
        </section>

        {/* Action Button */}
        <button className="w-full bg-slate-200 text-slate-600 font-black py-5 rounded-[24px] hover:bg-slate-300 transition-all">
          重置所有设置
        </button>
      </div>
    </div>
  );
};

export default Settings;
