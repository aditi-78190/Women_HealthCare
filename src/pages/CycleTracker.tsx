import React, { useState } from 'react';
import { Calendar as CalIcon, ChevronLeft, ChevronRight, Plus, Trash2, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { v4 as uuid } from 'uuid';

export default function CycleTracker() {
  const { profile, cycleEntries, setCycleEntries } = useApp();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [notes, setNotes] = useState('');

  if (!profile?.cycleTracking) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20 animate-fade-in">
        <CalIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Cycle Tracking Disabled</h2>
        <p className="text-gray-600 mb-6">You haven't enabled menstrual cycle tracking. You can enable it in Settings.</p>
      </div>
    );
  }

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const periodDates = new Set<string>();
  cycleEntries.forEach(entry => {
    const start = new Date(entry.startDate);
    const end = entry.endDate ? new Date(entry.endDate) : new Date(start.getTime() + 5 * 24 * 60 * 60 * 1000);
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      periodDates.add(d.toISOString().split('T')[0]);
    }
  });

  const handleAddEntry = () => {
    if (!startDate) return;
    const entry = {
      id: uuid(),
      startDate,
      endDate: endDate || '',
      symptoms: symptoms.split(',').map(s => s.trim()).filter(Boolean),
      notes,
    };
    setCycleEntries([...cycleEntries, entry]);
    setShowForm(false);
    setStartDate('');
    setEndDate('');
    setSymptoms('');
    setNotes('');
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this cycle entry?')) {
      setCycleEntries(cycleEntries.filter(e => e.id !== id));
    }
  };

  // Calculate cycle stats
  const sortedEntries = [...cycleEntries].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  let avgCycleLength = 0;
  let avgPeriodDuration = 0;
  if (sortedEntries.length >= 2) {
    const lengths: number[] = [];
    const durations: number[] = [];
    for (let i = 0; i < sortedEntries.length - 1; i++) {
      const diff = Math.floor((new Date(sortedEntries[i].startDate).getTime() - new Date(sortedEntries[i + 1].startDate).getTime()) / (1000 * 60 * 60 * 24));
      if (diff > 0 && diff < 60) lengths.push(diff);
      if (sortedEntries[i].endDate) {
        const dur = Math.floor((new Date(sortedEntries[i].endDate).getTime() - new Date(sortedEntries[i].startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1;
        if (dur > 0) durations.push(dur);
      }
    }
    if (lengths.length > 0) avgCycleLength = Math.round(lengths.reduce((a, b) => a + b, 0) / lengths.length);
    if (durations.length > 0) avgPeriodDuration = Math.round(durations.reduce((a, b) => a + b, 0) / durations.length);
  }

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Cycle Tracker</h1>
          <p className="text-gray-600 mt-1">Track your menstrual cycle and identify patterns.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 bg-lavender-600 text-white rounded-xl font-medium hover:bg-lavender-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Log Period
        </button>
      </div>

      {/* Stats */}
      {sortedEntries.length >= 2 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-sm text-gray-500">Avg Cycle Length</p>
            <p className="text-2xl font-bold text-lavender-700">{avgCycleLength || '—'} <span className="text-sm font-normal">days</span></p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-sm text-gray-500">Avg Period Duration</p>
            <p className="text-2xl font-bold text-rose-warm-500">{avgPeriodDuration || '—'} <span className="text-sm font-normal">days</span></p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-sm text-gray-500">Total Cycles Logged</p>
            <p className="text-2xl font-bold text-plum-600">{cycleEntries.length}</p>
          </div>
        </div>
      )}

      {/* Add Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8 animate-fade-in">
          <h3 className="font-semibold text-gray-900 mb-4">Log Period</h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
              <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-lavender-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date (optional)</label>
              <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-lavender-400" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Symptoms (comma-separated)</label>
            <input type="text" value={symptoms} onChange={e => setSymptoms(e.target.value)}
              placeholder="Cramps, headache, fatigue..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-lavender-400" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-lavender-400" />
          </div>
          <div className="flex gap-3">
            <button onClick={handleAddEntry} disabled={!startDate}
              className="px-6 py-2.5 bg-lavender-600 text-white rounded-xl font-medium hover:bg-lavender-700 disabled:opacity-50 transition-colors">
              Save Entry
            </button>
            <button onClick={() => setShowForm(false)}
              className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Calendar */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setCurrentMonth(new Date(year, month - 1))} className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h3 className="text-lg font-semibold text-gray-900">{monthName}</h3>
          <button onClick={() => setCurrentMonth(new Date(year, month + 1))} className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="text-center text-xs font-medium text-gray-400 py-2">{d}</div>
          ))}
          {days.map((day, i) => {
            if (!day) return <div key={`empty-${i}`} />;
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isPeriod = periodDates.has(dateStr);
            const isToday = dateStr === new Date().toISOString().split('T')[0];
            return (
              <div
                key={i}
                className={`aspect-square flex items-center justify-center rounded-lg text-sm transition-colors
                  ${isPeriod ? 'bg-rose-warm-100 text-rose-warm-700 font-medium' : ''}
                  ${isToday && !isPeriod ? 'bg-lavender-50 text-lavender-700 font-medium' : ''}
                  ${!isPeriod && !isToday ? 'text-gray-700 hover:bg-gray-50' : ''}
                `}
              >
                {day}
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-rose-warm-100" /> Period days
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-lavender-50" /> Today
          </div>
        </div>
      </div>

      {/* History */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Cycle History</h3>
        {sortedEntries.length > 0 ? (
          <div className="space-y-3">
            {sortedEntries.map(entry => (
              <div key={entry.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900">
                    {new Date(entry.startDate).toLocaleDateString()} — {entry.endDate ? new Date(entry.endDate).toLocaleDateString() : 'Ongoing'}
                  </p>
                  {entry.symptoms.length > 0 && (
                    <p className="text-sm text-gray-500 mt-1">{entry.symptoms.join(', ')}</p>
                  )}
                  {entry.notes && <p className="text-sm text-gray-400 mt-1 italic">{entry.notes}</p>}
                </div>
                <button onClick={() => handleDelete(entry.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm text-center py-4">No cycle entries yet. Log your first period above.</p>
        )}
      </div>

      {/* Disclaimer */}
      <div className="mt-6 flex items-start gap-3 p-4 bg-lavender-50 rounded-xl">
        <Info className="w-5 h-5 text-lavender-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-lavender-800">
          <strong>Note:</strong> Cycle predictions and calculations are estimates based on your logged data. They are not medical facts. For medical concerns about your cycle, please consult a healthcare provider.
        </p>
      </div>
    </div>
  );
}
