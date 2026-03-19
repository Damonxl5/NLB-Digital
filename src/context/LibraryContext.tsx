import React, { createContext, useContext, useState, useEffect } from 'react';
import { Book, BOOKS, USER } from '../data/mockData';

interface ReaderSettings {
  fontSize: number;
  theme: 'light' | 'dark' | 'sepia';
}

export interface Note {
  id: string;
  bookId: string;
  bookTitle: string;
  content: string;
  date: string;
  chapter?: string;
}

interface LibraryContextType {
  books: Book[];
  borrowedBooks: Book[];
  reservedBooks: Book[];
  historyBooks: Book[];
  notes: Note[];
  borrowBook: (bookId: string) => void;
  returnBook: (bookId: string) => void;
  reserveBook: (bookId: string) => void;
  cancelReservation: (bookId: string) => void;
  renewBook: (bookId: string) => void;
  updateProgress: (bookId: string, progress: number) => void;
  addNote: (note: Omit<Note, 'id' | 'date'>) => void;
  deleteNote: (noteId: string) => void;
  updateNote: (noteId: string, content: string) => void;
  readerSettings: ReaderSettings;
  updateReaderSettings: (settings: Partial<ReaderSettings>) => void;
  user: typeof USER | null;
  login: (type: 'id' | 'singpass') => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const LibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>(BOOKS);
  const [user, setUser] = useState<typeof USER | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [readerSettings, setReaderSettings] = useState<ReaderSettings>({
    fontSize: 18,
    theme: 'light'
  });

  const borrowedBooks = books.filter(b => b.status === 'borrowed');
  const reservedBooks = books.filter(b => b.status === 'reserved');
  const historyBooks = books.filter(b => b.status === 'available' && b.progress === 100);

  const addNote = (note: Omit<Note, 'id' | 'date'>) => {
    const newNote: Note = {
      ...note,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const deleteNote = (noteId: string) => {
    setNotes(prev => prev.filter(n => n.id !== noteId));
  };

  const updateNote = (noteId: string, content: string) => {
    setNotes(prev => prev.map(n => n.id === noteId ? { ...n, content } : n));
  };

  const borrowBook = (bookId: string) => {
    setBooks(prev => prev.map(b => {
      if (b.id === bookId) {
        return {
          ...b,
          status: 'borrowed',
          borrowDate: new Date().toISOString().split('T')[0],
          returnDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          progress: 0
        };
      }
      return b;
    }));
  };

  const returnBook = (bookId: string) => {
    setBooks(prev => prev.map(b => {
      if (b.id === bookId) {
        return {
          ...b,
          status: 'available',
          progress: 100 // Mark as finished for history
        };
      }
      return b;
    }));
  };

  const reserveBook = (bookId: string) => {
    setBooks(prev => prev.map(b => {
      if (b.id === bookId) {
        return { ...b, status: 'reserved' };
      }
      return b;
    }));
  };

  const cancelReservation = (bookId: string) => {
    setBooks(prev => prev.map(b => {
      if (b.id === bookId) {
        return { ...b, status: 'available' };
      }
      return b;
    }));
  };

  const renewBook = (bookId: string) => {
    setBooks(prev => prev.map(b => {
      if (b.id === bookId && b.status === 'borrowed') {
        const currentReturnDate = b.returnDate ? new Date(b.returnDate) : new Date();
        const newReturnDate = new Date(currentReturnDate.getTime() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        return { ...b, returnDate: newReturnDate };
      }
      return b;
    }));
  };

  const updateProgress = (bookId: string, progress: number) => {
    setBooks(prev => prev.map(b => {
      if (b.id === bookId) {
        return { ...b, progress };
      }
      return b;
    }));
  };

  const updateReaderSettings = (settings: Partial<ReaderSettings>) => {
    setReaderSettings(prev => ({ ...prev, ...settings }));
  };

  const login = (type: 'id' | 'singpass') => {
    // Mock login
    setUser(USER);
    setIsAuthenticated(true);
    localStorage.setItem('nlb_auth', 'true');
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('nlb_auth');
  };

  useEffect(() => {
    const auth = localStorage.getItem('nlb_auth');
    if (auth === 'true') {
      setUser(USER);
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <LibraryContext.Provider value={{
      books,
      borrowedBooks,
      reservedBooks,
      historyBooks,
      notes,
      borrowBook,
      returnBook,
      reserveBook,
      cancelReservation,
      renewBook,
      updateProgress,
      addNote,
      deleteNote,
      updateNote,
      readerSettings,
      updateReaderSettings,
      user,
      login,
      logout,
      isAuthenticated
    }}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (context === undefined) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};
