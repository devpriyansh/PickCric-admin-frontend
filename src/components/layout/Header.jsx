import { Menu, LogOut, User } from 'lucide-react';

const Header = ({ setIsOpen }) => {
  return (
    <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sm:px-6 z-10">
      <div className="flex items-center">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 -ml-2 mr-2 rounded-md text-slate-500 hover:bg-slate-100 md:hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3 pr-4 border-r border-slate-200">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 border border-slate-200">
            <User className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium text-slate-700 hidden sm:block">Admin</span>
        </div>
        <button className="flex items-center space-x-2 text-sm font-medium text-slate-500 hover:text-red-600 transition-colors">
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:block">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
