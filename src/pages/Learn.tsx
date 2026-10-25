import React, { useState } from 'react';
import { BookOpen, ExternalLink, ChevronRight, ArrowLeft, Search } from 'lucide-react';
import { educationalTopics, type EducationalTopic } from '../data/educationalContent';

export default function Learn() {
  const [selectedTopic, setSelectedTopic] = useState<EducationalTopic | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = educationalTopics.filter(t =>
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.overview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedTopic) {
    return (
      <div className="max-w-3xl mx-auto animate-fade-in">
        <button
          onClick={() => setSelectedTopic(null)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to all topics
        </button>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">{selectedTopic.icon}</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{selectedTopic.title}</h1>
              <span className="text-sm text-lavender-600 font-medium">{selectedTopic.category}</span>
            </div>
          </div>

          <div className="prose prose-sm max-w-none">
            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Overview</h3>
            <p className="text-gray-600 leading-relaxed">{selectedTopic.overview}</p>

            <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Common Signs & Symptoms</h3>
            <ul className="space-y-2">
              {selectedTopic.symptoms.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-600">
                  <span className="text-lavender-500 mt-1">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">When to Seek Medical Advice</h3>
            <div className="bg-rose-warm-50 rounded-xl p-4 border border-rose-warm-100">
              <p className="text-gray-700 text-sm">{selectedTopic.whenToSeekHelp}</p>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Questions to Ask Your Doctor</h3>
            <ul className="space-y-2">
              {selectedTopic.doctorQuestions.map((q, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-600">
                  <span className="text-sage-500 font-bold">{i + 1}.</span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Trusted References</h3>
            <div className="space-y-2">
              {selectedTopic.references.map((ref, i) => (
                <a
                  key={i}
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-sm text-gray-700"
                >
                  <ExternalLink className="w-4 h-4 text-lavender-500" />
                  {ref.title}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-lavender-50 rounded-xl">
          <p className="text-sm text-lavender-800">
            <strong>Disclaimer:</strong> This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Health Education</h1>
        <p className="text-gray-600 mt-1">Evidence-based information about women's health conditions.</p>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search topics..."
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-lavender-400"
        />
      </div>

      {/* Topics Grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.map(topic => (
          <button
            key={topic.id}
            onClick={() => setSelectedTopic(topic)}
            className="text-left bg-white rounded-2xl border border-gray-100 p-6 hover:border-lavender-200 hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{topic.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-lavender-700 transition-colors">{topic.title}</h3>
                  <p className="text-xs text-lavender-600 font-medium">{topic.category}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-lavender-500 transition-colors" />
            </div>
            <p className="text-sm text-gray-500 mt-3 line-clamp-2">{topic.overview}</p>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No topics match your search.</p>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-8 p-4 bg-lavender-50 rounded-xl">
        <p className="text-sm text-lavender-800">
          <strong>Medical Disclaimer:</strong> All health information provided is for educational purposes only. It is sourced from reputable health organizations and is not a substitute for professional medical advice. Always consult a qualified healthcare provider for personal medical decisions.
        </p>
      </div>
    </div>
  );
}
