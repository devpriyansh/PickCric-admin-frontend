import { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  ChevronRight,
  DollarSign,
  Trophy,
  Users,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ACTIVE_GREEN = '#22C55E';

const CreateJackpot = () => {
  const navigate = useNavigate();

  // --- Core State ---
  const [matches, setMatches] = useState([]);
  const [matchesLoading, setMatchesLoading] = useState(true);
  const [matchesError, setMatchesError] = useState('');
  
  // --- Form & Selection State ---
  const [selectedLeague, setSelectedLeague] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [displayedMatches, setDisplayedMatches] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  const [formData, setFormData] = useState({
    jackpotName: '',
    entryFee: '',
    prizePool: '',
    maxUsers: '',
    startDate: '',
    endDate: '',
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // 1. Fetch Matches from Backend
  useEffect(() => {
    const controller = new AbortController();
    const loadMatches = async () => {
      try {
        setMatchesLoading(true);
        setMatchesError('');
        // Adjust this URL if your matches API is on a different route
        const response = await fetch('http://localhost:5001/api/matches', {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error('Failed to load matches');
        const data = await response.json();
        setMatches(Array.isArray(data) ? data : []);
      } catch (error) {
        if (error.name !== 'AbortError') setMatchesError(error.message || 'Unable to fetch matches');
      } finally {
        if (!controller.signal.aborted) setMatchesLoading(false);
      }
    };
    loadMatches();
    return () => controller.abort();
  }, []);

  // 2. Extract unique leagues for dropdown
  const leagues = useMemo(() => {
    return [...new Set(matches.map((match) => match.league).filter(Boolean))];
  }, [matches]);

  // 3. Manual Search Function
  const handleSearchMatches = () => {
    setErrors((prev) => ({ ...prev, selectedLeague: '', selectedDate: '' }));

    if (!selectedLeague) {
      setErrors((prev) => ({ ...prev, selectedLeague: 'Please select a league first' }));
      return;
    }
    if (!selectedDate) {
      setErrors((prev) => ({ ...prev, selectedDate: 'Please select a date first' }));
      return;
    }

    const filtered = matches.filter((match) => {
      const matchesLeague = match.league === selectedLeague;
      let matchesDate = false;
      if (match.matchDate) {
        // Strip timestamps to perfectly match HTML date input (YYYY-MM-DD)
        const backendDateStr = match.matchDate.split('T')[0]; 
        matchesDate = backendDateStr === selectedDate;
      }
      return matchesLeague && matchesDate;
    });

    setDisplayedMatches(filtered);
    setHasSearched(true);
    setSelectedMatchId(null); 
    setSelectedPlayers([]);
  };

  // 4. Determine currently selected match
  const selectedMatch = useMemo(() => {
    return matches.find((match) => String(match.id) === String(selectedMatchId)) || null;
  }, [matches, selectedMatchId]);

  // Derived Squads for rendering
  const teamAPlayers = selectedMatch?.squadA || [];
  const teamBPlayers = selectedMatch?.squadB || [];
  const selectedPlayerIds = useMemo(() => new Set(selectedPlayers.map((p) => p.id)), [selectedPlayers]);

  const step1Complete = Boolean(selectedMatch);
  const step2Complete = selectedPlayers.length > 0;

  // 5. ✅ INFINITE LOOP FIX: Manage Selected Players safely
  useEffect(() => {
    if (!selectedMatch) {
      setSelectedPlayers((current) => current.length === 0 ? current : []);
      return;
    }

    const squadA = selectedMatch.squadA || [];
    const squadB = selectedMatch.squadB || [];
    const allowedPlayers = [...squadA, ...squadB];
    const allowedIds = new Set(allowedPlayers.map((player) => player.id));

    setSelectedPlayers((currentPlayers) => {
      const filtered = currentPlayers.filter((player) => allowedIds.has(player.id));
      // Stop the re-render cycle if the array hasn't actually changed
      if (filtered.length === currentPlayers.length) return currentPlayers;
      return filtered;
    });
  }, [selectedMatch]);

  // --- Event Handlers ---
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({
      ...current, [name]: '', submit: '', time: name === 'startDate' || name === 'endDate' ? '' : current.time,
    }));
  };

  const togglePlayer = (player) => {
    setSelectedPlayers((currentPlayers) => {
      const exists = currentPlayers.some((p) => p.id === player.id);
      if (exists) return currentPlayers.filter((p) => p.id !== player.id);
      return [...currentPlayers, player];
    });
    setErrors((current) => ({ ...current, players: '', submit: '' }));
  };

  const selectAllPlayers = (players) => {
    setSelectedPlayers((currentPlayers) => {
      const currentMap = new Map(currentPlayers.map((p) => [p.id, p]));
      players.forEach((p) => currentMap.set(p.id, p));
      return Array.from(currentMap.values());
    });
    setErrors((current) => ({ ...current, players: '', submit: '' }));
  };

  // --- Validation ---
  const validate = () => {
    const nextErrors = {};
    if (!selectedLeague) nextErrors.selectedLeague = 'League selection is required';
    if (!selectedDate) nextErrors.selectedDate = 'Match date is required';
    if (!selectedMatch) nextErrors.selectedMatchId = 'Choose a match to continue';
    if (selectedPlayers.length === 0) nextErrors.players = 'Select at least one player to publish this jackpot';
    if (!formData.jackpotName.trim()) nextErrors.jackpotName = 'Jackpot name is required';
    if (formData.entryFee === '' || Number(formData.entryFee) < 0) nextErrors.entryFee = 'Enter a valid entry fee';
    if (!formData.prizePool || Number(formData.prizePool) <= 0) nextErrors.prizePool = 'Enter a valid total prize pool';
    if (!formData.maxUsers || Number(formData.maxUsers) <= 0) nextErrors.maxUsers = 'Enter a valid max users value';
    if (!formData.startDate) nextErrors.startDate = 'Start date is required';
    if (!formData.endDate) nextErrors.endDate = 'End date is required';
    if (formData.startDate && formData.endDate) {
      if (new Date(formData.endDate) <= new Date(formData.startDate)) nextErrors.time = 'End date must be after the start date';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  // --- 6. ✅ FINAL SUBMISSION PAYLOAD ---
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    try {
      setIsSubmitting(true);
      setErrors((current) => ({ ...current, submit: '' }));

      const payload = {
        matchId: selectedMatch.id,
        jackpotName: formData.jackpotName.trim(),
        leagueName: selectedMatch.league,
        matchType: `${selectedMatch.teamA?.shortName || selectedMatch.teamA?.name} vs ${selectedMatch.teamB?.shortName || selectedMatch.teamB?.name}`,
        subtitle: `${selectedMatch.teamA?.name} vs ${selectedMatch.teamB?.name}`,
        subtitle2: selectedMatch.matchDate,
        stats: selectedPlayers.length.toString(),
        maxUserLimit: Number(formData.maxUsers),
        startDate: formData.startDate,
        endDate: formData.endDate,
        topPrizes: [{ title: 'Winner', amount: Number(formData.prizePool) }],
        
        // Formatted perfectly for the PostgreSQL JSONB column
        availablePlayers: selectedPlayers.map((player) => ({
          id: player.id,
          name: player.name,
          role: player.role,
          team: teamAPlayers.some((tp) => tp.id === player.id)
              ? selectedMatch.teamA?.shortName || selectedMatch.teamA?.name
              : selectedMatch.teamB?.shortName || selectedMatch.teamB?.name,
          credits: player.credits || 9.0
        })),
        
        summary: `Entry Fee: ${formData.entryFee} | Prize Pool: ${formData.prizePool}`,
        rules: `Users can bet only on the selected ${selectedPlayers.length} players for this jackpot.`,
        gameMode: 'jackpot',
        jackpotType: 'player-selection',
        isHotContest: false,
        showOnBanner: false,
        status: 1 // Marks it Live immediately
      }; 

      const response = await fetch('http://localhost:5001/api/create-jackpots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to create jackpot');
      }

      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => navigate('/jackpots'), 1600);
    } catch (error) {
      setErrors((current) => ({ ...current, submit: error.message || 'Failed to publish jackpot' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reusable Component for Player Lists
  const renderPlayerColumn = (title, team, players) => {
    const allSelected = players.length > 0 && players.every((player) => selectedPlayerIds.has(player.id));
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-slate-900">{title}</h3>
            <p className="text-sm text-slate-500">{players.length} players available</p>
          </div>
          <button
            type="button"
            onClick={() => selectAllPlayers(players)}
            disabled={players.length === 0 || allSelected}
            className="rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 transition hover:border-green-300 hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {allSelected ? 'All Selected' : 'Select All'}
          </button>
        </div>
        <div className="space-y-3">
          {players.map((player) => {
            const checked = selectedPlayerIds.has(player.id);
            return (
              <label key={player.id} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition ${checked ? 'border-green-500 bg-green-50 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                <input type="checkbox" checked={checked} onChange={() => togglePlayer(player)} className="mt-1 h-4 w-4 rounded border-slate-300 text-[#22C55E] focus:ring-green-500" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-slate-900">{player.name}</p>
                    <span className="rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase" style={{ backgroundColor: checked ? `${ACTIVE_GREEN}20` : '#E2E8F0', color: checked ? ACTIVE_GREEN : '#475569' }}>
                      {player.role}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">
                    {team?.name} {typeof player.credits === 'number' ? `• ${player.credits} cr` : ''}
                  </p>
                </div>
              </label>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 pb-12">
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => navigate('/jackpots')} className="rounded-xl border border-slate-200 bg-white p-2 text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Create New Jackpot</h1>
          <p className="mt-1 text-sm text-slate-500">Pick a match, choose the allowed players, then publish the jackpot details.</p>
        </div>
      </div>

      {success && (
        <div className="flex items-center rounded-2xl border border-green-200 bg-green-50 p-4 text-green-800">
          <CheckCircle2 className="mr-3 h-5 w-5 text-green-600" />
          <p className="font-medium">Jackpot created successfully. Redirecting to jackpots...</p>
        </div>
      )}

      {(errors.time || errors.submit || matchesError) && (
        <div className="flex items-center rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800">
          <AlertCircle className="mr-3 h-5 w-5 text-red-600" />
          <p className="text-sm font-medium">{errors.time || errors.submit || matchesError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Step 1: Match Selection with Search Button */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="rounded-xl bg-green-50 p-2 text-green-600"><Trophy className="h-5 w-5" /></div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-600">Step 1</p>
              <h2 className="text-lg font-semibold text-slate-900">Match Selection</h2>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="league" className="mb-1.5 block text-sm font-medium text-slate-700">League <span className="text-red-500">*</span></label>
              <select id="league" value={selectedLeague} onChange={(e) => { setSelectedLeague(e.target.value); setHasSearched(false); }} className={`w-full rounded-xl border px-4 py-3 outline-none transition ${errors.selectedLeague ? 'border-red-300 ring-4 ring-red-50' : 'border-slate-300 focus:border-green-500 focus:ring-4 focus:ring-green-50'}`}>
                <option value="">Select a league</option>
                {leagues.map((league) => (<option key={league} value={league}>{league}</option>))}
              </select>
              {errors.selectedLeague && <p className="mt-1.5 text-xs text-red-500">{errors.selectedLeague}</p>}
            </div>
            <div>
              <label htmlFor="matchDate" className="mb-1.5 block text-sm font-medium text-slate-700">Match Date <span className="text-red-500">*</span></label>
              <input type="date" id="matchDate" value={selectedDate} onChange={(e) => { setSelectedDate(e.target.value); setHasSearched(false); }} className={`w-full rounded-xl border px-4 py-3 outline-none transition ${errors.selectedDate ? 'border-red-300 ring-4 ring-red-50' : 'border-slate-300 focus:border-green-500 focus:ring-4 focus:ring-green-50'}`} />
              {errors.selectedDate && <p className="mt-1.5 text-xs text-red-500">{errors.selectedDate}</p>}
            </div>
          </div>

          {/* Explicit Search Button */}
          <div className="mt-5 flex justify-end border-b border-slate-100 pb-6">
            <button
              type="button"
              onClick={handleSearchMatches}
              className="rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 transition-all"
            >
              Find Fixtures
            </button>
          </div>

          <div className="mt-6">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-700"><Calendar className="h-4 w-4 text-slate-400" /> Matching fixtures</div>
            {matchesLoading ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">Loading available matches...</div>
            ) : !hasSearched ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-indigo-50 p-6 text-sm text-indigo-600 font-medium">Select a League and Date, then click "Find Fixtures" to see matches.</div>
            ) : displayedMatches.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">No matches found for this league on this exact date.</div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {displayedMatches.map((match) => {
                  const isActive = String(match.id) === String(selectedMatchId);
                  return (
                    <button key={match.id} type="button" onClick={() => { setSelectedMatchId(match.id); setErrors((current) => ({ ...current, selectedMatchId: '', submit: '' })); }} className={`rounded-2xl border p-5 text-left transition ${isActive ? 'border-green-500 bg-green-50 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'}`}>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{match.league}</p>
                          <h3 className="mt-2 text-lg font-semibold text-slate-900">{match.teamA?.shortName || match.teamA?.name} vs {match.teamB?.shortName || match.teamB?.name}</h3>
                          <p className="mt-1 text-sm text-slate-500">{match.teamA?.name} vs {match.teamB?.name}</p>
                        </div>
                        <ChevronRight className={`h-5 w-5 ${isActive ? 'text-green-600' : 'text-slate-300'}`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
            {errors.selectedMatchId && <p className="mt-3 text-xs text-red-500">{errors.selectedMatchId}</p>}
          </div>
        </section>

        {/* Step 2: Player Selection */}
        <section className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition sm:p-8 ${step1Complete ? 'opacity-100' : 'opacity-60'}`}>
          <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="rounded-xl bg-green-50 p-2 text-green-600"><Users className="h-5 w-5" /></div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-600">Step 2</p>
              <h2 className="text-lg font-semibold text-slate-900">Player Selection</h2>
            </div>
          </div>
          {!selectedMatch ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">Select a match above to reveal the real squads for both teams.</div>
          ) : (
            <>
              <div className="mb-5 rounded-2xl border border-green-100 bg-green-50/70 p-4">
                <p className="text-sm font-medium text-slate-900">Selected match: {selectedMatch.teamA?.name} vs {selectedMatch.teamB?.name}</p>
                <p className="mt-1 text-sm text-slate-600">{selectedPlayers.length} players selected for betting</p>
              </div>
              <div className="grid gap-5 lg:grid-cols-2">
                {renderPlayerColumn(selectedMatch.teamA?.shortName || 'Team A', selectedMatch.teamA, teamAPlayers)}
                {renderPlayerColumn(selectedMatch.teamB?.shortName || 'Team B', selectedMatch.teamB, teamBPlayers)}
              </div>
              {errors.players && <p className="mt-4 text-xs text-red-500">{errors.players}</p>}
            </>
          )}
        </section>

        {/* Step 3: Jackpot Details */}
        <section className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition sm:p-8 ${step1Complete && step2Complete ? 'opacity-100' : 'opacity-60'}`}>
          <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="rounded-xl bg-green-50 p-2 text-green-600"><DollarSign className="h-5 w-5" /></div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-600">Step 3</p>
              <h2 className="text-lg font-semibold text-slate-900">Jackpot Details & Submit</h2>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="jackpotName" className="mb-1.5 block text-sm font-medium text-slate-700">Jackpot Name <span className="text-red-500">*</span></label>
              <input id="jackpotName" name="jackpotName" type="text" value={formData.jackpotName} onChange={handleFormChange} placeholder="e.g. MI vs CSK Mega Jackpot" className={`w-full rounded-xl border px-4 py-3 outline-none transition ${errors.jackpotName ? 'border-red-300 ring-4 ring-red-50' : 'border-slate-300 focus:border-green-500 focus:ring-4 focus:ring-green-50'}`} />
              {errors.jackpotName && <p className="mt-1.5 text-xs text-red-500">{errors.jackpotName}</p>}
            </div>
            <div>
              <label htmlFor="entryFee" className="mb-1.5 block text-sm font-medium text-slate-700">Entry Fee (Rs) <span className="text-red-500">*</span></label>
              <input id="entryFee" name="entryFee" type="number" min="0" value={formData.entryFee} onChange={handleFormChange} placeholder="49" className={`w-full rounded-xl border px-4 py-3 outline-none transition ${errors.entryFee ? 'border-red-300 ring-4 ring-red-50' : 'border-slate-300 focus:border-green-500 focus:ring-4 focus:ring-green-50'}`} />
              {errors.entryFee && <p className="mt-1.5 text-xs text-red-500">{errors.entryFee}</p>}
            </div>
            <div>
              <label htmlFor="prizePool" className="mb-1.5 block text-sm font-medium text-slate-700">Total Prize Pool (Rs) <span className="text-red-500">*</span></label>
              <input id="prizePool" name="prizePool" type="number" min="1" value={formData.prizePool} onChange={handleFormChange} placeholder="500000" className={`w-full rounded-xl border px-4 py-3 outline-none transition ${errors.prizePool ? 'border-red-300 ring-4 ring-red-50' : 'border-slate-300 focus:border-green-500 focus:ring-4 focus:ring-green-50'}`} />
              {errors.prizePool && <p className="mt-1.5 text-xs text-red-500">{errors.prizePool}</p>}
            </div>
            <div>
              <label htmlFor="maxUsers" className="mb-1.5 block text-sm font-medium text-slate-700">Max Users <span className="text-red-500">*</span></label>
              <input id="maxUsers" name="maxUsers" type="number" min="1" value={formData.maxUsers} onChange={handleFormChange} placeholder="1000" className={`w-full rounded-xl border px-4 py-3 outline-none transition ${errors.maxUsers ? 'border-red-300 ring-4 ring-red-50' : 'border-slate-300 focus:border-green-500 focus:ring-4 focus:ring-green-50'}`} />
              {errors.maxUsers && <p className="mt-1.5 text-xs text-red-500">{errors.maxUsers}</p>}
            </div>
            <div>
              <label htmlFor="startDate" className="mb-1.5 block text-sm font-medium text-slate-700">Start Date <span className="text-red-500">*</span></label>
              <input id="startDate" name="startDate" type="datetime-local" value={formData.startDate} onChange={handleFormChange} className={`w-full rounded-xl border px-4 py-3 outline-none transition ${errors.startDate || errors.time ? 'border-red-300 ring-4 ring-red-50' : 'border-slate-300 focus:border-green-500 focus:ring-4 focus:ring-green-50'}`} />
              {errors.startDate && <p className="mt-1.5 text-xs text-red-500">{errors.startDate}</p>}
            </div>
            <div>
              <label htmlFor="endDate" className="mb-1.5 block text-sm font-medium text-slate-700">End Date <span className="text-red-500">*</span></label>
              <input id="endDate" name="endDate" type="datetime-local" value={formData.endDate} onChange={handleFormChange} className={`w-full rounded-xl border px-4 py-3 outline-none transition ${errors.endDate || errors.time ? 'border-red-300 ring-4 ring-red-50' : 'border-slate-300 focus:border-green-500 focus:ring-4 focus:ring-green-50'}`} />
              {errors.endDate && <p className="mt-1.5 text-xs text-red-500">{errors.endDate}</p>}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-900">Publishing summary</p>
            <p className="mt-1 text-sm text-slate-600">Match: {selectedMatch ? `${selectedMatch.teamA?.shortName || selectedMatch.teamA?.name} vs ${selectedMatch.teamB?.shortName || selectedMatch.teamB?.name}` : 'No match selected yet'}</p>
            <p className="mt-1 text-sm text-slate-600">Allowed players: {selectedPlayers.length}</p>
          </div>

          <div className="mt-8 flex items-center justify-end gap-4 border-t border-slate-200 pt-6">
            <button type="button" onClick={() => navigate('/jackpots')} className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">Cancel</button>
            <button type="submit" disabled={isSubmitting || !step1Complete || !step2Complete} className={`rounded-xl px-8 py-3 text-sm font-semibold text-white shadow-sm transition ${isSubmitting || !step1Complete || !step2Complete ? 'cursor-not-allowed bg-green-300' : 'bg-[#22C55E] hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'}`}>
              {isSubmitting ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default CreateJackpot;