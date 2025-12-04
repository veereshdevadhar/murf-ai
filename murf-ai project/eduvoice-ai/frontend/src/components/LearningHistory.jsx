import React, { useContext } from 'react';
import { DarkModeContext } from '../App';

const LearningHistory = ({ conversationHistory }) => {
  const { darkMode } = useContext(DarkModeContext);
  
  if (conversationHistory.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎓</div>
        <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          Ready to Learn?
        </h3>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
          Click the microphone to ask me anything!
        </p>
        <div className={`mt-6 text-sm space-y-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
          <p>💡 Try: "Explain photosynthesis"</p>
          <p>💡 Try: "Give me 5 math practice questions"</p>
          <p>💡 Try: "What is Newton's first law?"</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto px-2">
      {conversationHistory.map((msg, index) => (
        <div
          key={index}
          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[85%] lg:max-w-[75%] rounded-2xl px-5 py-3 shadow-md ${
              msg.role === 'user'
                ? darkMode
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                : darkMode
                  ? 'bg-gray-700 text-gray-100 border border-gray-600'
                  : 'bg-white text-gray-800 border border-gray-200'
            }`}
          >
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-lg">
                {msg.role === 'user' ? '👤' : '🎓'}
              </span>
              <p className={`text-xs font-semibold ${msg.role === 'user' ? 'opacity-90' : darkMode ? 'text-gray-300' : 'opacity-75'}`}>
                {msg.role === 'user' ? 'You' : 'EduVoice AI'}
              </p>
            </div>
            <p className="text-sm leading-relaxed">{msg.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LearningHistory;