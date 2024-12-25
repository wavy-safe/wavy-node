"use client";

import React, { useState, useEffect } from 'react';
import { PushAPI } from '@pushprotocol/restapi';
import { ethers } from 'ethers';
import { MessageCircle, Loader2, Send } from 'lucide-react';

interface PushHelpChannelProps {
  isOpen: boolean;
  onClose: () => void;
  address: string;
}

const PushHelpChannel: React.FC<PushHelpChannelProps> = ({ isOpen, onClose, address }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [pushUser, setPushUser] = useState<any>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const initializePushUser = async () => {
      try {
        if (!window.ethereum) {
          throw new Error('Please install MetaMask');
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        console.log('Initializing Push user...');
        
        // Initialize Push User
        const user = await PushAPI.initialize(signer, {
          env: 'staging'
        });

        console.log('Push user initialized:', user);
        setPushUser(user);

        // Initialize stream
        const stream = await user.initStream([PushAPI.CONSTANTS.STREAM.CHAT], {
          filter: {
            channels: ['*'],
            chats: ['*'],
          },
          connection: {
            retries: 3
          },
          raw: false
        });

        // Listen for new messages
        stream.on(PushAPI.CONSTANTS.STREAM.CHAT, (message: any) => {
          console.log('New message received:', message);
          setMessages(prev => [...prev, message]);
        });

        stream.connect();
      } catch (error) {
        console.error('Error initializing Push:', error);
        setError(error instanceof Error ? error.message : 'Failed to initialize Push');
      }
    };

    if (isOpen && address) {
      initializePushUser();
    }

    return () => {
      if (pushUser) {
        // Cleanup
        try {
          pushUser.disconnect();
        } catch (e) {
          console.error('Error disconnecting:', e);
        }
      }
    };
  }, [isOpen, address]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!pushUser || !newMessage.trim()) return;

      console.log('Sending message...');

      await pushUser.chat.send(address, {
        content: newMessage,
        type: 'Text'
      });

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      setError(error instanceof Error ? error.message : 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-bold">Help Channel</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        {/* Messages Container */}
        <div className="h-96 overflow-y-auto mb-4 p-4 border rounded-lg bg-gray-50">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-4">
              No messages yet. Start the conversation!
            </div>
          ) : (
            messages.map((msg, index) => (
              <div 
                key={index}
                className={`p-3 mb-2 rounded-lg max-w-[80%] ${
                  msg.fromCAIP10 === address 
                    ? 'bg-blue-500 text-white ml-auto' 
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                <p className="text-sm break-words">{msg.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading || !newMessage.trim() || !pushUser}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default PushHelpChannel;