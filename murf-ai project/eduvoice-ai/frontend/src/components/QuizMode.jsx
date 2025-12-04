import React, { useState, useContext } from 'react';
import axios from 'axios';
import { DarkModeContext } from '../App';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const QuizMode = ({ subject, selectedVoice, onClose }) => {
  const { darkMode } = useContext(DarkModeContext);
  const [quizState, setQuizState] = useState('setup'); // setup, loading, active, results
  const [quizTopic, setQuizTopic] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [questionCount, setQuestionCount] = useState(5);
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  const startQuiz = async () => {
    if (!quizTopic.trim()) {
      alert('Please enter a quiz topic!');
      return;
    }

    setQuizState('loading');
    
    try {
      const response = await axios.post(`${API_URL}/api/tutor/generate-quiz`, {
        topic: quizTopic,
        subject: subject,
        difficulty: difficulty,
        count: questionCount
      });

      setQuizData(response.data.quiz);
      setQuizState('active');
      setCurrentQuestion(0);
      setUserAnswers([]);
      setScore(0);
      
      // Speak first question
      speakQuestion(response.data.quiz[0].question);
    } catch (error) {
      console.error('Quiz generation error:', error);
      alert('Failed to generate quiz. Please try again.');
      setQuizState('setup');
    }
  };

  const speakQuestion = async (text) => {
    try {
      const ttsResponse = await axios.post(`${API_URL}/api/murf/tts`, {
        text: text,
        voiceId: selectedVoice
      });

      const audioData = ttsResponse.data.audioData;
      const binaryString = atob(audioData);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      const audioBlob = new Blob([bytes.buffer], { type: 'audio/mp3' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      audio.onended = () => URL.revokeObjectURL(audioUrl);
      await audio.play();
    } catch (error) {
      console.error('TTS error:', error);
    }
  };

  const submitAnswer = async (answer) => {
    const currentQ = quizData[currentQuestion];
    const newUserAnswers = [...userAnswers, answer];
    setUserAnswers(newUserAnswers);

    try {
      const response = await axios.post(`${API_URL}/api/tutor/check-answer`, {
        question: currentQ.question,
        userAnswer: answer,
        correctAnswer: currentQ.correct,
        explanation: currentQ.explanation
      });

      setFeedback(response.data.message);
      speakQuestion(response.data.message);

      if (response.data.isCorrect) {
        setScore(score + 1);
      }

      // Move to next question after 3 seconds
      setTimeout(() => {
        if (currentQuestion < quizData.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setFeedback('');
          speakQuestion(quizData[currentQuestion + 1].question);
        } else {
          setQuizState('results');
          const finalScore = response.data.isCorrect ? score + 1 : score;
          speakQuestion(`Quiz complete! You scored ${finalScore} out of ${quizData.length}.`);
        }
      }, 3000);

    } catch (error) {
      console.error('Answer check error:', error);
    }
  };

  const restartQuiz = () => {
    setQuizState('setup');
    setQuizTopic('');
    setCurrentQuestion(0);
    setUserAnswers([]);
    setScore(0);
    setFeedback('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto`}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white flex justify-between items-center rounded-t-2xl">
          <h2 className="text-2xl font-bold">🎯 Interactive Quiz Mode</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:text-purple-600 rounded-full w-8 h-8 flex items-center justify-center transition-all"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          
          {/* Setup State */}
          {quizState === 'setup' && (
            <div>
              <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Create Your Quiz
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Quiz Topic
                  </label>
                  <input
                    type="text"
                    value={quizTopic}
                    onChange={(e) => setQuizTopic(e.target.value)}
                    placeholder="e.g., Photosynthesis, World War 2, Algebra"
                    className={`w-full p-3 border-2 rounded-lg outline-none ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500'
                        : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Difficulty Level
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['easy', 'medium', 'hard'].map(level => (
                      <button
                        key={level}
                        onClick={() => setDifficulty(level)}
                        className={`p-3 rounded-lg capitalize transition-all ${
                          difficulty === level
                            ? 'bg-purple-600 text-white'
                            : darkMode
                              ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                              : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Number of Questions: {questionCount}
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="10"
                    value={questionCount}
                    onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <button
                  onClick={startQuiz}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all"
                >
                  🚀 Start Quiz
                </button>
              </div>
            </div>
          )}

          {/* Loading State */}
          {quizState === 'loading' && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
              <p className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Generating your quiz...
              </p>
              <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                This may take a few seconds
              </p>
            </div>
          )}

          {/* Active Quiz State */}
          {quizState === 'active' && quizData[currentQuestion] && (
            <div>
              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Question {currentQuestion + 1} of {quizData.length}
                  </span>
                  <span className="text-purple-600 font-bold">Score: {score}/{quizData.length}</span>
                </div>
                <div className={`w-full rounded-full h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div
                    className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all"
                    style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Question */}
              <div className={`p-6 rounded-xl mb-6 ${
                darkMode 
                  ? 'bg-gradient-to-br from-purple-900 to-pink-900'
                  : 'bg-gradient-to-br from-purple-50 to-pink-50'
              }`}>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {quizData[currentQuestion].question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {quizData[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => submitAnswer(option[0])}
                    disabled={!!feedback}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      feedback
                        ? 'opacity-50 cursor-not-allowed'
                        : darkMode
                          ? 'border-gray-600 bg-gray-700 text-gray-200 hover:border-purple-500 hover:bg-gray-600'
                          : 'border-gray-300 hover:border-purple-500 hover:bg-purple-50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {/* Feedback */}
              {feedback && (
                <div className={`mt-6 p-4 rounded-lg ${
                  feedback.includes('Correct') 
                    ? 'bg-green-100 border-2 border-green-500 text-green-800' 
                    : 'bg-red-100 border-2 border-red-500 text-red-800'
                }`}>
                  <p className="font-semibold">{feedback}</p>
                </div>
              )}
            </div>
          )}

          {/* Results State */}
          {quizState === 'results' && (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">
                {score / quizData.length >= 0.8 ? '🎉' : score / quizData.length >= 0.5 ? '👍' : '📚'}
              </div>
              <h3 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Quiz Complete!
              </h3>
              <p className={`text-xl mb-6 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                You scored <span className="text-purple-600 font-bold">{score}</span> out of <span className="font-bold">{quizData.length}</span>
              </p>
              
              <div className="text-6xl font-bold mb-6 text-purple-600">
                {Math.round((score / quizData.length) * 100)}%
              </div>

              <div className="space-y-3">
                <button
                  onClick={restartQuiz}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-bold hover:shadow-lg"
                >
                  🔄 New Quiz
                </button>
                <button
                  onClick={onClose}
                  className={`w-full py-3 rounded-lg font-bold transition-all ${
                    darkMode
                      ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Close
                </button>
              </div>

              {/* Answer Review */}
              <div className="mt-8 text-left">
                <h4 className={`font-bold text-lg mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Review Answers:
                </h4>
                <div className="space-y-3">
                  {quizData.map((q, i) => (
                    <div key={i} className={`p-3 rounded-lg ${
                      userAnswers[i] === q.correct 
                        ? darkMode ? 'bg-green-900 bg-opacity-30' : 'bg-green-50' 
                        : darkMode ? 'bg-red-900 bg-opacity-30' : 'bg-red-50'
                    }`}>
                      <p className={`font-semibold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        Q{i + 1}: {q.question}
                      </p>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Your answer: <span className="font-bold">{userAnswers[i]}</span> | 
                        Correct: <span className="font-bold text-green-600">{q.correct}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizMode;