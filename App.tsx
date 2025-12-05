import React, { useState, useEffect } from 'react';
import { Character, GameSettings, GameState, INITIAL_HP } from './types';
import { startGame, setApiKey, setGameModel } from './services/geminiService';
import { SetupScreen } from './screens/SetupScreen';
import { GameScreen } from './screens/GameScreen';
import { EndScreen } from './screens/EndScreen';
import { ApiKeyScreen } from './screens/ApiKeyScreen';

const App: React.FC = () => {
  const [hasApiKey, setHasApiKey] = useState(false);
  const [gameState, setGameState] = useState<GameState>({
    hp: INITIAL_HP,
    score: 0,
    level: 1,
    inventory: [],
    quest: null,
    history: [],
    currentTurn: null,
    status: 'SETUP',
  });

  const [isLoading, setIsLoading] = useState(false);

  // Check for stored API Key on mount
  useEffect(() => {
    const storedKey = localStorage.getItem('GEMINI_API_KEY');
    if (storedKey) {
      setApiKey(storedKey);
      setHasApiKey(true);
    }
  }, []);

  const handleApiKeySubmit = (key: string) => {
    localStorage.setItem('GEMINI_API_KEY', key);
    setApiKey(key);
    setHasApiKey(true);
  };

  const handleStartGame = async (character: Character, settings: GameSettings, modelId: string) => {
    setIsLoading(true);
    try {
      // Set the selected model
      setGameModel(modelId);

      // Initialize with AI
      const turnData = await startGame(character, settings);
      
      setGameState({
        hp: INITIAL_HP,
        score: 0,
        level: 1,
        inventory: turnData.newItems || [],
        quest: turnData.questUpdate || null,
        history: [{ 
          role: 'model', 
          text: turnData.narrative,
          imagePrompt: turnData.illustrationPrompt || undefined
        }],
        currentTurn: turnData,
        status: 'PLAYING',
      });
    } catch (error: any) {
      console.error(error);
      let msg = "Không thể khởi tạo trò chơi. Vui lòng kiểm tra kết nối mạng hoặc API Key.";
      
      if (error?.message?.includes('401') || error?.message?.includes('403')) {
        msg = "API Key không hợp lệ hoặc đã hết hạn. Vui lòng kiểm tra lại.";
        // Optional: clear bad key
        localStorage.removeItem('GEMINI_API_KEY');
        setHasApiKey(false);
      } else if (error?.message?.includes('429') || error?.status === 429 || error?.code === 429) {
        msg = "Hệ thống đang quá tải (Rate Limit). Vui lòng đợi một chút rồi thử lại.";
      }
      
      alert(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestart = () => {
    setGameState({
      hp: INITIAL_HP,
      score: 0,
      level: 1,
      inventory: [],
      quest: null,
      history: [],
      currentTurn: null,
      status: 'SETUP',
    });
  };

  // If no API Key, show the entry screen
  if (!hasApiKey) {
    return <ApiKeyScreen onSubmit={handleApiKeySubmit} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-serif selection:bg-amber-500/30 selection:text-amber-100">
      {gameState.status === 'SETUP' && (
        <SetupScreen onStart={handleStartGame} isLoading={isLoading} />
      )}
      
      {gameState.status === 'PLAYING' && (
        <GameScreen gameState={gameState} setGameState={setGameState} />
      )}
      
      {gameState.status === 'FINISHED' && (
        <EndScreen gameState={gameState} onRestart={handleRestart} />
      )}
    </div>
  );
};

export default App;