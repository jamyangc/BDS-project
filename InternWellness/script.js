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

  if (mood === "neutral") {
    message = "You're feeling okay, maybe a bit low.";
    suggestion = "A short meditation can help refresh your mind.";
    action = `<button onclick="showPage('resources')" class="pema-btn">Try Meditation 🧘</button>`;
  }

  if (mood === "stressed") {
    message = "Your stress level seems high 😣";
    suggestion = "Take a break and try breathing exercises.";
    action = `<button onclick="showPage('resources')" class="pema-btn">Start Breathing 🌬️</button>`;
  }

  if (mood === "sad") {
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