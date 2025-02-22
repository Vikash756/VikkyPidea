import React from 'react';
// import PropTypes from 'prop-types';


const ChatMessage = ({ message, isUser }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[70%] p-4 rounded-2xl ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-gray-700 text-white rounded-bl-none'
        } shadow-lg`}
      >
        <p className="text-sm md:text-base">{message}</p>
      </div>
    </div>
  );
};

// ChatMessage.propTypes = {
//   message: PropTypes.string.isRequired,
//   isUser: PropTypes.bool.isRequired,
// };

export default ChatMessage;