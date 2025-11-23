import React, { useState, useCallback } from 'react';
import { getStylistAdvice } from '../services/geminiService';
import { StylistMode, StylistResponse } from '../types';

interface StylistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StylistModal: React.FC<StylistModalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<StylistMode>(StylistMode.IDLE);
  const [advice, setAdvice] = useState<StylistResponse | null>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMode(StylistMode.THINKING);
    try {
      const result = await getStylistAdvice(input);
      setAdvice(result);
      setMode(StylistMode.SUGGESTING);
    } catch (err) {
      setMode(StylistMode.ERROR);
    }
  }, [input]);

  const handleReset = () => {
    setMode(StylistMode.IDLE);
    setAdvice(null);
    setInput('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-aether-black border border-aether-gray/30 w-full max-w-2xl p-8 md:p-12 shadow-2xl text-aether-white font-sans overflow-hidden">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-aether-gray hover:text-white transition-colors text-xl"
        >
          ✕
        </button>

        <div className="mb-8 text-center">
          <h2 className="text-3xl font-serif italic mb-2">Aether Stylist</h2>
          <p className="text-aether-gray text-sm tracking-widest uppercase">AI-Powered Curation</p>
        </div>

        {mode === StylistMode.IDLE && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <label className="text-center text-lg font-light">
              Where are you going, or how do you wish to feel?
            </label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., Opening night at a gallery in Berlin..."
              className="w-full bg-transparent border-b border-aether-gray/50 py-3 text-center text-xl focus:outline-none focus:border-white transition-colors placeholder:text-aether-gray/30"
              autoFocus
            />
            <button 
              type="submit"
              disabled={!input.trim()}
              className="mt-4 px-8 py-3 border border-white hover:bg-white hover:text-black transition-all duration-500 uppercase tracking-widest text-xs self-center"
            >
              Consult the Oracle
            </button>
          </form>
        )}

        {mode === StylistMode.THINKING && (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="w-12 h-12 border-t-2 border-r-2 border-white rounded-full animate-spin"></div>
            <p className="text-sm tracking-widest animate-pulse">Analyzing Silhouette & Context...</p>
          </div>
        )}

        {mode === StylistMode.SUGGESTING && advice && (
          <div className="animate-fade-in-up space-y-6">
            <div className="text-center border-b border-aether-gray/20 pb-6">
              <h3 className="text-2xl font-serif text-white mb-2">{advice.outfitName}</h3>
              <p className="text-aether-gray font-light leading-relaxed">{advice.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-aether-gray mb-3">Key Elements</h4>
                <ul className="space-y-2">
                  {advice.keyItems.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-white rounded-full"></span>
                      <span className="font-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest text-aether-gray mb-3">Styling Note</h4>
                <p className="font-serif italic text-lg text-aether-stone">"{advice.stylingTip}"</p>
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <button 
                onClick={handleReset}
                className="text-xs uppercase tracking-widest border-b border-transparent hover:border-white transition-all pb-1"
              >
                Ask Another Question
              </button>
            </div>
          </div>
        )}

        {mode === StylistMode.ERROR && (
           <div className="text-center py-12">
             <p className="text-red-400 mb-4">The connection to the ether was interrupted.</p>
             <button onClick={handleReset} className="underline">Try Again</button>
           </div>
        )}
      </div>
    </div>
  );
};

export default StylistModal;
