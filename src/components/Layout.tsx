
import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Home, Compass, BookMarked, User, Bot, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const hideNav = ['/login', '/reader', '/ai-chat'].some(path => location.pathname.startsWith(path));
  const isAIChat = location.pathname === '/ai-chat';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto relative shadow-2xl overflow-hidden border-x border-slate-200">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating AI Button */}
      {!isAIChat && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/ai-chat')}
          className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl border-4 border-white group"
        >
          <Bot size={28} className="group-hover:animate-bounce" />
          <div className="absolute -top-1 -right-1 bg-emerald-500 w-4 h-4 rounded-full border-2 border-white" />
          <div className="absolute -top-10 right-0 bg-white px-3 py-1 rounded-lg text-[10px] font-bold text-blue-600 shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            AI 智能客服
          </div>
        </motion.button>
      )}

      {/* Bottom Navigation */}
      {!hideNav && (
        <nav className="fixed bottom-0 w-full max-w-md bg-white/80 backdrop-blur-md border-t border-slate-100 flex justify-around items-center py-3 px-6 z-50">
          <NavLink to="/" className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>
            {({ isActive }) => (
              <>
                <Home size={22} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-medium">首页</span>
              </>
            )}
          </NavLink>
          <NavLink to="/search" className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>
            {({ isActive }) => (
              <>
                <Compass size={22} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-medium">发现</span>
              </>
            )}
          </NavLink>
          <NavLink to="/bookshelf" className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>
            {({ isActive }) => (
              <>
                <BookMarked size={22} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-medium">书架</span>
              </>
            )}
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>
            {({ isActive }) => (
              <>
                <User size={22} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-medium">我的</span>
              </>
            )}
          </NavLink>
        </nav>
      )}
    </div>
  );
};

export default Layout;
