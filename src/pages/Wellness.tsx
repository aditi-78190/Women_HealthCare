import React, { useState } from 'react';
import { Heart, Droplets, Moon, Smile, Zap, Wind, Plus, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { v4 as uuid } from 'uuid';

export default function Wellness() {
  const { wellnessEntries, setWellnessEntries, reminders, setReminders } = useApp();
  const today = new Date().toISOString().split('T')[0];
  const todayEntry = wellnessEntries.find(w => w.date === today);

  const [waterIntake, setWaterIntake] = useState(todayEntry?.waterIntake || 0);
  const [sleepHours, setSleepHours] = useState(todayEntry?.sleepHours || 7);
  const [mood, setMood] = useState(todayEntry?.mood || 5);
  const [energy, setEnergy] = useState(todayEntry?.energy || 5);
  const [activity, setActivity] = useState(todayEntry?.activity || '');
  const [stressLevel, setStressLevel] = useState(todayEntry?.stressLevel || 5);
  const [showBreathing, setShowBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathCount, setBreathCount] = useState(0);

  const handleSave = () => {
    const entry = {
      id: todayEntry?.id || uuid(),
      date: today,
      waterIntake,
      sleepHours,
      mood,
      energy,
      activity,
      activityDuration: 0,
      stressLevel,
      notes: '',
    };
    if (todayEntry) {
      setWellnessEntries(wellnessEntries.map(w => w.date === today ? entry : w));
    } else {
      setWellnessEntries([...wellnessEntries, entry]);
    }
  };

  // Breathing exercise
  const startBreathing = () => {
    setShowBreathing(true);
    setBreathCount(0);
    runBreathCycle();
  };

  const runBreathCycle = () => {
    setBreathPhase('inhale');
    setTimeout(() => setBreathPhase('hold'), 4000);
    setTimeout(() => setBreathPhase('exhale'), 11000);
    setTimeout(() => {
      setBreathCount(c => c + 1);
      if (breathCount < 3) runBreathCycle();
      else setShowBreathing(false);
    }, 19000);
  };

  const moodEmojis = ['😢', '😟', '😐', '🙂', '😊', '😄', '🥰', '✨', '💪', '🌟'];

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Wellness</h1>
        <p className="text-gray-600 mt-1">Track your daily well-being and practice self-care.</p>
      </div>

      {/* Today's Log */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-warm-400" />
          Today's Check-in
        </h2>

        {/* Water */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Droplets className="w-4 h-4 text-blue-500" /> Water Intake
          </label>
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {Array.from({ length: 8 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setWaterIntake(i + 1); }}
                  className={`w-8 h-10 rounded-lg border-2 transition-all ${
                    i < waterIntake ? 'bg-blue-100 border-blue-400' : 'bg-gray-50 border-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">{waterIntake} glasses</span>
          </div>
        </div>

        {/* Sleep */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Moon className="w-4 h-4 text-indigo-500" /> Sleep Hours (last night)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range" min="0" max="12" step="0.5" value={sleepHours}
              onChange={e => setSleepHours(Number(e.target.value))}
              className="flex-1 accent-indigo-500"
            />
            <span className="text-lg font-semibold text-indigo-700 w-12">{sleepHours}h</span>
          </div>
        </div>

        {/* Mood */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Smile className="w-4 h-4 text-amber-500" /> How are you feeling?
          </label>
          <div className="flex gap-2">
            {moodEmojis.map((emoji, i) => (
              <button
                key={i}
                onClick={() => setMood(i + 1)}
                className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all ${
                  mood === i + 1 ? 'bg-amber-100 scale-110 ring-2 ring-amber-300' : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Energy */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4 text-green-500" /> Energy Level
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range" min="1" max="10" value={energy}
              onChange={e => setEnergy(Number(e.target.value))}
              className="flex-1 accent-green-500"
            />
            <span className="text-lg font-semibold text-green-700 w-12">{energy}/10</span>
          </div>
        </div>

        {/* Activity */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Activity Today</label>
          <div className="flex flex-wrap gap-2">
            {['Walking', 'Yoga', 'Stretching', 'Dancing', 'Swimming', 'Rest day'].map(a => (
              <button
                key={a}
                onClick={() => setActivity(activity === a ? '' : a)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  activity === a ? 'bg-green-100 text-green-700 ring-2 ring-green-300' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Stress */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Stress Level</label>
          <div className="flex items-center gap-4">
            <input
              type="range" min="1" max="10" value={stressLevel}
              onChange={e => setStressLevel(Number(e.target.value))}
              className="flex-1 accent-purple-500"
            />
            <span className="text-sm text-gray-500 w-16">{stressLevel <= 3 ? 'Low' : stressLevel <= 6 ? 'Medium' : 'High'}</span>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-lavender-600 text-white rounded-xl font-medium hover:bg-lavender-700 transition-colors"
        >
          <Check className="w-4 h-4" />
          Save Today's Entry
        </button>
      </div>

      {/* Breathing Exercise */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Wind className="w-5 h-5 text-sage-500" />
          Breathing Exercise
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Try a calming 4-7-8 breathing exercise. Inhale for 4 seconds, hold for 7, exhale for 8.
        </p>
        {showBreathing ? (
          <div className="text-center py-8">
            <div className={`w-32 h-32 rounded-full mx-auto flex items-center justify-center transition-all duration-[4000ms] ${
              breathPhase === 'inhale' ? 'bg-sage-400/30 scale-125' :
              breathPhase === 'hold' ? 'bg-sage-400/50 scale-125' :
              'bg-sage-400/20 scale-100'
            }`}>
              <p className="text-xl font-semibold text-sage-700 capitalize">{breathPhase}</p>
            </div>
            <p className="text-sm text-gray-500 mt-4">Breath {breathCount + 1} of 4</p>
          </div>
        ) : (
          <button
            onClick={startBreathing}
            className="px-6 py-3 bg-sage-400/10 text-sage-700 rounded-xl font-medium hover:bg-sage-400/20 transition-colors"
          >
            Start Breathing Exercise
          </button>
        )}
      </div>

      {/* Recent History */}
      {wellnessEntries.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Recent Entries</h2>
          <div className="space-y-3">
            {[...wellnessEntries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 7).map(w => (
              <div key={w.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm font-medium text-gray-700">
                  {new Date(w.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </span>
                <div className="flex gap-4 text-xs text-gray-500">
                  <span>💧 {w.waterIntake}</span>
                  <span>🌙 {w.sleepHours}h</span>
                  <span>{moodEmojis[w.mood - 1] || '😐'}</span>
                  <span>⚡ {w.energy}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
