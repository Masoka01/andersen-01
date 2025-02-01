// Nama Tamu
const urlParams = new URLSearchParams(window.location.search);
const guestName = urlParams.get("p");

if (guestName) {
  document.getElementById("guest-name").textContent = guestName;
}

// Animasi
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  document.body.appendChild(heart);

  const randomLeft = Math.random() * window.innerWidth;
  const randomDuration = Math.random() * 3 + 2;
  const randomColor = `hsl(${Math.random() * 360}, 100%, 60%)`;
  const randomX = Math.random() * 200 - 100;
  const randomSize = Math.random() * 10 + 10; // Ukuran lebih kecil (10px - 20px)

  heart.style.left = `${randomLeft}px`;
  heart.style.animationDuration = `${randomDuration}s`;
  heart.style.setProperty("--random-x", `${randomX}px`);
  heart.style.width = `${randomSize}px`;
  heart.style.height = `${randomSize}px`;

  heart.style.backgroundColor = randomColor;
  heart.style.boxShadow = `0 0 15px 5px ${randomColor}`;
  heart.style.filter = `drop-shadow(0 0 10px ${randomColor})`;

  setTimeout(() => {
    heart.remove();
  }, randomDuration * 1000);
}

setInterval(createHeart, 150);
