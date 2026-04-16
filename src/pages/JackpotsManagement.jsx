import { useState, useEffect, useMemo } from 'react';
import { 
  Plus, Edit2, Trash2, Calendar, Clock, Trophy, 
  Search, Filter, X, RefreshCw 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Utility functions
const getStatusDetails = (status) => {
  switch (String(status)) {
    case '1':
      return { label: 'Live', styles: 'bg-green-100 text-green-700 border-green-200' };
    case '2':
      return { label: 'Upcoming', styles: 'bg-blue-100 text-blue-700 border-blue-200' };
    case '0':
      return { label: 'Completed', styles: 'bg-slate-100 text-slate-700 border-slate-200' };
    default:
      return { label: 'Unknown', styles: 'bg-slate-100 text-slate-700 border-slate-200' };
  }
};

const formatDate = (dateString) => {
  if (!dateString) return 'TBA';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date);
};

const formatTime = (dateString) => {
  if (!dateString) return 'TBA';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(date);
};

const JackpotsManagement = () => {
  const navigate = useNavigate();

  // Data State
  const [jackpots, setJackpots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  // Fetch all jackpots on mount
  useEffect(() => {
    const fetchJackpots = async () => {
      try {
        setIsLoading(true);
        // Replace with your actual backend URL/port if needed
        const response = await fetch('http://localhost:5001/api/getAllJackpots');
        const result = await response.json();

        if (result.success) {
          setJackpots(result.data);
        } else {
          setError(result.message || 'Failed to load jackpots');
        }
      } catch (err) {
        setError('Unable to connect to the server');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJackpots();
  }, []);

  // Filter Logic
  const filteredJackpots = useMemo(() => {
    return jackpots.filter((jackpot) => {
      // 1. Search (Checks Name, League, or Match Title)
      const searchStr = `${jackpot.jackpotName} ${jackpot.leagueName} ${jackpot.matchType}`.toLowerCase();
      const matchesSearch = searchTerm === '' || searchStr.includes(searchTerm.toLowerCase());

      // 2. Status
      const matchesStatus = statusFilter === 'all' || String(jackpot.status) === statusFilter;

      // 3. Type
      const matchesType = typeFilter === 'all' || jackpot.jackpotType === typeFilter;

      // 4. Date
      let matchesDate = true;
      if (dateFilter && jackpot.startDate) {
        const backendDateStr = jackpot.startDate.split('T')[0];
        matchesDate = backendDateStr === dateFilter;
      }

      return matchesSearch && matchesStatus && matchesType && matchesDate;
    });
  }, [jackpots, searchTerm, statusFilter, typeFilter, dateFilter]);

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setTypeFilter('all');
    setDateFilter('');
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Manage Jackpots</h1>
          <p className="text-sm text-slate-500 mt-1">View, filter, and manage all your cricket jackpots here.</p>
        </div>
        <button
          onClick={() => navigate('/jackpots/create')}
          className="inline-flex items-center justify-center px-4 py-2.5 bg-[#22C55E] text-white text-sm font-medium rounded-lg hover:bg-green-500 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2 -ml-1" />
          Create New Jackpot
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col lg:flex-row gap-4 items-end">
        <div className="w-full lg:w-1/3">
          <label className="block text-xs font-medium text-slate-500 mb-1.5">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search match or league..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all"
            />
          </div>
        </div>

        <div className="w-full lg:w-1/6">
          <label className="block text-xs font-medium text-slate-500 mb-1.5">Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="1">Live</option>
            <option value="2">Upcoming</option>
            <option value="0">Completed</option>
          </select>
        </div>

        <div className="w-full lg:w-1/6">
          <label className="block text-xs font-medium text-slate-500 mb-1.5">Jackpot Type</label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none"
          >
            <option value="all">All Types</option>
            <option value="player-selection">Best 11</option>
            <option value="exact-11">Exact 11</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="w-full lg:w-1/6">
          <label className="block text-xs font-medium text-slate-500 mb-1.5">Start Date</label>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none"
          />
        </div>

        <div className="w-full lg:w-1/6 flex justify-end">
          <button
            onClick={resetFilters}
            className="w-full inline-flex items-center justify-center px-4 py-2 border border-slate-200 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
          >
            <X className="w-4 h-4 mr-1.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Main Table Area */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
            <RefreshCw className="w-8 h-8 text-green-500 animate-spin mb-4" />
            <p className="text-slate-500 text-sm">Loading jackpots...</p>
          </div>
        ) : error ? (
           <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
             <p className="text-red-500 text-sm font-medium">{error}</p>
           </div>
        ) : filteredJackpots.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
              <Filter className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-1">No Jackpots Found</h3>
            <p className="text-slate-500 text-sm max-w-sm mb-6">No matches align with your current filters.</p>
            <button
              onClick={resetFilters}
              className="text-sm font-medium text-green-600 hover:text-green-700"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  <th className="px-6 py-4">Jackpot Details</th>
                  <th className="px-6 py-4">Status & Type</th>
                  <th className="px-6 py-4">Timeline</th>
                  <th className="px-6 py-4">Financials</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 pb-2">
                {filteredJackpots.map((jackpot) => {
                  const statusData = getStatusDetails(jackpot.status);
                  
                  return (
                    <tr key={jackpot.id} className="hover:bg-slate-50/50 transition-colors group">
                      
                      {/* Jackpot Details */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-lg flex flex-shrink-0 items-center justify-center font-bold text-[10px] text-slate-500 mr-3">
                            VS
                          </div>
                          <div>
                            <span className="font-medium text-slate-900 block">{jackpot.jackpotName || jackpot.matchType}</span>
                            <span className="text-xs text-slate-500">{jackpot.leagueName}</span>
                          </div>
                        </div>
                      </td>

                      {/* Status & Type */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col items-start gap-1.5">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${statusData.styles}`}>
                            {statusData.label === 'Live' && <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse"></span>}
                            {statusData.label === 'Upcoming' && <Clock className="w-3 h-3 mr-1" />}
                            {statusData.label}
                          </span>
                          <span className="text-xs text-slate-500 capitalize px-1">{jackpot.jackpotType?.replace('-', ' ')}</span>
                        </div>
                      </td>

                      {/* Timeline */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col text-sm text-slate-600">
                          <div className="flex items-center mb-1">
                            <Calendar className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                            <span>{formatDate(jackpot.startDate)}</span>
                          </div>
                          <div className="flex items-center text-xs text-slate-500">
                            <Clock className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                            <span>{formatTime(jackpot.startDate)} - {formatTime(jackpot.endDate)}</span>
                          </div>
                        </div>
                      </td>

                      {/* Financials */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <div className="flex items-center text-slate-900 font-semibold text-sm">
                            <Trophy className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
                            ₹{jackpot.topPrizes?.[0]?.amount?.toLocaleString('en-IN') || '0'}
                          </div>
                          <span className="text-xs text-slate-500 mt-1">Users: {jackpot.maxUserLimit}</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Edit">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default JackpotsManagement;