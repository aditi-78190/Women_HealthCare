# HERA — AI-Powered Women's Healthcare Platform

**Your Personal Women's Health Companion**

HERA is a comprehensive women's healthcare web application designed to help women understand their health better, track symptoms, monitor menstrual cycles, access reliable health education, and prepare for medical consultations.

## 🌟 Features

### Core Functionality
- **Dashboard** - Personalized health overview with quick actions and insights
- **Menstrual Cycle Tracker** - Track periods, calculate cycle patterns, and view history
- **Symptom Tracker** - Log symptoms with severity, duration, triggers, and associated factors
- **Health Insights** - Interactive charts showing symptom frequency, severity trends, mood/energy patterns
- **AI Health Assistant** - Rule-based assistant providing health education and symptom summaries
- **Health Education** - Evidence-based information on PCOS, endometriosis, thyroid health, menopause, and more
- **Health Reports** - Generate downloadable summaries for doctor visits
- **Wellness Tools** - Track water intake, sleep, mood, energy, activity, and practice breathing exercises
- **Reminders** - Set and manage health-related reminders
- **Safety Guidance** - Emergency contacts and when to seek immediate medical help
- **Privacy Controls** - Export or clear all data with full user control

### Technical Features
- Responsive design (mobile, tablet, desktop)
- LocalStorage persistence (data stays in your browser)
- Interactive charts with Recharts
- Beautiful UI with Tailwind CSS
- Accessible forms with validation
- Clear medical disclaimers throughout

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Download the project files**
   - If you're viewing this on a web platform, look for a "Download" or "Export" button
   - Or copy all the files from the `src/` directory structure shown below

2. **Navigate to the project directory**
   ```bash
   cd hera-health-app
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Visit `http://localhost:5173` (or the port shown in your terminal)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready to deploy.

## 📁 Project Structure

```
hera-health-app/
├── index.html                      # Main HTML file
├── package.json                    # Dependencies and scripts
├── vite.config.js                  # Vite configuration
├── src/
│   ├── main.tsx                    # App entry point
│   ├── App.tsx                     # Main app with routing
│   ├── index.css                   # Global styles with Tailwind
│   ├── context/
│   │   └── AppContext.tsx          # Global state management
│   ├── components/
│   │   └── Layout.tsx              # Main layout with sidebar
│   ├── pages/
│   │   ├── Home.tsx                # Landing page
│   │   ├── Onboarding.tsx          # User setup wizard
│   │   ├── Dashboard.tsx           # Main dashboard
│   │   ├── CycleTracker.tsx        # Menstrual cycle tracking
│   │   ├── SymptomTracker.tsx      # Symptom logging
│   │   ├── Insights.tsx            # Health analytics
│   │   ├── HealthAssistant.tsx     # AI chat assistant
│   │   ├── Learn.tsx               # Health education
│   │   ├── Reports.tsx             # Report generation
│   │   ├── Wellness.tsx            # Wellness tracking
│   │   ├── Settings.tsx            # User settings
│   │   ├── Safety.tsx              # Safety guidance
│   │   └── Privacy.tsx             # Privacy policy
│   ├── services/
│   │   ├── storageService.ts       # LocalStorage operations
│   │   └── aiService.ts            # AI assistant logic
│   └── data/
│       └── educationalContent.ts   # Health education data
└── dist/                           # Built files (after npm run build)
```

## 🛠️ Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **date-fns** - Date utilities
- **uuid** - Unique ID generation

## 🔒 Privacy & Data

- All data is stored locally in your browser's localStorage
- No data is sent to external servers
- No account required
- Export or delete your data anytime from Settings
- localStorage is not encrypted medical-record storage

## ⚕️ Medical Disclaimer

**HERA is not a medical device or healthcare provider.**

- Information is for educational and self-tracking purposes only
- Not intended to diagnose, treat, cure, or prevent any disease
- Always consult a qualified healthcare professional for medical advice
- Never disregard professional medical advice because of information from this app

## 📝 Usage Tips

1. **Complete Onboarding** - Set up your profile to personalize the experience
2. **Log Daily** - Even brief symptom and wellness entries help build useful insights
3. **Use the AI Assistant** - Ask questions about health topics or get symptom summaries
4. **Generate Reports** - Before doctor visits, create a summary of your logged data
5. **Explore Education** - Learn about conditions that affect women's health
6. **Practice Self-Care** - Use wellness tools and breathing exercises

## 🌈 Design System

- **Primary Colors**: Lavender, plum, warm white
- **Accent Colors**: Coral, sage green
- **Typography**: Plus Jakarta Sans
- **Style**: Clean, modern, accessible, professional

## 🤝 Contributing

This is a demo project created for educational purposes. Feel free to:
- Use it as a learning resource
- Customize it for your needs
- Share it with others
- Suggest improvements

## 📄 License

This project is provided as-is for educational and demonstration purposes.

## 🆘 Support & Resources

- **Emergency (India)**: Call 112
- **Women's Helpline (India)**: Call 1091
- **WHO**: https://www.who.int
- **NHS**: https://www.nhs.uk
- **India Ministry of Health**: https://www.mohfw.gov.in

## 💡 Important Notes

- This is a demo application, not a production medical system
- Data persists in browser storage only
- Clearing browser data will remove all HERA data
- The AI assistant is rule-based and provides general education only
- No real medical diagnosis or treatment is provided

---

**Built with care for women's health awareness and education.**

**Your Health. Your Voice. Your Well-being.** ✨
