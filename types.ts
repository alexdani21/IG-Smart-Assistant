export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  isVerified?: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
  isOwn: boolean;
}

export interface Conversation {
  id: string;
  participants: User[]; // Usually just one other person in DMs
  messages: Message[];
  unreadCount: number;
  lastMessagePreview: string;
  lastMessageTime: number;
}

export enum Tone {
  Friendly = 'Friendly',
  Professional = 'Professional',
  Flirty = 'Flirty',
  Sarcastic = 'Sarcastic',
  Concise = 'Concise'
}