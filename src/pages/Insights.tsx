import React from 'react';
import { BarChart3, TrendingUp, Info } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useApp } from '../context/AppContext';

export default function Insights() {
  const { symptoms, wellnessEntries, cycleEntries, profile } = useApp();

  // Symptom frequency data
  const symptomCounts: Record<string, number> = {};
  symptoms.forEach(s => { symptomCounts[s.name] = (symptomCounts[s.name] || 0) + 1; });
  const frequencyData = Object.entries(symptomCounts)
    .map(([name, count]) => ({ name: name.length > 15 ? name.slice(0, 15) + '...' : name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Severity over time
  const severityByDate: Record<string, { total: number; count: number }> = {};
  symptoms.forEach(s => {
    if (!severityByDate[s.date]) severityByDate[s.date] = { total: 0, count: 0 };
    severityByDate[s.date].total += s.severity;
    severityByDate[s.date].count += 1;
  });
  const severityData = Object.entries(severityByDate)
    .map(([date, data]) => ({ date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), severity: Math.round(data.total / data.count * 10) / 10 }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-14);

  // Mood & Energy trends
  const wellnessByDate: Record<string, { mood: number; energy: number; sleep: number; count: number }> = {};
  wellnessEntries.forEach(w => {
    if (!wellnessByDate[w.date]) wellnessByDate[w.date] = { mood: 0, energy: 0, sleep: 0, count: 0 };
    wellnessByDate[w.date].mood += w.mood;
    wellnessByDate[w.date].energy += w.energy;
    wellnessByDate[w.date].sleep += w.sleepHours;
    wellnessByDate[w.date].count += 1;
  });
  const moodEnergyData = Object.entries(wellnessByDate)
    .map(([date, data]) => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      mood: Math.round(data.mood / data.count * 10) / 10,
      energy: Math.round(data.energy / data.count * 10) / 10,
      sleep: Math.round(data.sleep / data.count * 10) / 10,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-14);

  // Generate insights
  const insights: string[] = [];
  if (symptoms.length > 0) {
    const last30 = symptoms.filter(s => (Date.now() - new Date(s.date).getTime()) / (1000 * 60 * 60 * 24) <= 30);
    if (last30.length > 0) {
      const topSymptom = Object.entries(symptomCounts).sort((a, b) => b[1] - a[1])[0];
      if (topSymptom) insights.push(`Your most logged symptom is "${topSymptom[0]}" (${topSymptom[1]} times).`);

      const avgSeverity = last30.reduce((sum, s) => sum + s.severity, 0) / last30.length;
      if (avgSeverity > 6) insights.push(`Your average symptom severity has been ${avgSeverity.toFixed(1)}/10 this month — consider discussing this with your doctor.`);
      if (avgSeverity < 4 && last30.length >= 3) insights.push(`Your symptoms have been relatively mild this month (avg ${avgSeverity.toFixed(1)}/10).`);
    }
  }

  if (wellnessEntries.length >= 3) {
    const recentWellness = wellnessEntries.slice(-7);
    const avgSleep = recentWellness.reduce((s, w) => s + w.sleepHours, 0) / recentWellness.length;
    const avgEnergy = recentWellness.reduce((s, w) => s + w.energy, 0) / recentWellness.length;
    if (avgSleep < 6) insights.push(`Your average sleep has been ${avgSleep.toFixed(1)} hours recently — less than the recommended 7-9 hours.`);
    if (avgEnergy < 5) insights.push(`Your energy levels have been lower than average recently.`);
    if (avgSleep >= 7 && avgEnergy >= 6) insights.push(`Great! Your sleep and energy levels look healthy this week.`);
  }

  if (symptoms.length >= 5 && wellnessEntries.length >= 5) {
    const lowEnergyDays = wellnessEntries.filter(w => w.energy < 5).length;
    const poorSleepDays = wellnessEntries.filter(w => w.sleepHours < 6).length;
    if (lowEnergyDays > 0 && poorSleepDays > 0) {
      insights.push(`You logged lower energy on days when sleep was shorter. While this is a pattern, it doesn't prove causation — many factors affect energy.`);
    }
  }

  const hasData = symptoms.length > 0 || wellnessEntries.length > 0;

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Health Insights</h1>
        <p className="text-gray-600 mt-1">Visualize your health data and discover patterns.</p>
      </div>

      {!hasData ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-3">No Data Yet</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            Start logging symptoms and wellness data to unlock personalized insights and charts.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/symptoms" className="px-6 py-3 bg-lavender-600 text-white rounded-xl font-medium hover:bg-lavender-700 transition-colors">
              Log Symptoms
            </a>
            <a href="/wellness" className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
              Log Wellness
            </a>
          </div>
        </div>
      ) : (
        <>
          {/* Insights Cards */}
          {insights.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {insights.map((insight, i) => (
                <div key={i} className="bg-gradient-to-br from-lavender-50 to-plum-50 rounded-xl p-4 border border-lavender-100">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-lavender-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">{insight}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Symptom Frequency */}
            {frequencyData.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Symptom Frequency</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={frequencyData} layout="vertical" margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis type="number" tick={{ fontSize: 12 }} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={100} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#9673ff" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Severity Trend */}
            {severityData.length > 1 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Symptom Severity Trend</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={severityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                    <YAxis domain={[0, 10]} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="severity" stroke="#ff6b5a" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Mood & Energy */}
            {moodEnergyData.length > 1 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Mood, Energy & Sleep</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={moodEnergyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                    <YAxis domain={[0, 10]} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="mood" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} name="Mood" />
                    <Line type="monotone" dataKey="energy" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} name="Energy" />
                    <Line type="monotone" dataKey="sleep" stroke="#6366f1" strokeWidth={2} dot={{ r: 3 }} name="Sleep (hrs)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Summary Stats */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Summary</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-lavender-50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-lavender-700">{symptoms.length}</p>
                  <p className="text-sm text-gray-500">Symptoms Logged</p>
                </div>
                <div className="bg-rose-warm-50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-rose-warm-500">
                    {symptoms.length > 0 ? (symptoms.reduce((s, e) => s + e.severity, 0) / symptoms.length).toFixed(1) : '—'}
                  </p>
                  <p className="text-sm text-gray-500">Avg Severity</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-green-700">{wellnessEntries.length}</p>
                  <p className="text-sm text-gray-500">Wellness Logs</p>
                </div>
                <div className="bg-indigo-50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-indigo-700">{cycleEntries.length}</p>
                  <p className="text-sm text-gray-500">Cycle Entries</p>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 flex items-start gap-3 p-4 bg-lavender-50 rounded-xl">
            <Info className="w-5 h-5 text-lavender-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-lavender-800">
              <strong>Note:</strong> These insights are based on your logged data only. Patterns shown are observations, not medical diagnoses. Correlation does not imply causation. Always consult a healthcare professional for medical advice.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
