import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ArrowLeft, Check, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ageRanges = ['Under 18', '18-24', '25-34', '35-44', '45-54', '55+'];
const interests = [
  'Menstrual Health', 'PCOS Awareness', 'Endometriosis', 'Thyroid Health',
  'Menopause', 'Mental Health', 'Nutrition', 'Sleep Health',
  'Fitness & Movement', 'Reproductive Health', 'Stress Management',
];

export default function Onboarding() {
  const navigate = useNavigate();
  const { setProfile, setOnboardingDone } = useApp();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [cycleTracking, setCycleTracking] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const handleComplete = () => {
    if (!name.trim()) return;
    setProfile({
      name: name.trim(),
      ageRange: ageRange || 'Not specified',
      cycleTracking,
      healthInterests: selectedInterests,
      createdAt: new Date().toISOString(),
    });
    setOnboardingDone(true);
    navigate('/dashboard');
  };

  const steps = [
    // Step 0: Welcome
    <div key="welcome" className="text-center animate-fade-in">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-lavender-500 to-plum-600 flex items-center justify-center mx-auto mb-8 shadow-lg shadow-lavender-200">
        <Sparkles className="w-10 h-10 text-white" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to HERA</h1>
      <p className="text-lg text-gray-600 mb-6 max-w-md mx-auto">
        Your personal women's health companion. Let's set up your profile so we can personalize your experience.
      </p>
      <div className="bg-lavender-50 rounded-xl p-4 max-w-md mx-auto mb-8">
        <p className="text-sm text-lavender-800">
          🔒 Your information is stored locally in your browser. We don't collect or share your personal data.
        </p>
      </div>
    </div>,

    // Step 1: Name
    <div key="name" className="max-w-md mx-auto animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">What should we call you?</h2>
      <p className="text-gray-600 mb-8">This is just for your experience — use any name you prefer.</p>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Your preferred name"
        className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-lavender-400 text-lg transition-colors"
        autoFocus
      />
      {name && name.length < 2 && (
        <p className="text-sm text-rose-warm-500 mt-2">Please enter at least 2 characters</p>
      )}
    </div>,

    // Step 2: Age range
    <div key="age" className="max-w-md mx-auto animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">What's your age range?</h2>
      <p className="text-gray-600 mb-8">This helps us provide relevant health information. You can skip this.</p>
      <div className="grid grid-cols-2 gap-3">
        {ageRanges.map(range => (
          <button
            key={range}
            onClick={() => setAgeRange(range)}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              ageRange === range
                ? 'border-lavender-500 bg-lavender-50 text-lavender-800'
                : 'border-gray-200 hover:border-gray-300 text-gray-700'
            }`}
          >
            <span className="font-medium">{range}</span>
          </button>
        ))}
      </div>
    </div>,

    // Step 3: Cycle tracking
    <div key="cycle" className="max-w-md mx-auto animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Track your menstrual cycle?</h2>
      <p className="text-gray-600 mb-8">This is optional. Not everyone menstruates or wants to track their cycle.</p>
      <div className="space-y-3">
        <button
          onClick={() => setCycleTracking(true)}
          className={`w-full p-5 rounded-xl border-2 text-left transition-all flex items-center gap-4 ${
            cycleTracking ? 'border-lavender-500 bg-lavender-50' : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
            cycleTracking ? 'border-lavender-500 bg-lavender-500' : 'border-gray-300'
          }`}>
            {cycleTracking && <Check className="w-4 h-4 text-white" />}
          </div>
          <div>
            <p className="font-medium text-gray-900">Yes, track my cycle</p>
            <p className="text-sm text-gray-500">Log periods and track patterns</p>
          </div>
        </button>
        <button
          onClick={() => setCycleTracking(false)}
          className={`w-full p-5 rounded-xl border-2 text-left transition-all flex items-center gap-4 ${
            !cycleTracking ? 'border-lavender-500 bg-lavender-50' : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
            !cycleTracking ? 'border-lavender-500 bg-lavender-500' : 'border-gray-300'
          }`}>
            {!cycleTracking && <Check className="w-4 h-4 text-white" />}
          </div>
          <div>
            <p className="font-medium text-gray-900">No, skip cycle tracking</p>
            <p className="text-sm text-gray-500">You can enable it later in settings</p>
          </div>
        </button>
      </div>
    </div>,

    // Step 4: Health interests
    <div key="interests" className="max-w-lg mx-auto animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">What health topics interest you?</h2>
      <p className="text-gray-600 mb-8">Select all that apply. This helps us personalize your content.</p>
      <div className="flex flex-wrap gap-2">
        {interests.map(interest => (
          <button
            key={interest}
            onClick={() => toggleInterest(interest)}
            className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
              selectedInterests.includes(interest)
                ? 'bg-lavender-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {interest}
          </button>
        ))}
      </div>
    </div>,

    // Step 5: Complete
    <div key="complete" className="text-center animate-fade-in">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sage-400 to-sage-500 flex items-center justify-center mx-auto mb-8">
        <Heart className="w-10 h-10 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">You're all set, {name}!</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Your personalized health dashboard is ready. Start tracking how you feel and discover insights about your health.
      </p>
      <div className="bg-lavender-50 rounded-xl p-4 max-w-md mx-auto mb-6">
        <p className="text-sm text-lavender-800">
          💡 <strong>Tip:</strong> Log how you feel daily — even brief entries help build useful insights over time.
        </p>
      </div>
    </div>,
  ];

  const isLastStep = step === steps.length - 1;
  const canProceed = step === 1 ? name.trim().length >= 2 : true;

  return (
    <div className="min-h-screen bg-[var(--color-warm-white)] flex flex-col">
      {/* Progress */}
      <div className="px-4 pt-8 max-w-lg mx-auto w-full">
        <div className="flex items-center gap-2 mb-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                i <= step ? 'bg-lavender-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-gray-500 text-center">Step {step + 1} of {steps.length}</p>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        {steps[step]}
      </div>

      {/* Navigation */}
      <div className="px-4 pb-8 max-w-lg mx-auto w-full">
        <div className="flex items-center justify-between">
          {step > 0 ? (
            <button
              onClick={() => setStep(s => s - 1)}
              className="flex items-center gap-2 px-5 py-3 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          ) : (
            <div />
          )}
          {isLastStep ? (
            <button
              onClick={handleComplete}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-lavender-600 to-plum-600 text-white rounded-full font-medium hover:shadow-lg transition-all"
            >
              Start My Journey
              <Sparkles className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={!canProceed}
              className="flex items-center gap-2 px-6 py-3 bg-lavender-600 text-white rounded-full font-medium hover:bg-lavender-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
        {step === 2 && (
          <button
            onClick={() => setStep(s => s + 1)}
            className="w-full mt-4 text-center text-sm text-gray-500 hover:text-gray-700"
          >
            Skip this question →
          </button>
        )}
        {step === 4 && (
          <button
            onClick={() => setStep(s => s + 1)}
            className="w-full mt-4 text-center text-sm text-gray-500 hover:text-gray-700"
          >
            Skip — I'll explore on my own →
          </button>
        )}
      </div>
    </div>
  );
}
