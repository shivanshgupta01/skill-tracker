# 🎯 Skill Progress Tracker

> **Track your journey from beginner to master — one session at a time.**

A beautiful, AI-powered web app to track hours spent learning any skill, visualize your growth over time, and get personalized learning resources powered by Claude AI.

![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?style=flat-square&logo=react)
![Powered by Claude AI](https://img.shields.io/badge/AI-Claude%20Sonnet-orange?style=flat-square)
![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)
![No Login Required](https://img.shields.io/badge/No%20Login-Required-green?style=flat-square)

---

## ✨ Features

- 🌱 **Personalized Welcome Screen** — Enter your name, saved locally on your device
- ➕ **Add Unlimited Skills** — Guitar, Python, Spanish, Fitness, anything you're learning
- ⏱️ **Log Practice Sessions** — Track duration, date, and notes for every session
- 📊 **14-Day Activity Chart** — Visual bar chart showing your consistency over time
- 🏆 **Milestone Badges** — Unlock achievements at 10h, 25h, 50h, 100h, 200h, 500h
- 🤖 **AI Learning Guide** — Claude AI analyzes your progress and suggests personalized books, YouTube channels, websites, and practice tips
- 📈 **Goal Tracking** — Set an hour goal per skill and track your % progress
- 📋 **Session History** — Full log of every session you've ever tracked
- 📥 **CSV Export** — Download your complete data for Excel or Google Sheets
- 💾 **No Login, No Server** — Everything saved locally in your browser

---

## 🖥️ Live Demo

🔗 **[skill-tracker-shivansh.vercel.app](https://skill-tracker-mauve-three.vercel.app/)**

---

## 📸 Screenshots

| My Skills | Skill Detail | AI Tips |
|-----------|-------------|---------|
| Track all your skills with progress bars | 14-day activity chart + milestones | Personalized AI resource recommendations |

---

## 🏆 Milestone System

| Badge | Level | Hours Required |
|-------|-------|---------------|
| 🥉 | Beginner | 10 hours |
| ⚡ | Apprentice | 25 hours |
| 🥈 | Intermediate | 50 hours |
| 🥇 | Advanced | 100 hours |
| 💎 | Expert | 200 hours |
| 🏆 | Master | 500 hours |

---

## 🤖 AI Features

The **AI Tips** button uses **Claude Sonnet** to analyze your current hours and skill category, then returns:

- 💡 A **personalized tip** based on your current level
- 📚 **4 curated resources** — Book, YouTube channel, Website, and Practice exercise
- 🎯 A **specific next goal** tailored to where you are in your journey

---

## 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| React 18 | Frontend framework |
| Vite | Build tool |
| Claude Sonnet API | AI learning recommendations |
| localStorage | Data persistence (no backend needed) |
| CSS-in-JS | Styling with inline styles |
| Google Fonts | Playfair Display + Plus Jakarta Sans |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm v9+
- Anthropic API Key (for AI features)

### Installation

```bash
# Clone the repository
git clone https://github.com/shivanshgupta01/skill-tracker.git

# Navigate into the project
cd skill-tracker

# Install dependencies
npm install
```

### Environment Setup

Create a `.env` file in the root directory:
```env
VITE_ANTHROPIC_KEY=your_anthropic_api_key_here
```

Get your API key at [console.anthropic.com](https://console.anthropic.com)

### Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

---

## 📦 Deployment

This app is deployed on **Vercel**. To deploy your own:

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import repository
3. Add environment variable `VITE_ANTHROPIC_KEY` in Vercel settings
4. Click Deploy ✅

---

## 📁 Project Structure

```
skill-tracker/
├── src/
│   ├── App.jsx          # Main application (all components)
│   └── main.jsx         # React entry point
├── index.html           # HTML template
├── .env                 # API key (not committed)
├── .gitignore           # Ignores .env and node_modules
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies
```

---

## 🔐 Security

- API key stored in `.env` file — never committed to GitHub
- All user data stored locally in browser localStorage
- No user data sent to any server except AI requests to Anthropic

---

## 🗺️ Roadmap

- [ ] Dark / Light theme toggle
- [ ] Multiple user profiles
- [ ] Skill sharing / public profiles
- [ ] Weekly email reports
- [ ] Mobile app (React Native)
- [ ] Pomodoro timer integration

---

## 👨‍💻 Author

**Shivansh Gupta**
- Instagram: [@flowkraftai](https://www.instagram.com/flowkraftai)
- GitHub: [@shivanshgupta01](https://github.com/shivanshgupta01)

---

## 📄 License

MIT License — feel free to use, modify, and distribute.

---

<p align="center">Built with ❤️ by Shivansh Gupta</p>
<p align="center">⭐ Star this repo if you found it useful!</p>
