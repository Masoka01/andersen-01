// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8uyuuFMZCGDMZ9IjzAkUggFzk6-l706o",
  authDomain: "ratih-edi.firebaseapp.com",
  databaseURL:
    "https://ratih-edi-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ratih-edi",
  storageBucket: "ratih-edi.appspot.com",
  messagingSenderId: "75291495123",
  appId: "1:75291495123:web:df82f8e43c8523328b2226",
};

// Initialize Firebase hanya sekali
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Debug connection
database.ref(".info/connected").on("value", (snapshot) => {
  if (snapshot.val() === true) {
    console.log("Terhubung dengan Firebase");
  } else {
    console.log("Tidak terhubung dengan Firebase");
  }
});

// Comment System
document.addEventListener("DOMContentLoaded", () => {
  const commentForm = document.getElementById("commentForm");
  const commentsList = document.getElementById("commentsList");

  if (!commentForm || !commentsList) {
    console.error("Element form atau comments tidak ditemukan!");
    return;
  }

  // Submit comment
  commentForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("nameInput").value.trim();
    const comment = document.getElementById("commentInput").value.trim();

    if (name && comment) {
      try {
        console.log("Mencoba mengirim komentar...");
        const newCommentRef = database.ref("comments").push();
        await newCommentRef.set({
          name: name,
          comment: comment,
          timestamp: firebase.database.ServerValue.TIMESTAMP, // Gunakan timestamp khusus Firebase
        });
        console.log("Komentar berhasil dikirim dengan ID:", newCommentRef.key);
        commentForm.reset();
      } catch (error) {
        console.error("Gagal mengirim komentar:", error);
        alert("Gagal mengirim komentar. Silakan coba lagi atau hubungi admin.");
      }
    }
  });

  // Display comments
  function displayComments() {
    console.log("Memulai load komentar...");
    database
      .ref("comments")
      .orderByChild("timestamp")
      .on(
        "value",
        (snapshot) => {
          console.log("Menerima data komentar:", snapshot.val());

          if (!snapshot.exists()) {
            commentsList.innerHTML =
              '<p class="no-comments">Belum ada komentar</p>';
            return;
          }

          commentsList.innerHTML = "";
          const comments = [];

          snapshot.forEach((childSnapshot) => {
            comments.push({
              id: childSnapshot.key,
              ...childSnapshot.val(),
            });
          });

          // Urutkan dari yang terbaru
          comments.sort((a, b) => b.timestamp - a.timestamp);

          comments.forEach((comment) => {
            let commentDate;
            try {
              commentDate = new Date(comment.timestamp).toLocaleString("id-ID");
            } catch {
              commentDate = "Baru saja";
            }

            const commentElement = document.createElement("div");
            commentElement.className = "comment-item";
            commentElement.innerHTML = `
          <div class="comment-author">${comment.name}</div>
          <div class="comment-text">${comment.comment}</div>
          <div class="comment-date">${commentDate}</div>
        `;
            commentsList.appendChild(commentElement);
          });
        },
        (error) => {
          console.error("Error membaca komentar:", error);
          commentsList.innerHTML =
            '<p class="error-comments">Gagal memuat komentar</p>';
        }
      );
  }

  // Initialize comments display
  displayComments();
});
