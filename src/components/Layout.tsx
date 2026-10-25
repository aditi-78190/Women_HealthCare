import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home, LayoutDashboard, Calendar, Activity, BarChart3,
  MessageCircle, BookOpen, FileText, Heart, Settings,
  Menu, X, Shield, LogOut, ChevronRight, Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/cycle', label: 'Cycle Tracker', icon: Calendar },
  { path: '/symptoms', label: 'Symptoms', icon: Activity },
  { path: '/insights', label: 'Insights', icon: BarChart3 },
  { path: '/assistant', label: 'AI Assistant', icon: MessageCircle },
  { path: '/learn', label: 'Learn', icon: BookOpen },
  { path: '/reports', label: 'Reports', icon: FileText },
  { path: '/wellness', label: 'Wellness', icon: Heart },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { profile } = useApp();

  return (
    <div className="min-h-screen bg-[var(--color-warm-white)] flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen w-72 bg-white border-r border-gray-100
        z-50 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col shadow-sm
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-50">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lavender-500 to-plum-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">HERA</h1>
              <p className="text-xs text-gray-500">Health Companion</p>
            </div>
          </Link>
        </div>

        {/* User greeting */}
        {profile && (
          <div className="px-6 py-4 border-b border-gray-50">
            <p className="text-sm text-gray-500">Welcome back,</p>
            <p className="font-semibold text-gray-900">{profile.name} ✨</p>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {navItems.map(item => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all duration-200
                  ${isActive
                    ? 'bg-lavender-50 text-lavender-700 font-medium shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{item.label}</span>
                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* Safety section */}
        <div className="p-4 border-t border-gray-100">
          <Link
            to="/safety"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-rose-warm-50 text-rose-warm-500 hover:bg-rose-warm-100 transition-colors"
          >
            <Shield className="w-5 h-5" />
            <span className="text-sm font-medium">Safety & Help</span>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
            <div className="hidden lg:block">
              <p className="text-sm text-gray-500">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/assistant"
                className="flex items-center gap-2 px-4 py-2 bg-lavender-50 text-lavender-700 rounded-full text-sm font-medium hover:bg-lavender-100 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Ask HERA</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-100 px-4 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
            <p>© 2024 HERA — Your Health. Your Voice. Your Well-being.</p>
            <div className="flex gap-4">
              <Link to="/privacy" className="hover:text-gray-600">Privacy</Link>
              <Link to="/safety" className="hover:text-gray-600">Safety</Link>
              <span>Not a substitute for medical advice</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
