// ====== Lazy Load Semua IMG Otomatis ======

function lazyLoadAllImages() {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    if (!img.dataset.src) {
      img.dataset.src = img.src; // pindahkan original src ke data-src
      img.src = "";
    }
    img.classList.add("lazy-img");
  });

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src; // load gambar asli
          img.onload = () => img.classList.add("loaded"); // efek transition
          obs.unobserve(img);
        }
      });
    },
    { threshold: 0.1, rootMargin: "200px" }
  );

  document.querySelectorAll("img.lazy-img").forEach((img) => observer.observe(img));
}

document.addEventListener("DOMContentLoaded", lazyLoadAllImages);
