import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, Trash2, Download, LogOut, Save, Check, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { clearAllData, exportAllData, addReminder } from '../services/storageService';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

export default function Settings() {
  const { profile, setProfile, reminders, setReminders, refreshData } = useApp();
  const navigate = useNavigate();
  const [name, setName] = useState(profile?.name || '');
  const [cycleTracking, setCycleTracking] = useState(profile?.cycleTracking || false);
  const [saved, setSaved] = useState(false);
  const [showReminderForm, setShowReminderForm] = useState(false);
  const [reminderTitle, setReminderTitle] = useState('');
  const [reminderDate, setReminderDate] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleSaveProfile = () => {
    if (!name.trim() || !profile) return;
    setProfile({ ...profile, name: name.trim(), cycleTracking });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAddReminder = () => {
    if (!reminderTitle.trim() || !reminderDate) return;
    const reminder = {
      id: uuid(),
      title: reminderTitle,
      date: reminderDate,
      time: reminderTime,
      type: 'custom',
      completed: false,
      recurring: false,
    };
    setReminders([...reminders, reminder]);
    setReminderTitle('');
    setReminderDate('');
    setReminderTime('');
    setShowReminderForm(false);
  };

  const handleToggleReminder = (id: string) => {
    setReminders(reminders.map(r => r.id === id ? { ...r, completed: !r.completed } : r));
  };

  const handleDeleteReminder = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  const handleExport = () => {
    const data = exportAllData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hera_data_export_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearData = () => {
    clearAllData();
    refreshData();
    setShowClearConfirm(false);
    navigate('/');
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your profile, preferences, and data.</p>
      </div>

      {/* Profile */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-lavender-500" />
          Profile
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-lavender-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age Range</label>
            <p className="text-sm text-gray-500">{profile?.ageRange || 'Not specified'}</p>
          </div>
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={cycleTracking} onChange={e => setCycleTracking(e.target.checked)}
                className="w-4 h-4 rounded accent-lavender-500" />
              <div>
                <span className="text-sm text-gray-700 font-medium">Enable Menstrual Cycle Tracking</span>
                <p className="text-xs text-gray-500">Track periods and cycle patterns</p>
              </div>
            </label>
          </div>
          <button onClick={handleSaveProfile}
            className="flex items-center gap-2 px-5 py-2.5 bg-lavender-600 text-white rounded-xl font-medium hover:bg-lavender-700 transition-colors">
            {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Reminders */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900 flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-500" />
            Reminders
          </h2>
          <button onClick={() => setShowReminderForm(!showReminderForm)}
            className="text-sm text-lavender-600 font-medium hover:text-lavender-700">
            + Add Reminder
          </button>
        </div>

        {showReminderForm && (
          <div className="bg-gray-50 rounded-xl p-4 mb-4 animate-fade-in">
            <div className="grid sm:grid-cols-3 gap-3 mb-3">
              <input type="text" value={reminderTitle} onChange={e => setReminderTitle(e.target.value)}
                placeholder="Reminder title" className="px-3 py-2 rounded-lg border border-gray-200 text-sm" />
              <input type="date" value={reminderDate} onChange={e => setReminderDate(e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-200 text-sm" />
              <input type="time" value={reminderTime} onChange={e => setReminderTime(e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-200 text-sm" />
            </div>
            <div className="flex gap-2">
              <button onClick={handleAddReminder} disabled={!reminderTitle || !reminderDate}
                className="px-4 py-2 bg-lavender-600 text-white rounded-lg text-sm font-medium hover:bg-lavender-700 disabled:opacity-50 transition-colors">
                Add
              </button>
              <button onClick={() => setShowReminderForm(false)}
                className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-100 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        )}

        {reminders.length > 0 ? (
          <div className="space-y-2">
            {reminders.map(r => (
              <div key={r.id} className={`flex items-center gap-3 p-3 rounded-xl ${r.completed ? 'bg-gray-50' : 'bg-white border border-gray-100'}`}>
                <button onClick={() => handleToggleReminder(r.id)}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    r.completed ? 'bg-sage-500 border-sage-500' : 'border-gray-300'
                  }`}>
                  {r.completed && <Check className="w-3 h-3 text-white" />}
                </button>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${r.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{r.title}</p>
                  <p className="text-xs text-gray-500">{r.date} {r.time}</p>
                </div>
                <button onClick={() => handleDeleteReminder(r.id)} className="p-1 text-gray-400 hover:text-red-500">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No reminders set. Add one to stay on track with your health goals.</p>
        )}
      </div>

      {/* Data Management */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-sage-500" />
          Data & Privacy
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="text-sm font-medium text-gray-900">Export Your Data</p>
              <p className="text-xs text-gray-500">Download all your data as a JSON file</p>
            </div>
            <button onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-100 transition-colors">
              <Download className="w-4 h-4" /> Export
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-100">
            <div>
              <p className="text-sm font-medium text-red-800">Clear All Data</p>
              <p className="text-xs text-red-600">Permanently delete all stored data from your browser</p>
            </div>
            <button onClick={() => setShowClearConfirm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors">
              <Trash2 className="w-4 h-4" /> Clear
            </button>
          </div>

          {showClearConfirm && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 animate-fade-in">
              <div className="flex items-start gap-3 mb-3">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">
                  <strong>Are you sure?</strong> This will permanently delete all your symptoms, cycle entries, wellness logs, reminders, and profile data. This cannot be undone.
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={handleClearData}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                  Yes, Delete Everything
                </button>
                <button onClick={() => setShowClearConfirm(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 p-3 bg-lavender-50 rounded-xl">
          <p className="text-xs text-lavender-800">
            <strong>Privacy Note:</strong> Your data is stored locally in your browser's localStorage. It is not encrypted medical-record storage and is not equivalent to a secure health database. Clearing your browser data will also remove your HERA data.
          </p>
        </div>
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-4 text-sm">
        <a href="/privacy" className="text-lavender-600 hover:text-lavender-700 font-medium">Privacy Policy</a>
        <a href="/safety" className="text-lavender-600 hover:text-lavender-700 font-medium">Safety Information</a>
      </div>
    </div>
  );
}
