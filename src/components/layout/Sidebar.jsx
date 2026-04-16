import { LayoutDashboard, Trophy, Settings, X, Users, Medal } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Users', path: '/users', icon: Users },
    { name: 'Jackpots', path: '/jackpots', icon: Trophy },
    { name: 'Leaderboard', path: '/leaderboard', icon: Medal },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-[#1E293B] text-slate-300 transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 bg-slate-900/50">
          <span className="text-xl font-bold text-white tracking-widest uppercase">Admin Panel</span>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-md text-slate-400 hover:text-white md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 mt-4 px-3">
            Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            
            // Check if active (also highlight Jackpots nav item if on /jackpots/create)
            const isActive = location.pathname === item.path || 
              (item.path === '/jackpots' && location.pathname.startsWith('/jackpots'));

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-colors group ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-200' : 'text-slate-400 group-hover:text-slate-300'}`} />
                <span className="font-medium text-sm">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
