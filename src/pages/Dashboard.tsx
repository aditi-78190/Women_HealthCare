import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar, Activity, BarChart3, MessageCircle, Heart,
  Droplets, Moon, Smile, TrendingUp, AlertTriangle,
  Plus, ChevronRight, Sparkles, Clock, Zap
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Dashboard() {
  const { profile, symptoms, cycleEntries, reminders, wellnessEntries } = useApp();

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const recentSymptoms = [...symptoms].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);
  const upcomingReminders = reminders.filter(r => !r.completed).slice(0, 3);
  const todayWellness = wellnessEntries.find(w => w.date === new Date().toISOString().split('T')[0]);

  // Cycle info
  let cycleInfo = null;
  if (profile?.cycleTracking && cycleEntries.length > 0) {
    const sorted = [...cycleEntries].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    const lastPeriod = sorted[0];
    const lastDate = new Date(lastPeriod.startDate);
    const daysSince = Math.floor((Date.now() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
    cycleInfo = { day: daysSince + 1, lastStart: lastPeriod.startDate };
  }

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <p className="text-gray-500 text-sm">{today}</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
          {greeting}, {profile?.name || 'friend'} ✨
        </h1>
        <p className="text-gray-600 mt-1">Here's your health overview for today.</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <Link to="/symptoms" className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-gray-100 hover:border-lavender-200 hover:shadow-sm transition-all">
          <div className="w-10 h-10 rounded-lg bg-lavender-50 flex items-center justify-center">
            <Plus className="w-5 h-5 text-lavender-600" />
          </div>
          <span className="text-xs font-medium text-gray-700 text-center">Log Symptom</span>
        </Link>
        <Link to="/wellness" className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-gray-100 hover:border-lavender-200 hover:shadow-sm transition-all">
          <div className="w-10 h-10 rounded-lg bg-sage-400/10 flex items-center justify-center">
            <Droplets className="w-5 h-5 text-sage-500" />
          </div>
          <span className="text-xs font-medium text-gray-700 text-center">Log Wellness</span>
        </Link>
        <Link to="/assistant" className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-gray-100 hover:border-lavender-200 hover:shadow-sm transition-all">
          <div className="w-10 h-10 rounded-lg bg-plum-50 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-plum-600" />
          </div>
          <span className="text-xs font-medium text-gray-700 text-center">Ask HERA</span>
        </Link>
        <Link to="/reports" className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-gray-100 hover:border-lavender-200 hover:shadow-sm transition-all">
          <div className="w-10 h-10 rounded-lg bg-rose-warm-50 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-rose-warm-500" />
          </div>
          <span className="text-xs font-medium text-gray-700 text-center">Health Report</span>
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Cycle Overview */}
          {profile?.cycleTracking && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-lavender-500" />
                  Cycle Overview
                </h2>
                <Link to="/cycle" className="text-sm text-lavender-600 hover:text-lavender-700 flex items-center gap-1">
                  View <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
              {cycleInfo ? (
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-lavender-50 flex items-center justify-center border-4 border-lavender-200">
                      <span className="text-xl font-bold text-lavender-700">{cycleInfo.day}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Cycle Day</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      Last period started: <span className="font-medium">{new Date(cycleInfo.lastStart).toLocaleDateString()}</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {cycleInfo.day <= 5 ? 'Menstrual phase' : cycleInfo.day <= 13 ? 'Follicular phase' : cycleInfo.day <= 16 ? 'Ovulation window' : 'Luteal phase'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500 text-sm mb-3">No cycle data yet. Log your period to start tracking.</p>
                  <Link to="/cycle" className="text-sm text-lavender-600 font-medium hover:text-lavender-700">
                    Log period →
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Recent Symptoms */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-rose-warm-400" />
                Recent Symptoms
              </h2>
              <Link to="/symptoms" className="text-sm text-lavender-600 hover:text-lavender-700 flex items-center gap-1">
                View all <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            {recentSymptoms.length > 0 ? (
              <div className="space-y-3">
                {recentSymptoms.map(s => (
                  <div key={s.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{s.name}</p>
                      <p className="text-xs text-gray-500">{new Date(s.date).toLocaleDateString()} • Severity: {s.severity}/10</p>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${s.severity >= 7 ? 'bg-red-400' : s.severity >= 4 ? 'bg-amber-400' : 'bg-green-400'}`} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500 text-sm mb-3">No symptoms logged yet.</p>
                <Link to="/symptoms" className="text-sm text-lavender-600 font-medium">
                  Log your first symptom →
                </Link>
              </div>
            )}
          </div>

          {/* Weekly Overview */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-sage-500" />
              Weekly Wellness
            </h2>
            {wellnessEntries.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-xl">
                  <Droplets className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                  <p className="text-lg font-bold text-blue-700">{todayWellness?.waterIntake || 0}</p>
                  <p className="text-xs text-gray-500">Glasses water</p>
                </div>
                <div className="text-center p-3 bg-indigo-50 rounded-xl">
                  <Moon className="w-5 h-5 text-indigo-500 mx-auto mb-1" />
                  <p className="text-lg font-bold text-indigo-700">{todayWellness?.sleepHours || 0}h</p>
                  <p className="text-xs text-gray-500">Sleep</p>
                </div>
                <div className="text-center p-3 bg-amber-50 rounded-xl">
                  <Smile className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                  <p className="text-lg font-bold text-amber-700">{todayWellness?.mood || '-'}/10</p>
                  <p className="text-xs text-gray-500">Mood</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-xl">
                  <Zap className="w-5 h-5 text-green-500 mx-auto mb-1" />
                  <p className="text-lg font-bold text-green-700">{todayWellness?.activity || 'None'}</p>
                  <p className="text-xs text-gray-500">Activity</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500 text-sm mb-3">Start logging your daily wellness to see trends.</p>
                <Link to="/wellness" className="text-sm text-lavender-600 font-medium">
                  Log today's wellness →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Assistant */}
          <div className="bg-gradient-to-br from-lavender-500 to-plum-600 rounded-2xl p-6 text-white">
            <MessageCircle className="w-8 h-8 mb-3 opacity-80" />
            <h3 className="font-semibold text-lg mb-2">Need help understanding your health?</h3>
            <p className="text-sm opacity-80 mb-4">Ask HERA's AI assistant questions about your symptoms, cycle, or health topics.</p>
            <Link
              to="/assistant"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-sm font-medium hover:bg-white/30 transition-colors"
            >
              Chat with HERA <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Reminders */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                Reminders
              </h2>
            </div>
            {upcomingReminders.length > 0 ? (
              <div className="space-y-2">
                {upcomingReminders.map(r => (
                  <div key={r.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                    <div className="w-2 h-2 rounded-full bg-lavender-400" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{r.title}</p>
                      <p className="text-xs text-gray-500">{r.date} {r.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No upcoming reminders.</p>
            )}
          </div>

          {/* Safety */}
          <div className="bg-rose-warm-50 rounded-2xl border border-rose-warm-100 p-6">
            <AlertTriangle className="w-6 h-6 text-rose-warm-500 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Need urgent help?</h3>
            <p className="text-sm text-gray-600 mb-3">
              If you're experiencing severe pain, heavy bleeding with weakness, or difficulty breathing, please seek immediate medical care.
            </p>
            <Link to="/safety" className="text-sm text-rose-warm-500 font-medium hover:text-rose-warm-600">
              View safety guidance →
            </Link>
          </div>

          {/* Quick Insights */}
          {symptoms.length >= 3 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2 mb-3">
                <BarChart3 className="w-5 h-5 text-lavender-500" />
                Quick Insight
              </h2>
              <p className="text-sm text-gray-600">
                You've logged {symptoms.length} symptoms. View your insights to discover patterns.
              </p>
              <Link to="/insights" className="text-sm text-lavender-600 font-medium mt-2 inline-block hover:text-lavender-700">
                View insights →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
