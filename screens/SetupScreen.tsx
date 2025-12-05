
import React, { useState } from 'react';
import { Character, GameSettings } from '../types';
import { Button } from '../components/Button';
import { Sparkles, Map, Shield, User, Globe, Cpu } from 'lucide-react';
import { playSound } from '../services/audioFxService';

interface SetupScreenProps {
  onStart: (char: Character, settings: GameSettings, modelId: string) => void;
  isLoading: boolean;
}

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  suggestions?: string[];
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, placeholder, suggestions }) => (
  <div className="mb-4 group relative z-10">
    <label className="block text-sm font-bold text-amber-500 mb-1 uppercase tracking-wider font-serif group-focus-within:text-amber-300 transition-colors drop-shadow-md">
      {label}
    </label>
    <input 
      type="text" 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => playSound('hover')}
      className="w-full bg-stone-950/60 border border-stone-600 rounded-md p-3 text-white placeholder-stone-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition-all shadow-inner backdrop-blur-sm"
      placeholder={placeholder}
    />
    {suggestions && (
      <div className="flex flex-wrap gap-2 mt-2">
        {suggestions.map((s: string) => (
          <button
            type="button"
            key={s}
            onClick={() => {
              playSound('click');
              onChange(s);
            }}
            onMouseEnter={() => playSound('hover')}
            className="text-xs bg-stone-900/80 hover:bg-amber-900/60 text-stone-400 hover:text-amber-200 border border-stone-700 hover:border-amber-600 px-2 py-1 rounded-sm transition-all active:scale-95 backdrop-blur-md"
          >
            {s}
          </button>
        ))}
      </div>
    )}
  </div>
);

export const SetupScreen: React.FC<SetupScreenProps> = ({ onStart, isLoading }) => {
  const [character, setCharacter] = useState<Character>({
    name: '',
    race: 'Human',
    class: 'Warrior',
    background: 'Là một kẻ lữ hành đơn độc tìm kiếm ý nghĩa của sự sống.',
  });

  const [settings, setSettings] = useState<GameSettings>({
    setting: 'Fantasy',
    tone: 'Epic',
    customPrompt: '',
  });

  const [selectedModel, setSelectedModel] = useState<string>('gemini-2.5-flash');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoading) {
      playSound('confirm');
      onStart(character, settings, selectedModel);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 flex flex-col items-center justify-center animate-fade-in relative z-10">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
         {/* Subtle fog/smoke effect could go here */}
         <div className="absolute top-10 left-10 w-96 h-96 bg-amber-900/10 rounded-full blur-[100px]"></div>
         <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-900/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="text-center mb-12 relative z-10 group cursor-default">
        <div className="absolute -inset-14 bg-amber-500/10 blur-3xl rounded-full z-0 group-hover:bg-amber-500/20 transition-colors duration-1000"></div>
        <h1 className="relative z-10 text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-500 to-amber-700 drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)] cinzel select-none tracking-tight">
          CHRONICLES
        </h1>
        <div className="flex items-center justify-center gap-4 mt-2">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-500/50"></div>
            <p className="text-stone-400 text-lg md:text-xl font-serif italic tracking-widest uppercase cinzel select-none text-glow">
              Kiến tạo huyền thoại
            </p>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-500/50"></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 relative z-10">
        
        {/* Character Column */}
        <div className="group relative overflow-hidden rounded-xl border-t-4 border-t-amber-600 bg-stone-900 shadow-2xl transition-transform hover:-translate-y-1 duration-300">
          {/* Background Image - Character Theme */}
          <div className="absolute inset-0 z-0">
             <img 
                src="https://images.unsplash.com/photo-1598556776374-2c2937367809?q=80&w=2070&auto=format&fit=crop" 
                alt="Warrior Armor Background" 
                className="w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-[20s] ease-linear"
             />
             <div className="absolute inset-0 bg-gradient-to-b from-stone-900/90 via-stone-900/80 to-stone-950/95"></div>
          </div>

          <div className="relative z-10 p-6 md:p-8">
            <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
              <div className="p-3 bg-gradient-to-br from-amber-700 to-amber-900 rounded-lg shadow-lg border border-amber-500/30">
                <Shield className="text-amber-100 w-8 h-8 drop-shadow-md" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-amber-100 font-serif leading-none uppercase tracking-wide">NHÂN VẬT</h2>
                <span className="text-xs text-amber-500/60 uppercase tracking-widest font-bold">Người hùng của câu chuyện</span>
              </div>
            </div>
            
            <div className="space-y-6">
              <InputField 
                label="DANH XƯNG"
                value={character.name}
                onChange={(v: string) => setCharacter({...character, name: v})}
                placeholder="VD: Gandalf, Arthur, ..."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField 
                  label="CHỦNG TỘC"
                  value={character.race}
                  onChange={(v: string) => setCharacter({...character, race: v})}
                  placeholder="VD: Human..."
                  suggestions={['Human', 'Elf', 'Dwarf', 'Orc', 'Fairy', 'Dragonborn', 'Cyborg']}
                />
                <InputField 
                  label="CHỨC NGHIỆP"
                  value={character.class}
                  onChange={(v: string) => setCharacter({...character, class: v})}
                  placeholder="VD: Warrior..."
                  suggestions={['Warrior', 'Mage', 'Rogue', 'Paladin', 'Bard', 'Hacker', 'Detective']}
                />
              </div>

              <div className="group/area relative z-10">
                <label className="block text-sm font-bold text-amber-500 mb-1 uppercase tracking-wider font-serif drop-shadow-md">TIỂU SỬ & QUÁ KHỨ</label>
                <textarea 
                  rows={3}
                  value={character.background}
                  onChange={e => setCharacter({...character, background: e.target.value})}
                  onFocus={() => playSound('hover')}
                  className="w-full bg-stone-950/60 border border-stone-600 rounded-md p-3 text-white focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all shadow-inner backdrop-blur-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* World Column */}
        <div className="group relative overflow-hidden rounded-xl border-t-4 border-t-indigo-500 bg-stone-900 shadow-2xl transition-transform hover:-translate-y-1 duration-300">
           {/* Background Image - World Theme */}
           <div className="absolute inset-0 z-0">
             <img 
                src="https://images.unsplash.com/photo-1542256851-e129339e03d4?q=80&w=2072&auto=format&fit=crop" 
                alt="Fantasy Map Background" 
                className="w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-[20s] ease-linear"
             />
             <div className="absolute inset-0 bg-gradient-to-b from-stone-900/90 via-stone-900/80 to-stone-950/95"></div>
          </div>

          <div className="relative z-10 p-6 md:p-8">
            <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
               <div className="p-3 bg-gradient-to-br from-indigo-700 to-indigo-900 rounded-lg shadow-lg border border-indigo-500/30">
                <Map className="text-indigo-100 w-8 h-8 drop-shadow-md" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-indigo-100 font-serif leading-none uppercase tracking-wide">THẾ GIỚI</h2>
                 <span className="text-xs text-indigo-400/60 uppercase tracking-widest font-bold">Nơi huyền thoại bắt đầu</span>
              </div>
            </div>

            <div className="space-y-6">
              <InputField 
                label="BỐI CẢNH"
                value={settings.setting}
                onChange={(v: string) => setSettings({...settings, setting: v})}
                placeholder="VD: Fantasy..."
                suggestions={['Fantasy', 'Sci-Fi', 'Horror', 'Modern', 'Post-Apocalyptic', 'Kiếm Hiệp', 'Steampunk']}
              />

              <InputField 
                label="THỂ LOẠI"
                value={settings.tone}
                onChange={(v: string) => setSettings({...settings, tone: v})}
                placeholder="VD: Epic..."
                suggestions={['Epic', 'Dark', 'Funny', 'Mystery', 'Romance', 'Survival']}
              />

              <div className="group/area relative z-10">
                <label className="block text-sm font-bold text-amber-500 mb-1 uppercase tracking-wider font-serif drop-shadow-md">CHI TIẾT KHỞI ĐẦU (TÙY CHỌN)</label>
                <textarea 
                  rows={3}
                  value={settings.customPrompt}
                  onChange={e => setSettings({...settings, customPrompt: e.target.value})}
                  onFocus={() => playSound('hover')}
                  placeholder="Bạn tỉnh dậy ở đâu? Trong ngục tối ẩm ướt hay trên tàu vũ trụ đang cháy?..."
                  className="w-full bg-stone-950/60 border border-stone-600 rounded-md p-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all shadow-inner backdrop-blur-sm"
                />
              </div>

              {/* Model Selection */}
              <div className="group/model relative z-10">
                <label className="block text-sm font-bold text-amber-500 mb-1 uppercase tracking-wider font-serif drop-shadow-md flex items-center gap-2">
                  <Cpu className="w-4 h-4" /> AI GAME MASTER (MODEL)
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => {
                    playSound('click');
                    setSelectedModel(e.target.value);
                  }}
                  onFocus={() => playSound('hover')}
                  className="w-full bg-stone-950/60 border border-stone-600 rounded-md p-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all shadow-inner backdrop-blur-sm cursor-pointer appearance-none"
                >
                  <option value="gemini-2.5-flash">Gemini 2.5 Flash (Cân bằng - Khuyên dùng)</option>
                  <option value="gemini-2.0-flash-lite-preview-02-05">Gemini 2.0 Flash Lite (Tốc độ cao)</option>
                  <option value="gemini-2.0-pro-exp-02-05">Gemini 2.0 Pro Exp (Thông minh nhất - Storytelling)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-stone-400 mt-6">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>

            </div>
          </div>
        </div>
      
        {/* Start Button */}
        <div className="lg:col-span-2 flex justify-center mt-6">
          <Button 
            type="submit" 
            isLoading={isLoading} 
            className="w-full md:w-2/3 text-xl py-5 shadow-[0_0_40px_rgba(245,158,11,0.2)] hover:shadow-[0_0_60px_rgba(245,158,11,0.4)] border-2 border-amber-500/60 bg-amber-800/80 hover:bg-amber-700 backdrop-blur-sm"
          >
            <Sparkles className="w-6 h-6 mr-3 animate-pulse text-amber-200" />
            <span className="drop-shadow-md uppercase font-serif font-bold tracking-wider">BẮT ĐẦU CUỘC PHIÊU LƯU</span>
          </Button>
        </div>
      </form>

      <div className="mt-12 text-center relative z-10 pb-4 max-w-2xl mx-auto">
        <p className="text-stone-500 text-xs md:text-sm font-serif italic">
          Game được thực hiện bởi <span className="text-amber-600 font-bold">Tùng Tinh Tấn</span>, 
          vui lòng liên hệ số điện thoại <a href="tel:0833821008" className="text-stone-400 hover:text-amber-500 underline decoration-stone-700 transition-colors">0833821008</a> hoặc email <a href="mailto:tung.edtech@gmail.com" className="text-stone-400 hover:text-amber-500 underline decoration-stone-700 transition-colors">tung.edtech@gmail.com</a> để trao đổi công việc!
        </p>
      </div>
    </div>
  );
};
