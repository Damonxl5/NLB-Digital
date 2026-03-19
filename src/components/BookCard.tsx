
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, DownloadCloud } from 'lucide-react';
import { Book } from '../data/mockData';

interface BookCardProps {
  book: Book;
  variant?: 'vertical' | 'horizontal' | 'compact';
}

const BookCard: React.FC<BookCardProps> = ({ book, variant = 'vertical' }) => {
  if (variant === 'horizontal') {
    return (
      <Link to={`/book/${book.id}`} className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
        <div className="w-24 h-32 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
          <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col justify-between py-1 flex-1">
          <div>
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-slate-900 line-clamp-1">{book.title}</h3>
              <span className="text-[10px] px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded font-bold uppercase tracking-wider">电子书</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">{book.author} · {book.pages}p</p>
            <div className="flex items-center gap-1 mt-2">
              <Star size={12} className="text-amber-400 fill-amber-400" />
              <span className="text-xs font-bold text-slate-700">{book.rating}</span>
            </div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className={`text-[10px] font-bold ${book.status === 'available' ? 'text-emerald-500' : 'text-slate-400'}`}>
              ● {book.status === 'available' ? '当前可借' : '预约中'}
            </span>
            <span className="text-xs text-blue-600 font-medium">书籍详情</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link to={`/book/${book.id}`} className="flex gap-3 p-3 bg-white rounded-xl border border-slate-100">
        <div className="w-16 h-20 rounded-md overflow-hidden flex-shrink-0 shadow-sm relative">
          <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
          {book.progress !== undefined && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-200">
              <div className="h-full bg-blue-500" style={{ width: `${book.progress}%` }} />
            </div>
          )}
        </div>
        <div className="flex-1 flex flex-col justify-center gap-1">
          <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{book.title}</h4>
          <p className="text-[10px] text-slate-500">{book.author} · 进度 {book.progress}%</p>
          <div className="flex items-center justify-between mt-1">
            <span className="text-[10px] text-rose-500 font-bold flex items-center gap-1">
              <Clock size={10} /> 剩余 5 天
            </span>
            <div className="flex gap-2">
              <DownloadCloud size={14} className="text-slate-400" />
              <span className="text-slate-300">|</span>
              <span className="text-blue-600 text-[10px] font-bold">续借</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/book/${book.id}`} className="flex flex-col gap-2 w-32 group">
      <div className="w-full aspect-[2/3] rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition-all transform group-hover:-translate-y-1">
        <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
      </div>
      <div className="px-1">
        <h3 className="text-sm font-bold text-slate-900 line-clamp-1 leading-tight">{book.title}</h3>
        <p className="text-[10px] text-slate-500 mt-0.5">{book.author}</p>
        <div className="flex items-center gap-1 mt-1">
          <Star size={10} className="text-amber-400 fill-amber-400" />
          <span className="text-[10px] font-bold text-slate-700">{book.rating}</span>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
