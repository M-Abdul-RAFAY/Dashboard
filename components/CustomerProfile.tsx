'use client';

import { X, MessageSquare, Phone, Mail, FileText, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface CustomerProfileProps {
  conversationId: string;
  onClose: () => void;
}

interface ActivityItem {
  id: string;
  type: 'feedback' | 'payment' | 'call';
  title: string;
  timestamp: string;
  status?: 'completed' | 'received' | 'missed';
}

export default function CustomerProfile({ conversationId, onClose }: CustomerProfileProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'activity'>('details');
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

  const customer = {
    name: 'Will Pantente',
    phone: '(555) 555-5555',
    email: 'will@email.com',
    status: 'New',
    cardOnFile: {
      type: 'Visa',
      number: '**** 1234',
      expires: '12/26'
    },
    tags: []
  };

  const recentActivity: ActivityItem[] = [
    {
      id: '1',
      type: 'feedback',
      title: 'Completed Feedback Survey',
      timestamp: '59m',
      status: 'completed'
    },
    {
      id: '2',
      type: 'payment',
      title: '$149.00 payment received',
      timestamp: '2d',
      status: 'received'
    },
    {
      id: '3',
      type: 'call',
      title: 'Missed call',
      timestamp: '3d',
      status: 'missed'
    }
  ];

  const statusOptions = [
    'New',
    'Qualifying',
    'Estimates sent',
    'Services',
    'Payments sent',
    'Won',
    'Unqualified',
    'Lost'
  ];

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      {/* Header - Fixed */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="flex items-center space-x-3 min-w-0">
          <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0">
            WP
          </div>
          <div className="min-w-0">
            <h2 className="font-semibold text-gray-900 truncate">{customer.name}</h2>
            <p className="text-sm text-gray-500 truncate">(555) 555-5555</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-1 text-gray-500 hover:bg-gray-100 rounded transition-colors flex-shrink-0"
        >
          <X size={20} />
        </button>
      </div>

      {/* Recent Activity - Fixed */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <h3 className="text-sm font-medium text-gray-900 mb-3">RECENT ACTIVITY</h3>
        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-3">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                activity.type === 'feedback' && activity.status === 'completed' && "bg-pink-100",
                activity.type === 'payment' && activity.status === 'received' && "bg-green-100",
                activity.type === 'call' && activity.status === 'missed' && "bg-red-100"
              )}>
                {activity.type === 'feedback' && (
                  <div className="w-3 h-3 bg-pink-500 rounded-full" />
                )}
                {activity.type === 'payment' && (
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                )}
                {activity.type === 'call' && (
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 truncate">{activity.title}</p>
                <p className="text-xs text-gray-500">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons - Fixed */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="grid grid-cols-4 gap-2">
          <button className="p-3 text-gray-600 hover:bg-gray-100 rounded-lg flex flex-col items-center transition-colors">
            <MessageSquare size={20} />
          </button>
          <button className="p-3 text-gray-600 hover:bg-gray-100 rounded-lg flex flex-col items-center transition-colors">
            <Phone size={20} />
          </button>
          <button className="p-3 text-gray-600 hover:bg-gray-100 rounded-lg flex flex-col items-center transition-colors">
            <Mail size={20} />
          </button>
          <button className="p-3 text-gray-600 hover:bg-gray-100 rounded-lg flex flex-col items-center transition-colors">
            <FileText size={20} />
          </button>
        </div>
      </div>

      {/* Tabs - Fixed */}
      <div className="flex border-b border-gray-200 bg-white sticky top-[200px] z-10">
        <button
          onClick={() => setActiveTab('details')}
          className={cn(
            "flex-1 py-3 text-sm font-medium transition-colors",
            activeTab === 'details'
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          )}
        >
          Details
        </button>
        <button
          onClick={() => setActiveTab('activity')}
          className={cn(
            "flex-1 py-3 text-sm font-medium transition-colors",
            activeTab === 'activity'
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          )}
        >
          Activity
        </button>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'details' && (
          <div className="space-y-6">
            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">STATUS</label>
              <div className="relative">
                <button
                  onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg bg-white text-left transition-colors hover:bg-gray-50"
                >
                  <span className="text-sm text-gray-900">{customer.status}</span>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>
                {statusDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-20">
                    {statusOptions.map((status) => (
                      <button
                        key={status}
                        className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                        onClick={() => {
                          setStatusDropdownOpen(false);
                        }}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">NAME</label>
              <p className="text-sm text-gray-900">{customer.name}</p>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">PHONE</label>
              <p className="text-sm text-gray-900">{customer.phone}</p>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">EMAIL</label>
              <p className="text-sm text-gray-900">{customer.email}</p>
            </div>

            {/* Card on File */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CARD ON FILE</label>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-xs text-white font-bold">V</span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-gray-900">{customer.cardOnFile.type} {customer.cardOnFile.number}</p>
                  <p className="text-xs text-gray-500">Expires {customer.cardOnFile.expires}</p>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">TAGS</label>
              <p className="text-sm text-gray-500">No tags added</p>
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                <div className="flex items-start space-x-3">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center mt-1 flex-shrink-0",
                    activity.type === 'feedback' && "bg-pink-100",
                    activity.type === 'payment' && "bg-green-100",
                    activity.type === 'call' && "bg-red-100"
                  )}>
                    {activity.type === 'feedback' && (
                      <div className="w-3 h-3 bg-pink-500 rounded-full" />
                    )}
                    {activity.type === 'payment' && (
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                    )}
                    {activity.type === 'call' && (
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{activity.timestamp} ago</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}