const url =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vT3T-07FcDTwAQL6UuUAisaM3P9v-VhKvDHrrEmUE8JGJZkHTEQ6iYZnVr9HhRjHV7fPKdHeKSFazdT/pub?output=csv";

let allNews = [];
let displayedCount = window.innerWidth < 640 ? 3 : 9; // tampilkan 10 berita terbaru dulu

async function loadNews() {
  const res = await fetch(url);
  const csv = await res.text();
  const rows = csv.split("\n").map((r) => r.split(","));
  const [header, ...data] = rows;

  allNews = data.map((row) => ({
    id: row[0],
    judul: row[1],
    gambar: row[2],
    tanggal: row[3],
    sumber: row[4],
  }));

  // urutkan dari berita paling baru → paling lama
  allNews = allNews.reverse();

  renderNews();
}

function renderNews() {
  const berita = document.getElementById("berita");
  berita.innerHTML = "";

  const slice = allNews.slice(0, displayedCount);

  slice.forEach((item, index) => {
    const isLatest = index === 0; // berita terbaru = index 0

    const card = document.createElement("div");
    card.className =
      "border border-gray-300 overflow-hidden bg-gray-50 transition flex flex-col p-3 rounded-lg hover:scale-102 hover:shadow-md hover:shadow-cyan-600/20 hover:border-cyan-600";

    card.innerHTML = `
    <a href="${item.sumber}">
      <img data-src="${item.gambar}" class="w-full h-52 object-cover mb-3 rounded-md" />
      <h3 class="font-semibold text-lg">${item.judul}</h3>
      <small class="text-gray-500">${item.tanggal}</small>
    </a>
    `;

    berita.appendChild(card);
  });

  // Tampilkan tombol Load More bila masih ada sisa berita
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  loadMoreBtn.classList.toggle("hidden", displayedCount >= allNews.length);

  animateNews();
}

// tombol untuk load 10 berita lagi
document.getElementById("loadMoreBtn").addEventListener("click", () => {
  displayedCount += window.innerWidth < 640 ? 3 : 9;
  renderNews();
});

loadNews();
