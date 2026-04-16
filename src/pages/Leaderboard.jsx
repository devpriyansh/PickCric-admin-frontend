import { Trophy, Medal, Search, Filter, TrendingUp } from 'lucide-react';

const mockLeaderboard = [
  { id: 1, rank: 1, name: 'Priyansh K.', winnings: '₹12,55,000', winRate: '68%', matches: 120 },
  { id: 2, rank: 2, name: 'Neha Singh', winnings: '₹8,34,000', winRate: '62%', matches: 85 },
  { id: 3, rank: 3, name: 'Rahul Sharma', winnings: '₹5,12,400', winRate: '55%', matches: 145 },
  { id: 4, rank: 4, name: 'Amit Kumar', winnings: '₹2,50,000', winRate: '48%', matches: 210 },
  { id: 5, rank: 5, name: 'Vikram Singh', winnings: '₹1,20,000', winRate: '51%', matches: 60 },
  { id: 6, rank: 6, name: 'Sarah M.', winnings: '₹95,000', winRate: '45%', matches: 110 },
];

const getRankIcon = (rank) => {
  if (rank === 1) return <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-500 border border-amber-200 flex items-center justify-center font-black shadow-sm"><Trophy className="w-4 h-4" /></div>;
  if (rank === 2) return <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 border border-slate-200 flex items-center justify-center font-black shadow-sm"><Medal className="w-4 h-4" /></div>;
  if (rank === 3) return <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 border border-orange-200 flex items-center justify-center font-black shadow-sm"><Medal className="w-4 h-4" /></div>;
  return <div className="w-8 h-8 rounded-full bg-slate-50 text-slate-500 border border-slate-100 flex items-center justify-center font-bold text-xs">{rank}</div>;
};

const Leaderboard = () => {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Leaderboard</h1>
          <p className="text-sm text-slate-500 mt-1">Top performing players ranked by total earnings.</p>
        </div>
        <div className="flex items-center space-x-3">
          <select className="px-4 py-2 border border-slate-300 bg-white text-slate-700 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm cursor-pointer outline-none">
            <option>All Time</option>
            <option>This Month</option>
            <option>This Week</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col relative">
        {/* Decorative Top Border */}
        <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400"></div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                <th className="px-6 py-4 w-24 text-center">Rank</th>
                <th className="px-6 py-4">Player</th>
                <th className="px-6 py-4">Total Earnings</th>
                <th className="px-6 py-4">Win Rate</th>
                <th className="px-6 py-4 text-right">Matches Played</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockLeaderboard.map((user) => (
                <tr key={user.id} className={`transition-colors group ${user.rank <= 3 ? 'bg-amber-50/10 hover:bg-amber-50/30' : 'hover:bg-slate-50/50'}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex justify-center">
                      {getRankIcon(user.rank)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mr-3
                        ${user.rank === 1 ? 'bg-amber-100 text-amber-600 ring-2 ring-amber-200 ring-offset-2' : 
                          user.rank === 2 ? 'bg-slate-100 text-slate-600 ring-2 ring-slate-200 ring-offset-2' : 
                          user.rank === 3 ? 'bg-orange-100 text-orange-600 ring-2 ring-orange-200 ring-offset-2' : 
                          'bg-slate-100 text-slate-500'}`}
                      >
                        {user.name.charAt(0)}
                      </div>
                      <span className={`font-bold block ${user.rank <= 3 ? 'text-slate-900 text-base' : 'text-slate-700'}`}>{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`font-black ${user.rank === 1 ? 'text-amber-500 text-lg' : 'text-slate-900'}`}>
                      {user.winnings}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
                       <TrendingUp className="w-3 h-3 mr-1" />
                       {user.winRate}
                     </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className="text-sm font-medium text-slate-600">{user.matches}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
