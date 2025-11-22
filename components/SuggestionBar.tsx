import React from 'react';
import { Sparkles } from 'lucide-react';

interface SuggestionBarProps {
  suggestions: string[];
  isLoading: boolean;
  onSelect: (text: string) => void;
}

const SuggestionBar: React.FC<SuggestionBarProps> = ({ suggestions, isLoading, onSelect }) => {
  if (suggestions.length === 0 && !isLoading) return null;

  return (
    <div className="px-4 py-2 bg-white border-t border-gray-100 flex items-center gap-2 overflow-x-auto scrollbar-hide">
      <div className="flex-shrink-0 text-purple-600 mr-1">
         <Sparkles size={18} className={isLoading ? "animate-pulse" : ""} />
      </div>
      
      {isLoading ? (
        <div className="text-xs text-gray-400 italic">Gemini is thinking...</div>
      ) : (
        suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSelect(suggestion)}
            className="flex-shrink-0 bg-purple-50 text-purple-700 border border-purple-100 hover:bg-purple-100 px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 whitespace-nowrap"
          >
            {suggestion}
          </button>
        ))
      )}
    </div>
  );
};

export default SuggestionBar;