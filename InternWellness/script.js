function showPage(id) {
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
  });

  const page = document.getElementById('page-' + id);

  if (page) {
    page.classList.add('active');
  } else {
    console.error("Page not found: page-" + id);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function checkMood(mood) {
  const result = document.getElementById("moodResult");

  let message = "";
  let suggestion = "";
  let action = "";

  if (mood === "happy") {
    message = "You're doing great! 😊";
    suggestion = "Keep your positive energy going.";
    action = `<button onclick="showPage('resources')" class="pema-btn">Listen to Music 🎵</button>`;
  }

  else if (mood === "neutral") {
    message = "You're feeling okay, maybe a bit low.";
    suggestion = "A short meditation can help refresh your mind.";
    action = `<button onclick="showPage('resources')" class="pema-btn">Try Meditation 🧘</button>`;
  }

  else if (mood === "stressed") {
    message = "Your stress level seems high 😣";
    suggestion = "Take a break and try breathing exercises.";
    action = `<button onclick="showPage('resources')" class="pema-btn">Start Breathing 🌬️</button>`;
  }

  else if (mood === "sad") {
    message = "You are feeling down 😔";
    suggestion = "You are not alone. Consider calming music or reaching out.";
    action = `
      <button onclick="showPage('resources')" class="pema-btn">Play Music 🎵</button>
      <br><br>
      <button onclick="showPage('contact')" class="pema-btn">Get Help 🚨</button>
    `;
  }

  result.innerHTML = `
    <div style="background:#fff; padding:20px; border-radius:12px; max-width:500px; margin:auto;">
      <h3>${message}</h3>
      <p>${suggestion}</p>
      <div style="margin-top:15px;">${action}</div>
    </div>
  `;
}

let history = []

const win = document.getElementById("chat-win");
const toggle = document.getElementById("chat-toggle");
const msgs = document.getElementById("cmsgs");
const input = document.getElementById("cci");
const sendBtn= document.getElementById("csb");
toggle.onclick = () => win.classList.toggle("open");
document.getElementById("chx").onclick = () => win.classList.remove("open");
function csq(btn) {send(btn.innerText);}
sendBtn.onclick = () => {
  send(input.value);
  input.value = "";
};
async function send(text){
  if (!text)return;
  addMsg("user", text);
  history.push({ role:"user",content: text});

  try{
    const res = await fetch("/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    messages: [
      { role: "system", content: "You are a supportive wellbeing assistant for interns or anyone who feels stressed." },
      ...history
    ]
  })
});
  
  const data = await res.json();
  const reply = data.choices[0].message.content;
  history.push({ role: "assistant", content: reply });
  addMsg("ai", reply);
  } catch (err) {
    addMsg("ai", "Error: " + err.message);
  }
  }
function addMsg(role, text) {
  const div = document.createElement("div");
  div.className = "cmsg " + (role === "user" ? "user" : "");
  div.innerHTML = `<div class="cmb">${text} </div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
} 

// ── DAILY VIDEO PLAYER ──
const musicVideos = ["JdqL89ZZwFw", "hgUGe1cf3So","2OEL4P1Rz04", "5qap5aO4i9A", "DWcJFNfaw9c"];
const meditationVideos = ["inpok4MKVLM", "ZToicYcHIOU", "6p_yaNFSYao", ""];
const breathingVideos = ["YRPh_GaiL8s", "aXItOY0sLRY", "odADwWzHR24"];

const today = new Date().getDate();

function playCategory(type) {
  let videos = [];
  let message = "";

  if (type === "music") {
    videos = musicVideos;
    message = "Relax with soothing music 🎧";
  } else if (type === "meditation") {
    videos = meditationVideos;
    message = "Take a moment to meditate 🧘";
  } else if (type === "breathing") {
    videos = breathingVideos;
    message = "Follow this breathing exercise 🌬️";
  }

  const videoId = videos[today % videos.length];

  document.getElementById("message").innerText = message;
  document.getElementById("videoPlayer").innerHTML = `
    <iframe width="400" height="220"
      src="https://www.youtube.com/embed/${videoId}"
      frameborder="0"
      allowfullscreen
      style="border-radius:12px; margin-top:15px;">
    </iframe>
  `;
}