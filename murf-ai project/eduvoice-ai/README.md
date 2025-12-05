# 🎓 EduVoice AI - Your Personal Voice-Based Classroom Tutor

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Demo Video](#-demo-video)
- [Requirements](#-requirements)
- [Dependencies](#-dependencies)
- [Setup Instructions](#-setup-instructions)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Troubleshooting & Debugging](#-troubleshooting--debugging)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Project Overview

**EduVoice AI** is an innovative voice-based educational platform that transforms learning through natural conversation. Students can ask questions using their voice, receive AI-powered explanations, and engage in interactive quizzes—all through an intuitive voice interface.

### Key Highlights

- 🎤 **Voice-First Learning**: Ask questions naturally using your voice
- 🤖 **AI-Powered Tutoring**: Get instant explanations from an intelligent tutor powered by Groq (Llama 3.1)
- 📚 **Multi-Subject Support**: Science, Mathematics, English, History, Geography, and more
- 🎯 **Interactive Quizzes**: Generate and take quizzes on any topic
- 🔊 **Natural Voice Responses**: High-quality text-to-speech with multiple voice options
- 📊 **Learning History**: Track your conversations and learning progress
- 🌙 **Dark Mode**: Comfortable learning experience day or night

### Core Features

- **🎙️ Voice Input**: Real-time speech-to-text using Deepgram ASR
- **🤖 AI Tutoring**: Intelligent responses powered by Groq LLM (Llama 3.1)
- **🔊 Voice Output**: High-quality text-to-speech using Murf Falcon TTS
- **📝 Multi-Subject Learning**: Support for 6+ subjects with specialized prompts
- **🎯 Interactive Quiz Mode**: Generate and take quizzes on any topic
- **📚 Learning History**: View and export your conversation history
- **🎨 Multiple Voice Options**: Choose from 4 different AI voices
- **🌓 Dark Mode**: Toggle between light and dark themes
- **📊 Learning Statistics**: Track questions asked and subjects explored
- **💾 Export Functionality**: Export sessions as text or JSON

---

## 🎥 Demo Video

Watch the complete demo video showcasing EduVoice AI in action:

[![EduVoice AI Demo Video](https://img.youtube.com/vi/_A-u2jfA19o/maxresdefault.jpg)](https://youtu.be/_A-u2jfA19o)

**Direct Link**: [https://youtu.be/_A-u2jfA19o](https://youtu.be/_A-u2jfA19o)

### Demo Highlights

- 🎤 **Voice Input Demonstration**: See how voice questions are captured and transcribed
- 🤖 **AI Tutoring Interaction**: Watch the AI provide detailed explanations
- 🎯 **Quiz Mode Walkthrough**: Experience interactive quiz generation and answering
- 📊 **Learning History Showcase**: Explore conversation tracking and export features
- 🌙 **Dark Mode Toggle**: See the interface adapt to different themes
- 📝 **Export Functionality**: Learn how to export learning sessions

> 📹 **Note**: The demo video provides a comprehensive walkthrough of all features and functionality.

---

## 📦 Requirements

### System Requirements

- **Operating System**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 18.04+)
- **Node.js**: Version 16.0.0 or higher ([Download](https://nodejs.org/))
- **npm**: Version 7.0.0 or higher (comes with Node.js)
- **Git**: Latest version ([Download](https://git-scm.com/))
- **Modern Web Browser**: Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+

### API Keys Required

You'll need free API keys from the following services:

1. **Deepgram** (Speech-to-Text)
   - Sign up: https://console.deepgram.com/
   - Free tier: 12,000 minutes/month
   - Get API key from dashboard

2. **Groq** (AI LLM - Llama 3.1)
   - Sign up: https://console.groq.com/
   - Free tier: Generous free credits
   - Get API key from API Keys section

3. **Murf AI** (Text-to-Speech)
   - Sign up: https://murf.ai/
   - Free tier: Limited minutes/month
   - Get API key from account settings

> 💡 **Note**: All services offer free tiers that are sufficient for development and testing.

### Network Requirements

- **Internet Connection**: Required for API calls
- **Ports**: 
  - Backend: `5000` (default)
  - Frontend: `5173` (default, Vite dev server)
- **Firewall**: Ensure ports are not blocked

---

## 🛠️ Dependencies

### Backend Dependencies

Located in `backend/package.json`:

```json
{
  "dependencies": {
    "axios": "^1.13.2",      // HTTP client for API calls
    "cors": "^2.8.5",        // Cross-origin resource sharing
    "dotenv": "^16.6.1",     // Environment variable management
    "express": "^4.21.2"     // Web framework
  }
}
```

**Installation:**
```bash
cd backend
npm install
```

### Frontend Dependencies

Located in `frontend/package.json`:

```json
{
  "dependencies": {
    "axios": "^1.13.2",      // HTTP client
    "react": "^18.3.1",      // UI library
    "react-dom": "^18.3.1"   // React DOM renderer
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.7.0",  // Vite React plugin
    "autoprefixer": "^10.4.22",        // CSS autoprefixer
    "postcss": "^8.5.6",               // CSS post-processor
    "tailwindcss": "^3.4.18",          // Utility-first CSS framework
    "vite": "^5.4.21"                  // Build tool and dev server
  }
}
```

**Installation:**
```bash
cd frontend
npm install
```

### Tech Stack Summary

**Frontend:**
- React 18.3.1 - UI library
- Vite 5.4.21 - Build tool and dev server
- Tailwind CSS 3.4.18 - Utility-first CSS framework
- Axios 1.13.2 - HTTP client

**Backend:**
- Node.js - Runtime environment
- Express 4.21.2 - Web framework
- Axios 1.13.2 - HTTP client for API calls
- CORS 2.8.5 - Cross-origin resource sharing
- dotenv 16.6.1 - Environment variable management

**AI Services:**
- Deepgram - Speech-to-Text (ASR)
- Groq (Llama 3.1) - Large Language Model
- Murf Falcon - Text-to-Speech (TTS)

---

## 🚀 Setup Instructions

### Step 1: Clone the Repository

```bash
git clone https://github.com/veereshdevadhar/murf-ai.git
cd murf-ai/murf-ai\ project/eduvoice-ai
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (see Environment Variables section below)
# Copy the example and fill in your API keys

# Start the development server
npm run dev

# Or start production server
npm start
```

The backend server will run on `http://localhost:5000`

**Verify Backend is Running:**
```bash
# Test health endpoint
curl http://localhost:5000/health
```

### Step 3: Frontend Setup

Open a **new terminal window**:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173`

### Step 4: Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

### Step 5: Grant Microphone Permissions

When prompted, allow microphone access for voice input functionality.

---

## 🔐 Environment Variables

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
FRONTEND_URL=http://localhost:5173

# Deepgram API (Speech-to-Text)
DEEPGRAM_API_KEY=your_deepgram_api_key_here

# Groq API (LLM - Llama 3.1)
GROQ_API_KEY=your_groq_api_key_here

# Murf AI API (Text-to-Speech)
MURF_API_KEY=your_murf_api_key_here
```

### Frontend Environment Variables (Optional)

Create a `.env` file in the `frontend` directory if you want to customize the API URL:

```env
VITE_API_URL=http://localhost:5000
```

### Creating `.env` File

**Windows (PowerShell):**
```powershell
cd backend
New-Item -Path .env -ItemType File
# Then edit .env with your preferred editor (Notepad, VS Code, etc.)
```

**Windows (Command Prompt):**
```cmd
cd backend
type nul > .env
# Then edit .env with your preferred editor
```

**Linux/Mac:**
```bash
cd backend
touch .env
nano .env  # or use your preferred editor (vim, code, etc.)
```

### 🔒 Secure API Key Management

**Important Security Practices:**

1. **Never commit `.env` files** - They are already in `.gitignore`
2. **Use environment variables** - Never hardcode API keys in source code
3. **Rotate keys regularly** - Especially if exposed or compromised
4. **Use different keys** - Separate keys for development and production
5. **Limit API key permissions** - Use least privilege principle
6. **Monitor API usage** - Check dashboards regularly for unusual activity

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000
```

### Endpoints

#### 1. Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "EduVoice AI Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "features": ["ASR", "TTS", "LLM", "Quiz", "Multi-Voice"]
}
```

#### 2. Speech-to-Text (Transcription)
```http
POST /api/deepgram/transcribe
Content-Type: application/json
```

**Request Body:**
```json
{
  "audio": "base64_encoded_audio_data"
}
```

**Response:**
```json
{
  "transcript": "What is photosynthesis?"
}
```

**Error Response:**
```json
{
  "error": "Invalid audio data"
}
```

#### 3. AI Tutor Chat
```http
POST /api/tutor/chat
Content-Type: application/json
```

**Request Body:**
```json
{
  "message": "Explain photosynthesis",
  "subject": "science",
  "conversationHistory": [
    {
      "role": "user",
      "content": "Previous question"
    },
    {
      "role": "assistant",
      "content": "Previous answer"
    }
  ]
}
```

**Response:**
```json
{
  "response": "Photosynthesis is the process by which plants..."
}
```

**Available Subjects:**
- `general` (default)
- `science`
- `mathematics`
- `english`
- `history`
- `geography`

#### 4. Generate Quiz
```http
POST /api/tutor/generate-quiz
Content-Type: application/json
```

**Request Body:**
```json
{
  "topic": "Photosynthesis",
  "subject": "science",
  "difficulty": "medium",
  "count": 5
}
```

**Response:**
```json
{
  "quiz": [
    {
      "question": "What is the primary pigment in photosynthesis?",
      "options": [
        "A) Chlorophyll",
        "B) Hemoglobin",
        "C) Melanin",
        "D) Carotene"
      ],
      "correct": "A",
      "explanation": "Chlorophyll is the green pigment..."
    }
  ]
}
```

**Difficulty Levels:**
- `easy`
- `medium`
- `hard`

#### 5. Check Quiz Answer
```http
POST /api/tutor/check-answer
Content-Type: application/json
```

**Request Body:**
```json
{
  "question": "What is photosynthesis?",
  "userAnswer": "A",
  "correctAnswer": "A",
  "explanation": "Explanation here"
}
```

**Response:**
```json
{
  "isCorrect": true,
  "message": "🎉 Correct! Explanation here"
}
```

#### 6. Text-to-Speech
```http
POST /api/murf/tts
Content-Type: application/json
```

**Request Body:**
```json
{
  "text": "Hello, this is a test",
  "voiceId": "en-US-ken"
}
```

**Available Voices:**
- `en-US-ken` - Male, Clear & Professional
- `en-US-natalie` - Female, Warm & Friendly
- `en-US-wayne` - Male, Deep & Authoritative
- `en-US-terrell` - Male, Young & Energetic

**Response:**
```json
{
  "audioData": "base64_encoded_audio_data"
}
```

#### 7. Get Available Voices
```http
GET /api/murf/voices
```

**Response:**
```json
{
  "voices": [
    {
      "id": "en-US-ken",
      "name": "Ken",
      "gender": "Male"
    }
  ]
}
```

#### 8. Generate Practice Questions
```http
POST /api/tutor/generate-questions
Content-Type: application/json
```

**Request Body:**
```json
{
  "topic": "Algebra",
  "subject": "mathematics",
  "count": 5
}
```

**Response:**
```json
{
  "questions": "1. What is 2x + 5 = 15?\n2. Solve for x: 3x - 7 = 14\n..."
}
```

---

## 📁 Project Structure

```
eduvoice-ai/
├── backend/
│   ├── node_modules/          # Backend dependencies
│   ├── .env                    # Environment variables (create this)
│   ├── .gitignore             # Git ignore rules
│   ├── package.json           # Backend dependencies and scripts
│   ├── package-lock.json     # Dependency lock file
│   └── server.js              # Express server (main entry point)
│
├── frontend/
│   ├── node_modules/          # Frontend dependencies
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── ComparisonPage.jsx
│   │   │   ├── LearningHistory.jsx
│   │   │   ├── QuizMode.jsx
│   │   │   ├── SubjectSelector.jsx
│   │   │   └── VoiceTutor.jsx
│   │   ├── App.jsx           # Main App component
│   │   ├── index.css        # Global styles
│   │   └── main.jsx         # React entry point
│   ├── index.html           # HTML template
│   ├── package.json         # Frontend dependencies and scripts
│   ├── postcss.config.js    # PostCSS configuration
│   ├── tailwind.config.js   # Tailwind CSS configuration
│   └── vite.config.js       # Vite configuration
│
├── README.md                 # This file
└── QUICK_START.md           # Quick start guide
```

---

## 🐛 Troubleshooting & Debugging

### Common Issues and Solutions

#### 1. **Microphone Not Working**

**Symptoms:**
- Microphone button doesn't respond
- Browser shows "Microphone permission denied"
- No audio input detected

**Solutions:**
- **Check Browser Permissions:**
  - Chrome: `Settings > Privacy and Security > Site Settings > Microphone`
  - Firefox: `Preferences > Privacy & Security > Permissions > Microphone`
  - Safari: `Preferences > Websites > Microphone`
- **Grant Permission:** Click "Allow" when browser prompts for microphone access
- **Check System Settings:**
  - Windows: `Settings > Privacy > Microphone`
  - macOS: `System Preferences > Security & Privacy > Microphone`
- **Try Different Browser:** Chrome is recommended for best compatibility
- **Check Hardware:** Ensure microphone is connected and working in other apps
- **Refresh Page:** Sometimes permissions need a page refresh

**Debug Steps:**
```javascript
// Check microphone access in browser console
navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => console.log('Microphone access granted'))
  .catch(err => console.error('Microphone error:', err));
```

#### 2. **API Errors**

**Symptoms:**
- "API key invalid" errors
- "Rate limit exceeded" messages
- 401/403 HTTP errors
- Empty responses from API

**Solutions:**
- **Verify API Keys:**
  ```bash
  # Check .env file exists and has correct keys
  cd backend
  cat .env  # Linux/Mac
  type .env # Windows
  ```
- **Check API Key Validity:**
  - Deepgram: Visit https://console.deepgram.com/ and verify key
  - Groq: Visit https://console.groq.com/ and check API keys section
  - Murf: Visit https://murf.ai/ and verify API key in account settings
- **Check API Quotas:**
  - Verify you haven't exceeded free tier limits
  - Check API usage dashboards for each service
- **Verify Backend Server:**
  ```bash
  # Check if backend is running
  curl http://localhost:5000/health
  ```
- **Check Environment Variables:**
  - Ensure `.env` file is in `backend` directory
  - Verify no extra spaces or quotes around API keys
  - Restart backend server after changing `.env`

**Debug Steps:**
```bash
# Test backend endpoints
curl -X POST http://localhost:5000/api/tutor/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"test","subject":"general"}'
```

#### 3. **CORS Errors**

**Symptoms:**
- "Access to fetch blocked by CORS policy" in browser console
- Network requests fail with CORS errors
- Frontend can't connect to backend

**Solutions:**
- **Verify FRONTEND_URL in Backend .env:**
  ```env
  FRONTEND_URL=http://localhost:5173
  ```
- **Check Backend CORS Configuration:**
  - Ensure backend server.js has CORS enabled
  - Verify CORS origin matches frontend URL exactly
- **Check Port Numbers:**
  - Backend should run on port 5000
  - Frontend should run on port 5173
  - Ensure no port conflicts
- **Restart Both Servers:**
  ```bash
  # Stop both servers (Ctrl+C)
  # Restart backend
  cd backend && npm run dev
  # Restart frontend (new terminal)
  cd frontend && npm run dev
  ```

**Debug Steps:**
```bash
# Check if CORS headers are present
curl -I http://localhost:5000/health
# Should see: Access-Control-Allow-Origin header
```

#### 4. **Port Already in Use**

**Symptoms:**
- "Port 5000 is already in use" error
- "Port 5173 is already in use" error
- Server fails to start

**Solutions:**

**Windows:**
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Or change port in .env
PORT=5001
```

**Linux/Mac:**
```bash
# Find process using port 5000
lsof -ti:5000

# Kill process
lsof -ti:5000 | xargs kill -9

# Or change port in .env
PORT=5001
```

**Alternative: Change Port**
```env
# In backend/.env
PORT=5001

# Update frontend/.env (if exists)
VITE_API_URL=http://localhost:5001
```

#### 5. **Dependencies Installation Fails**

**Symptoms:**
- `npm install` fails with errors
- Package not found errors
- Version conflicts
- Permission errors

**Solutions:**
- **Clear npm Cache:**
  ```bash
  npm cache clean --force
  ```
- **Delete node_modules and Lock Files:**
  ```bash
  # Backend
  cd backend
  rm -rf node_modules package-lock.json  # Linux/Mac
  rmdir /s node_modules & del package-lock.json  # Windows
  npm install

  # Frontend
  cd frontend
  rm -rf node_modules package-lock.json  # Linux/Mac
  rmdir /s node_modules & del package-lock.json  # Windows
  npm install
  ```
- **Check Node.js Version:**
  ```bash
  node --version  # Should be 16.0.0 or higher
  npm --version   # Should be 7.0.0 or higher
  ```
- **Use Correct Node Version:**
  ```bash
  # If using nvm
  nvm use 16
  # Or install Node.js 16+ from nodejs.org
  ```
- **Fix Permissions (Linux/Mac):**
  ```bash
  # Don't use sudo with npm
  # Fix npm permissions instead
  mkdir ~/.npm-global
  npm config set prefix '~/.npm-global'
  export PATH=~/.npm-global/bin:$PATH
  ```

#### 6. **Audio Playback Issues**

**Symptoms:**
- No sound from AI responses
- Audio doesn't play
- "Audio context was not allowed to start" error

**Solutions:**
- **Check Browser Audio Permissions:**
  - Ensure browser allows audio autoplay
  - Chrome: `Settings > Site Settings > Sound`
- **Check System Volume:**
  - Ensure system volume is not muted
  - Check browser tab volume (Chrome shows speaker icon)
- **Try Different Browser:**
  - Chrome is recommended for best audio support
- **Check Audio Codec Support:**
  - Ensure browser supports audio format (usually MP3/WAV)
- **User Interaction Required:**
  - Some browsers require user interaction before playing audio
  - Click microphone button first, then audio should play

**Debug Steps:**
```javascript
// Test audio in browser console
const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjGH0fPTgjMGHm7A7+OZURAJR6Hh8sBvJgYwgM/z2Yk3CB1ou+3nn00QDFCn4/C2YxwGOJHV8sx5LAUkd8fw3ZBACBRdtOnrqFUUCkaf4PK+bCEGMYfR89OCMwYebsDv45lREAlHoeHywG8mBjCAz/PZiTcIHWi77eefTRAMUKfj8LZjHAY4kdXyzHksBSR3x/DdkEAIFF206euoVRQKRp/g8r5sIQYxh9Hz04IzBh5uwO/jmVEQCUeh4fLAbyYG...');
audio.play().then(() => console.log('Audio works')).catch(err => console.error('Audio error:', err));
```

#### 7. **Build Errors**

**Symptoms:**
- `npm run build` fails
- Vite build errors
- Module not found errors

**Solutions:**
- **Check Import Paths:**
  - Ensure all imports use correct relative paths
  - Check for typos in file names
- **Verify Dependencies:**
  ```bash
  npm install
  ```
- **Check Node Version:**
  ```bash
  node --version  # Should be 16+
  ```
- **Clear Build Cache:**
  ```bash
  rm -rf node_modules/.vite  # Linux/Mac
  rmdir /s node_modules\.vite  # Windows
  ```

#### 8. **Environment Variables Not Loading**

**Symptoms:**
- API keys not found
- "undefined" values in environment variables
- Backend can't read .env file

**Solutions:**
- **Verify .env File Location:**
  - Must be in `backend` directory (same level as `package.json`)
- **Check File Format:**
  ```env
  # Correct format (no spaces around =)
  PORT=5000
  DEEPGRAM_API_KEY=your_key_here

  # Wrong format (spaces cause issues)
  PORT = 5000
  ```
- **No Quotes Needed:**
  ```env
  # Correct
  PORT=5000

  # Usually works but not necessary
  PORT="5000"
  ```
- **Restart Server:**
  - Environment variables load on server start
  - Stop server (Ctrl+C) and restart: `npm run dev`
- **Check dotenv Import:**
  - Ensure `server.js` has: `import 'dotenv/config'` or `require('dotenv').config()`

### Debugging Checklist

When encountering issues, follow this checklist:

1. ✅ **Check Backend Server Status**
   ```bash
   curl http://localhost:5000/health
   ```

2. ✅ **Verify Environment Variables**
   ```bash
   cd backend
   cat .env  # Linux/Mac
   type .env # Windows
   ```

3. ✅ **Check Browser Console**
   - Open DevTools (F12)
   - Check Console tab for errors
   - Check Network tab for failed requests

4. ✅ **Verify API Keys**
   - Test each API key individually
   - Check API dashboards for usage/quota

5. ✅ **Check Port Availability**
   ```bash
   # Windows
   netstat -ano | findstr :5000
   
   # Linux/Mac
   lsof -ti:5000
   ```

6. ✅ **Verify Dependencies**
   ```bash
   cd backend && npm list
   cd frontend && npm list
   ```

7. ✅ **Check Node.js Version**
   ```bash
   node --version  # Should be 16+
   ```

8. ✅ **Review Server Logs**
   - Check backend terminal for error messages
   - Check frontend terminal for build errors

### Getting Additional Help

If issues persist:

1. **Check GitHub Issues:**
   - Visit: https://github.com/veereshdevadhar/murf-ai/issues
   - Search for similar issues
   - Create new issue with:
     - Error message (full text)
     - Steps to reproduce
     - Browser and OS information
     - Node.js version
     - Screenshots if applicable

2. **Check API Service Status:**
   - Deepgram: https://status.deepgram.com/
   - Groq: Check their status page
   - Murf: Check their status page

3. **Verify Network Connectivity:**
   ```bash
   # Test API endpoints
   curl https://api.deepgram.com/v1/projects
   curl https://api.groq.com/openai/v1/models
   ```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Add comments for complex logic
- Update documentation as needed
- Test your changes thoroughly
- Ensure all tests pass

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Veeresh Devadhar**

- GitHub: [@veereshdevadhar](https://github.com/veereshdevadhar)
- Project Link: [https://github.com/veereshdevadhar/murf-ai](https://github.com/veereshdevadhar/murf-ai)

---

## 🙏 Acknowledgments

- **Deepgram** - For excellent speech-to-text API
- **Groq** - For fast and free LLM API
- **Murf AI** - For high-quality text-to-speech
- **React Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework

---

## 📊 Project Status

✅ **Current Version**: 1.0.0

**Completed Features:**
- ✅ Voice input/output
- ✅ AI tutoring
- ✅ Multi-subject support
- ✅ Quiz generation
- ✅ Learning history
- ✅ Dark mode
- ✅ Export functionality

**Future Enhancements:**
- 🔄 Learning analytics dashboard
- 🔄 Spaced repetition system
- 🔄 Adaptive difficulty
- 🔄 Multi-language support
- 🔄 Mobile app

---



**Made with ❤️ for better education**





