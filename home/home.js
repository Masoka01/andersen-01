// Cooldown
simplyCountdown(".simply-countdown", {
  year: 2025, // required
  month: 4, // required
  day: 16, // required
  hours: 8, // Default is 0 [0-23] integer
  words: {
    //words displayed into the countdown
    days: { singular: "Hari", plural: "Hari" },
    hours: { singular: "Jam", plural: "Jam" },
    minutes: { singular: "Menit", plural: "Menit" },
    seconds: { singular: "Detik", plural: "Detik" },
  },
});

// Loading
window.onload = function () {
  setTimeout(function () {
    document.getElementById("loading-screen").style.display = "none";
    document.getElementById("content").classList.add("show-content");
  }, 100);
};

// Popup Galeri
// Ambil semua link untuk membuka modal
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const closeBtn = document.getElementsByClassName("close")[0];

// Menambahkan event listener pada setiap gambar
const images = document.querySelectorAll(".open-modal");
images.forEach((image) => {
  image.addEventListener("click", function (event) {
    event.preventDefault(); // Mencegah link membuka gambar langsung
    const imageUrl = this.getAttribute("data-image");
    modal.style.display = "block"; // Tampilkan modal
    modalImg.src = imageUrl; // Set gambar dalam modal
  });
});

// Menutup modal saat tombol close diklik
closeBtn.onclick = function () {
  modal.style.display = "none";
};

// Menutup modal saat mengklik area di luar gambar
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// Salin
function copyRekening(rekeningNumber, button) {
  navigator.clipboard
    .writeText(rekeningNumber)
    .then(() => {
      // Ubah teks tombol menjadi "Tersalin!"
      button.textContent = "Tersalin!";
      button.classList.add("tersalin"); // Tambahkan kelas untuk gaya "Tersalin"
      button.disabled = true; // Nonaktifkan tombol sementara

      // Kembalikan teks tombol setelah 2 detik
      setTimeout(() => {
        button.textContent = "Salin Nomor";
        button.classList.remove("tersalin");
        button.disabled = false; // Aktifkan kembali tombol
      }, 2000);
    })
    .catch((err) => {
      console.error("Gagal menyalin teks: ", err);
    });
}

// Event listener untuk tombol salin
document.querySelectorAll(".copy-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const rekeningNumber = button.getAttribute("data-rekening");
    copyRekening(rekeningNumber, button);
  });
});

// AOS
AOS.init();

// Audio
const audio = document.getElementById("song");
const audioIconWrapper = document.querySelector(".audio-icon-wrapper");

// Tambahkan event listener ke ikon audio untuk kontrol play/pause
audioIconWrapper.addEventListener("click", () => {
  if (audio.paused) {
    audio.play(); // Jika audio sedang pause, maka play
    audioIconWrapper.innerHTML = '<i class="bi bi-disc"></i>'; // Ubah ikon ke disc-circle
  } else {
    audio.pause(); // Jika audio sedang play, maka pause
    audioIconWrapper.innerHTML = '<i class="bi bi-pause-circle"></i>'; // Ubah ikon ke pause-circle
  }
});
