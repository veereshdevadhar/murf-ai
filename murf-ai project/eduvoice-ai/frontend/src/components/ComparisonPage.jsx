import React, { useState, useContext } from 'react';
import { DarkModeContext } from '../App';

const ComparisonPage = ({ onClose }) => {
  const { darkMode } = useContext(DarkModeContext);
  const [activeTab, setActiveTab] = useState('features');

  const featureComparison = [
    { 
      feature: 'Response Latency', 
      murf: '0.3s ⚡', 
      others: '2-5s 🐌',
      impact: 'Real-time conversations possible'
    },
    { 
      feature: 'Voice Quality', 
      murf: 'Natural & Human-like 🎯', 
      others: 'Robotic & Monotone 🤖',
      impact: 'Better learning engagement'
    },
    { 
      feature: 'Emotional Range', 
      murf: 'Wide range of emotions 😊😢😮', 
      others: 'Limited emotions 😐',
      impact: 'More expressive teaching'
    },
    { 
      feature: 'Pronunciation Accuracy', 
      murf: '99%+ accurate 🎓', 
      others: '85-90% accurate',
      impact: 'Perfect for language learning'
    },
    { 
      feature: 'Voice Variety', 
      murf: '120+ voices 🌈', 
      others: '20-40 voices',
      impact: 'Match voice to subject/mood'
    },
    { 
      feature: 'Languages Supported', 
      murf: '20+ languages 🌍', 
      others: '5-10 languages',
      impact: 'Global accessibility'
    },
    { 
      feature: 'Free Tier', 
      murf: '1M characters FREE 💰', 
      others: 'Limited or paid only 💸',
      impact: 'Accessible for all students'
    },
    { 
      feature: 'API Integration', 
      murf: 'Simple REST API 🔌', 
      others: 'Complex setup',
      impact: 'Easy to implement'
    },
    {
      feature: 'Audio Quality',
      murf: '24kHz studio quality 🎵',
      others: '16kHz standard',
      impact: 'Crystal clear audio'
    },
    {
      feature: 'Customization',
      murf: 'Pitch, speed, emphasis 🎛️',
      others: 'Basic controls',
      impact: 'Tailored learning experience'
    }
  ];

  const useCases = [
    {
      title: 'Education',
      icon: '🎓',
      murf: 'Perfect for interactive tutoring, clear pronunciation for language learning, engaging storytelling',
      others: 'Basic lecture narration, limited engagement'
    },
    {
      title: 'Accessibility',
      icon: '♿',
      murf: 'Natural reading for visually impaired, multiple voice options for comfort',
      others: 'Basic screen reading, one-size-fits-all'
    },
    {
      title: 'Real-time Interaction',
      icon: '⚡',
      murf: 'Instant responses enable true conversation, no awkward delays',
      others: 'Noticeable lag breaks conversation flow'
    },
    {
      title: 'Global Reach',
      icon: '🌍',
      murf: 'Support for 20+ languages with native-like pronunciation',
      others: 'Limited language support, accented speech'
    }
  ];

  const technicalSpecs = [
    { metric: 'Average Latency', murf: '300ms', others: '2000-5000ms', better: 'murf' },
    { metric: 'Audio Sample Rate', murf: '24kHz', others: '16kHz', better: 'murf' },
    { metric: 'Voice Count', murf: '120+', others: '20-40', better: 'murf' },
    { metric: 'API Calls/min (Free)', murf: '60', others: '10-20', better: 'murf' },
    { metric: 'Character Limit/Request', murf: '3000', others: '500-1000', better: 'murf' },
    { metric: 'Free Tier Characters', murf: '1,000,000', others: '5,000-50,000', better: 'murf' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl max-w-6xl w-full my-8`}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 text-white flex justify-between items-center rounded-t-2xl">
          <div>
            <h2 className="text-3xl font-bold mb-2">Why Murf Falcon TTS?</h2>
            <p className="text-indigo-100">See how Murf outperforms traditional TTS solutions</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:text-purple-600 rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold transition-all"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className={`flex border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          {[
            { id: 'features', label: 'Feature Comparison', icon: '📊' },
            { id: 'usecases', label: 'Use Cases', icon: '💡' },
            { id: 'technical', label: 'Technical Specs', icon: '⚙️' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-4 px-6 font-semibold transition-all ${
                activeTab === tab.id
                  ? darkMode
                    ? 'bg-gray-800 text-purple-400 border-b-4 border-purple-500'
                    : 'bg-white text-purple-600 border-b-4 border-purple-600'
                  : darkMode
                    ? 'bg-gray-900 text-gray-400 hover:bg-gray-800'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              <span className="hidden md:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          
          {/* Features Tab */}
          {activeTab === 'features' && (
            <div>
              <div className={`mb-6 p-4 rounded-lg border-2 ${
                darkMode 
                  ? 'bg-green-900 bg-opacity-20 border-green-700'
                  : 'bg-gradient-to-r from-green-50 to-blue-50 border-green-300'
              }`}>
                <p className={`text-lg font-semibold flex items-center ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  <span className="text-2xl mr-2">🏆</span>
                  Murf Falcon leads in all critical metrics for educational applications
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className={darkMode ? 'bg-gray-700' : 'bg-gray-100'}>
                      <th className={`p-4 text-left font-bold border-b-2 ${darkMode ? 'border-gray-600 text-gray-200' : 'border-gray-300'}`}>
                        Feature
                      </th>
                      <th className={`p-4 text-center font-bold border-b-2 ${
                        darkMode ? 'bg-green-900 bg-opacity-30 border-gray-600 text-gray-200' : 'bg-green-50 border-gray-300'
                      }`}>
                        <div className="flex items-center justify-center">
                          <span className="text-2xl mr-2">🎯</span>
                          <span>Murf Falcon</span>
                        </div>
                      </th>
                      <th className={`p-4 text-center font-bold border-b-2 ${darkMode ? 'border-gray-600 text-gray-200' : 'border-gray-300'}`}>
                        Traditional TTS
                      </th>
                      <th className={`p-4 text-left font-bold border-b-2 ${darkMode ? 'border-gray-600 text-gray-200' : 'border-gray-300'}`}>
                        Impact
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {featureComparison.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? (darkMode ? 'bg-gray-800' : 'bg-white') : (darkMode ? 'bg-gray-750' : 'bg-gray-50')}>
                        <td className={`p-4 font-semibold border-b ${darkMode ? 'border-gray-700 text-gray-200' : 'border-gray-200'}`}>
                          {item.feature}
                        </td>
                        <td className={`p-4 text-center border-b ${
                          darkMode ? 'bg-green-900 bg-opacity-20 border-gray-700' : 'bg-green-50 border-gray-200'
                        }`}>
                          <div className="font-bold text-green-600">{item.murf}</div>
                        </td>
                        <td className={`p-4 text-center border-b ${darkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-600'}`}>
                          <div>{item.others}</div>
                        </td>
                        <td className={`p-4 text-sm border-b ${darkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-600'}`}>
                          {item.impact}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                  <div className="text-4xl font-bold mb-2">10x</div>
                  <div className="text-blue-100">Faster Response Time</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                  <div className="text-4xl font-bold mb-2">99%+</div>
                  <div className="text-purple-100">Pronunciation Accuracy</div>
                </div>
                <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white p-6 rounded-xl">
                  <div className="text-4xl font-bold mb-2">120+</div>
                  <div className="text-pink-100">Voice Options</div>
                </div>
              </div>
            </div>
          )}

          {/* Use Cases Tab */}
          {activeTab === 'usecases' && (
            <div>
              <div className="mb-6">
                <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Real-World Applications
                </h3>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  See how Murf Falcon excels in various scenarios
                </p>
              </div>

              <div className="space-y-6">
                {useCases.map((useCase, index) => (
                  <div key={index} className={`border-2 rounded-xl overflow-hidden hover:shadow-lg transition-all ${
                    darkMode ? 'border-gray-700' : 'border-gray-200'
                  }`}>
                    <div className={`p-4 border-b-2 ${
                      darkMode 
                        ? 'bg-gradient-to-r from-indigo-900 to-purple-900 border-gray-700'
                        : 'bg-gradient-to-r from-indigo-50 to-purple-50 border-gray-200'
                    }`}>
                      <h4 className={`text-xl font-bold flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        <span className="text-3xl mr-3">{useCase.icon}</span>
                        {useCase.title}
                      </h4>
                    </div>
                    <div className="p-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <div className="flex items-center mb-2">
                            <span className="text-2xl mr-2">✅</span>
                            <span className="font-bold text-green-600">With Murf Falcon</span>
                          </div>
                          <p className={`p-3 rounded-lg ${
                            darkMode 
                              ? 'text-gray-300 bg-green-900 bg-opacity-20'
                              : 'text-gray-700 bg-green-50'
                          }`}>
                            {useCase.murf}
                          </p>
                        </div>
                        <div>
                          <div className="flex items-center mb-2">
                            <span className="text-2xl mr-2">⚠️</span>
                            <span className={`font-bold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              Traditional TTS
                            </span>
                          </div>
                          <p className={`p-3 rounded-lg ${
                            darkMode 
                              ? 'text-gray-400 bg-gray-700'
                              : 'text-gray-600 bg-gray-50'
                          }`}>
                            {useCase.others}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={`mt-8 p-6 border-2 rounded-xl ${
                darkMode
                  ? 'bg-yellow-900 bg-opacity-20 border-yellow-700'
                  : 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300'
              }`}>
                <h4 className={`font-bold text-lg mb-3 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  <span className="text-2xl mr-2">💡</span>
                  Why This Matters for Education
                </h4>
                <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span><strong>Faster responses</strong> keep students engaged and maintain conversation flow</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span><strong>Natural voice quality</strong> makes learning more enjoyable and less fatiguing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span><strong>Multiple voices</strong> help students find their preferred learning companion</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span><strong>Free tier</strong> makes quality education accessible to everyone</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Technical Specs Tab */}
          {activeTab === 'technical' && (
            <div>
              <div className="mb-6">
                <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Technical Performance Metrics
                </h3>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Detailed comparison of technical specifications
                </p>
              </div>

              <div className="space-y-4">
                {technicalSpecs.map((spec, index) => (
                  <div key={index} className={`border-2 rounded-xl p-4 ${
                    darkMode ? 'border-gray-700' : 'border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {spec.metric}
                      </h4>
                      <span className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-semibold">
                        {spec.better === 'murf' ? 'Murf Wins 🏆' : 'Others Win'}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className={`p-4 rounded-lg ${
                        spec.better === 'murf' 
                          ? darkMode
                            ? 'bg-green-900 bg-opacity-30 border-2 border-green-700'
                            : 'bg-green-100 border-2 border-green-500'
                          : darkMode
                            ? 'bg-gray-700'
                            : 'bg-gray-100'
                      }`}>
                        <div className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Murf Falcon
                        </div>
                        <div className="text-2xl font-bold text-green-600">{spec.murf}</div>
                      </div>
                      <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <div className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Traditional TTS
                        </div>
                        <div className={`text-2xl font-bold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {spec.others}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl">
                <h4 className="text-xl font-bold mb-4">🎯 Bottom Line</h4>
                <p className="text-lg mb-4">
                  Murf Falcon's superior performance metrics translate directly into a better user experience:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2">⚡</span>
                    <span>10x faster latency enables <strong>real-time conversations</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🎵</span>
                    <span>Higher audio quality provides <strong>clearer learning</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">💰</span>
                    <span>Generous free tier makes <strong>education accessible</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🌍</span>
                    <span>More voices and languages reach <strong>global learners</strong></span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`p-6 rounded-b-2xl border-t-2 ${
          darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <p className={`font-semibold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                Built with Murf Falcon for superior voice quality
              </p>
              <p>Experience the difference in every interaction</p>
            </div>
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all"
            >
              Got It! ✅
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonPage;