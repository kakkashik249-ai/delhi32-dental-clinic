import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  AlertTriangle,
  Calendar,
  Phone,
  Bot,
  User,
  ShieldAlert,
} from 'lucide-react';
import { sendAIChat } from '../../services/api';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  isEmergency?: boolean;
  timestamp: string;
}

interface AIChatWidgetProps {
  onOpenBooking: () => void;
  clinicPhone: string;
  emergencyPhone: string;
}

export const AIChatWidget: React.FC<AIChatWidgetProps> = ({
  onOpenBooking,
  clinicPhone,
  emergencyPhone,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text:
        'Hello! I am AuraDental’s digital patient assistant. I can answer questions about our 15 dental treatments, clinic hours, doctors, or help you request an appointment.\n\n*Please note: I cannot provide medical diagnosis or replace a dental evaluation.* How can I assist your smile today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'What are your opening hours?',
    'Do you offer Clear Aligners & Invisalign?',
    'How do dental implants work?',
    'I have an urgent toothache emergency',
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const response = await sendAIChat(query);
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: response.reply,
        isEmergency: response.isEmergency,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          text:
            'Our assistant is temporarily offline. For immediate assistance, please call our front desk at +1 (415) 890-3342 or use our appointment booking form.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/30 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-teal-500/30"
          aria-label="Open AI Dental Assistant"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-teal-400 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-teal-400 rounded-full animate-ping"></span>
          </div>
          <span className="text-xs font-semibold tracking-wide hidden sm:inline">
            Dental Assistant
          </span>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
            AI
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[400px] h-[550px] max-h-[82vh] bg-white rounded-2xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-slideUp">
          {/* Header */}
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between shrink-0 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-300">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold leading-none">AuraDental Assistant</h3>
                  <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">General Inquiries & Booking Guide</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Medical Boundary Notice */}
          <div className="bg-amber-50/80 px-3 py-1.5 border-b border-amber-200/60 flex items-center gap-2 text-[11px] text-amber-900 shrink-0">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Educational guidance only. Not medical diagnosis.</span>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs text-slate-700 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-teal-700 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    A
                  </div>
                )}
                <div
                  className={`max-w-[82%] rounded-2xl p-3.5 ${
                    msg.sender === 'user'
                      ? 'bg-teal-600 text-white rounded-br-xs'
                      : msg.isEmergency
                      ? 'bg-rose-50 text-rose-950 border border-rose-300 rounded-bl-xs'
                      : 'bg-white text-slate-800 border border-slate-200 shadow-xs rounded-bl-xs'
                  }`}
                >
                  <div className="whitespace-pre-line leading-relaxed">{msg.text}</div>

                  {msg.isEmergency && (
                    <div className="mt-3 pt-2.5 border-t border-rose-200/80 flex flex-col gap-1.5">
                      <a
                        href={`tel:${emergencyPhone.replace(/[^0-9+]/g, '')}`}
                        className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call Emergency Hotline ({emergencyPhone})</span>
                      </a>
                    </div>
                  )}

                  <span
                    className={`block text-[10px] mt-1.5 text-right ${
                      msg.sender === 'user' ? 'text-teal-100' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 items-center text-xs text-slate-500 italic pl-9">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping"></span>
                <span>AuraDental Assistant is responding...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions pills */}
          {messages.length <= 3 && (
            <div className="p-2.5 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto shrink-0">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-100 hover:bg-teal-50 hover:text-teal-800 text-slate-600 transition-colors whitespace-nowrap shrink-0 border border-slate-200"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Chat Input & CTA */}
          <div className="p-3 bg-white border-t border-slate-200 shrink-0">
            <div className="flex items-center gap-2 pb-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenBooking();
                }}
                className="flex-1 py-1.5 px-2 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Calendar className="w-3 h-3 text-teal-600" />
                <span>Jump to Online Booking Form</span>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about treatments, pricing, or hours..."
                className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white transition-colors cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
