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
   CHATBOT
========================================= */

let history = [];

const win = document.getElementById("chat-win");
const toggle = document.getElementById("chat-toggle");
const msgs = document.getElementById("cmsgs");
const input = document.getElementById("cci");
const sendBtn = document.getElementById("csb");

/* OPEN / CLOSE CHAT */

toggle.onclick = () => {
  win.classList.toggle("open");
};

document.getElementById("chx").onclick = () => {
  win.classList.remove("open");
};

/* QUICK BUTTONS */

function csq(btn) {
  send(btn.innerText);
}

/* SEND BUTTON */

sendBtn.onclick = () => {
  const value = input.value.trim();

  if (!value) return;

  send(value);

  input.value = "";
};

/* ENTER KEY SEND */

input.addEventListener("keypress", function (e) {

  if (e.key === "Enter" && !e.shiftKey) {

    e.preventDefault();

    const value = input.value.trim();

    if (!value) return;

    send(value);

    input.value = "";
  }
});

/* TYPING INDICATOR */

function showTypingIndicator() {

  const div = document.createElement("div");

  div.className = "cmsg";
  div.id = "typing-indicator";

  div.innerHTML = `
    <div class="cmb typing-indicator">
      <span></span>
      <span></span>
      <span></span>
    </div>
  `;

  msgs.appendChild(div);

  msgs.scrollTop = msgs.scrollHeight;
}

function removeTypingIndicator() {

  const indicator =
    document.getElementById("typing-indicator");

  if (indicator) {
    indicator.remove();
  }
}

/* SEND MESSAGE */

async function send(text) {

  if (!text || text.trim() === "") return;

  addMsg("user", text);

  history.push({
    role: "user",
    content: text
  });

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

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content:
                "You are a supportive wellbeing assistant for interns or anyone who feels stressed or overwhelmed."
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

    history.push({
      role: "assistant",
      content: reply
    });

    addMsg("ai", reply);

  }

  catch (err) {

    console.error(err);

    removeTypingIndicator();

    addMsg(
      "ai",
      "Sorry, something went wrong. Please try again."
    );
  }

  finally {

    sendBtn.disabled = false;
    sendBtn.innerText = "Send";
  }
}

/* =========================================
   ADD MESSAGE
========================================= */

function addMsg(role, text) {

  const div = document.createElement("div");

  div.className =
    "cmsg " + (role === "user" ? "user" : "");

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
  document.getElementById(
    'tableau-fullscreen'
  ).style.display = 'block';

  document.body.style.overflow = 'hidden';
}

function closeTableau() {
  document.getElementById(
    'tableau-fullscreen'
  ).style.display = 'none';

  document.body.style.overflow = '';
}

/* =========================================
   FUN SLIDER BUTTONS
========================================= */

window.addEventListener("DOMContentLoaded", () => {

  const funSlider = document.querySelector(".fun-slider");
  const nextFun = document.querySelector(".next-fun");
  const prevFun = document.querySelector(".prev-fun");

  if (nextFun && funSlider) {
    nextFun.addEventListener("click", () => {
      funSlider.scrollBy({
        left: 260,
        behavior: "smooth"
      });
    });
  }

  if (prevFun && funSlider) {
    prevFun.addEventListener("click", () => {
      funSlider.scrollBy({
        left: -260,
        behavior: "smooth"
      });
    });
  }

});

