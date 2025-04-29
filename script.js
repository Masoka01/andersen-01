// Nama Tamu
const urlParams = new URLSearchParams(window.location.search);
const guestName = urlParams.get("p");

if (guestName) {
  document.getElementById("guest-name").textContent = guestName;
}

// Membuat efek hujan yang lebih pelan
function createRain() {
  const rainContainer = document.body;
  const rainCount = 80; // Sedikit lebih sedikit

  for (let i = 0; i < rainCount; i++) {
    const raindrop = document.createElement("div");
    raindrop.classList.add("raindrop");

    // Posisi acak
    const posX = Math.random() * window.innerWidth;
    const delay = Math.random() * 10; // Delay lebih lama
    const duration = 5 + Math.random() * 10; // Durasi lebih panjang
    const size = 3 + Math.random() * 5; // Ukuran lebih kecil

    // Atur properti CSS
    raindrop.style.left = `${posX}px`;
    raindrop.style.animationDelay = `${delay}s`;
    raindrop.style.animationDuration = `${duration}s`;
    raindrop.style.width = `${size}px`;
    raindrop.style.height = `${size}px`;

    // Kemiringan yang lebih halus
    const tilt = Math.random() * 20 - 10; // -10deg sampai 10deg
    raindrop.style.transform = `rotate(${tilt}deg)`;

    // Opacity yang lebih rendah
    raindrop.style.opacity = 0.3 + Math.random() * 0.4;

    rainContainer.appendChild(raindrop);
  }
}

window.addEventListener("load", createRain);