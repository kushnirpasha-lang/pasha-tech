/* ============================
   АНИМАЦИЯ СЕКЦИЙ ПРИ СКРОЛЛЕ
============================ */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
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
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');

    // закрыть все остальные
    document.querySelectorAll('.faq-item.open').forEach((el) => {
      el.classList.remove('open');
    });

    if (!isOpen) {
      item.classList.add('open');
    }
  });
});

/* ============================
   ДЕМО ЧАТ
============================ */
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');

// Ответы бота на разные темы
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
    keywords: ['район', 'район', 'холон', 'ашкелон', 'натания', 'приедете', 'приезжаете'],
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
    if (keywords.some((kw) => lower.includes(kw))) {
      return reply;
    }
  }
  return 'תודה על הפנייה! 😊\nנחזור אליך בהקדם.\nאו התקשרו: 055-123-4567 📞';
}

function addMessage(text, type) {
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

function addTyping() {
  const typing = document.createElement('div');
  typing.className = 'demo-msg typing-indicator';
  typing.id = 'typingIndicator';
  typing.innerHTML = '<span></span><span></span><span></span>';
  chatMessages.appendChild(typing);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return typing;
}

function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;

  addMessage(text, 'user');
  chatInput.value = '';

  const typing = addTyping();

  // имитация задержки ответа (0.8–1.4 сек)
  const delay = 800 + Math.random() * 600;
  setTimeout(() => {
    typing.remove();
    addMessage(getBotReply(text), 'bot');
  }, delay);
}

chatSend.addEventListener('click', sendMessage);

chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sendMessage();
});
