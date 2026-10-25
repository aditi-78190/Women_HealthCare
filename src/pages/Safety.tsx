import React from 'react';
import { AlertTriangle, Phone, Heart, Shield, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Safety() {
  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Shield className="w-8 h-8 text-rose-warm-500" />
          Safety & Care Guidance
        </h1>
        <p className="text-gray-600 mt-2">Important information about when to seek urgent medical care.</p>
      </div>

      {/* Emergency Banner */}
      <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0" />
          <div>
            <h2 className="text-xl font-bold text-red-800 mb-3">When to Seek Immediate Medical Help</h2>
            <p className="text-red-700 mb-4">
              If you are experiencing any of the following, please contact emergency services or go to your nearest emergency department immediately:
            </p>
            <ul className="space-y-2 text-red-700">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Sudden or severe pelvic or abdominal pain</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Heavy bleeding accompanied by weakness, dizziness, or fainting</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Difficulty breathing or chest pain</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Severe headache with vision changes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Signs of severe allergic reaction</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Thoughts of self-harm or suicide</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Phone className="w-5 h-5 text-lavender-500" />
          Emergency Contacts
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="font-medium text-gray-900">Emergency Services (India)</p>
              <p className="text-sm text-gray-500">For all emergencies</p>
            </div>
            <a href="tel:112" className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
              Call 112
            </a>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="font-medium text-gray-900">Women's Helpline (India)</p>
              <p className="text-sm text-gray-500">For women in distress</p>
            </div>
            <a href="tel:1091" className="px-4 py-2 bg-lavender-600 text-white rounded-lg text-sm font-medium hover:bg-lavender-700 transition-colors">
              Call 1091
            </a>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="font-medium text-gray-900">Mental Health Helpline (iCall)</p>
              <p className="text-sm text-gray-500">Emotional support & counseling</p>
            </div>
            <a href="tel:9152987821" className="px-4 py-2 bg-sage-500 text-white rounded-lg text-sm font-medium hover:bg-sage-600 transition-colors">
              Call
            </a>
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-warm-400" />
          Important to Know
        </h2>
        <div className="space-y-4 text-sm text-gray-600">
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
            <p className="font-medium text-amber-800 mb-1">HERA is not a diagnostic tool</p>
            <p className="text-amber-700">
              This application helps you track symptoms and access health education. It does not diagnose medical conditions, assess risk levels, or determine whether you are "safe." Only qualified healthcare professionals can provide medical assessments.
            </p>
          </div>
          <div className="p-4 bg-lavender-50 rounded-xl border border-lavender-100">
            <p className="font-medium text-lavender-800 mb-1">Don't delay seeking care</p>
            <p className="text-lavender-700">
              If you feel something is seriously wrong, do not wait to complete a questionnaire or chat with an AI assistant. Seek professional medical attention immediately.
            </p>
          </div>
          <div className="p-4 bg-sage-400/10 rounded-xl border border-sage-400/20">
            <p className="font-medium text-sage-700 mb-1">Your feelings are valid</p>
            <p className="text-gray-600">
              If your pain or symptoms feel severe to you, they deserve attention — even if others minimize them. Trust your body and advocate for yourself with healthcare providers.
            </p>
          </div>
        </div>
      </div>

      {/* Preparing for appointments */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <h2 className="font-semibold text-gray-900 mb-4">Preparing for a Medical Visit</h2>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-lavender-500 mt-1">•</span>
            Write down your top 3 concerns before the appointment
          </li>
          <li className="flex items-start gap-2">
            <span className="text-lavender-500 mt-1">•</span>
            Note when symptoms started and how they've changed
          </li>
          <li className="flex items-start gap-2">
            <span className="text-lavender-500 mt-1">•</span>
            List any medications or supplements you're taking
          </li>
          <li className="flex items-start gap-2">
            <span className="text-lavender-500 mt-1">•</span>
            Bring a support person if possible
          </li>
          <li className="flex items-start gap-2">
            <span className="text-lavender-500 mt-1">•</span>
            Use HERA's report feature to generate a summary of your logged data
          </li>
        </ul>
        <Link to="/reports" className="inline-flex items-center gap-2 mt-4 text-sm text-lavender-600 font-medium hover:text-lavender-700">
          Generate a health report <ExternalLink className="w-3 h-3" />
        </Link>
      </div>

      {/* Resources */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Trusted Resources</h2>
        <div className="space-y-2">
          <a href="https://www.who.int" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-sm text-gray-700">
            <ExternalLink className="w-4 h-4 text-lavender-500" />
            World Health Organization (WHO)
          </a>
          <a href="https://www.nhs.uk" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-sm text-gray-700">
            <ExternalLink className="w-4 h-4 text-lavender-500" />
            NHS (UK National Health Service)
          </a>
          <a href="https://www.mohfw.gov.in" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-sm text-gray-700">
            <ExternalLink className="w-4 h-4 text-lavender-500" />
            India Ministry of Health & Family Welfare
          </a>
        </div>
      </div>
    </div>
  );
}
