import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Key, Shield, ExternalLink } from 'lucide-react';
import { playSound } from '../services/audioFxService';

interface ApiKeyScreenProps {
  onSubmit: (key: string) => void;
}

export const ApiKeyScreen: React.FC<ApiKeyScreenProps> = ({ onSubmit }) => {
  const [inputKey, setInputKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputKey.trim().length > 10) {
      playSound('confirm');
      onSubmit(inputKey.trim());
    } else {
      alert("API Key không hợp lệ.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-stone-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dungeon-bg z-0 opacity-40"></div>
      
      <div className="max-w-md w-full relative z-10 animate-fade-in-up">
        {/* Card */}
        <div className="bg-stone-900 border-2 border-amber-900/50 rounded-xl shadow-[0_0_60px_rgba(0,0,0,0.8)] p-1">
          <div className="bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] p-8 rounded-lg border border-stone-800">
            
            <div className="flex justify-center mb-6">
              <div className="bg-amber-900/20 p-4 rounded-full border border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                <Key className="w-12 h-12 text-amber-500" />
              </div>
            </div>

            <h1 className="text-3xl font-black font-serif uppercase tracking-wider text-center text-amber-100 mb-2">
              GATEKEEPER
            </h1>
            <p className="text-center text-stone-400 font-serif italic mb-8 text-sm">
              Để bước vào thế giới huyền bí, bạn cần chìa khóa ma thuật (Gemini API Key).
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-amber-600 uppercase tracking-widest mb-2 font-serif">
                  Nhập API Key
                </label>
                <input 
                  type="password"
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full bg-stone-950/80 border border-stone-700 text-amber-100 p-4 rounded focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none font-mono text-sm shadow-inner"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full py-4 text-lg shadow-xl"
                disabled={inputKey.length < 10}
              >
                <Shield className="w-5 h-5 mr-2" />
                MỞ CỔNG
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-stone-800 text-center">
              <a 
                href="https://aistudio.google.com/app/apikey" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center text-xs text-stone-500 hover:text-amber-500 transition-colors font-bold uppercase tracking-wider group"
              >
                Lấy API Key tại đây <ExternalLink className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </a>
              <p className="text-[10px] text-stone-600 mt-2 font-serif">
                *Key của bạn chỉ được lưu trong trình duyệt này.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};