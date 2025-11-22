import { Conversation, User } from './types';

export const CURRENT_USER: User = {
  id: 'me',
  name: 'You',
  username: 'creative_mind',
  avatar: 'https://picsum.photos/150/150?random=99',
};

const USER_1: User = {
  id: 'u1',
  name: 'Sarah Chen',
  username: 'sarah.designs',
  avatar: 'https://picsum.photos/150/150?random=1',
  isVerified: true,
};

const USER_2: User = {
  id: 'u2',
  name: 'Mike Ross',
  username: 'mike_r_photography',
  avatar: 'https://picsum.photos/150/150?random=2',
};

const USER_3: User = {
  id: 'u3',
  name: 'Elena Gilbert',
  username: 'elena_g',
  avatar: 'https://picsum.photos/150/150?random=3',
};

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    participants: [USER_1],
    unreadCount: 1,
    lastMessagePreview: 'What do you think about the new layout?',
    lastMessageTime: Date.now() - 1000 * 60 * 5, // 5 mins ago
    messages: [
      { id: 'm1', senderId: 'me', text: 'Hey Sarah! I saw your latest post. Looks amazing!', timestamp: Date.now() - 1000 * 60 * 60, isOwn: true },
      { id: 'm2', senderId: 'u1', text: 'Thanks so much! I was really unsure about the color palette.', timestamp: Date.now() - 1000 * 60 * 55, isOwn: false },
      { id: 'm3', senderId: 'me', text: 'No, honestly, the pastels work great. Very calming.', timestamp: Date.now() - 1000 * 60 * 50, isOwn: true },
      { id: 'm4', senderId: 'u1', text: 'That means a lot coming from you! I am working on the portfolio page now.', timestamp: Date.now() - 1000 * 60 * 10, isOwn: false },
      { id: 'm5', senderId: 'u1', text: 'What do you think about the new layout I sent?', timestamp: Date.now() - 1000 * 60 * 5, isOwn: false },
    ]
  },
  {
    id: 'c2',
    participants: [USER_2],
    unreadCount: 0,
    lastMessagePreview: 'Sounds good, let’s meet then.',
    lastMessageTime: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    messages: [
      { id: 'm2-1', senderId: 'u2', text: 'Are we still on for the photoshoot on Saturday?', timestamp: Date.now() - 1000 * 60 * 60 * 25, isOwn: false },
      { id: 'm2-2', senderId: 'me', text: 'Yes! 10 AM at the studio, right?', timestamp: Date.now() - 1000 * 60 * 60 * 24.5, isOwn: true },
      { id: 'm2-3', senderId: 'u2', text: 'Sounds good, let’s meet then.', timestamp: Date.now() - 1000 * 60 * 60 * 24, isOwn: false },
    ]
  },
  {
    id: 'c3',
    participants: [USER_3],
    unreadCount: 0,
    lastMessagePreview: 'Hahaha exactly!',
    lastMessageTime: Date.now() - 1000 * 60 * 60 * 48, // 2 days ago
    messages: [
      { id: 'm3-1', senderId: 'me', text: 'Did you see that meme about developers?', timestamp: Date.now() - 1000 * 60 * 60 * 49, isOwn: true },
      { id: 'm3-2', senderId: 'u3', text: 'Hahaha exactly! Story of my life.', timestamp: Date.now() - 1000 * 60 * 60 * 48, isOwn: false },
    ]
  }
];