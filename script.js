// Smooth scroll for nav links
document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// "Try AR" button placeholder action
const tryArBtn = document.getElementById('tryArBtn');
if (tryArBtn) {
  tryArBtn.addEventListener('click', () => {
    alert(
      'This will open the AR camera in the actual mobile app.\n\nIn your project report, you can explain how this button is linked to the Unity/AR Foundation build.'
    );
  });
}

// Scan Image button placeholder action
document.querySelectorAll('.scan-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    alert(
      'Camera access placeholder.\n\nIn the full system, this will open the device camera and start AR image tracking.'
    );
  });
});

// ---- Simple AI Assistant (Frontend Demo Only) ----
const chatWindow = document.getElementById('chatWindow');
const chatInput = document.getElementById('chatInput');
const chatSendBtn = document.getElementById('chatSendBtn');

function appendMessage(text, sender = 'bot') {
  const div = document.createElement('div');
  div.classList.add('chat-message', sender);
  div.innerHTML = text;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function generateBotReply(message) {
  const msg = message.toLowerCase();
  if (msg.includes('solar')) {
    return "The Solar System has the Sun at the center and eight main planets. Inner planets are rocky, outer ones like Jupiter and Saturn are gas giants.";
  } else if (msg.includes('water cycle')) {
    return "The water cycle has four main steps: evaporation, condensation, precipitation, and collection. AR helps you see each step visually.";
  } else if (msg.includes('heart')) {
    return "The human heart has four chambers — two atria and two ventricles. It pumps oxygenated blood to the body and deoxygenated blood to the lungs.";
  } else if (msg.includes('quiz') || msg.includes('revise')) {
    return "You can try the Solar System quiz on this page, or revise topics like Human Heart and Water Cycle with more AR modules.";
  } else {
    return "I’m a demo assistant for this website. In the real system, I'll be powered by an AI model to answer all your textbook-related questions!";
  }
}

if (chatSendBtn && chatInput) {
  chatSendBtn.addEventListener('click', () => {
    const text = chatInput.value.trim();
    if (!text) return;
    appendMessage(text, 'user');
    chatInput.value = '';
    setTimeout(() => {
      const reply = generateBotReply(text);
      appendMessage(reply, 'bot');
    }, 400);
  });

  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      chatSendBtn.click();
    }
  });
}

// ---- Quiz Logic + Simple Analytics ----
const quizForm = document.getElementById('quizForm');
const quizResult = document.getElementById('quizResult');
const lastScoreSpan = document.getElementById('lastScore');
const quizCountSpan = document.getElementById('quizCount');
const bestScoreSpan = document.getElementById('bestScore');

let quizCount = 0;
let bestScore = 0;

if (quizForm) {
  quizForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const answers = {
      q1: 'b', // Mars
      q2: 'b', // Sun
      q3: 'b'  // Saturn
    };

    let score = 0;
    Object.keys(answers).forEach((q) => {
      const checked = quizForm.querySelector(`input[name="${q}"]:checked`);
      if (checked && checked.value === answers[q]) {
        score++;
      }
    });

    quizCount++;
    if (score > bestScore) bestScore = score;

    if (quizResult) {
      quizResult.textContent = `You scored ${score}/3. ${
        score === 3
          ? 'Excellent! 🚀'
          : score === 2
          ? 'Good job! Review one more time. 🙂'
          : 'Keep practicing! AR modules will help you understand better. 💪'
      }`;
    }

    if (lastScoreSpan) lastScoreSpan.textContent = `${score}/3`;
    if (quizCountSpan) quizCountSpan.textContent = quizCount;
    if (bestScoreSpan) bestScoreSpan.textContent = `${bestScore}/3`;
  });
}

// ---- Contact Form (Frontend Demo) ----
const contactForm = document.getElementById('contactForm');
const contactResult = document.getElementById('contactResult');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (contactResult) {
      contactResult.textContent =
        "Thank you for your feedback! In the full system this will be sent to the project's support email or stored in a database.";
    }
    contactForm.reset();
  });
}
