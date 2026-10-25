import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, AlertTriangle, RotateCcw } from 'lucide-react';
import { getAIResponse } from '../services/aiService';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const suggestedPrompts = [
  'Help me understand my cycle',
  'Summarize my symptoms',
  'What should I ask my doctor?',
  'Explain PCOS in simple language',
  'How can I improve my sleep routine?',
  'Tell me about endometriosis',
];

export default function HealthAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello! 👋 I'm HERA's health assistant.\n\nI can help you:\n• Understand health topics like PCOS, endometriosis, thyroid health, and more\n• Summarize symptoms you've logged\n• Suggest questions for your doctor\n• Provide general wellness tips\n\n**Important:** I provide educational information only. I cannot diagnose conditions or replace professional medical advice.\n\nHow can I help you today?`,
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate response delay
    setTimeout(() => {
      const response = getAIResponse(messageText);
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/• /g, '<span class="text-lavender-500 mr-1">•</span> ')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in flex flex-col h-[calc(100vh-180px)]">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lavender-500 to-plum-600 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          HERA AI Assistant
        </h1>
        <p className="text-gray-600 mt-1 ml-13">Your health education companion</p>
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-100 rounded-xl mb-4">
        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-800">
          <strong>Disclaimer:</strong> This is a local demo assistant providing general health education. Responses are informational only and may be incomplete. This is not a substitute for professional medical advice.
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-5 py-3 ${
              msg.role === 'user'
                ? 'bg-lavender-600 text-white rounded-br-md'
                : 'bg-white border border-gray-100 text-gray-800 rounded-bl-md shadow-sm'
            }`}>
              <div
                className="text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatContent(msg.content) }}
              />
              <p className={`text-[10px] mt-2 ${msg.role === 'user' ? 'text-lavender-200' : 'text-gray-400'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-md px-5 py-3 shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-lavender-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-lavender-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-lavender-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested prompts */}
      {messages.length <= 2 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {suggestedPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="px-3 py-1.5 bg-lavender-50 text-lavender-700 rounded-full text-xs font-medium hover:bg-lavender-100 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-3 items-end">
        <div className="flex-1 relative">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your health..."
            rows={1}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-lavender-400 resize-none text-sm"
          />
        </div>
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || isTyping}
          className="p-3 bg-lavender-600 text-white rounded-xl hover:bg-lavender-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
        <button
          onClick={() => setMessages([messages[0]])}
          className="p-3 border border-gray-200 text-gray-500 rounded-xl hover:bg-gray-50 transition-colors"
          title="Reset conversation"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
