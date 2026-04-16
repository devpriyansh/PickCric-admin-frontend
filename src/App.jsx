import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import JackpotsManagement from './pages/JackpotsManagement';
import CreateJackpot from './pages/CreateJackpot';
import Dashboard from './pages/Dashboard';
import UsersManagement from './pages/UsersManagement';
import Leaderboard from './pages/Leaderboard';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Header setIsOpen={setIsSidebarOpen} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#F8FAFC] p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<UsersManagement />} />
            <Route path="/jackpots" element={<JackpotsManagement />} />
            <Route path="/jackpots/create" element={<CreateJackpot />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
