import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, Tag, Share2, ArrowDown } from 'lucide-react';
import Markdown from 'react-markdown';
import { TOPICS, Topic } from '../data/mockData';
import { motion } from 'motion/react';

const TopicItem: React.FC<{ topic: Topic; onBack: () => void }> = ({ topic, onBack }) => {
  return (
    <div className="flex flex-col bg-white h-full overflow-y-auto scrollbar-hide relative pb-24">
      {/* Header Image */}
      <div className="relative h-[45vh] w-full flex-shrink-0">
        <img 
          src={topic.image} 
          alt={topic.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 pb-8">
          <div className="flex flex-wrap gap-2 mb-3">
            {topic.tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 bg-blue-600/80 backdrop-blur-md text-white text-[10px] font-bold rounded uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white leading-tight mb-2">
            {topic.title}
          </h1>
          <p className="text-white/70 text-sm font-medium line-clamp-2 leading-relaxed">{topic.subtitle}</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8 md:px-8 flex flex-col gap-6">
        <div className="flex items-center gap-4 text-slate-400 text-[10px] font-bold border-b border-slate-100 pb-6 uppercase tracking-widest">
          <div className="flex items-center gap-1.5">
            <Calendar size={12} className="text-blue-500" />
            <span>{topic.date}</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-200" />
          <div className="flex items-center gap-1.5">
            <Tag size={12} className="text-blue-500" />
            <span>专题报道</span>
          </div>
        </div>

        <div className="prose prose-slate max-w-none">
          <div className="markdown-body text-slate-600 leading-relaxed text-base md:text-lg space-y-4">
            <Markdown>{topic.content}</Markdown>
          </div>
        </div>

        {/* Footer Hint */}
        <div className="mt-12 flex flex-col items-center gap-3 text-slate-300">
          <p className="text-[10px] font-black uppercase tracking-[0.2em]">继续向下滑动阅读更多</p>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowDown size={18} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const TopicDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && id) {
      const targetElement = document.getElementById(`topic-${id}`);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'auto' });
      }
    }
  }, [id]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-slate-900 z-50 flex justify-center overflow-hidden"
    >
      {/* Mobile Container Wrapper */}
      <div className="relative w-full max-w-[480px] h-full bg-white shadow-2xl flex flex-col overflow-hidden">
        {/* Floating Navigation - Safe Area Aware */}
        <div className="absolute top-0 left-0 right-0 z-50 p-4 flex justify-between items-center pointer-events-none pt-safe-top">
          <button 
            onClick={() => navigate(-1)}
            className="p-2.5 bg-black/30 backdrop-blur-2xl rounded-full text-white hover:bg-black/50 transition-all pointer-events-auto border border-white/10 shadow-lg"
          >
            <ChevronLeft size={24} />
          </button>
          <button className="p-2.5 bg-black/30 backdrop-blur-2xl rounded-full text-white hover:bg-black/50 transition-all pointer-events-auto border border-white/10 shadow-lg">
            <Share2 size={20} />
          </button>
        </div>

        {/* Vertical Snap Container */}
        <div 
          ref={containerRef}
          className="flex-1 overflow-y-scroll snap-y snap-mandatory scroll-smooth scrollbar-hide"
        >
          {TOPICS.map((topic) => (
            <div 
              key={topic.id} 
              id={`topic-${topic.id}`}
              className="h-[100dvh] w-full snap-start snap-always overflow-hidden"
            >
              <TopicItem topic={topic} onBack={() => navigate(-1)} />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TopicDetail;
