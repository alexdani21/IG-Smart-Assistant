import React from 'react';
import { Message, User } from '../types';

interface MessageBubbleProps {
  message: Message;
  otherUser: User;
  showAvatar: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, otherUser, showAvatar }) => {
  const isOwn = message.isOwn;

  return (
    <div className={`flex w-full mb-2 ${isOwn ? 'justify-end' : 'justify-start'}`}>
      {!isOwn && (
        <div className="w-7 h-7 mr-2 flex-shrink-0">
          {showAvatar && (
            <img 
              src={otherUser.avatar} 
              alt={otherUser.username} 
              className="w-full h-full rounded-full object-cover"
            />
          )}
        </div>
      )}
      
      <div 
        className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm md:text-[15px] leading-snug break-words ${
          isOwn 
            ? 'bg-[#3797f0] text-white rounded-br-none' 
            : 'bg-gray-100 text-gray-900 rounded-bl-none border border-gray-200'
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default MessageBubble;