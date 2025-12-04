import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'EduVoice AI Server is running', 
    timestamp: new Date().toISOString(),
    features: ['ASR', 'TTS', 'LLM', 'Quiz', 'Multi-Voice']
  });
});

// Deepgram Speech-to-Text endpoint
app.post('/api/deepgram/transcribe', async (req, res) => {
  try {
    const { audio } = req.body;
    
    if (!audio) {
      return res.status(400).json({ error: 'Audio data is required' });
    }

    const response = await axios.post(
      'https://api.deepgram.com/v1/listen?model=nova-2&smart_format=true&punctuate=true&diarize=false',
      Buffer.from(audio, 'base64'),
      {
        headers: {
          'Authorization': `Token ${process.env.DEEPGRAM_API_KEY}`,
          'Content-Type': 'audio/wav'
        }
      }
    );

    const transcript = response.data.results?.channels[0]?.alternatives[0]?.transcript || '';
    res.json({ transcript });

  } catch (error) {
    console.error('Deepgram Error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Transcription failed', 
      details: error.response?.data || error.message 
    });
  }
});

// Educational AI Tutor endpoint using Groq (FREE & FAST)
app.post('/api/tutor/chat', async (req, res) => {
  try {
    const { message, subject = 'general', conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Educational system prompts based on subject
    const subjectPrompts = {
      science: 'You are an expert Science tutor. Explain scientific concepts clearly using simple language, examples, and analogies suitable for students. Break down complex topics into easy-to-understand parts.',
      mathematics: 'You are a patient Mathematics tutor. Solve problems step-by-step, explain the logic behind each step, and provide clear explanations. Use simple language and verify calculations.',
      english: 'You are an English language tutor. Help with grammar, vocabulary, writing, and literature. Provide clear explanations, examples, and corrections in a friendly manner.',
      history: 'You are a History tutor who makes the past come alive. Explain historical events, their context, causes, and effects in an engaging and easy-to-understand way.',
      geography: 'You are a Geography tutor. Explain geographical concepts, locations, climates, and cultures clearly. Use examples and help students visualize concepts.',
      general: 'You are EduVoice AI, a helpful educational tutor for students. Explain topics clearly, answer questions patiently, help with homework, generate practice questions, and make learning engaging. Keep responses concise (2-4 sentences) for voice output.'
    };

    const systemPrompt = subjectPrompts[subject] || subjectPrompts.general;

    const messages = [
      {
        role: 'system',
        content: systemPrompt + ' Always respond in a way that is easy to understand when spoken aloud. Keep answers under 150 words unless explaining complex topics.'
      },
      ...conversationHistory.slice(-8),
      {
        role: 'user',
        content: message
      }
    ];

    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.1-8b-instant',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
        top_p: 0.9
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const aiResponse = response.data.choices[0].message.content;
    res.json({ response: aiResponse });

  } catch (error) {
    console.error('Groq AI Error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Tutoring response failed', 
      details: error.response?.data || error.message 
    });
  }
});

// Generate practice questions
app.post('/api/tutor/generate-questions', async (req, res) => {
  try {
    const { topic, subject = 'general', count = 5 } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    const prompt = `Generate exactly ${count} practice questions about "${topic}" for students studying ${subject}. 
    Make them clear, educational, and appropriate for exam practice. 
    Format: Just list the questions numbered 1-${count}, nothing else.`;

    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content: 'You are an expert educational content creator who generates high-quality practice questions for students.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 400,
        temperature: 0.8
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const questions = response.data.choices[0].message.content;
    res.json({ questions });

  } catch (error) {
    console.error('Question Generation Error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Question generation failed', 
      details: error.response?.data || error.message 
    });
  }
});

// Quiz Generation endpoint
app.post('/api/tutor/generate-quiz', async (req, res) => {
  try {
    const { topic, subject = 'general', difficulty = 'medium', count = 5 } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    const difficultyLevels = {
      easy: 'easy questions suitable for beginners',
      medium: 'intermediate level questions',
      hard: 'challenging questions for advanced students'
    };

    const prompt = `Create a quiz about "${topic}" in the subject of ${subject}. 
    Generate exactly ${count} multiple choice questions with ${difficultyLevels[difficulty]}.
    
    Format STRICTLY as JSON array:
    [
      {
        "question": "Question text here?",
        "options": ["A) First option", "B) Second option", "C) Third option", "D) Fourth option"],
        "correct": "A",
        "explanation": "Brief explanation why this is correct"
      }
    ]
    
    Make questions educational, clear, and engaging. Only return the JSON array, nothing else.`;

    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content: 'You are an expert quiz creator. Always respond with valid JSON only.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 800,
        temperature: 0.8
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    let quizData = response.data.choices[0].message.content;
    
    // Clean up response to get valid JSON
    quizData = quizData.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    try {
      const parsedQuiz = JSON.parse(quizData);
      res.json({ quiz: parsedQuiz });
    } catch (parseError) {
      console.error('Failed to parse quiz JSON:', quizData);
      res.status(500).json({ error: 'Failed to generate valid quiz format' });
    }

  } catch (error) {
    console.error('Quiz Generation Error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Quiz generation failed', 
      details: error.response?.data || error.message 
    });
  }
});

// Check quiz answer endpoint
app.post('/api/tutor/check-answer', async (req, res) => {
  try {
    const { question, userAnswer, correctAnswer, explanation } = req.body;

    const isCorrect = userAnswer.trim().toUpperCase() === correctAnswer.trim().toUpperCase();

    res.json({ 
      isCorrect,
      message: isCorrect 
        ? '🎉 Correct! ' + explanation
        : `❌ Incorrect. The correct answer is ${correctAnswer}. ${explanation}`
    });

  } catch (error) {
    res.status(500).json({ error: 'Failed to check answer' });
  }
});

// Murf Falcon TTS endpoint - FIXED: Use encodedAudio field
app.post('/api/murf/tts', async (req, res) => {
  try {
    const { text, voiceId = 'en-US-ken' } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    console.log('📝 Murf TTS Request:', {
      textPreview: text.substring(0, 50) + '...',
      textLength: text.length,
      voiceId: voiceId
    });

    const response = await axios.post(
      'https://api.murf.ai/v1/speech/generate-with-key',
      {
        text: text,
        voiceId: voiceId,
        format: 'MP3',
        sampleRate: 24000,
        encodeAsBase64: true
      },
      {
        headers: {
          'api-key': process.env.MURF_API_KEY,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 30000
      }
    );

    console.log('✅ Murf TTS Success - Status:', response.status);

    // FIXED: Murf returns audio in 'encodedAudio' field
    const audioData = response.data.encodedAudio;

    if (!audioData) {
      console.error('❌ No audio data found in response');
      console.error('Available fields:', Object.keys(response.data));
      throw new Error('No audio data in response');
    }

    console.log('✅ Audio data extracted successfully');
    res.json({ audioData });

  } catch (error) {
    console.error('❌ Murf API Error:');
    console.error('  Status:', error.response?.status);
    console.error('  Data:', error.response?.data);
    console.error('  Message:', error.message);
    
    res.status(error.response?.status || 500).json({ 
      error: 'Text-to-speech failed',
      details: error.response?.data?.errorMessage || error.message,
      responseData: error.response?.data
    });
  }
});

// Get available Murf voices
app.get('/api/murf/voices', async (req, res) => {
  try {
    console.log('📋 Fetching Murf voices...');
    
    const response = await axios.get(
      'https://api.murf.ai/v1/speech/voices',
      {
        headers: {
          'api-key': process.env.MURF_API_KEY,
          'Accept': 'application/json'
        }
      }
    );

    console.log('✅ Murf voices fetched successfully');
    res.json(response.data);

  } catch (error) {
    console.error('❌ Murf Voices Error:', error.response?.data);
    res.status(500).json({ 
      error: 'Failed to fetch voices', 
      details: error.response?.data || error.message 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`🎓 EduVoice AI Server`);
  console.log(`${'='.repeat(50)}`);
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
  console.log(`\n🔑 API Keys Status:`);
  console.log(`  ${process.env.DEEPGRAM_API_KEY ? '✅' : '❌'} Deepgram ASR`);
  console.log(`  ${process.env.GROQ_API_KEY ? '✅' : '❌'} Groq LLM`);
  console.log(`  ${process.env.MURF_API_KEY ? '✅' : '❌'} Murf Falcon TTS`);
  console.log(`\n✨ Features Enabled:`);
  console.log(`  ✅ Speech-to-Text (Deepgram)`);
  console.log(`  ✅ AI Tutoring (Groq)`);
  console.log(`  ✅ Text-to-Speech (Murf Falcon)`);
  console.log(`  ✅ Interactive Quiz Mode`);
  console.log(`  ✅ Multi-Voice Support`);
  console.log(`${'='.repeat(50)}\n`);
});