import React, { useContext } from 'react';
import { DarkModeContext } from '../App';

const subjects = [
  { id: 'general', name: 'General', icon: '📚', color: 'bg-blue-500' },
  { id: 'science', name: 'Science', icon: '🔬', color: 'bg-green-500' },
  { id: 'mathematics', name: 'Mathematics', icon: '🔢', color: 'bg-purple-500' },
  { id: 'english', name: 'English', icon: '📖', color: 'bg-pink-500' },
  { id: 'history', name: 'History', icon: '🏛️', color: 'bg-yellow-500' },
  { id: 'geography', name: 'Geography', icon: '🌍', color: 'bg-teal-500' },
];

const SubjectSelector = ({ selectedSubject, onSelectSubject, disabled }) => {
  const { darkMode } = useContext(DarkModeContext);
  
  return (
    <div className="mb-6">
      <h3 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
        Select Subject:
      </h3>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {subjects.map((subject) => (
          <button
            key={subject.id}
            onClick={() => onSelectSubject(subject.id)}
            disabled={disabled}
            className={`p-3 rounded-lg text-center transition-all transform hover:scale-105 ${
              selectedSubject === subject.id
                ? `${subject.color} text-white shadow-lg scale-105`
                : darkMode
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 border border-gray-600'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="text-2xl mb-1">{subject.icon}</div>
            <div className="text-xs font-medium">{subject.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SubjectSelector;