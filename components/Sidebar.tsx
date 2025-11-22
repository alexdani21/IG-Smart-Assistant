import React from 'react';
import { Conversation } from '../types';
import { ChevronDown, SquarePen } from 'lucide-react';

interface SidebarProps {
  conversations: Conversation[];
  activeId: string;
  onSelect: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ conversations, activeId, onSelect }) => {
  return (
    <div className="w-full md:w-[350px] flex flex-col border-r border-gray-200 bg-white h-full">
      {/* Header */}
      <div className="h-16 px-5 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center cursor-pointer">
          <span className="font-bold text-xl mr-1">creative_mind</span>
          <ChevronDown size={20} />
        </div>
        <button className="text-gray-800 hover:opacity-50">
          <SquarePen size={24} />
        </button>
      </div>

      {/* Messages Label */}
      <div className="px-5 py-3 flex justify-between items-center">
        <span className="font-bold text-base">Messages</span>
        <span className="text-gray-500 text-sm font-medium cursor-pointer">Requests</span>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conv) => {
          const otherUser = conv.participants[0];
          const isActive = conv.id === activeId;

          return (
            <div
              key={conv.id}
              onClick={() => onSelect(conv.id)}
              className={`px-5 py-3 flex items-center cursor-pointer hover:bg-gray-50 transition-colors ${isActive ? 'bg-gray-100' : ''}`}
            >
              <div className="relative">
                <img
                  src={otherUser.avatar}
                  alt={otherUser.username}
                  className="w-14 h-14 rounded-full object-cover border border-gray-200"
                />
                {/* Online indicator mock */}
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-normal text-gray-900 truncate">
                    {otherUser.name}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-0.5">
                  <span className={`truncate ${conv.unreadCount > 0 ? 'font-semibold text-black' : ''}`}>
                     {conv.lastMessagePreview}
                  </span>
                  <span className="mx-1">·</span>
                  <span className="whitespace-nowrap">
                    {formatTime(conv.lastMessageTime)}
                  </span>
                </div>
              </div>
              
              {conv.unreadCount > 0 && (
                <div className="ml-2 w-2 h-2 bg-blue-500 rounded-full"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Helper to format time nicely
const formatTime = (timestamp: number) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  if (diff < 1000 * 60 * 60 * 24) {
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  } else if (diff < 1000 * 60 * 60 * 24 * 7) {
    return date.toLocaleDateString([], { weekday: 'short' });
  } else {
    return `${Math.floor(diff / (1000 * 60 * 60 * 24))}w`;
  }
}

export default Sidebar;