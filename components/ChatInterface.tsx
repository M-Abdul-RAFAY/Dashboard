'use client';

import { Phone, Video, MoreHorizontal, Send, Paperclip, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ChatInterfaceProps {
  conversationId: string;
  onToggleProfile: () => void;
  profileVisible: boolean;
}

interface Message {
  id: string;
  sender: 'customer' | 'agent';
  content: string;
  timestamp: string;
  avatar?: string;
}

export default function ChatInterface({ 
  conversationId, 
  onToggleProfile, 
  profileVisible 
}: ChatInterfaceProps) {
  const [newMessage, setNewMessage] = useState('');

  const messages: Message[] = [
    {
      id: '1',
      sender: 'customer',
      content: 'Hey there! What family car models do you carry?',
      timestamp: '10:42 AM',
      avatar: 'WP'
    },
    {
      id: '2',
      sender: 'agent',
      content: 'Hi Will! We have quite a few that are perfect for families. How many seats do you need?',
      timestamp: '10:42 AM',
      avatar: 'FK'
    },
    {
      id: '3',
      sender: 'customer',
      content: 'Great! I need at least 6 seats, and I was hoping they\'d have those screens for the backseat.',
      timestamp: '10:44 AM',
      avatar: 'WP'
    },
    {
      id: '4',
      sender: 'agent',
      content: 'Of course! Those are the best for car rides',
      timestamp: '10:45 AM',
      avatar: 'FK'
    }
  ];

  const customerName = 'Will Pantente';
  const customerLocation = 'Venture Auto ...';

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage('');
    }
  };

  const handleAIGenerate = () => {
    // Handle AI generation
    console.log('AI Generate clicked');
  };

  return (
    <div className="flex flex-col bg-white flex-1 min-w-0">
      {/* Header - Fixed */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="flex items-center space-x-3 min-w-0">
          <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0">
            WP
          </div>
          <div className="min-w-0">
            <h2 className="font-semibold text-gray-900 truncate">{customerName}</h2>
            <p className="text-sm text-gray-500 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
              <span className="truncate">{customerLocation}</span>
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 flex-shrink-0">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
            <Phone size={20} />
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
            <Video size={20} />
          </button>
          <button 
            onClick={onToggleProfile}
            className={cn(
              "p-2 rounded-lg transition-colors",
              profileVisible 
                ? "bg-blue-100 text-blue-600" 
                : "text-gray-500 hover:bg-gray-100"
            )}
          >
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* Messages - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="text-center">
          <p className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full inline-block">
            This is the beginning of your email conversation.
          </p>
          <p className="text-xs text-gray-400 mt-1">Today at 10:42 AM</p>
        </div>

        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex items-start space-x-3",
              message.sender === 'agent' && "flex-row-reverse space-x-reverse"
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium text-white flex-shrink-0",
              message.sender === 'customer' ? "bg-pink-500" : "bg-blue-500"
            )}>
              {message.avatar}
            </div>
            
            <div className={cn(
              "max-w-xs lg:max-w-md px-4 py-2 rounded-2xl",
              message.sender === 'customer' 
                ? "bg-gray-100 text-gray-900" 
                : "bg-blue-500 text-white"
            )}>
              <p className="text-sm">{message.content}</p>
              <p className={cn(
                "text-xs mt-1",
                message.sender === 'customer' ? "text-gray-500" : "text-blue-100"
              )}>
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input - Fixed */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
          <button
            type="button"
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
          >
            <Paperclip size={20} />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-20"
            />
            
            {/* AI Generate Button */}
            <button
              type="button"
              onClick={handleAIGenerate}
              className="absolute right-12 top-1/2 transform -translate-y-1/2 p-1.5 text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
              title="Generate with AI"
            >
              <Sparkles size={16} />
            </button>
            
            {/* Send Button */}
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className={cn(
                "absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full transition-colors",
                newMessage.trim() 
                  ? "bg-blue-500 text-white hover:bg-blue-600" 
                  : "bg-gray-200 text-gray-400"
              )}
            >
              <Send size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}