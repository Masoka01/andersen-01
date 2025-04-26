// Nama Tamu
const urlParams = new URLSearchParams(window.location.search);
const guestName = urlParams.get("p");

if (guestName) {
  document.getElementById("guest-name").textContent = guestName;
}