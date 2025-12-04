# 🎓 EduVoice AI - Your Personal Voice-Based Classroom Tutor



## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Setup Instructions](#-setup-instructions)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Usage Guide](#-usage-guide)
- [Project Structure](#-project-structure)
- [Demo Video](#-demo-video)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**EduVoice AI** is an innovative voice-based educational platform that transforms learning through natural conversation. Students can ask questions using their voice, receive AI-powered explanations, and engage in interactive quizzes—all through an intuitive voice interface.

### Key Highlights

- 🎤 **Voice-First Learning**: Ask questions naturally using your voice
- 🤖 **AI-Powered Tutoring**: Get instant explanations from an intelligent tutor
- 📚 **Multi-Subject Support**: Science, Mathematics, English, History, Geography, and more
- 🎯 **Interactive Quizzes**: Generate and take quizzes on any topic
- 🔊 **Natural Voice Responses**: High-quality text-to-speech with multiple voice options
- 📊 **Learning History**: Track your conversations and learning progress
- 🌙 **Dark Mode**: Comfortable learning experience day or night

---

## ✨ Features

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

### Advanced Features

- **Subject-Specific Prompts**: Tailored AI responses based on selected subject
- **Conversation Context**: Maintains context across multiple questions
- **Demo Scenarios**: Pre-built demos for quick exploration
- **Real-Time Processing**: Fast response times with optimized API calls
- **Error Handling**: Comprehensive error handling and user feedback

---

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **Vite 5.4.21** - Build tool and dev server
- **Tailwind CSS 3.4.18** - Utility-first CSS framework
- **Axios 1.13.2** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express 4.21.2** - Web framework
- **Axios 1.13.2** - HTTP client for API calls
- **CORS 2.8.5** - Cross-origin resource sharing
- **dotenv 16.6.1** - Environment variable management

### AI Services
- **Deepgram** - Speech-to-Text (ASR)
- **Groq (Llama 3.1)** - Large Language Model
- **Murf Falcon** - Text-to-Speech (TTS)

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (v7 or higher) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)

### API Keys Required

You'll need API keys from the following services:

1. **Deepgram** - [Get API Key](https://console.deepgram.com/)
2. **Groq** - [Get API Key](https://console.groq.com/)
3. **Murf AI** - [Get API Key](https://murf.ai/)

> 💡 **Note**: All services offer free tiers that are sufficient for development and testing.

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/veereshdevadhar/murf-ai.git
cd murf-ai/murf-ai\ project/eduvoice-ai
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (see Environment Variables section)
# Copy the example below and fill in your API keys

# Start the development server
npm run dev

# Or start production server
npm start
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173`

### 4. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

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

### 🔒 Secure API Key Management

**Important Security Practices:**

1. **Never commit `.env` files** - They are already in `.gitignore`
2. **Use environment variables** - Never hardcode API keys
3. **Rotate keys regularly** - Especially if exposed
4. **Use different keys** - Separate keys for development and production
5. **Limit API key permissions** - Use least privilege principle

### Creating `.env` File

**Windows (PowerShell):**
```powershell
cd backend
New-Item -Path .env -ItemType File
# Then edit .env with your preferred editor
```

**Linux/Mac:**
```bash
cd backend
touch .env
nano .env  # or use your preferred editor
```

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

## 📖 Usage Guide

### Basic Usage

1. **Select a Subject**: Choose from the available subjects (Science, Math, English, etc.)
2. **Choose a Voice**: Select your preferred AI voice
3. **Click the Microphone**: Allow microphone access when prompted
4. **Ask Your Question**: Speak your question clearly
5. **Listen to Response**: The AI will respond with voice and text

### Quiz Mode

1. Click **"Start Interactive Quiz"** button
2. Enter a topic (e.g., "Photosynthesis")
3. Select difficulty level (Easy, Medium, Hard)
4. Choose number of questions (3-10)
5. Click **"Start Quiz"**
6. Answer questions by clicking options
7. Review your results at the end

### Exporting Sessions

1. After having a conversation, click the **"Export"** button
2. Choose export format:
   - **Export as Text**: Plain text file with conversation
   - **Export as JSON**: Structured data format
   - **Share Summary**: Copy summary to clipboard

### Demo Scenarios

Click any demo scenario button to see EduVoice AI in action:
- 🔬 Science Demo
- 🔢 Math Demo
- 📚 English Demo
- 🌍 Geography Demo

---

## 📁 Project Structure

```
eduvoice-ai/
├── backend/
│   ├── node_modules/
│   ├── .env                 # Environment variables (create this)
│   ├── package.json
│   ├── package-lock.json
│   └── server.js            # Express server
│
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ComparisonPage.jsx
│   │   │   ├── LearningHistory.jsx
│   │   │   ├── QuizMode.jsx
│   │   │   ├── SubjectSelector.jsx
│   │   │   └── VoiceTutor.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── README.md
```

---

## 🎥 Demo Video

### Watch the Demo



**Video Link**: [Add your YouTube/Demo video link here]

### Demo Highlights

- 🎤 Voice input demonstration
- 🤖 AI tutoring interaction
- 🎯 Quiz mode walkthrough
- 📊 Learning history showcase
- 🌙 Dark mode toggle
- 📝 Export functionality

> 📹 **Note**: Replace `YOUR_VIDEO_ID` with your actual YouTube video ID, or add a direct link to your demo video.

---

## 🐛 Troubleshooting

### Common Issues

#### 1. **Microphone Not Working**
- **Solution**: Ensure browser has microphone permissions
- Check browser settings: `Settings > Privacy > Microphone`
- Try refreshing the page

#### 2. **API Errors**
- **Solution**: Verify all API keys are correctly set in `.env`
- Check API key validity and quotas
- Ensure backend server is running

#### 3. **CORS Errors**
- **Solution**: Verify `FRONTEND_URL` in backend `.env` matches frontend URL
- Default: `http://localhost:5173`

#### 4. **Port Already in Use**
- **Solution**: Change `PORT` in backend `.env` or kill the process using the port
- Windows: `netstat -ano | findstr :5000`
- Linux/Mac: `lsof -ti:5000 | xargs kill`

#### 5. **Dependencies Installation Fails**
- **Solution**: 
  ```bash
  npm cache clean --force
  rm -rf node_modules package-lock.json
  npm install
  ```

#### 6. **Audio Playback Issues**
- **Solution**: Check browser audio permissions
- Try a different browser (Chrome recommended)
- Ensure system volume is not muted

### Getting Help

If you encounter issues not listed here:
1. Check the [Issues](https://github.com/veereshdevadhar/murf-ai/issues) page
2. Create a new issue with:
   - Error message
   - Steps to reproduce
   - Browser and OS information

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

## ⭐ Star History

If you find this project helpful, please consider giving it a star! ⭐

---

<div align="center">

**Made with ❤️ for better education**

[⬆ Back to Top](#-eduvoice-ai---your-personal-voice-based-classroom-tutor)



