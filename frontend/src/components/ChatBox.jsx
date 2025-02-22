import React, { useState } from 'react';
import axios from 'axios';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import bgImage from "../vik.jpg";

// Define the API URL
const API_URL = 'http://127.0.0.1:9000';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message) => {
    try {
      setIsLoading(true);
      // Add user message
      setMessages(prev => [...prev, { text: message, isUser: true }]);
      
      // Log the request for debugging
      console.log('Sending request to:', `${API_URL}/chat`);
      
      // Send message to backend
      const response = await axios.post(`${API_URL}/chat`, {
        message: message
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Response received:', response.data);
      
      // Add AI response
      setMessages(prev => [...prev, { text: response.data.response, isUser: false }]);
    } catch (error) {
      console.error('Error details:', {
        message: error.message,
        response: error.response,
        status: error.response?.status
      });
      
      // Show error message to user
      setMessages(prev => [...prev, { 
        text: `Error: ${error.response?.data?.detail || error.message}`, 
        isUser: false 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

//   const handleSendMessage = async (message) => {
//     try {
//       setIsLoading(true);
      
//       // Log the request data
//       console.log('Sending message:', { message });
      
//       const response = await axios.post('http://127.0.0.1:8000/chat', {
//         message: message
//       }, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
      
//       console.log('Response:', response.data);
//       setMessages(prev => [...prev, { text: response.data.response, isUser: false }]);
//     } catch (error) {
//       console.error('Error:', error.response || error);
//       setMessages(prev => [...prev, { 
//         text: error.response?.data?.detail || error.message, 
//         isUser: false 
//       }]);
//     } finally {
//       setIsLoading(false);
//     }
// };

return (
  <div className="flex flex-col h-[85vh] w-[60vw] bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-2xl overflow-hidden">
    {/* Header */}
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white">
      <h1 className="text-2xl font-bold text-center">AI Vikky</h1>
    </div>

    {/* Messages Container */}
    <div 
      className="flex-1 overflow-y-auto p-6 space-y-4"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlend: 'overlay'
      }}
    >
      {messages.length === 0 && (
        <div className="text-center text-gray-300 mt-10">
          <p className="text-xl">👋 Hello! How can I help you today?</p>
        </div>
      )}
      {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.text}
            isUser={message.isUser}
          />
        ))}
        {isLoading && (
          <div className="flex justify-center">
            <div className="animate-bounce bg-blue-500 rounded-full p-2">
              <div className="w-4 h-4"></div>
            </div>
          </div>
        )}
      </div>

      {/* Input Component */}
      <ChatInput onSend={handleSendMessage} />
    </div>
  );
};

export default ChatBox;