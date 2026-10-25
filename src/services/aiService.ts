// Local AI Health Assistant - Rule-based response system
// This is a disclosed local demo assistant, not a real LLM

import { SymptomEntry, getSymptoms } from './storageService';

interface AIResponse {
  text: string;
  suggestions?: string[];
  disclaimer?: boolean;
}

const HEALTH_KNOWLEDGE: Record<string, string> = {
  pcos: `**PCOS (Polycystic Ovary Syndrome)** is a common hormonal condition that affects how your ovaries work. It can cause:

• Irregular or missed periods
• Excess hair growth or acne
• Weight changes
• Difficulty getting pregnant

PCOS is manageable with lifestyle changes and medical guidance. It affects about 1 in 10 women of reproductive age. If you notice these patterns, a healthcare provider can help with proper assessment through blood tests and ultrasound.

*This is general information, not a diagnosis. Please consult a healthcare professional for personal medical advice.*`,

  endometriosis: `**Endometriosis** is a condition where tissue similar to the uterine lining grows outside the uterus. Common symptoms include:

• Severe period pain (beyond typical cramps)
• Pain during or after sex
• Painful bowel movements or urination during periods
• Heavy or irregular bleeding
• Fatigue and bloating

Endometriosis affects roughly 1 in 10 women and can sometimes be difficult to diagnose. If your period pain significantly impacts daily life, please discuss this with a gynecologist.

*This is educational information. Only a qualified healthcare provider can diagnose endometriosis.*`,

  thyroid: `**Thyroid Health** — Your thyroid gland controls metabolism and affects many body systems. Common thyroid issues include:

**Hypothyroidism (underactive):**
• Fatigue, weight gain, feeling cold
• Dry skin, hair loss
• Depression, slow heart rate

**Hyperthyroidism (overactive):**
• Weight loss, rapid heartbeat
• Anxiety, tremors
• Heat sensitivity, sleep problems

Thyroid conditions are diagnosed through blood tests (TSH, T3, T4). They're very treatable with proper medical care.

*This is general health information. Please see a doctor for thyroid testing.*`,

  menopause: `**Menopause** typically occurs between ages 45-55 and marks the end of menstrual cycles. **Perimenopause** (the transition) can start years earlier.

Common experiences include:
• Irregular periods
• Hot flashes and night sweats
• Sleep changes
• Mood fluctuations
• Vaginal dryness
• Bone density changes

Many treatments and lifestyle strategies can help manage symptoms. Hormone therapy, lifestyle changes, and supportive care are available options.

*This is educational information. Discuss your experience with a healthcare provider.*`,

  cycle: `**Understanding Your Menstrual Cycle:**

A typical cycle is 21-35 days long and has several phases:

• **Menstrual phase** (days 1-5): Shedding of uterine lining
• **Follicular phase** (days 1-13): Estrogen rises, egg develops
• **Ovulation** (around day 14): Egg is released
• **Luteal phase** (days 15-28): Progesterone prepares uterus

Variations are normal! Stress, illness, and lifestyle changes can affect your cycle. Tracking patterns over time helps you understand your unique rhythm.

*Tracking is for personal awareness, not medical diagnosis.*`,

  sleep: `**Sleep Health for Women:**

Quality sleep is essential for hormonal balance, immune function, and mental health. Tips for better sleep:

• Maintain a consistent sleep schedule (even on weekends)
• Create a cool, dark, quiet bedroom
• Limit screens 1 hour before bed
• Avoid caffeine after 2 PM
• Try gentle stretching or breathing exercises before bed
• Keep your bedroom for sleep only

Women may experience sleep changes during their cycle, pregnancy, perimenopause, and menopause due to hormonal shifts.

*These are general wellness suggestions, not medical advice.*`,

  stress: `**Stress Management:**

Chronic stress affects your hormones, immune system, and overall well-being. Effective strategies include:

• **Deep breathing** — Try 4-7-8 breathing (inhale 4s, hold 7s, exhale 8s)
• **Gentle movement** — Walking, yoga, or stretching
• **Mindfulness** — Even 5 minutes of present-moment awareness helps
• **Social connection** — Talking with trusted friends or support groups
• **Setting boundaries** — It's okay to say no
• **Professional support** — Therapists and counselors are trained to help

Your mental health is just as important as physical health.

*If stress feels overwhelming, please reach out to a mental health professional.*`,

  nutrition: `**Balanced Nutrition for Women's Health:**

Key nutrients women often need:
• **Iron** — Especially during menstruation (leafy greens, legumes, lean meats)
• **Calcium & Vitamin D** — For bone health (dairy, fortified foods, sunlight)
• **Folate** — Important for reproductive health (leafy greens, beans)
• **Omega-3s** — For heart and brain health (fish, flaxseed, walnuts)
• **Fiber** — For digestive health (whole grains, fruits, vegetables)

General guidelines:
• Eat a variety of colorful foods
• Stay hydrated (water needs vary by individual)
• Limit ultra-processed foods
• Eat regular, balanced meals

*Nutritional needs vary by individual. Consider consulting a registered dietitian for personalized guidance.*`,
};

function findMatchingTopic(message: string): string | null {
  const lower = message.toLowerCase();
  const topicMap: Record<string, string[]> = {
    pcos: ['pcos', 'polycystic', 'cysts on ovary', 'irregular periods', 'excess hair'],
    endometriosis: ['endometriosis', 'endo', 'severe period pain', 'painful periods', 'pelvic pain'],
    thyroid: ['thyroid', 'hypo', 'hyper', 'metabolism', 'tsh'],
    menopause: ['menopause', 'perimenopause', 'hot flash', 'night sweat', 'transition'],
    cycle: ['cycle', 'period', 'menstrual', 'menstruation', 'ovulation', 'fertile'],
    sleep: ['sleep', 'insomnia', 'tired', 'rest', 'bedtime', 'awake'],
    stress: ['stress', 'anxiety', 'overwhelm', 'worry', 'tense', 'calm', 'relax', 'breathe'],
    nutrition: ['nutrition', 'diet', 'food', 'eat', 'vitamin', 'iron', 'calcium', 'nutrient'],
  };

  for (const [topic, keywords] of Object.entries(topicMap)) {
    if (keywords.some(k => lower.includes(k))) {
      return topic;
    }
  }
  return null;
}

function generateSymptomSummary(): string {
  const symptoms = getSymptoms();
  if (symptoms.length === 0) {
    return "You haven't logged any symptoms yet. Start tracking how you feel each day, and I'll help you identify patterns and prepare summaries for your doctor visits.";
  }

  const last30 = symptoms.filter(s => {
    const d = new Date(s.date);
    const now = new Date();
    return (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24) <= 30;
  });

  if (last30.length === 0) {
    return `You have ${symptoms.length} symptom entries in your history. Try logging your symptoms regularly so I can provide more useful summaries.`;
  }

  // Analyze patterns
  const symptomCounts: Record<string, number> = {};
  let avgSeverity = 0;
  let avgMood = 0;
  let avgEnergy = 0;

  last30.forEach(s => {
    symptomCounts[s.name] = (symptomCounts[s.name] || 0) + 1;
    avgSeverity += s.severity;
    avgMood += s.mood;
    avgEnergy += s.energy;
  });

  avgSeverity = Math.round(avgSeverity / last30.length * 10) / 10;
  avgMood = Math.round(avgMood / last30.length * 10) / 10;
  avgEnergy = Math.round(avgEnergy / last30.length * 10) / 10;

  const topSymptoms = Object.entries(symptomCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  let summary = `**Your Symptom Summary (Last 30 Days):**\n\n`;
  summary += `You logged ${last30.length} symptom entries.\n\n`;
  summary += `**Most common symptoms:**\n`;
  topSymptoms.forEach(([name, count]) => {
    summary += `• ${name}: ${count} occurrence${count > 1 ? 's' : ''}\n`;
  });
  summary += `\n**Average severity:** ${avgSeverity}/10\n`;
  summary += `**Average mood:** ${avgMood}/10\n`;
  summary += `**Average energy:** ${avgEnergy}/10\n\n`;

  if (avgEnergy < 5) {
    summary += `I notice your energy levels have been lower than average. This could be worth discussing with your healthcare provider, especially if it's affecting your daily activities.\n\n`;
  }
  if (avgSeverity > 6) {
    summary += `Several of your symptoms have been moderate to severe. Consider sharing this pattern with your doctor.\n\n`;
  }

  summary += `*This summary is based on your logged data only. It is not a medical assessment. Please consult a healthcare professional for diagnosis and treatment.*`;

  return summary;
}

function generateDoctorQuestions(): string {
  const symptoms = getSymptoms();
  let questions = `**Suggested Questions for Your Doctor:**\n\n`;
  questions += `Here are some helpful questions you might consider:\n\n`;
  questions += `1. Based on my symptoms, what tests would you recommend?\n`;
  questions += `2. Are my symptoms within a normal range, or should we investigate further?\n`;
  questions += `3. What lifestyle changes might help manage my symptoms?\n`;
  questions += `4. Are there any warning signs I should watch for?\n`;
  questions += `5. When should I schedule a follow-up?\n`;

  if (symptoms.length > 0) {
    const topSymptom = symptoms.reduce((acc, s) => {
      if (!acc[s.name]) acc[s.name] = 0;
      acc[s.name]++;
      return acc;
    }, {} as Record<string, number>);
    const mostCommon = Object.entries(topSymptom).sort((a, b) => b[1] - a[1])[0];
    if (mostCommon) {
      questions += `6. I've been experiencing ${mostCommon[0].toLowerCase()} frequently (${mostCommon[1]} times). What could be causing this?\n`;
    }
  }

  questions += `\n*Tip: Write down your top 3 concerns before your appointment so you don't forget to mention them.*`;
  return questions;
}

export function getAIResponse(message: string): AIResponse {
  if (!message.trim()) {
    return {
      text: "Please type a question or select one of the suggestions below. I'm here to help you understand your health better.",
      disclaimer: true,
    };
  }

  const lower = message.toLowerCase();

  // Check for greeting
  if (lower.match(/^(hi|hello|hey|good morning|good evening)/)) {
    return {
      text: "Hello! 👋 I'm HERA's health assistant. I can help you understand health topics, summarize your symptom data, suggest questions for your doctor, and provide general wellness information.\n\nWhat would you like to know about today?",
      suggestions: ['Help me understand my cycle', 'Summarize my symptoms', 'What should I ask my doctor?', 'Explain PCOS'],
      disclaimer: true,
    };
  }

  // Symptom summary
  if (lower.includes('summarize') || lower.includes('summary') || lower.includes('my symptoms')) {
    return {
      text: generateSymptomSummary(),
      suggestions: ['What should I ask my doctor?', 'Help me understand my cycle', 'How can I improve my sleep?'],
      disclaimer: true,
    };
  }

  // Doctor questions
  if (lower.includes('doctor') || lower.includes('ask') || lower.includes('appointment') || lower.includes('consult')) {
    return {
      text: generateDoctorQuestions(),
      suggestions: ['Summarize my symptoms', 'Explain endometriosis', 'How can I manage stress?'],
      disclaimer: true,
    };
  }

  // Help/understand cycle
  if (lower.includes('help') && lower.includes('cycle') || lower.includes('understand') && lower.includes('cycle')) {
    return {
      text: HEALTH_KNOWLEDGE.cycle,
      suggestions: ['Explain PCOS', 'What causes irregular periods?', 'How can I track my cycle better?'],
      disclaimer: true,
    };
  }

  // Match knowledge base
  const topic = findMatchingTopic(message);
  if (topic) {
    return {
      text: HEALTH_KNOWLEDGE[topic],
      suggestions: ['Summarize my symptoms', 'What should I ask my doctor?', 'How can I improve my sleep?'],
      disclaimer: true,
    };
  }

  // Sleep improvement
  if (lower.includes('improve') && lower.includes('sleep') || lower.includes('sleep routine') || lower.includes('sleep better')) {
    return {
      text: HEALTH_KNOWLEDGE.sleep,
      suggestions: ['How can I manage stress?', 'Explain thyroid health', 'Summarize my symptoms'],
      disclaimer: true,
    };
  }

  // General help
  if (lower.includes('help') || lower.includes('what can you do')) {
    return {
      text: `I can help you with:\n\n• **Health education** — Learn about PCOS, endometriosis, thyroid health, menopause, and more\n• **Symptom summaries** — I'll analyze your logged symptoms and identify patterns\n• **Doctor preparation** — I'll suggest questions based on your health records\n• **Wellness tips** — Sleep, stress management, nutrition guidance\n• **Cycle understanding** — Learn about menstrual cycle phases and patterns\n\nJust ask me anything, or try one of the suggestions below!`,
      suggestions: ['Explain PCOS', 'Summarize my symptoms', 'What should I ask my doctor?', 'How can I manage stress?'],
      disclaimer: true,
    };
  }

  // Default response
  return {
    text: `Thank you for your question. While I can provide general health education, I want to make sure you get accurate, personalized information.\n\nHere's what I can help with:\n• General information about women's health conditions\n• Summaries of symptoms you've logged\n• Suggestions for doctor conversations\n• Wellness and self-care tips\n\nFor specific medical concerns, please consult a qualified healthcare professional.\n\nWould you like to try one of these topics?`,
    suggestions: ['Explain PCOS', 'Explain endometriosis', 'Summarize my symptoms', 'What should I ask my doctor?'],
    disclaimer: true,
  };
}
