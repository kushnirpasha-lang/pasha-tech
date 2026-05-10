/* ============================
   ТЕМА: светлая / тёмная
============================ */
const html         = document.documentElement;
const themeToggle  = document.getElementById('themeToggle');
const THEME_KEY    = 'pasha-theme';

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) {
    applyTheme(saved);
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    applyTheme('light');
  } else {
    applyTheme('dark');
  }
}

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

initTheme();

/* ============================
   МНОГОЯЗЫЧНЫЙ ЧАТ В HERO
============================ */
const heroChatBody     = document.getElementById('heroChatBody');
let   currentDialogIdx = 0;

const dialogues = [
  // Диалог 1 — иврит
  [
    { type: 'in',      lang: 'he', text: 'שלום, אני צריך לנקות ספה דחוף',                                                                                    delay: 500  },
    { type: 'out',     lang: 'he', text: 'שלום! אני יכול לעזור. איפה אתה גר ומתי נוח?',                                                                      delay: 1500 },
    { type: 'in',      lang: 'he', text: 'אשקלון, מחר אחה"צ',                                                                                                 delay: 2800 },
    { type: 'out',     lang: 'he', text: 'מצוין. ספה 3 מקומות = 250₪. שולח את הפרטים לבעל המקצוע',                                                           delay: 3800 },
    { type: 'system',              text: '↓ Заявка отправлена мастеру на русском',                                                                              delay: 4800 },
    { type: 'russian',             text: 'Новая заявка\n👤 Михаль · Ашкелон\n🛋 Чистка дивана 3-местного\n📅 Завтра во второй половине\n💰 Согласована цена 250₪', delay: 5500 },
  ],
  // Диалог 2 — русский
  [
    { type: 'in',  text: 'Привет, нужно почистить диван срочно',                                                                                               delay: 500  },
    { type: 'out', text: 'Здравствуй! Помогу. Где ты живёшь и когда удобно?',                                                                                  delay: 1500 },
    { type: 'in',  text: 'Ашкелон, завтра вечером',                                                                                                            delay: 2800 },
    { type: 'out', text: 'Отлично. Диван 3-местный = 250₪. Передаю заявку мастеру',                                                                            delay: 3800 },
    { type: 'system', text: '↓ Заявка отправлена мастеру',                                                                                                     delay: 4800 },
    { type: 'russian', text: 'Новая заявка\n👤 Сергей · Ашкелон\n🛋 Чистка дивана 3-местного\n📅 Завтра вечером\n💰 Согласована цена 250₪',                   delay: 5500 },
  ],
  // Диалог 3 — английский
  [
    { type: 'in',  text: 'Hi, I need sofa cleaning',                                                                                                            delay: 500  },
    { type: 'out', text: 'Hello! Sure. Where are you and when?',                                                                                                delay: 1500 },
    { type: 'in',  text: 'Ashkelon, tomorrow afternoon',                                                                                                        delay: 2800 },
    { type: 'out', text: 'Perfect. 3-seat sofa = 250₪. Sending details to specialist',                                                                          delay: 3800 },
    { type: 'system', text: '↓ Request sent to specialist (in Russian)',                                                                                        delay: 4800 },
    { type: 'russian', text: 'Новая заявка\n👤 David · Ашкелон\n🛋 Sofa cleaning 3-seat\n📅 Tomorrow afternoon\n💰 Agreed: 250₪',                              delay: 5500 },
  ],
];

function animateChat() {
  heroChatBody.innerHTML = '';
  const dialogue = dialogues[currentDialogIdx];

  dialogue.forEach(({ type, lang, text, delay }) => {
    setTimeout(() => {
      const el = document.createElement('div');
      el.classList.add('msg');

      if      (type === 'in')      el.classList.add('msg-in');
      else if (type === 'out')     el.classList.add('msg-out');
      else if (type === 'system')  el.classList.add('msg-system');
      else if (type === 'russian') el.classList.add('msg-russian');

      if (lang === 'he') {
        const span = document.createElement('span');
        span.className = 'he';
        span.textContent = text;
        el.appendChild(span);
      } else {
        el.textContent = text;
      }

      heroChatBody.appendChild(el);
      heroChatBody.scrollTop = heroChatBody.scrollHeight;
    }, delay);
  });

  currentDialogIdx = (currentDialogIdx + 1) % dialogues.length;
}

animateChat();
setInterval(animateChat, 12000);

/* ============================
   АНИМАЦИЯ СЕКЦИЙ ПРИ СКРОЛЛЕ
============================ */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.section-fade').forEach((el) => observer.observe(el));

/* ============================
   FAQ АККОРДЕОН
============================ */
document.querySelectorAll('.faq-q').forEach((btn) => {
  btn.addEventListener('click', () => {
    const item   = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach((el) => el.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ============================
   ДЕМО ЧАТ (секция 4)
============================ */
const chatMessages = document.getElementById('chatMessages');
const chatInput    = document.getElementById('chatInput');
const chatSend     = document.getElementById('chatSend');

const botReplies = [
  {
    keywords: ['цена', 'стоит', 'сколько', 'прайс', 'тариф'],
    reply: 'מחיר ניקיון דירה:\n🏠 1-2 חדרים — 250 ₪\n🏠 3 חדרים — 350 ₪\n🏠 4+ חדרים — 450 ₪\nהכל כולל ציוד ומוצרים! ✅',
  },
  {
    keywords: ['когда', 'свободен', 'завтра', 'сегодня', 'время', 'записаться'],
    reply: 'אני זמין:\n📅 ראשון–חמישי: 8:00–20:00\n📅 שישי: 8:00–14:00\nרוצה לקבוע? שלח שם ומספר טלפון 📱',
  },
  {
    keywords: ['привет', 'шалом', 'hello', 'hi', 'здравствуй'],
    reply: 'שלום! ברוך הבא לשירות הניקיון שלנו 🧹\nאיך אפשר לעזור היום?',
  },
  {
    keywords: ['район', 'холон', 'ашкелон', 'натания', 'приедете'],
    reply: 'אנחנו עובדים באזורים:\n📍 חולון, בת ים\n📍 אשקלון, אשדוד\n📍 נתניה, הרצליה\nהגעה בחינם! 🚐',
  },
  {
    keywords: ['гарантия', 'качество', 'плохо', 'недоволен'],
    reply: 'אנחנו מתחייבים לאיכות!\n✅ אם משהו לא מספק — חוזרים בחינם\n✅ ניסיון 5+ שנים\n✅ מוצרים מקצועיים בלבד',
  },
];

function getBotReply(text) {
  const lower = text.toLowerCase();
  for (const { keywords, reply } of botReplies) {
    if (keywords.some((kw) => lower.includes(kw))) return reply;
  }
  return 'תודה על הפנייה! 😊\nנחזור אליך בהקדם.\nאו התקשרו: 055-772-5474 📞';
}

function addDemoMessage(text, type) {
  const msg = document.createElement('div');
  msg.className = `demo-msg ${type}`;

  if (type === 'bot') {
    const span = document.createElement('span');
    span.dir = 'rtl';
    span.style.whiteSpace = 'pre-line';
    span.textContent = text;
    msg.appendChild(span);
  } else {
    msg.textContent = text;
  }

  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendDemoMessage() {
  const text = chatInput.value.trim();
  if (!text) return;

  addDemoMessage(text, 'user');
  chatInput.value = '';

  const typing = document.createElement('div');
  typing.className = 'demo-msg typing-indicator';
  typing.innerHTML = '<span></span><span></span><span></span>';
  chatMessages.appendChild(typing);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  setTimeout(() => {
    typing.remove();
    addDemoMessage(getBotReply(text), 'bot');
  }, 800 + Math.random() * 600);
}

chatSend.addEventListener('click', sendDemoMessage);
chatInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendDemoMessage(); });
