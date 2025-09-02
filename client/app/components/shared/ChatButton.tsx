'use client';

import React, { useState } from 'react';
import HRBot from './HRBot';

function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 w-14 h-14 bg-violet-900 hover:bg-violet-800 text-white rounded-full shadow-lg transition-colors duration-200 flex items-center justify-center z-50"
        title="Ouvrir le chat HR"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>

      {/* Popup de chat */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 z-50 flex flex-col">
          {/* Header du popup */}
          <div className="bg-violet-900 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">HR Assistant</h3>
            <button
              onClick={toggleChat}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Contenu du chat */}
          <div className="flex-1 p-0">
            <HRBot />
          </div>
        </div>
      )}

      {/* Overlay pour fermer le popup en cliquant à côté */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={toggleChat}
        />
      )}
    </>
  );
}

export default ChatButton;