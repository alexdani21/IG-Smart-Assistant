import React, { useState, useEffect, useRef } from 'react';
import { Conversation, Message, Tone, User } from '../types';
import MessageBubble from './MessageBubble';
import SuggestionBar from './SuggestionBar';
import { generateSmartReplies, rewriteMessage } from '../services/geminiService';
import { Info, Phone, Video, Smile, Image as ImageIcon, Heart, Send, Wand2 } from 'lucide-react';

interface ChatWindowProps {
  conversation: Conversation;
  currentUser: User;
  onSendMessage: (text: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ conversation, currentUser, onSendMessage }) => {
  const [inputText, setInputText] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isRewriting, setIsRewriting] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const otherUser = conversation.participants[0];

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation.messages]);

  // Fetch suggestions when the *other* person was the last one to talk
  useEffect(() => {
    const lastMsg = conversation.messages[conversation.messages.length - 1];
    if (lastMsg && !lastMsg.isOwn) {
      const fetchSuggestions = async () => {
        setIsAiLoading(true);
        const results = await generateSmartReplies(conversation.messages, otherUser);
        setSuggestions(results);
        setIsAiLoading(false);
      };
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [conversation.messages, otherUser]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
    setSuggestions([]); // Clear suggestions
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleRewrite = async (tone: Tone) => {
    if (!inputText.trim()) return;
    setIsRewriting(true);
    const rewritten = await rewriteMessage(inputText, tone);
    setInputText(rewritten);
    setIsRewriting(false);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white">
      {/* Header */}
      <div className="h-16 border-b border-gray-200 flex items-center justify-between px-6 bg-white z-10">
        <div className="flex items-center">
          <img 
            src={otherUser.avatar} 
            alt={otherUser.username} 
            className="w-8 h-8 rounded-full object-cover border border-gray-200"
          />
          <div className="ml-3">
             <h2 className="font-semibold text-base leading-tight">{otherUser.name}</h2>
             <span className="text-xs text-gray-500">Active now</span>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-gray-900">
          <Phone size={24} className="cursor-pointer hover:opacity-60" />
          <Video size={24} className="cursor-pointer hover:opacity-60" />
          <Info size={24} className="cursor-pointer hover:opacity-60" />
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
         {/* Timestamp separator example */}
         <div className="flex justify-center py-4">
            <span className="text-xs text-gray-400">
              {new Date(conversation.lastMessageTime).toLocaleString()}
            </span>
         </div>

         {conversation.messages.map((msg, idx) => {
           // Show avatar only if it's the last message from that group
           const nextMsg = conversation.messages[idx + 1];
           const showAvatar = !msg.isOwn && (!nextMsg || nextMsg.senderId !== msg.senderId);
           
           return (
             <MessageBubble 
               key={msg.id} 
               message={msg} 
               otherUser={otherUser} 
               showAvatar={showAvatar} 
             />
           );
         })}
         <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Bar (AI) */}
      <SuggestionBar 
        suggestions={suggestions} 
        isLoading={isAiLoading} 
        onSelect={(text) => setInputText(text)} 
      />

      {/* Input Area */}
      <div className="p-4 pt-2">
        {/* Tone Modifier Toolbar - Only show if text exists */}
        {inputText.length > 3 && (
          <div className="flex gap-2 mb-2 overflow-x-auto pb-1">
            <div className="flex items-center text-xs text-gray-400 mr-1">
              <Wand2 size={12} className="mr-1" /> Rewrite:
            </div>
            {Object.values(Tone).map((tone) => (
               <button
                 key={tone}
                 onClick={() => handleRewrite(tone)}
                 disabled={isRewriting}
                 className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded text-gray-700 transition-colors"
               >
                 {tone}
               </button>
            ))}
          </div>
        )}

        <div className="relative flex items-center border border-gray-300 rounded-[22px] pl-4 pr-2 py-2 bg-white focus-within:border-gray-400 transition-colors">
            <div className="mr-3 text-gray-900 cursor-pointer hover:opacity-70">
              <Smile size={24} />
            </div>
            <input 
              type="text" 
              placeholder="Message..." 
              className="flex-1 outline-none text-sm placeholder-gray-500"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isRewriting}
            />
            {inputText.length > 0 ? (
              <button 
                onClick={handleSend} 
                className="ml-2 text-blue-500 font-semibold text-sm hover:text-blue-700 p-2"
              >
                Send
              </button>
            ) : (
              <div className="flex items-center space-x-3 ml-2 text-gray-900">
                 <ImageIcon size={24} className="cursor-pointer hover:opacity-70" />
                 <Heart size={24} className="cursor-pointer hover:opacity-70" />
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;