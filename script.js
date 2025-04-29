// Nama Tamu
const urlParams = new URLSearchParams(window.location.search);
const guestName = urlParams.get("p");

if (guestName) {
  document.getElementById("guest-name").textContent = guestName;
}

// Membuat efek hujan minimal
function createRain() {
  const rainContainer = document.body;
  const rainCount = 30; // Jumlah sangat minim

  // Cek jika perangkat mobile
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  // Jika mobile, kurangi lagi jumlahnya
  const finalRainCount = isMobile ? 15 : rainCount;

  for (let i = 0; i < finalRainCount; i++) {
    const raindrop = document.createElement("div");
    raindrop.classList.add("raindrop");

    // Posisi acak sederhana
    const posX = Math.random() * window.innerWidth;
    const delay = Math.random() * 3;
    const duration = 5 + Math.random() * 5; // Lambat

    raindrop.style.left = `${posX}px`;
    raindrop.style.animationDelay = `${delay}s`;
    raindrop.style.animationDuration = `${duration}s`;

    rainContainer.appendChild(raindrop);

    // Hapus elemen setelah selesai animasi untuk memori
    setTimeout(() => {
      rainContainer.removeChild(raindrop);
    }, duration * 1000);
  }

  // Jalankan ulang secara berkala dengan interval panjang
  setInterval(createRain, 3000);
}

// Mulai hanya jika bukan perangkat low-end
if (!navigator.connection || !navigator.connection.saveData) {
  window.addEventListener("load", createRain);
}
