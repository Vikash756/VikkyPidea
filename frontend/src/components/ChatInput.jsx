import React, { useState } from 'react';
import microphoneIcon from '../assets/icons/microphone.svg';

const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  const handleVoiceInput = () => {
    // Implement voice input functionality here
    console.log('Voice input activated');
  };

  return (
    <div className="chat-input flex items-center p-4 bg-gray-100 rounded-lg m-4">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        placeholder="Type a message..."
        className="flex-1 p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-bl-500"
      />
      <button onClick={handleVoiceInput}
       className="p-3 bg-gray-700 text-blue-400 rounded-full hover:bg-gray-600 transition-colors ml-2">
        <img src={microphoneIcon} alt="Microphone" className="w-6 h-6" />
      </button>
      <button onClick={handleSend} className="ml-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
        Send
      </button>
    </div>
  );
};

export default ChatInput;