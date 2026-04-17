import { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import JackpotsManagement from './pages/JackpotsManagement';
import CreateJackpot from './pages/CreateJackpot';
import Dashboard from './pages/Dashboard';
import UsersManagement from './pages/UsersManagement';
import Leaderboard from './pages/Leaderboard';
import AdminAuthScreen from './pages/AdminAuthScreen';

// IMPORT YOUR NEW PROTECTED ROUTE
import ProtectedRoute from './components/ProtectedRoute'; 

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation(); 

  const isAuthScreen = location.pathname === '/auth';

  if (isAuthScreen) {
    return (
      <Routes>
        <Route path="/auth" element={<AdminAuthScreen />} />
      </Routes>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* We don't want the sidebar or header showing if they aren't logged in either! */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Header setIsOpen={setIsSidebarOpen} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#F8FAFC] p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* WRAP ALL SENSITIVE ROUTES WITH <ProtectedRoute> */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/users" element={
              <ProtectedRoute>
                <UsersManagement />
              </ProtectedRoute>
            } />
            
            <Route path="/jackpots" element={
              <ProtectedRoute>
                <JackpotsManagement />
              </ProtectedRoute>
            } />
            
            <Route path="/jackpots/create" element={
              <ProtectedRoute>
                <CreateJackpot />
              </ProtectedRoute>
            } />
            
            <Route path="/leaderboard" element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            } />
            
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;