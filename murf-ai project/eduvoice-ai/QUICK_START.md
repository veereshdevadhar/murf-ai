# 🚀 Quick Start Guide

Get EduVoice AI up and running in 5 minutes!

---

## Prerequisites

- Node.js 16+ installed
- API keys from Deepgram, Groq, and Murf AI
- Git installed

---

## Step 1: Clone the Repository

```bash
git clone https://github.com/veereshdevadhar/murf-ai.git
cd murf-ai/murf-ai\ project/eduvoice-ai
```

---

## Step 2: Get API Keys

You'll need free API keys from:

1. **Deepgram** (Speech-to-Text): https://console.deepgram.com/
2. **Groq** (AI LLM): https://console.groq.com/
3. **Murf AI** (Text-to-Speech): https://murf.ai/

> 💡 All services offer free tiers - perfect for development!

---

## Step 3: Setup Backend

```bash
cd backend
npm install
```

Create `.env` file in the `backend` directory:

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

You should see: `Server running on http://localhost:5000`

---

## Step 4: Setup Frontend

Open a **new terminal**:

```bash
cd frontend
npm install
npm run dev
```

You should see: `Local: http://localhost:5173`

---

## Step 5: Open in Browser

Navigate to: **http://localhost:5173**

When prompted, **allow microphone access**.

---

## 🎉 You're Ready!

Click the microphone button and start asking questions!

**Try these:**
- "What is photosynthesis?"
- "Explain the water cycle"
- "How do I solve quadratic equations?"

---

## Quick Troubleshooting

**Backend not starting?**
- Check if port 5000 is available
- Verify `.env` file exists in `backend` directory
- Ensure all API keys are correct

**Frontend not connecting?**
- Verify backend is running on port 5000
- Check browser console for errors
- Ensure `FRONTEND_URL` in backend `.env` matches frontend URL

**Microphone not working?**
- Grant microphone permissions in browser
- Check browser settings for microphone access
- Try Chrome browser for best compatibility

---

**Need detailed help?** Check the [README.md](README.md) for comprehensive documentation and troubleshooting.

