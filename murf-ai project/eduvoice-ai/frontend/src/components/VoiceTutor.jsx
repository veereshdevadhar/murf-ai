import React, { useState, useRef, useEffect, useContext } from 'react';
import axios from 'axios';
import SubjectSelector from './SubjectSelector';
import LearningHistory from './LearningHistory';
import QuizMode from './QuizMode';
import ComparisonPage from './ComparisonPage';
import { DarkModeContext } from '../App';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const VoiceTutor = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  
  // State variables
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('general');
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [conversationHistory, setConversationHistory] = useState([]);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('Ready to help you learn! 🎓');
  const [stats, setStats] = useState({ questionsAsked: 0, topicsLearned: 0 });
  
  // Voice selection state
  const [selectedVoice, setSelectedVoice] = useState('en-US-ken');
  const [availableVoices] = useState([
    { id: 'en-US-ken', name: 'Ken', gender: 'Male', desc: 'Clear & Professional', icon: '👨‍💼' },
    { id: 'en-US-natalie', name: 'Natalie', gender: 'Female', desc: 'Warm & Friendly', icon: '👩‍🏫' },
    { id: 'en-US-wayne', name: 'Wayne', gender: 'Male', desc: 'Deep & Authoritative', icon: '👨‍🎓' },
    { id: 'en-US-terrell', name: 'Terrell', gender: 'Male', desc: 'Young & Energetic', icon: '👨‍🔬' },
  ]);
  
  // Modal states
  const [showQuizMode, setShowQuizMode] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  
  // Demo mode state
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);
  const [demoScenarios] = useState([
    {
      name: "🔬 Science Demo",
      icon: "🧪",
      subject: "science",
      messages: [
        { role: 'user', content: 'Explain photosynthesis in simple words' },
        { role: 'assistant', content: 'Photosynthesis is how plants make their own food using sunlight! Plants take in carbon dioxide from the air and water from the soil. Then, using energy from sunlight captured by their green leaves, they combine these to create sugar (their food) and release oxygen that we breathe. Think of it like a plant cooking its meal using sunlight as the stove!' }
      ]
    },
    {
      name: "🔢 Math Demo",
      icon: "➗",
      subject: "mathematics",
      messages: [
        { role: 'user', content: 'Help me solve 2x + 5 = 15' },
        { role: 'assistant', content: "Let's solve this step by step! First, subtract 5 from both sides: 2x + 5 - 5 = 15 - 5, which gives us 2x = 10. Now divide both sides by 2: 2x ÷ 2 = 10 ÷ 2. So x = 5! You can check: 2(5) + 5 = 10 + 5 = 15. Perfect!" }
      ]
    },
    {
      name: "📚 English Demo",
      icon: "📖",
      subject: "english",
      messages: [
        { role: 'user', content: 'What is a metaphor?' },
        { role: 'assistant', content: "A metaphor is a figure of speech that describes something by saying it IS something else, to make a comparison more vivid. For example, 'Time is money' - we're not literally saying time equals money, but comparing how valuable time is. Another example: 'Her voice is music to my ears' - it's a beautiful way to say her voice sounds pleasant!" }
      ]
    },
    {
      name: "🌍 Geography Demo",
      icon: "🗺️",
      subject: "geography",
      messages: [
        { role: 'user', content: 'Explain the water cycle' },
        { role: 'assistant', content: "The water cycle is Earth's way of recycling water! It has four main steps: Evaporation - the sun heats water in oceans and lakes, turning it into vapor. Condensation - the vapor cools and forms clouds. Precipitation - water falls back as rain or snow. Collection - water gathers in rivers, lakes, and oceans, and the cycle starts again. It's been happening for billions of years!" }
      ]
    }
  ]);
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioContextRef = useRef(null);
  const streamRef = useRef(null);

  // Initialize audio context
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Start recording
  const startListening = async () => {
    try {
      setError('');
      setStatus('Requesting microphone access...');
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 16000
        } 
      });
      
      streamRef.current = stream;
      audioChunksRef.current = [];
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        setIsListening(false);
        setStatus('Processing your speech...');
        await processAudio();
      };

      mediaRecorder.start();
      setIsListening(true);
      setStatus('Listening... Ask me anything! 🎤');
      
    } catch (err) {
      console.error('Microphone error:', err);
      setError('Microphone access denied. Please allow microphone access to use voice input.');
      setStatus('Error');
    }
  };

  // Stop recording
  const stopListening = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    }
  };

  // Process recorded audio
  const processAudio = async () => {
    try {
      setIsProcessing(true);
      
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      const arrayBuffer = await audioBlob.arrayBuffer();
      
      const base64Audio = btoa(
        new Uint8Array(arrayBuffer)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
      );

      setStatus('Understanding your question...');
      
      // Transcribe with Deepgram
      const transcribeResponse = await axios.post(`${API_URL}/api/deepgram/transcribe`, {
        audio: base64Audio
      });

      const transcribedText = transcribeResponse.data.transcript;
      
      if (!transcribedText || transcribedText.trim().length === 0) {
        setError('Could not understand. Please speak clearly and try again.');
        setStatus('Ready to help you learn! 🎓');
        setIsProcessing(false);
        return;
      }

      setTranscript(transcribedText);
      setStatus('Thinking about your question...');

      // Get AI tutor response
      const chatResponse = await axios.post(`${API_URL}/api/tutor/chat`, {
        message: transcribedText,
        subject: selectedSubject,
        conversationHistory: conversationHistory
      });

      const aiResponse = chatResponse.data.response;
      setResponse(aiResponse);

      // Update conversation history
      const newHistory = [
        ...conversationHistory,
        { role: 'user', content: transcribedText },
        { role: 'assistant', content: aiResponse }
      ].slice(-12);
      
      setConversationHistory(newHistory);

      // Update stats
      setStats(prev => ({
        questionsAsked: prev.questionsAsked + 1,
        topicsLearned: new Set([...Array(prev.topicsLearned), selectedSubject]).size
      }));

      setStatus('Generating voice response...');

      // Generate speech with Murf Falcon TTS
      const ttsResponse = await axios.post(`${API_URL}/api/murf/tts`, {
        text: aiResponse,
        voiceId: selectedVoice
      });

      const audioData = ttsResponse.data.audioData;
      
      // Play audio
      await playAudio(audioData);
      
      setStatus('Ready to help you learn! 🎓');
      setIsProcessing(false);

    } catch (err) {
      console.error('Processing error:', err);
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
      setStatus('Error - Ready to retry');
      setIsProcessing(false);
    }
  };

  // Play audio from base64
  const playAudio = async (base64Audio) => {
    try {
      setIsSpeaking(true);
      setStatus('Speaking... 🔊');
      
      const binaryString = atob(base64Audio);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      const audioBlob = new Blob([bytes.buffer], { type: 'audio/mp3' });
      const audioUrl = URL.createObjectURL(audioBlob);
      
      const audio = new Audio(audioUrl);
      
      audio.onended = () => {
        setIsSpeaking(false);
        setStatus('Ready to help you learn! 🎓');
        URL.revokeObjectURL(audioUrl);
      };
      
      audio.onerror = (err) => {
        console.error('Audio playback error:', err);
        setIsSpeaking(false);
        setError('Failed to play audio');
        setStatus('Ready to help you learn! 🎓');
      };
      
      await audio.play();
      
    } catch (err) {
      console.error('Audio play error:', err);
      setIsSpeaking(false);
      setError('Failed to play audio');
      setStatus('Ready to help you learn! 🎓');
    }
  };

  // Toggle recording
  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Clear conversation
  const clearConversation = () => {
    setConversationHistory([]);
    setTranscript('');
    setResponse('');
    setError('');
    setStatus('Ready to help you learn! 🎓');
  };

  // Play demo
  const playDemo = async (scenario) => {
    setIsPlayingDemo(true);
    setSelectedSubject(scenario.subject);
    setConversationHistory([]);
    setStatus('🎬 Playing demo scenario...');

    try {
      for (let i = 0; i < scenario.messages.length; i++) {
        const msg = scenario.messages[i];
        
        setConversationHistory(prev => [...prev, msg]);
        
        if (msg.role === 'assistant') {
          setStatus('🔊 AI is speaking...');
          setIsSpeaking(true);
          
          const ttsResponse = await axios.post(`${API_URL}/api/murf/tts`, {
            text: msg.content,
            voiceId: selectedVoice
          });

          const audioData = ttsResponse.data.audioData;
          await playAudio(audioData);
          
          setIsSpeaking(false);
        }
        
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
      
      setStatus('Demo complete! Try asking your own questions! 🎓');
    } catch (error) {
      console.error('Demo playback error:', error);
      setError('Failed to play demo');
      setStatus('Ready to help you learn! 🎓');
    } finally {
      setIsPlayingDemo(false);
    }
  };

  // Export functions
  const exportAsText = () => {
    const timestamp = new Date().toLocaleString();
    const subject = selectedSubject.charAt(0).toUpperCase() + selectedSubject.slice(1);
    
    let content = `EduVoice AI - Learning Session\n`;
    content += `Subject: ${subject}\n`;
    content += `Date: ${timestamp}\n`;
    content += `Questions Asked: ${stats.questionsAsked}\n`;
    content += `Voice: ${availableVoices.find(v => v.id === selectedVoice)?.name || 'Ken'}\n`;
    content += `\n${'='.repeat(50)}\n\n`;
    
    conversationHistory.forEach((msg, i) => {
      const speaker = msg.role === 'user' ? '👤 Student' : '🎓 EduVoice AI';
      content += `${speaker}:\n${msg.content}\n\n`;
    });
    
    content += `\n${'='.repeat(50)}\n`;
    content += `\nGenerated by EduVoice AI - Your Personal Tutor\n`;
    content += `Powered by Murf Falcon TTS, Deepgram ASR & Groq LLM\n`;
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `eduvoice-session-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportAsJSON = () => {
    const exportData = {
      sessionInfo: {
        timestamp: new Date().toISOString(),
        subject: selectedSubject,
        voice: selectedVoice,
        questionsAsked: stats.questionsAsked,
        topicsLearned: stats.topicsLearned
      },
      conversation: conversationHistory,
      statistics: stats
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `eduvoice-data-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const shareConversation = () => {
    const summary = `I just had ${stats.questionsAsked} questions answered by EduVoice AI! 🎓\n\nSubject: ${selectedSubject}\nTopics learned: ${stats.topicsLearned}\n\nCheck out EduVoice AI - your personal AI tutor!`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My EduVoice AI Learning Session',
        text: summary
      }).catch(err => console.log('Share failed:', err));
    } else {
      navigator.clipboard.writeText(summary).then(() => {
        alert('📋 Summary copied to clipboard!');
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-8">
      {/* Dark Mode Toggle Button */}
      <button
        onClick={toggleDarkMode}
        className={`fixed top-6 right-6 z-50 p-3 rounded-full shadow-lg transition-all transform hover:scale-110 ${
          darkMode 
            ? 'bg-yellow-400 text-gray-900' 
            : 'bg-gray-800 text-yellow-400'
        }`}
        aria-label="Toggle dark mode"
      >
        {darkMode ? '☀️' : '🌙'}
      </button>

      <div className="max-w-5xl w-full">
        
        {/* Header */}
        <div className={`rounded-t-3xl shadow-xl p-8 border-b-4 border-indigo-500 ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-3">
              🎓 EduVoice AI
            </h1>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Your Personal Voice-Based Classroom Tutor
            </p>
            <div className="mt-4 flex justify-center items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  Powered by Murf Falcon TTS
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  Deepgram ASR
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={`shadow-xl p-6 md:p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          
          {/* Subject Selector */}
          <SubjectSelector 
            selectedSubject={selectedSubject}
            onSelectSubject={setSelectedSubject}
            disabled={isListening || isProcessing || isSpeaking}
          />

          {/* Voice Selector */}
          <div className="mb-6">
            <h3 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              🎙️ Select Voice:
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {availableVoices.map((voice) => (
                <button
                  key={voice.id}
                  onClick={() => setSelectedVoice(voice.id)}
                  disabled={isListening || isProcessing || isSpeaking}
                  className={`p-3 rounded-xl text-center transition-all transform hover:scale-105 ${
                    selectedVoice === voice.id
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                      : darkMode
                        ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 border-2 border-gray-600'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                  } ${(isListening || isProcessing || isSpeaking) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="text-3xl mb-1">{voice.icon}</div>
                  <div className="text-sm font-bold">{voice.name}</div>
                  <div className="text-xs opacity-75">{voice.gender}</div>
                  <div className="text-xs mt-1">{voice.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Status Bar */}
          <div className={`rounded-xl p-4 mb-6 border ${
            darkMode 
              ? 'bg-gradient-to-r from-indigo-900 to-purple-900 border-indigo-700'
              : 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full ${
                  isListening ? 'bg-red-500 animate-pulse' : 
                  isSpeaking ? 'bg-green-500 animate-pulse' : 
                  isProcessing ? 'bg-yellow-500 animate-pulse' : 
                  'bg-gray-400'
                }`}></div>
                <span className={`text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  {status}
                </span>
              </div>
              
              {conversationHistory.length > 0 && (
                <div className="flex items-center space-x-2">
                  <div className="relative group">
                    <button
                      className="text-sm bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-1"
                    >
                      <span>📥</span>
                      <span>Export</span>
                    </button>
                    
                    <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-xl border-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 ${
                      darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
                    }`}>
                      <button
                        onClick={exportAsText}
                        className={`w-full text-left px-4 py-2 rounded-t-lg flex items-center space-x-2 ${
                          darkMode ? 'hover:bg-gray-600 text-gray-200' : 'hover:bg-gray-100'
                        }`}
                      >
                        <span>📄</span>
                        <span className="text-sm">Export as Text</span>
                      </button>
                      <button
                        onClick={exportAsJSON}
                        className={`w-full text-left px-4 py-2 flex items-center space-x-2 ${
                          darkMode ? 'hover:bg-gray-600 text-gray-200' : 'hover:bg-gray-100'
                        }`}
                      >
                        <span>📊</span>
                        <span className="text-sm">Export as JSON</span>
                      </button>
                      <button
                        onClick={shareConversation}
                        className={`w-full text-left px-4 py-2 rounded-b-lg flex items-center space-x-2 ${
                          darkMode ? 'hover:bg-gray-600 text-gray-200' : 'hover:bg-gray-100'
                        }`}
                      >
                        <span>📤</span>
                        <span className="text-sm">Share Summary</span>
                      </button>
                    </div>
                  </div>
                  
                  <button
                    onClick={clearConversation}
                    className="text-sm text-red-600 hover:text-red-800 font-medium underline"
                  >
                    Clear History
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className={`mb-6 p-4 border-l-4 rounded-lg ${
              darkMode 
                ? 'bg-red-900 bg-opacity-20 border-red-500'
                : 'bg-red-50 border-red-500'
            }`}>
              <div className="flex items-start">
                <span className="text-2xl mr-3">⚠️</span>
                <p className={`text-sm ${darkMode ? 'text-red-300' : 'text-red-800'}`}>
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* Demo Mode Section */}
          <div className={`mb-6 p-6 rounded-2xl border-2 ${
            darkMode
              ? 'bg-gradient-to-br from-yellow-900 to-orange-900 bg-opacity-20 border-yellow-700'
              : 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300'
          }`}>
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-2">🎬</span>
              <h3 className={`text-lg font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                Quick Demo Scenarios
              </h3>
            </div>
            <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Watch EduVoice AI in action! Click any scenario to see a live demonstration.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {demoScenarios.map((scenario, index) => (
                <button
                  key={index}
                  onClick={() => playDemo(scenario)}
                  disabled={isPlayingDemo || isListening || isProcessing || isSpeaking}
                  className={`p-4 rounded-xl text-center transition-all transform hover:scale-105 ${
                    isPlayingDemo
                      ? 'bg-gray-300 cursor-not-allowed opacity-50'
                      : 'bg-gradient-to-br from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white shadow-lg'
                  }`}
                >
                  <div className="text-3xl mb-2">{scenario.icon}</div>
                  <div className="text-xs font-bold">{scenario.name}</div>
                </button>
              ))}
            </div>
            {isPlayingDemo && (
              <div className="mt-4 flex items-center justify-center space-x-2 text-yellow-700">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-700"></div>
                <span className="text-sm font-semibold">Playing demo...</span>
              </div>
            )}
          </div>

          {/* Voice Control Button */}
          <div className="flex flex-col items-center mb-8">
            <button
              onClick={toggleListening}
              disabled={isProcessing || isSpeaking}
              className={`w-40 h-40 rounded-full flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 shadow-2xl ${
                isListening 
                  ? 'bg-gradient-to-br from-red-500 to-red-600 animate-pulse' 
                  : 'bg-gradient-to-br from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
              } ${(isProcessing || isSpeaking) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {isListening ? (
                <div className="flex space-x-1.5">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-2 bg-white rounded wave-bar"></div>
                  ))}
                </div>
              ) : isProcessing ? (
                <div className="text-white text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white"></div>
                </div>
              ) : isSpeaking ? (
                <div className="text-white text-6xl animate-bounce-slow">🔊</div>
              ) : (
                <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              )}
            </button>
            
            <p className={`mt-6 text-center font-medium text-lg ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              {isListening ? '🎤 Listening to your question...' : 
               isProcessing ? '⚡ Processing...' : 
               isSpeaking ? '🔊 Listen to my explanation...' : 
               '🎤 Click to ask me anything!'}
            </p>

            {/* Stats */}
            <div className="mt-6 flex space-x-8 text-center">
              <div className={`rounded-lg px-6 py-3 ${
                darkMode 
                  ? 'bg-gradient-to-br from-blue-900 to-blue-800'
                  : 'bg-gradient-to-br from-blue-50 to-blue-100'
              }`}>
                <p className="text-3xl font-bold text-blue-600">{stats.questionsAsked}</p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Questions Asked
                </p>
              </div>
              <div className={`rounded-lg px-6 py-3 ${
                darkMode 
                  ? 'bg-gradient-to-br from-purple-900 to-purple-800'
                  : 'bg-gradient-to-br from-purple-50 to-purple-100'
              }`}>
                <p className="text-3xl font-bold text-purple-600">{stats.topicsLearned}</p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Subjects Explored
                </p>
              </div>
            </div>
          </div>

          {/* Quiz Mode Button */}
          <div className="mt-6 mb-8">
            <button
              onClick={() => setShowQuizMode(true)}
              disabled={isListening || isProcessing || isSpeaking}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-2xl">🎯</span>
              <span>Start Interactive Quiz</span>
            </button>
          </div>

          {/* Conversation History */}
          <LearningHistory conversationHistory={conversationHistory} />
        </div>

        {/* Footer */}
        <div className={`rounded-b-3xl shadow-xl p-6 text-white ${
          darkMode 
            ? 'bg-gradient-to-r from-purple-900 to-pink-900'
            : 'bg-gradient-to-r from-indigo-600 to-purple-600'
        }`}>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-sm font-medium mb-2">
                🚀 Built with React, Node.js, Deepgram ASR, Murf Falcon TTS & Groq LLM
              </p>
              <p className="text-xs opacity-75">
                100% Free • Zero Cost • Powered by AI
              </p>
            </div>
            <button
              onClick={() => setShowComparison(true)}
              className="bg-white text-purple-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all flex items-center space-x-2"
            >
              <span>🏆</span>
              <span>Why Murf Falcon?</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showQuizMode && (
        <QuizMode 
          subject={selectedSubject}
          selectedVoice={selectedVoice}
          onClose={() => setShowQuizMode(false)}
        />
      )}

      {showComparison && (
        <ComparisonPage onClose={() => setShowComparison(false)} />
      )}
    </div>
  );
};

export default VoiceTutor;