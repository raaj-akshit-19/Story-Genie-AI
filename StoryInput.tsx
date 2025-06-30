import React, { useState, useRef } from 'react';
import { Lamp } from 'lucide-react';

interface StoryInputProps {
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
}

const StoryInput: React.FC<StoryInputProps> = ({ onGenerate, isGenerating }) => {
  const [prompt, setPrompt] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isGenerating) {
      onGenerate(prompt.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm border-2 border-gold-300 rounded-full p-12 shadow-lg">
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="relative">
          <div className="p-2 bg-white border-2 border-gold-400 rounded-full shadow-lg">
            <Lamp className="w-6 h-6 text-gold-500 stroke-2" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-pine-700 font-heading">Make Your Wish</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label htmlFor="prompt" className="block text-lg font-bold text-pine-600 mb-6 text-center font-heading">
            Whisper your story idea to the genie...
          </label>
          <textarea
            ref={textareaRef}
            id="prompt"
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
              adjustTextareaHeight();
            }}
            onKeyDown={handleKeyDown}
            placeholder="Once upon a time, there was..."
            className="w-full p-8 bg-gradient-to-br from-pine-50 to-gold-50 border-2 border-gold-400 rounded-full text-pine-800 placeholder-pine-500 focus:outline-none focus:ring-4 focus:ring-gold-200 focus:border-gold-500 resize-none transition-all duration-300 min-h-[100px] font-bold text-lg text-center placeholder:text-center font-body"
            rows={3}
            maxLength={200}
            disabled={isGenerating}
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={!prompt.trim() || isGenerating}
            className="w-2/5 bg-gradient-to-r from-pine-600 via-pine-700 to-pine-800 hover:from-pine-700 hover:via-pine-800 hover:to-pine-900 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-6 px-10 rounded-full transition-all duration-300 flex items-center justify-center gap-4 shadow-lg hover:shadow-xl disabled:cursor-not-allowed border-2 border-pine-500 hover:border-pine-600 disabled:border-gray-400 text-xl font-heading transform hover:scale-105 active:scale-95"
          >
            {isGenerating ? (
              <>
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                Granting Your Wish...
              </>
            ) : (
              <>
                Grant My Wish!
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StoryInput;