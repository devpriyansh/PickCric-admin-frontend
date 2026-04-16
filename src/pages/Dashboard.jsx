import { Users, Trophy, DollarSign, Activity, TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock Data for Area Chart (Daily Active Users)
const chartData = [
  { day: '1', users: 1200 },
  { day: '5', users: 1900 },
  { day: '10', users: 1500 },
  { day: '15', users: 2400 },
  { day: '20', users: 2100 },
  { day: '25', users: 3100 },
  { day: '30', users: 3500 },
];

const mockRecentActivity = [
  { id: 1, text: 'User "RahulM" joined Jackpot "IND vs AUS"', time: '10 mins ago', type: 'join' },
  { id: 2, text: 'New Jackpot "ENG vs NZ" Created by Admin', time: '1 hour ago', type: 'create' },
  { id: 3, text: 'Jackpot "SA vs SL" Completed', time: '5 hours ago', type: 'status' },
  { id: 4, text: 'User "PriyanshK" withdrew ₹2,500', time: '12 hours ago', type: 'finance' },
  { id: 5, text: 'Total Prize Pool for "IND vs AUS" reached ₹50L', time: '1 day ago', type: 'milestone' },
];

const MetricCard = ({ title, value, trend, isPositive, Icon }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col hover:border-slate-300 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-500">{title}</h3>
        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center">
          <Icon className="w-4 h-4 text-slate-600" />
        </div>
      </div>
      <div className="mb-2">
        <span className="text-3xl font-bold text-slate-900 tracking-tight">{value}</span>
      </div>
      <div className={`flex items-center text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
        {isPositive ? <TrendingUp className="w-3.5 h-3.5 mr-1" /> : <TrendingDown className="w-3.5 h-3.5 mr-1" />}
        {trend}
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Header section is clean and minimal */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Overview</h1>
        <p className="text-sm text-slate-500 mt-1">Here's what's happening on PickCric today.</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Total Users" 
          value="24.5k" 
          trend="+12% from last week" 
          isPositive={true} 
          Icon={Users} 
        />
        <MetricCard 
          title="Active Jackpots" 
          value="12" 
          trend="+2 since yesterday" 
          isPositive={true} 
          Icon={Trophy} 
        />
        <MetricCard 
          title="Total Revenue" 
          value="₹12.4M" 
          trend="+5.4% from last month" 
          isPositive={true} 
          Icon={DollarSign} 
        />
        <MetricCard 
          title="Ongoing Bets" 
          value="142.3k" 
          trend="-2.1% from last week" 
          isPositive={false} 
          Icon={Activity} 
        />
      </div>

      {/* Main Charts & Activity Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Area Chart: User Engagement */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-base font-bold text-slate-800">User Engagement</h2>
            <button className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-md hover:bg-blue-100 transition-colors">
              Last 30 Days
            </button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748B' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748B' }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    borderRadius: '8px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} 
                  itemStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#3B82F6" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorUsers)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-bold text-slate-800">Recent Activity</h2>
            <button className="text-slate-400 hover:text-slate-600 transition-colors">
              <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1">
            <div className="space-y-6">
              {mockRecentActivity.map((activity, idx) => (
                <div key={activity.id} className="flex relative">
                   {/* Timeline line */}
                  {idx !== mockRecentActivity.length - 1 && (
                    <div className="absolute top-8 bottom-[-24px] left-[11px] w-[2px] bg-slate-100"></div>
                  )}
                  
                  {/* Status Indicator */}
                  <div className="relative z-10 flex-shrink-0 w-6 h-6 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mr-4 mt-0.5">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'create' ? 'bg-green-500' :
                      activity.type === 'join' ? 'bg-blue-500' :
                      activity.type === 'finance' ? 'bg-emerald-500' :
                      activity.type === 'status' ? 'bg-amber-500' :
                      'bg-purple-500'
                    }`}></div>
                  </div>
                  
                  {/* Activity Content */}
                  <div>
                    <p className="text-sm font-medium text-slate-800 leading-snug">{activity.text}</p>
                    <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
