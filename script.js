/* ====== HERO ANIMATION ====== */
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".name-anim-1").forEach((el) => {
    el.innerHTML = el.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
  });

  const heroTL = anime.timeline({ easing: "easeOutExpo" });

  heroTL
    .add({
      targets: "#bismillah",
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 1000,
      delay: 300,
    })
    .add(
      {
        targets: "#bismillah-fr",
        opacity: [0, 1],
        translateY: [12, 0],
        duration: 900,
      },
      "-=700",
    )
    .add({ targets: "#hero-eyebrow", opacity: [0, 1], duration: 800 }, "-=600")
    .add(
      {
        targets: ".name-anim-1 .letter",
        opacity: [0, 1],
        translateX: [30, 0],
        scaleX: [0.4, 1],
        duration: 700,
        delay: anime.stagger(28),
      },
      "-=400",
    )
    .add({ targets: ".divider-1", opacity: [0, 1], duration: 800 }, "-=400");

  anime({
    targets: "#moving-bg",
    translateX: [-8, 8],
    translateY: [-6, 6],
    duration: 6000,
    direction: "alternate",
    loop: true,
    easing: "easeInOutSine",
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anime({
            targets: entry.target,
            opacity: [0, 1],
            translateY: [32, 0],
            duration: 1100,
            easing: "easeOutQuart",
          });
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  startCountdown(1, new Date("2026-05-29T09:00:00"));
});

/* ====== TAB SWITCHING ====== */
function switchWedding(n, btn) {
  document.querySelectorAll(".tab-btn").forEach((b) => {
    b.classList.remove("active");
    b.style.color = "";
    b.setAttribute("aria-selected", "false");
  });
  document.querySelectorAll(".wedding-panel").forEach((p) => p.classList.remove("active"));
  btn.classList.add("active");
  btn.setAttribute("aria-selected", "true");
  document.getElementById("panel-" + n).classList.add("active");

  document.querySelectorAll("#panel-" + n + " .section-hidden").forEach((el) => {
    anime({
      targets: el,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
      easing: "easeOutQuad",
    });
  });

  window.scrollTo({
    top: document.getElementById("tabs-anchor").offsetTop - 60,
    behavior: "smooth",
  });
}

/* ====== COUNTDOWN ====== */
function startCountdown(panel, targetDate) {
  const target = targetDate.getTime();
  const ids = ["days", "hours", "mins", "secs"];

  function update() {
    const diff = target - Date.now();
    if (diff <= 0) {
      ids.forEach((id) => {
        const el = document.getElementById("p" + panel + "-" + id);
        if (el) el.textContent = "00";
      });
      const grid = document.getElementById("countdown-grid-" + panel);
      if (grid) {
        const msg = document.createElement("p");
        msg.className = "font-display text-xl italic mt-4";
        msg.style.color = "var(--gold)";
        msg.textContent = "✨ C'est aujourd'hui !";
        grid.appendChild(msg);
      }
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    const vals = [d, h, m, s];
    ids.forEach((id, i) => {
      const el = document.getElementById("p" + panel + "-" + id);
      if (el) el.textContent = String(vals[i]).padStart(2, "0");
    });
    setTimeout(update, 1000);
  }
  update();
}

/* ====== RSVP ====== */
function handleRSVP(n, e) {
  e.preventDefault();
  const name = document.getElementById("rn" + n).value.trim();
  const phone = document.getElementById("rp" + n).value.trim();
  const presence = document.querySelector('input[name="pr' + n + '"]:checked');
  const guests = document.getElementById("rg" + n).value;
  const msg = document.getElementById("rm" + n).value.trim();

  if (!name) { alert("Veuillez entrer votre nom."); return; }
  if (!presence) { alert("Veuillez indiquer votre présence."); return; }

  const couple = "Ouro Djeri Ben Omar & Ouro Tagba Fatima (29–30 Mai)";
  const presenceText = presence.value === "oui" ? "✅ Présent(e)" : "❌ Absent(e)";
  const guestsText = guests === "0" ? "Seul(e)" : "+ " + guests + " personne(s)";
  const whatsappMsg = encodeURIComponent(
    `💍 RSVP — Mariage ${n}\n` +
      `Couple : ${couple}\n` +
      `Nom : ${name}\n` +
      `Téléphone : ${phone || "Non renseigné"}\n` +
      `Présence : ${presenceText}\n` +
      `Accompagnants : ${guestsText}` +
      (msg ? `\nMessage : ${msg}` : ""),
  );
  window.open(`https://wa.me/91246051?text=${whatsappMsg}`, "_blank");
  showSuccess(n);
}

function submitRSVP(n) {
  const name = document.getElementById("rn" + n).value.trim();
  const presence = document.querySelector('input[name="pr' + n + '"]:checked');
  if (!name) { alert("Veuillez entrer votre nom."); return; }
  if (!presence) { alert("Veuillez indiquer votre présence."); return; }
  showSuccess(n);
}

function showSuccess(n) {
  document.getElementById("rsvp-form-" + n).style.display = "none";
  const s = document.getElementById("rsvp-success-" + n);
  s.classList.remove("hidden");
  anime({ targets: s, opacity: [0, 1], translateY: [16, 0], duration: 700, easing: "easeOutQuart" });
}

/* ====== LIGHTBOX ====== */
function openLightbox() {
  document.getElementById("lightbox").classList.add("open");
  anime({ targets: "#lightbox", opacity: [0, 1], duration: 350, easing: "easeOutQuad" });
}
function closeLightbox() {
  anime({
    targets: "#lightbox", opacity: [1, 0], duration: 280, easing: "easeInQuad",
    complete: () => document.getElementById("lightbox").classList.remove("open"),
  });
}

/* ====== SLIDESHOW ====== */
(function () {
  const frames = document.querySelectorAll('.slide-frame');
  const thumbs = document.querySelectorAll('.thumb');
  const cur = document.querySelector('.counter-cur');
  let current = 0;
  let timer;

  function goTo(n) {
    frames[current].classList.remove('active');
    frames[current].classList.add('exit');
    thumbs[current].classList.remove('active');
    setTimeout(() => frames[current === n ? current : current].classList.remove('exit'), 900);
    current = (n + frames.length) % frames.length;
    frames[current].classList.add('active');
    thumbs[current].classList.add('active');
    if (cur) cur.textContent = current + 1;
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }
  function startAuto() { timer = setInterval(next, 4000); }
  function resetAuto() { clearInterval(timer); startAuto(); }

  document.querySelector('.slide-next')?.addEventListener('click', () => { next(); resetAuto(); });
  document.querySelector('.slide-prev')?.addEventListener('click', () => { prev(); resetAuto(); });
  thumbs.forEach((t) => t.addEventListener('click', () => { goTo(parseInt(t.dataset.index)); resetAuto(); }));

  startAuto();
})();

/* ====== MUSIQUE ====== */
const music = document.getElementById('bgMusic');
const btn = document.getElementById('musicToggle');
let playing = false;

if (btn && music) {
  btn.addEventListener('click', () => {
    if (playing) {
      music.pause();
      btn.textContent = '♪';
      btn.classList.remove('playing');
    } else {
      music.currentTime = 0;
      music.play().catch(() => {});
      btn.textContent = '❚❚';
      btn.classList.add('playing');
    }
    playing = !playing;
  });
}

function demarrerMusique() {
  if (music && !playing) {
    music.volume = 0.3;
    music.play().then(() => {
      playing = true;
      if (btn) {
        btn.textContent = '❚❚';
        btn.classList.add('playing');
      }
    }).catch(() => {});
  }
  document.removeEventListener('click', demarrerMusique);
  document.removeEventListener('touchstart', demarrerMusique);
}
document.addEventListener('click', demarrerMusique);
document.addEventListener('touchstart', demarrerMusique);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});
if (document.getElementById("lightbox")) {
  document.getElementById("lightbox").addEventListener("click", function (e) {
    if (e.target === this) closeLightbox();
  });
}
