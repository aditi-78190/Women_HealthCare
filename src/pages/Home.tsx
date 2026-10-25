import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, Activity, Calendar, BarChart3, MessageCircle,
  BookOpen, Shield, Heart, ChevronRight, ArrowRight,
  CheckCircle, Lock, Users, Zap
} from 'lucide-react';

const features = [
  { icon: Calendar, title: 'Cycle Tracking', desc: 'Understand your menstrual patterns with an intuitive calendar and smart tracking.' },
  { icon: Activity, title: 'Symptom Logging', desc: 'Record symptoms, severity, and triggers to identify patterns over time.' },
  { icon: BarChart3, title: 'Health Insights', desc: 'Visualize your health data with beautiful charts and personalized summaries.' },
  { icon: MessageCircle, title: 'AI Health Assistant', desc: 'Get answers to health questions and prepare for doctor visits.' },
  { icon: BookOpen, title: 'Health Education', desc: 'Evidence-based information on PCOS, endometriosis, thyroid health, and more.' },
  { icon: Heart, title: 'Wellness Tools', desc: 'Track sleep, hydration, mood, and activity for holistic well-being.' },
];

const steps = [
  { num: '1', title: 'Log How You Feel', desc: 'Track symptoms, cycle, mood, and wellness daily — it takes just a minute.' },
  { num: '2', title: 'Discover Patterns', desc: 'HERA analyzes your data to reveal trends and insights about your health.' },
  { num: '3', title: 'Take Charge', desc: 'Use insights to prepare for doctor visits and make informed health decisions.' },
];

const faqs = [
  { q: 'Is HERA a replacement for medical advice?', a: 'No. HERA is a health tracking and education tool. It helps you understand your body better and prepare for medical consultations, but it does not diagnose conditions or replace professional healthcare.' },
  { q: 'Is my data private?', a: 'Your data is stored locally in your browser by default. We do not collect, sell, or share your personal health information. You can export or delete your data at any time.' },
  { q: 'Can I use HERA without creating an account?', a: 'Yes! HERA works entirely in your browser. No account required for the core features.' },
  { q: 'What conditions does HERA help with?', a: 'HERA provides educational information about menstrual health, PCOS, endometriosis, thyroid health, menopause, mental health, and general wellness. It helps you track symptoms and prepare for medical conversations.' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-warm-white)]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lavender-500 to-plum-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">HERA</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">How It Works</a>
            <a href="#learn" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Learn</a>
            <a href="#faq" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/onboarding"
              className="px-5 py-2.5 bg-gradient-to-r from-lavender-600 to-plum-600 text-white rounded-full text-sm font-medium hover:shadow-lg hover:shadow-lavender-200 transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-lavender-50 rounded-full text-lavender-700 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                AI-Powered Women's Health
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Understand Your Body.{' '}
                <span className="bg-gradient-to-r from-lavender-600 to-plum-600 bg-clip-text text-transparent">
                  Take Charge of Your Health.
                </span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
                Track symptoms, understand your cycle, access reliable health education, and prepare for medical consultations — all in one safe, private space.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/onboarding"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-lavender-600 to-plum-600 text-white rounded-full font-medium hover:shadow-xl hover:shadow-lavender-200 transition-all duration-300"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-200 text-gray-700 rounded-full font-medium hover:border-lavender-300 hover:text-lavender-700 transition-all duration-300"
                >
                  Explore Features
                </a>
              </div>
              <div className="flex items-center gap-6 mt-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-sage-500" />
                  Privacy-first
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sage-500" />
                  No account needed
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-sage-500" />
                  Free to use
                </div>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="hidden lg:block animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-lavender-100 to-plum-100 rounded-3xl blur-2xl opacity-60"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl shadow-lavender-100 p-6 border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-lavender-100 flex items-center justify-center">
                      <Heart className="w-5 h-5 text-lavender-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Good morning, Priya</p>
                      <p className="text-sm text-gray-500">Day 14 of your cycle</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-lavender-50 rounded-xl p-4">
                      <p className="text-xs text-lavender-600 font-medium">Mood</p>
                      <p className="text-2xl font-bold text-lavender-800">😊 Good</p>
                    </div>
                    <div className="bg-rose-warm-50 rounded-xl p-4">
                      <p className="text-xs text-rose-warm-500 font-medium">Energy</p>
                      <p className="text-2xl font-bold text-rose-warm-500">7/10</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-gray-700">This Week</p>
                      <span className="text-xs text-sage-500">+2 insights</span>
                    </div>
                    <div className="flex gap-1">
                      {[4, 6, 3, 7, 5, 8, 6].map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <div
                            className="w-full rounded-full bg-gradient-to-t from-lavender-400 to-lavender-300"
                            style={{ height: `${h * 8}px` }}
                          />
                          <span className="text-[10px] text-gray-400">{['M','T','W','T','F','S','S'][i]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Your Health Journey
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful tools designed specifically for women's health, built with care and backed by evidence.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="group p-6 rounded-2xl border border-gray-100 hover:border-lavender-200 hover:shadow-lg hover:shadow-lavender-50 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-lavender-50 flex items-center justify-center mb-4 group-hover:bg-lavender-100 transition-colors">
                    <Icon className="w-6 h-6 text-lavender-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">How HERA Works</h2>
            <p className="text-lg text-gray-600">Three simple steps to better understand your health</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-lavender-500 to-plum-600 flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-lg shadow-lavender-200">
                  {s.num}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Health Education */}
      <section id="learn" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-lavender-50/50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Evidence-Based Health Education</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Learn about conditions that affect millions of women. Knowledge is power.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {['PCOS Awareness', 'Endometriosis', 'Thyroid Health', 'Menopause'].map((topic, i) => (
              <Link
                key={i}
                to="/learn"
                className="p-6 bg-white rounded-2xl border border-gray-100 hover:border-lavender-200 hover:shadow-md transition-all duration-300 text-center"
              >
                <div className="text-3xl mb-3">{['🔬', '💜', '🦋', '🌙'][i]}</div>
                <h3 className="font-semibold text-gray-900">{topic}</h3>
                <p className="text-sm text-gray-500 mt-1">Learn more →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-lavender-50 to-plum-50 rounded-3xl p-8 sm:p-12 text-center">
            <Lock className="w-12 h-12 text-lavender-600 mx-auto mb-6" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Your Privacy Comes First</h2>
            <p className="text-gray-600 max-w-lg mx-auto mb-6">
              Your health data stays in your browser. We never collect, sell, or share your personal information. You own your data — export or delete it anytime.
            </p>
            <Link
              to="/privacy"
              className="inline-flex items-center gap-2 text-lavender-700 font-medium hover:text-lavender-800"
            >
              Read our privacy approach <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group border border-gray-100 rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors font-medium text-gray-900">
                  {faq.q}
                  <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ready to Take Charge of Your Health?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
            Start tracking today. It's free, private, and takes less than a minute to set up.
          </p>
          <Link
            to="/onboarding"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-lavender-600 to-plum-600 text-white rounded-full font-medium hover:shadow-xl hover:shadow-lavender-200 transition-all duration-300 text-lg"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-lavender-500 to-plum-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-gray-900">HERA</span>
              </div>
              <p className="text-sm text-gray-500">Your Health. Your Voice. Your Well-being.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Product</h4>
              <div className="space-y-2">
                <Link to="/dashboard" className="block text-sm text-gray-500 hover:text-gray-700">Dashboard</Link>
                <Link to="/symptoms" className="block text-sm text-gray-500 hover:text-gray-700">Symptom Tracker</Link>
                <Link to="/insights" className="block text-sm text-gray-500 hover:text-gray-700">Insights</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Resources</h4>
              <div className="space-y-2">
                <Link to="/learn" className="block text-sm text-gray-500 hover:text-gray-700">Health Education</Link>
                <Link to="/assistant" className="block text-sm text-gray-500 hover:text-gray-700">AI Assistant</Link>
                <Link to="/reports" className="block text-sm text-gray-500 hover:text-gray-700">Health Reports</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Legal</h4>
              <div className="space-y-2">
                <Link to="/privacy" className="block text-sm text-gray-500 hover:text-gray-700">Privacy Policy</Link>
                <Link to="/safety" className="block text-sm text-gray-500 hover:text-gray-700">Safety Info</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-8 text-center">
            <p className="text-xs text-gray-400">
              ⚕️ HERA is a health tracking and education tool. It is not a substitute for professional medical advice, diagnosis, or treatment.
              Always consult a qualified healthcare provider for medical concerns.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
