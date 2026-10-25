import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import CycleTracker from './pages/CycleTracker';
import SymptomTracker from './pages/SymptomTracker';
import Insights from './pages/Insights';
import HealthAssistant from './pages/HealthAssistant';
import Learn from './pages/Learn';
import Reports from './pages/Reports';
import Wellness from './pages/Wellness';
import Settings from './pages/Settings';
import Safety from './pages/Safety';
import Privacy from './pages/Privacy';

function AppRoutes() {
  const { onboardingComplete } = useApp();

  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={<Home />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/safety" element={<Safety />} />

      {/* Protected pages (require onboarding) */}
      <Route path="/dashboard" element={
        onboardingComplete ? <Layout><Dashboard /></Layout> : <Navigate to="/onboarding" />
      } />
      <Route path="/cycle" element={
        onboardingComplete ? <Layout><CycleTracker /></Layout> : <Navigate to="/onboarding" />
      } />
      <Route path="/symptoms" element={
        onboardingComplete ? <Layout><SymptomTracker /></Layout> : <Navigate to="/onboarding" />
      } />
      <Route path="/insights" element={
        onboardingComplete ? <Layout><Insights /></Layout> : <Navigate to="/onboarding" />
      } />
      <Route path="/assistant" element={
        onboardingComplete ? <Layout><HealthAssistant /></Layout> : <Navigate to="/onboarding" />
      } />
      <Route path="/learn" element={
        onboardingComplete ? <Layout><Learn /></Layout> : <Navigate to="/onboarding" />
      } />
      <Route path="/reports" element={
        onboardingComplete ? <Layout><Reports /></Layout> : <Navigate to="/onboarding" />
      } />
      <Route path="/wellness" element={
        onboardingComplete ? <Layout><Wellness /></Layout> : <Navigate to="/onboarding" />
      } />
      <Route path="/settings" element={
        onboardingComplete ? <Layout><Settings /></Layout> : <Navigate to="/onboarding" />
      } />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}
