import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import Search from './pages/Search';
import BookDetails from './pages/BookDetails';
import Reader from './pages/Reader';
import Bookshelf from './pages/Bookshelf';
import Profile from './pages/Profile';
import Help from './pages/Help';
import Devices from './pages/Devices';
import TopicDetail from './pages/TopicDetail';
import AIChat from './pages/AIChat';
import Notifications from './pages/Notifications';
import LibraryCardManagement from './pages/LibraryCardManagement';
import ReadingReport from './pages/ReadingReport';
import Settings from './pages/Settings';
import ReadingNotes from './pages/ReadingNotes';
import { LibraryProvider, useLibrary } from './context/LibraryContext';

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useLibrary();
  const location = useLocation();

  if (!isAuthenticated && location.pathname !== '/login') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <AuthGuard>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/reader/:id" element={<Reader />} />
          <Route path="/bookshelf" element={<Bookshelf />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/help" element={<Help />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/topic/:id" element={<TopicDetail />} />
          <Route path="/ai-chat" element={<AIChat />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/library-card" element={<LibraryCardManagement />} />
          <Route path="/reading-report" element={<ReadingReport />} />
          <Route path="/reading-notes" element={<ReadingNotes />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </AuthGuard>
  );
};

export default function App() {
  return (
    <Router>
      <LibraryProvider>
        <AppRoutes />
      </LibraryProvider>
    </Router>
  );
}
