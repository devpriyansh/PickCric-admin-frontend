import { Users, MoreVertical, Search, Filter, Mail, Ban, Edit2, ShieldAlert } from 'lucide-react';

const mockUsers = [
  { id: 1, name: 'Rahul Sharma', email: 'rahul.s@example.com', totalBets: 45, winnings: '₹12,400', status: 'Active', joined: 'Oct 2023' },
  { id: 2, name: 'Priyansh K.', email: 'priyansh@example.com', totalBets: 120, winnings: '₹55,000', status: 'Active', joined: 'Sep 2023' },
  { id: 3, name: 'Amit Kumar', email: 'amit.k@example.com', totalBets: 12, winnings: '₹2,100', status: 'Suspended', joined: 'Aug 2023' },
  { id: 4, name: 'Neha Singh', email: 'neha.s@example.com', totalBets: 85, winnings: '₹34,000', status: 'Active', joined: 'Oct 2023' },
  { id: 5, name: 'Vikram Singh', email: 'vikram.s@example.com', totalBets: 0, winnings: '₹0', status: 'Pending', joined: 'Nov 2023' },
];

const getStatusBadge = (status) => {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'Suspended':
      return 'bg-red-100 text-red-700 border-red-200';
    case 'Pending':
      return 'bg-amber-100 text-amber-700 border-amber-200';
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};

const UsersManagement = () => {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Users Management</h1>
          <p className="text-sm text-slate-500 mt-1">View, track, and manage all registered players.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="inline-flex items-center justify-center px-4 py-2 border border-slate-300 bg-white text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div className="relative max-w-sm w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-slate-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search users by name or email..." 
              className="pl-10 pr-4 py-2 w-full border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
            />
          </div>
          <span className="text-sm font-medium text-slate-500 hidden sm:block">Total 24,512 Users</span>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Activity</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm ring-1 ring-indigo-200 mr-3">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-900 block">{user.name}</span>
                        <span className="text-xs text-slate-500">Joined {user.joined}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-slate-600">
                      <Mail className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                      {user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-900">{user.totalBets} Bets</span>
                      <span className="text-xs text-green-600 font-bold">{user.winnings} Won</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadge(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                       <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Edit User">
                         <Edit2 className="w-4 h-4" />
                       </button>
                       <button className={`p-1.5 text-slate-400 rounded-md transition-colors ${user.status === 'Suspended' ? 'hover:text-green-600 hover:bg-green-50' : 'hover:text-red-600 hover:bg-red-50'}`} title={user.status === 'Suspended' ? 'Unban User' : 'Suspend User'}>
                         <Ban className="w-4 h-4" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination stub */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-600">
          <span>Showing 1 to 5 of 24,512 users</span>
          <div className="flex space-x-1">
            <button className="px-3 py-1 border border-slate-200 rounded-md bg-white hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-slate-200 rounded-md bg-white hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersManagement;
