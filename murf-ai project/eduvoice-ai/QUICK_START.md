# 🚀 Quick Start Guide

Get EduVoice AI up and running in 5 minutes!

## Step 1: Clone the Repository

```bash
git clone https://github.com/veereshdevadhar/murf-ai.git
cd murf-ai/murf-ai\ project/eduvoice-ai
```

## Step 2: Get API Keys

You'll need free API keys from:

1. **Deepgram** (Speech-to-Text): https://console.deepgram.com/
2. **Groq** (AI LLM): https://console.groq.com/
3. **Murf AI** (Text-to-Speech): https://murf.ai/

> 💡 All services offer free tiers - perfect for development!

## Step 3: Setup Backend

```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
FRONTEND_URL=http://localhost:5173
DEEPGRAM_API_KEY=your_key_here
GROQ_API_KEY=your_key_here
MURF_API_KEY=your_key_here
```

Start backend:
```bash
npm run dev
```

## Step 4: Setup Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

## Step 5: Open in Browser

Navigate to: **http://localhost:5173**

## 🎉 You're Ready!

Click the microphone button and start asking questions!

---

**Need help?** Check the [README.md](README.md) for detailed documentation.

