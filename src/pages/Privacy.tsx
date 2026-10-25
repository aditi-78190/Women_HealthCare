import React from 'react';
import { Lock, Shield, Database, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Lock className="w-8 h-8 text-lavender-600" />
          Privacy & Data Policy
        </h1>
        <p className="text-gray-600 mt-2">How HERA handles your personal health information.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 space-y-8">
        {/* Core Principle */}
        <div className="pb-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Our Core Principle</h2>
          <p className="text-gray-600 leading-relaxed">
            Your health data belongs to you. HERA stores your information locally in your browser by default. We do not collect, transmit, sell, or share your personal health data with any third parties.
          </p>
        </div>

        {/* Data Storage */}
        <div className="pb-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Database className="w-5 h-5 text-lavender-500" />
            How Your Data is Stored
          </h2>
          <div className="space-y-3 text-sm text-gray-600">
            <p><strong>Local Storage:</strong> All your data (symptoms, cycle entries, wellness logs, reminders, and profile) is stored in your browser's localStorage. This means:</p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-lavender-500 mt-1">•</span>
                Data never leaves your device unless you explicitly export it
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lavender-500 mt-1">•</span>
                Data persists across browser sessions but is tied to this specific browser
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lavender-500 mt-1">•</span>
                Clearing your browser data will remove all HERA data
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lavender-500 mt-1">•</span>
                Data is not synced across devices
              </li>
            </ul>
          </div>
        </div>

        {/* Important Limitations */}
        <div className="pb-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-500" />
            Important Limitations
          </h2>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-800">
            <p className="mb-2"><strong>localStorage is not encrypted medical-record storage.</strong></p>
            <p>
              While your data stays on your device, localStorage does not provide the same security as encrypted, access-controlled medical databases. Anyone with access to your device and browser could potentially view this data. For sensitive health records, we recommend using dedicated, HIPAA/GDPR-compliant health platforms in consultation with your healthcare provider.
            </p>
          </div>
        </div>

        {/* AI Assistant */}
        <div className="pb-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Eye className="w-5 h-5 text-plum-500" />
            AI Assistant & Your Data
          </h2>
          <div className="space-y-3 text-sm text-gray-600">
            <p>The HERA AI assistant is a local, rule-based system. It:</p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-plum-500 mt-1">•</span>
                Reads your logged symptom data to generate summaries
              </li>
              <li className="flex items-start gap-2">
                <span className="text-plum-500 mt-1">•</span>
                Does not send your data to any external API or server
              </li>
              <li className="flex items-start gap-2">
                <span className="text-plum-500 mt-1">•</span>
                Provides general health education from built-in knowledge
              </li>
              <li className="flex items-start gap-2">
                <span className="text-plum-500 mt-1">•</span>
                Does not store conversation history beyond the current session
              </li>
            </ul>
            <p>If an external LLM API is configured in the future, it would require explicit user consent and would be processed through a secure backend — never exposing data or API keys in the frontend.</p>
          </div>
        </div>

        {/* Your Rights */}
        <div className="pb-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Your Rights</h2>
          <div className="space-y-2 text-sm text-gray-600">
            <p>You have full control over your data:</p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-sage-500 mt-1">✓</span>
                <strong>Access:</strong> View all your data anytime through the app
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sage-500 mt-1">✓</span>
                <strong>Export:</strong> Download your data as a JSON file
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sage-500 mt-1">✓</span>
                <strong>Delete:</strong> Clear all data permanently from Settings
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sage-500 mt-1">✓</span>
                <strong>Control:</strong> Choose what to track and what to skip
              </li>
            </ul>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Medical Disclaimer</h2>
          <div className="bg-lavender-50 border border-lavender-100 rounded-xl p-4 text-sm text-lavender-800">
            <p className="mb-2">
              <strong>HERA is not a medical device or healthcare provider.</strong>
            </p>
            <p className="mb-2">
              The information provided by HERA is for educational and self-tracking purposes only. It is not intended to diagnose, treat, cure, or prevent any disease or medical condition.
            </p>
            <p>
              Always consult a qualified healthcare professional for medical advice, diagnosis, and treatment. Never disregard professional medical advice or delay seeking it because of information provided by this application.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link to="/settings" className="text-sm text-lavender-600 font-medium hover:text-lavender-700">
          ← Back to Settings
        </Link>
      </div>
    </div>
  );
}
