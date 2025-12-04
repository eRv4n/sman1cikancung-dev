// ======================================================
// IMPORTS
// ======================================================
import { animate, utils, waapi } from "animejs";

// ======================================================
// CONFIG
// ======================================================
const counters = [
  { id: "alumni", end: 6000, delay: 100 },
  { id: "siswa", end: 1252, delay: 200 },
  { id: "prestasi", end: 123, delay: 300 },
];

const fadeUp = (el, delay = 0, y = 20, duration = 500) => {
  waapi.animate(el, {
    duration,
    delay,
    opacity: [0, 1],
    transform: [`translateY(${y}px)`, "translateY(0)"],
    ease: "outCubic",
  });
};

const fadeLeft = (el, delay = 0, x = 40, duration = 600) => {
  waapi.animate(el, {
    duration,
    delay,
    opacity: [0, 1],
    transform: [`translateX(${x}px)`, "translateX(0)"],
    ease: "outCubic",
  });
};

const typing = (el, speed = 40, delay = 300) => {
  const text = el.textContent.trim();
  el.textContent = "";
  setTimeout(() => {
    [...text].forEach((c, i) => setTimeout(() => (el.textContent += c), i * speed));
  }, delay);
};

const counterAnim = (el, end, delay) => {
  animate(el, {
    innerHTML: [0, end],
    modifier: utils.round(0),
    delay,
    duration: 800,
    ease: "outExpo",
  });
};

const typingLoop = (el, speed = 60, eraseSpeed = 40, delay = 1000) => {
  if (!el) return;
  const text = el.textContent.trim();
  el.textContent = "";

  let i = 0;
  let forward = true;

  function play() {
    if (forward) {
      // ketik karakter demi karakter sampai penuh
      if (i <= text.length) {
        el.textContent = text.substring(0, i);
        i++;
        // ketika sudah selesai ketik, tunggu 'delay' sebelum mulai erase
        const timeout = i > text.length ? delay : speed;
        setTimeout(play, timeout);
      } else {
        // pastikan i set ke panjang teks dan ubah arah
        forward = false;
        i = text.length - 1;
        setTimeout(play, eraseSpeed);
      }
    } else {
      // erase karakter demi karakter sampai kosong
      if (i >= 0) {
        el.textContent = text.substring(0, i);
        i--;
        setTimeout(play, eraseSpeed);
      } else {
        // sudah kosong — jeda singkat lalu mulai ketik lagi
        forward = true;
        i = 0;
        setTimeout(play, 500);
      }
    }
  }

  play();
};
// ======================================================
// OBSERVER — AUTO TRIGGER ANIMASI SAAT MASUK VIEW
// ======================================================
const observe = (selector, cb) => {
  const el = document.querySelector(selector);
  if (!el) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          cb(el);
          io.disconnect(); // biar hanya sekali
        }
      });
    },
    { threshold: 0.25 }
  );

  io.observe(el);
};

// ======================================================
// REGISTER & RUN ANIMATIONS
// ======================================================

// COUNTER SECTION
counters.forEach(({ id, end, delay }) => {
  observe(`#${id}`, (el) => counterAnim(el, end, delay));
  observe(`#${id}-section`, (el) => fadeUp(el, delay));
});

// PROFIL SEKOLAH
observe("#profil-sekolah", (el) => fadeUp(el, 100));
observe("#profil-sekolah-text", (el) => typing(el, 60));

// SPMB
observe("#spmb-statistik-atas", (el) => fadeUp(el, 0, 40));
observe("#spmb-content", (el) => fadeUp(el, 150, 30));

// INFO SEKOLAH
observe("#kurikulum", (el) => fadeUp(el, 100, 25));
observe("#akreditasi", (el) => fadeUp(el, 250, 25));
observe("#tahunBerdiri", (el) => fadeUp(el, 350, 25));

// KEPALA SEKOLAH
observe("#fotoKepsek", (el) => fadeLeft(el, 300, 80));
observe("#judulKepsek", (el) => fadeUp(el, 150, 40));
observe("#contentKepsek", (el) => fadeUp(el, 300, 30));
observe("#gelarKepsek", (el) => fadeUp(el, 400, 25));
observe("#namaJabatan", (el) => fadeUp(el, 450, 25));

// VISI MISI
observe("#visi-section", () => {
  fadeUp("#visi-title");
  typingLoop(document.querySelector("#visi-text"), 60, 40, 1000);
});

observe("#misi-section", () => {
  fadeUp("#misi-title");
  document.querySelectorAll("#misi-list > div").forEach((el, i) => fadeUp(el, 150 + i * 120, 18, 400));
});

// BERITA
export const animateNews = () => {
  const cards = document.querySelectorAll("#berita > div");

  cards.forEach((card, i) => {
    waapi.animate(card, {
      opacity: [0, 1],
      transform: ["translateY(25px)", "translateY(0)"],
      duration: 650,
      delay: i * 120, // efek stagger antar card
      easing: "ease-out",
    });
  });
};

observe("#beritaWrapper", animateNews);
