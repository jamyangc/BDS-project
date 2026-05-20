/* =========================================
   PAGE NAVIGATION
========================================= */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
  });

  const page = document.querySelector(`#page-${id}`);

  if (page) {
    page.classList.add('active');
  } else {
    console.error(`Page not found: page-${id}`);
  }

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

/* =========================================
   MOOD CHECK
========================================= */
function setMood(mood) {
  const result = document.getElementById("moodResult");

  let message = "";
  let suggestion = "";
  let action = "";

  if (mood === "happy") {
    message = "You're doing great!";
    suggestion = "Keep your positive energy going.";

    action = `
      <br><br>
      <button onclick="showPage('resources')" class="pema-btn">
        Play a Fun Game
      </button>
    `;
  }

  else if (mood === "neutral") {
    message = "You're feeling okay, maybe a bit low.";
    suggestion = "A short meditation can help refresh your mind.";

    action = `
      <button onclick="showPage('resources')" class="pema-btn">
        Play a Fun Game
      </button>
    `;
  }

  else if (mood === "stressed") {
    message = "Your stress level seems high.";
    suggestion = "Take a break and try breathing exercises.";

    action = `
      <button onclick="showPage('resources')" class="pema-btn">
        Start Breathing
        <img src="stressed.gif"
             style="width:20px;height:20px;vertical-align:middle;">
      </button>

      <br><br>

      <button onclick="showPage('contact')" class="pema-btn">
        Get Help
      </button>

      <br><br>

      <button onclick="showPage('resources')" class="pema-btn">
        Play a Fun Game
      </button>
    `;
  }

  else if (mood === "sad") {
    message = "You are feeling down.";
    suggestion = "You are not alone. Consider calming music or reaching out.";

    action = `
      <br><br>

      <button onclick="showPage('resources')" class="pema-btn">
        Play a Fun Game
      </button>
    `;
  }

  result.innerHTML = `
    <div style="
      background:#fff;
      padding:20px;
      border-radius:12px;
      max-width:500px;
      margin:auto;
    ">
      <h3>${message}</h3>
      <p>${suggestion}</p>

      <div style="margin-top:15px;">
        ${action}
      </div>
    </div>
  `;
}

/* =========================================
   DAILY VIDEO PLAYER
========================================= */

const musicVideos = [
  "ys_fN3uy7bQ",
  "bjZ5kIBnlZU",
  "9Zq79uu_o5E",
  "Fp5ghKduTK8",
  "zFs8CnOeAA4",
  "t14n8Uhq-5U",
  "hgUGe1cf3So",
  "JdqL89ZZwFw",
  "Njt1io9jakQ",
  "b4q1q0DawYg",
  "roAnTo-AJWQ",
  "I3OJUwILelU"
];

const meditationVideos = [
  "j734gLbQFbU",
  "inpok4MKVLM",
  "ru4hdcMmlwQ",
  "ssss7V1_eyA",
  "zSkFFW--Ma0",
  "LDs7jglje_U"
];

const breathingVideos = [
  "YRPh_GaiL8s",
  "aXItOY0sLRY",
  "odADwWzHR24",
  "tEmt1Znux58"
];

function playCategory(type) {
  let videos = [];
  let message = "";

  if (type === "music") {
    videos = musicVideos;
    message = "Relax with soothing music 🎵";
  }

  else if (type === "meditation") {
    videos = meditationVideos;
    message = "Take a moment to meditate 🧘";
  }

  else if (type === "breathing") {
    videos = breathingVideos;
    message = "Follow this breathing exercise 💨";
  }

  const randomIndex = Math.floor(Math.random() * videos.length);
  const videoId = videos[randomIndex];

  document.getElementById("message").innerText = message;

  document.getElementById("videoPlayer").innerHTML = `
    <iframe
      width="400"
      height="220"
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
      src="https://www.youtube.com/embed/${videoId}"
      frameborder="0"
      allowfullscreen
      style="
        border-radius:12px;
        margin-top:15px;
        max-width:100%;
      ">
    </iframe>
  `;
}

/* =========================================
   RESOURCES FILTER — FIXED
========================================= */
function filterRes(btn, tag) {

  /* 1. update active pill */
  document.querySelectorAll('.filter-pill')
    .forEach(p => p.classList.remove('active'));
  btn.classList.add('active');

  /* 2. show/hide horizontal tool cards */
  const toolCards = document.querySelectorAll('#tool-cards [data-tag]');
  toolCards.forEach(card => {
    card.style.display =
      (tag === 'all' || card.dataset.tag === tag) ? '' : 'none';
  });

  /* 3. hide/show entire tool section when "fun" only */
  const toolSection = document.getElementById('tool-cards');
  if (toolSection) toolSection.style.display = tag === 'fun' ? 'none' : 'flex';

  /* 4. hide/show fun slider and game source text */
  const funSection = document.querySelector('#fun-section');
  const gameSource = document.querySelector('.game-source');
  const showFun = tag === 'all' || tag === 'fun';

  if (funSection) funSection.style.display = showFun ? 'flex' : 'none';
  if (gameSource) gameSource.style.display = showFun ? 'block' : 'none';

  /* 5. clear video player when switching to fun tab */
  if (tag === 'fun') {
    document.getElementById('message').innerText = '';
    document.getElementById('videoPlayer').innerHTML = '';
  }
}

function scrollToPlayer() {
  setTimeout(() => {
    const el = document.getElementById('message');

    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, 300);
}

/* =========================================
   SLIDESHOW
========================================= */

let currentSlideUpgraded = 0;

function changeSlideUpgraded(dir) {
  const slides = document.querySelectorAll(
    '#slideshowUpgraded .slide-upgraded'
  );

  slides[currentSlideUpgraded].classList.remove('active');

  currentSlideUpgraded =
    (currentSlideUpgraded + dir + slides.length)
    % slides.length;

  slides[currentSlideUpgraded].classList.add('active');

  document.getElementById(
    'slideCounterUpgraded'
  ).textContent =
    `${currentSlideUpgraded + 1} / ${slides.length}`;
}

/* =========================================
   MOBILE MENU
========================================= */

function toggleMenu() {
  document
    .getElementById('nav-links')
    .classList.toggle('open');
}

function closeMenu() {
  document
    .getElementById('nav-links')
    .classList.remove('open');
}

/* =========================================
   ACCORDION
========================================= */

function toggleAcc(btn) {
  const item = btn.parentElement;

  const isOpen = item.classList.contains('open');

  document.querySelectorAll('.facc-item')
    .forEach(i => i.classList.remove('open'));

  if (!isOpen) {
    item.classList.add('open');
  }
}

/* =========================================
   BREATHING EXERCISE
========================================= */

let breathPaused = false;
let breathInterval = null;

const breathSteps = [
  "Breathe in…",
  "Hold…",
  "Breathe out…",
  "Rest…"
];

const breathDurations = [
  4000,
  4000,
  4000,
  2000
];

let breathStep = 0;

function startBreath() {
  const text = document.getElementById("breathText");

  if (!text) return;

  function step() {
    if (breathPaused) return;

    text.textContent = breathSteps[breathStep];

    const duration = breathDurations[breathStep];

    breathStep =
      (breathStep + 1) % breathSteps.length;

    breathInterval = setTimeout(step, duration);
  }

  step();
}

function toggleBreath() {
  breathPaused = !breathPaused;

  if (!breathPaused) {
    startBreath();
  }
}

startBreath();

/* =========================================
   FINDINGS COUNTERS
========================================= */

function animateCounters() {
  document.querySelectorAll('.fstat-num')
    .forEach(el => {

      const target = parseInt(
        el.getAttribute('data-target')
      );

      const suffix =
        el.getAttribute('data-suffix') || '';

      if (isNaN(target)) return;

      let current = 0;

      const increment =
        Math.ceil(target / 60);

      const timer = setInterval(() => {

        current = Math.min(
          current + increment,
          target
        );

        el.textContent = current + suffix;

        if (current >= target) {
          clearInterval(timer);
        }

      }, 30);
    });
}

const originalShowPage = showPage;

window.showPage = function(id) {
  originalShowPage(id);

  if (id === 'findings') {
    setTimeout(animateCounters, 300);
  }
};

/* =========================================
   SELF CARE TIPS
========================================= */

let activeTip = 0;

const pills = document.querySelectorAll('.tip-pill');

if (pills.length > 0) {

  setInterval(() => {

    pills[activeTip]
      .classList.remove('active-tip');

    activeTip =
      (activeTip + 1) % pills.length;

    pills[activeTip]
      .classList.add('active-tip');

  }, 3000);
}

/* =========================================
   CHATBOT — UPGRADED
   • Proactive time-aware greeting on open
   • Expanded & rotating quick-reply prompts
   • Mobile layout: viewport-aware sizing +
     body scroll-lock while chat is open
========================================= */

let history = [];
let greetingSent = false;   // send welcome only once per session

const win    = document.getElementById("chat-win");
const toggle = document.getElementById("chat-toggle");
const msgs   = document.getElementById("cmsgs");
const input  = document.getElementById("cci");
const sendBtn = document.getElementById("csb");

/* ------------------------------------------
   PROACTIVE GREETING HELPERS
------------------------------------------ */

/** Returns a warm, time-aware opener from Pema. */
function buildGreeting() {
  const hour = new Date().getHours();

  let timePhrase;
  if (hour >= 5 && hour < 12)       timePhrase = "Good morning";
  else if (hour >= 12 && hour < 17) timePhrase = "Good afternoon";
  else if (hour >= 17 && hour < 21) timePhrase = "Good evening";
  else                               timePhrase = "Hey, night owl";

  const openers = [
    `${timePhrase}! 👋 How are you feeling right now?`,
    `${timePhrase}! 😊 What's on your mind today?`,
    `${timePhrase}! 🌿 Whether you're stressed, curious, or just need a moment — I'm here. How can I help?`,
    `${timePhrase}! ✨ Glad you're here. How's your day going so far?`,
  ];

  return openers[Math.floor(Math.random() * openers.length)];
}

/* ------------------------------------------
   MOBILE LAYOUT — body scroll-lock
   Prevents the page from scrolling behind
   the chat window on small screens.
------------------------------------------ */

function lockBodyScroll()   { document.body.style.overflow = 'hidden'; }
function unlockBodyScroll() { document.body.style.overflow = '';       }

function isMobile() {
  return window.innerWidth <= 600;
}

/* ------------------------------------------
   OPEN / CLOSE CHAT
------------------------------------------ */

toggle.onclick = () => {
  const isOpen = win.classList.toggle("open");

  if (isOpen) {
    if (isMobile()) lockBodyScroll();

    /* Send proactive greeting the first time */
    if (!greetingSent) {
      greetingSent = true;
      setTimeout(() => {
        showTypingIndicator();
        setTimeout(() => {
          removeTypingIndicator();
          addMsg("ai", buildGreeting() + "\n\n🇧🇹 Did you know? The PEMA is Bhutan's national mental health agency — dedicated to \"Touching People, Building Lives\". If you or someone you know needs support, you can call 1098 for mental health help, or 1010 in an emergency. For resources, services, and more, visit thepema.gov.bt 💙 You're never alone in this.");
          renderQuickReplies();
        }, 900);
      }, 400);
      
    }
  } else {
    unlockBodyScroll();
  }
};

document.getElementById("chx").onclick = () => {
  win.classList.remove("open");
  unlockBodyScroll();
};

/* Also unlock if the user resizes past the mobile breakpoint */
window.addEventListener("resize", () => {
  if (!isMobile()) unlockBodyScroll();
});

/* ------------------------------------------
   QUICK-REPLY PROMPT POOLS
   Shown as tappable chips below the messages.
   Rotated after each AI response so they stay
   fresh and relevant throughout the chat.
------------------------------------------ */

const quickReplyPools = {
  /** Shown on first open */
  initial: [
    "I'm feeling stressed 😓",
    "Help me relax 🌿",
    "I need motivation 💪",
    "I'm feeling anxious 😰",
  ],

  /** Rotated in after the bot replies */
  followUp: [
    ["Tell me a calming tip 🧘", "I can't focus today", "I feel overwhelmed"],
    ["What's a quick breathing exercise?", "Help me journal my thoughts 📓", "I need a distraction"],
    ["I'm having trouble sleeping 😴", "I feel lonely", "Give me a positivity boost ☀️"],
    ["I'm burnt out from work", "How do I talk to someone I trust?", "Remind me to take breaks ⏰"],
    ["I feel like I'm not enough", "I need to vent", "What should I do when I'm sad?"],
    ["How do I manage my anger?", "Help me set boundaries", "I want to practice gratitude 🙏"],
    ["I'm nervous about something", "I need a mindfulness moment", "Cheer me up! 🎉"],
  ],
};

let followUpIndex = 0;

/**
 * Renders quick-reply chips into #chat-quick-replies.
 * Falls back gracefully if the container doesn't exist.
 * @param {'initial'|'followUp'} pool
 */
function renderQuickReplies(pool = 'initial') {
  const container = document.getElementById("chat-quick-replies");
  if (!container) return;

  let prompts;
  if (pool === 'initial') {
    prompts = quickReplyPools.initial;
  } else {
    prompts = quickReplyPools.followUp[
      followUpIndex % quickReplyPools.followUp.length
    ];
    followUpIndex++;
  }

  container.innerHTML = prompts
    .map(p => `<button class="cqr-btn" onclick="csq(this)">${p}</button>`)
    .join('');

  /* Animate chips in */
  container.querySelectorAll('.cqr-btn').forEach((btn, i) => {
    btn.style.animationDelay = `${i * 60}ms`;
    btn.classList.add('cqr-slide-in');
  });
}

/* ------------------------------------------
   QUICK BUTTON HANDLER
------------------------------------------ */

function csq(btn) {
  /* Clear chips after tap so they don't distract */
  const container = document.getElementById("chat-quick-replies");
  if (container) container.innerHTML = '';

  send(btn.innerText);
}

/* ------------------------------------------
   SEND BUTTON & ENTER KEY
------------------------------------------ */

sendBtn.onclick = () => {
  const value = input.value.trim();
  if (!value) return;
  send(value);
  input.value = "";
};

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    const value = input.value.trim();
    if (!value) return;
    send(value);
    input.value = "";
  }
});

/* ------------------------------------------
   TYPING INDICATOR
------------------------------------------ */

function showTypingIndicator() {
  const div = document.createElement("div");
  div.className = "cmsg";
  div.id = "typing-indicator";
  div.innerHTML = `
    <div class="cmb typing-indicator">
      <span></span><span></span><span></span>
    </div>
  `;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function removeTypingIndicator() {
  const indicator = document.getElementById("typing-indicator");
  if (indicator) indicator.remove();
}

/* ------------------------------------------
   SEND MESSAGE
------------------------------------------ */

async function send(text) {
  if (!text || text.trim() === "") return;

  /* Clear quick-reply chips when user sends anything manually */
  const qrContainer = document.getElementById("chat-quick-replies");
  if (qrContainer) qrContainer.innerHTML = '';

  addMsg("user", text);

  history.push({ role: "user", content: text });

  if (history.length > 12) {
    history = history.slice(-12);
  }

  showTypingIndicator();

  sendBtn.disabled = true;
  sendBtn.innerText = "Sending...";

  try {
    const res = await fetch(
      "https://bds-project.onrender.com/chat",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: `You are a warm and supportive wellbeing companion for interns and anyone feeling stressed or overwhelmed. Keep responses concise, empathetic, and encouraging.

When relevant, naturally recommend these pages on the Pema website:
- Feeling stressed or overwhelmed → suggest the Resources page (breathing, meditation, music)
- Needs professional support → suggest the Contact page
- Wants to learn about wellbeing data → suggest the Findings page
- Needs a distraction or fun activity → suggest the Resources page (games section)
- Checking in on mood → suggest the Mood Check page

Mention these as gentle suggestions, not commands. For example: "You might find the Resources page helpful — there are some great breathing exercises there." Never suggest all pages at once; only recommend what fits the moment.`
            },
            ...history
          ]
        })
      }
    );

    const data = await res.json();

    removeTypingIndicator();

    const reply =
      data?.choices?.[0]?.message?.content ||
      "Sorry, I couldn't generate a response.";

    history.push({ role: "assistant", content: reply });

    addMsg("ai", reply);

    /* Rotate in fresh quick-reply suggestions after each bot response */
    setTimeout(() => renderQuickReplies('followUp'), 400);

  } catch (err) {
    console.error(err);
    removeTypingIndicator();
    addMsg("ai", "Sorry, something went wrong. Please try again.");

  } finally {
    sendBtn.disabled = false;
    sendBtn.innerText = "Send";
  }
}

/* ------------------------------------------
   ADD MESSAGE
------------------------------------------ */

function addMsg(role, text) {
  const div = document.createElement("div");
  div.className = "cmsg " + (role === "user" ? "user" : "");

  const bubble = document.createElement("div");
  bubble.className = "cmb";
  bubble.textContent = text;

  div.appendChild(bubble);
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

/* =========================================
   TABLEAU
========================================= */

function openTableau() {
  document.getElementById('tableau-fullscreen').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeTableau() {
  document.getElementById('tableau-fullscreen').style.display = 'none';
  document.body.style.overflow = '';
}

/* =========================================
   FUN SLIDER BUTTONS
========================================= */

window.addEventListener("DOMContentLoaded", () => {

  const funSlider = document.querySelector(".fun-slider");
  const nextFun   = document.querySelector(".next-fun");
  const prevFun   = document.querySelector(".prev-fun");

  if (nextFun && funSlider) {
    nextFun.addEventListener("click", () => {
      funSlider.scrollBy({ left: 260, behavior: "smooth" });
    });
  }

  if (prevFun && funSlider) {
    prevFun.addEventListener("click", () => {
      funSlider.scrollBy({ left: -260, behavior: "smooth" });
    });
  }

});

/* =========================================
   CHATBOT — CSS INJECTION
   Adds styles for quick-reply chips and the
   slide-in animation without touching your
   existing stylesheet.
========================================= */

(function injectChatStyles() {
  const style = document.createElement("style");
  style.textContent = `
    /* ---- Quick-reply chip container ---- */
    #chat-quick-replies {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      padding: 6px 10px 4px;
      min-height: 0;
      transition: min-height 0.2s ease;
    }

    /* ---- Individual chips ---- */
    .cqr-btn {
      background: #f0f7ff;
      color: #2a6db5;
      border: 1.5px solid #b8d8f8;
      border-radius: 20px;
      padding: 5px 13px;
      font-size: 0.78rem;
      cursor: pointer;
      white-space: nowrap;
      opacity: 0;
      transform: translateY(6px);
      transition: background 0.18s, border-color 0.18s, transform 0.15s;
    }

    .cqr-btn:hover {
      background: #d6ecff;
      border-color: #80bef5;
    }

    /* ---- Slide-in animation ---- */
    @keyframes cqrSlideIn {
      to { opacity: 1; transform: translateY(0); }
    }

    .cqr-slide-in {
      animation: cqrSlideIn 0.28s ease forwards;
    }

    /* ---- Mobile: full-height chat window ---- */
    @media (max-width: 600px) {
      #chat-win.open { 
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        width: 100% !important;
        height: 100% !important;
        max-height: 100dvh !important;
        border-radius: 0 !important;
        z-index: 9999 !important;
        flex-direction: column;
        display: flex;
      }

      /* Make the message area fill available space */
      #cmsgs {
        flex: 1 1 auto;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
      }

      /* Keep the input bar anchored at the bottom */
      #chat-input-bar {
        flex-shrink: 0;
        padding-bottom: env(safe-area-inset-bottom, 8px);
      }

      /* Close button visible on mobile */
      #chx {
        display: block !important;
      }
    }
  `;
  document.head.appendChild(style);
})();
function toggleIntro() {
  const full = document.getElementById("introFull");
  const btn  = document.getElementById("readMoreBtn");
  const isOpen = full.style.display === "block";

  full.style.display = isOpen ? "none" : "block";
  btn.textContent    = isOpen ? "Read More ↓" : "Read Less ↑";
}