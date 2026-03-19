
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, Bell, Book, Calendar, Info, 
  CheckCircle2, Trash2, MoreVertical 
} from 'lucide-react';
import { NOTIFICATIONS, Notification } from '../data/mockData';

const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS);

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'book': return <Book size={20} className="text-blue-500" />;
      case 'reservation': return <Calendar size={20} className="text-orange-500" />;
      case 'system': return <Info size={20} className="text-slate-400" />;
      default: return <Bell size={20} className="text-slate-400" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ChevronLeft size={24} className="text-slate-600" />
          </button>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">消息中心</h1>
        </div>
        <button 
          onClick={markAllAsRead}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
        >
          全部已读
        </button>
      </header>

      {/* List */}
      <div className="flex-1 p-4 flex flex-col gap-4">
        <AnimatePresence mode="popLayout">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <motion.div
                key={notification.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => markAsRead(notification.id)}
                className={`relative bg-white rounded-[24px] p-5 shadow-sm border transition-all ${
                  notification.isRead ? 'border-slate-100 opacity-80' : 'border-blue-100 shadow-blue-900/5'
                }`}
              >
                {!notification.isRead && (
                  <div className="absolute top-5 right-5 w-2 h-2 bg-blue-500 rounded-full" />
                )}
                
                <div className="flex gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    notification.type === 'book' ? 'bg-blue-50' : 
                    notification.type === 'reservation' ? 'bg-orange-50' : 'bg-slate-50'
                  }`}>
                    {getIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className={`text-sm font-black truncate ${
                        notification.isRead ? 'text-slate-600' : 'text-slate-900'
                      }`}>
                        {notification.title}
                      </h3>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-2 whitespace-nowrap">
                        {notification.time}
                      </span>
                    </div>
                    <p className={`text-xs leading-relaxed ${
                      notification.isRead ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      {notification.content}
                    </p>
                    
                    <div className="flex justify-end gap-4 mt-4 pt-4 border-t border-slate-50">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification.id);
                        }}
                        className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                      <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 gap-4 opacity-40">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-slate-300 shadow-sm">
                <Bell size={40} />
              </div>
              <p className="text-sm font-bold text-slate-500">暂无消息通知</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick Actions */}
      {notifications.length > 0 && (
        <div className="px-4 pb-8">
          <div className="bg-slate-900 rounded-[32px] p-6 text-white flex items-center justify-between shadow-xl shadow-slate-900/20">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                <CheckCircle2 size={20} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-black">保持更新</p>
                <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest">开启系统推送通知</p>
              </div>
            </div>
            <button className="bg-white text-slate-900 text-xs font-black px-6 py-3 rounded-xl hover:bg-slate-100 transition-all">
              立即开启
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
