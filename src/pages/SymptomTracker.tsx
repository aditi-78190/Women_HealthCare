import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Search, Filter, X, Save, Activity } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { commonSymptoms } from '../data/educationalContent';
import { v4 as uuid } from 'uuid';
import type { SymptomEntry } from '../services/storageService';

export default function SymptomTracker() {
  const { symptoms, setSymptoms } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSymptom, setFilterSymptom] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'severity'>('date');

  const [form, setForm] = useState({
    name: '', date: new Date().toISOString().split('T')[0], time: '',
    severity: 5, duration: '', bodyArea: '', cycleAssociation: '',
    mood: 5, energy: 5, sleepQuality: 5, notes: '', triggers: '',
  });

  const resetForm = () => {
    setForm({
      name: '', date: new Date().toISOString().split('T')[0], time: '',
      severity: 5, duration: '', bodyArea: '', cycleAssociation: '',
      mood: 5, energy: 5, sleepQuality: 5, notes: '', triggers: '',
    });
    setEditingId(null);
  };

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    if (editingId) {
      const updated = symptoms.map(s => s.id === editingId ? { ...s, ...form } : s);
      setSymptoms(updated);
    } else {
      const entry: SymptomEntry = { id: uuid(), ...form, createdAt: new Date().toISOString() };
      setSymptoms([...symptoms, entry]);
    }
    resetForm();
    setShowForm(false);
  };

  const handleEdit = (s: SymptomEntry) => {
    setForm({
      name: s.name, date: s.date, time: s.time, severity: s.severity,
      duration: s.duration, bodyArea: s.bodyArea, cycleAssociation: s.cycleAssociation,
      mood: s.mood, energy: s.energy, sleepQuality: s.sleepQuality,
      notes: s.notes, triggers: s.triggers,
    });
    setEditingId(s.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this symptom entry?')) {
      setSymptoms(symptoms.filter(s => s.id !== id));
    }
  };

  let filtered = [...symptoms];
  if (searchTerm) {
    filtered = filtered.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.notes.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  if (filterSymptom) {
    filtered = filtered.filter(s => s.name === filterSymptom);
  }
  filtered.sort((a, b) => {
    if (sortBy === 'severity') return b.severity - a.severity;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const uniqueSymptoms = [...new Set(symptoms.map(s => s.name))];

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Symptom Tracker</h1>
          <p className="text-gray-600 mt-1">Log and track your symptoms over time.</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(!showForm); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-lavender-600 text-white rounded-xl font-medium hover:bg-lavender-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Log Symptom
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8 animate-fade-in">
          <h3 className="font-semibold text-gray-900 mb-4">{editingId ? 'Edit Symptom' : 'Log New Symptom'}</h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Symptom *</label>
              <select value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-lavender-400">
                <option value="">Select symptom...</option>
                {commonSymptoms.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
              <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-lavender-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input type="time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-lavender-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <input type="text" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })}
                placeholder="e.g., 2 hours, all day"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-lavender-400" />
            </div>
          </div>

          {/* Severity */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Severity: {form.severity}/10</label>
            <input type="range" min="1" max="10" value={form.severity}
              onChange={e => setForm({ ...form, severity: Number(e.target.value) })}
              className="w-full accent-lavender-500" />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Mild</span><span>Moderate</span><span>Severe</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Body Area</label>
              <input type="text" value={form.bodyArea} onChange={e => setForm({ ...form, bodyArea: e.target.value })}
                placeholder="e.g., lower abdomen, head"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-lavender-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cycle Association</label>
              <select value={form.cycleAssociation} onChange={e => setForm({ ...form, cycleAssociation: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-lavender-400">
                <option value="">Not applicable</option>
                <option value="before-period">Before period</option>
                <option value="during-period">During period</option>
                <option value="after-period">After period</option>
                <option value="mid-cycle">Mid-cycle</option>
              </select>
            </div>
          </div>

          {/* Mood, Energy, Sleep */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mood: {form.mood}/10</label>
              <input type="range" min="1" max="10" value={form.mood}
                onChange={e => setForm({ ...form, mood: Number(e.target.value) })}
                className="w-full accent-amber-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Energy: {form.energy}/10</label>
              <input type="range" min="1" max="10" value={form.energy}
                onChange={e => setForm({ ...form, energy: Number(e.target.value) })}
                className="w-full accent-green-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sleep: {form.sleepQuality}/10</label>
              <input type="range" min="1" max="10" value={form.sleepQuality}
                onChange={e => setForm({ ...form, sleepQuality: Number(e.target.value) })}
                className="w-full accent-indigo-400" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Triggers</label>
              <input type="text" value={form.triggers} onChange={e => setForm({ ...form, triggers: e.target.value })}
                placeholder="e.g., stress, certain foods"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-lavender-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={2}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-lavender-400" />
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={handleSubmit} disabled={!form.name}
              className="flex items-center gap-2 px-6 py-2.5 bg-lavender-600 text-white rounded-xl font-medium hover:bg-lavender-700 disabled:opacity-50 transition-colors">
              <Save className="w-4 h-4" />
              {editingId ? 'Update' : 'Save'} Entry
            </button>
            <button onClick={() => { setShowForm(false); resetForm(); }}
              className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search symptoms..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-lavender-400" />
        </div>
        <select value={filterSymptom} onChange={e => setFilterSymptom(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-200 focus:border-lavender-400">
          <option value="">All symptoms</option>
          {uniqueSymptoms.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={sortBy} onChange={e => setSortBy(e.target.value as 'date' | 'severity')}
          className="px-4 py-2.5 rounded-xl border border-gray-200 focus:border-lavender-400">
          <option value="date">Sort by date</option>
          <option value="severity">Sort by severity</option>
        </select>
      </div>

      {/* List */}
      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map(s => (
            <div key={s.id} className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-semibold text-gray-900">{s.name}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      s.severity >= 7 ? 'bg-red-100 text-red-700' :
                      s.severity >= 4 ? 'bg-amber-100 text-amber-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {s.severity}/10
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(s.date).toLocaleDateString()} {s.time && `at ${s.time}`}
                    {s.duration && ` • Duration: ${s.duration}`}
                    {s.bodyArea && ` • ${s.bodyArea}`}
                  </p>
                  {s.notes && <p className="text-sm text-gray-400 mt-1 italic">"{s.notes}"</p>}
                  <div className="flex gap-3 mt-2 text-xs text-gray-400">
                    <span>Mood: {s.mood}/10</span>
                    <span>Energy: {s.energy}/10</span>
                    <span>Sleep: {s.sleepQuality}/10</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => handleEdit(s)} className="p-2 text-gray-400 hover:text-lavender-600 transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(s.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <Activity className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">
            {searchTerm || filterSymptom ? 'No matching symptoms found' : 'No symptoms logged yet'}
          </h3>
          <p className="text-gray-500 text-sm">
            {searchTerm || filterSymptom ? 'Try adjusting your search or filters.' : 'Start logging how you feel to track patterns over time.'}
          </p>
        </div>
      )}
    </div>
  );
}


