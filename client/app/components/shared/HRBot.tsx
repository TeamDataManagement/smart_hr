'use client';

import React, { useState } from 'react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

function HRBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Bonjour ! Je suis votre assistant RH. Comment puis-je vous aider aujourd'hui ?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Ajouter le message de l'utilisateur
    const userMessage: Message = {
      id: Date.now(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simuler une réponse du bot après un délai
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: "Merci pour votre message. Je suis en cours de développement pour mieux vous aider avec vos questions RH.",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Zone des messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg text-sm ${
                message.isBot
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-violet-900 text-white'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {/* Zone de saisie */}
      <div className="border-t p-3">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Tapez votre message..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-violet-900"
          />
          <button
            type="submit"
            className="bg-violet-900 hover:bg-violet-800 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}

export default HRBot;