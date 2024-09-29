let level = 1; // Mulai dari level 1
let gameover = false;
let salah = 0;
let rahasia;
const maxKesempatan = 5; // Total kesempatan menebak

// Mengambil elemen dari DOM
const startBtn = document.getElementById("start-btn");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
const container = document.querySelector(".container");
const tebakanInput = document.getElementById("tebakan");
const submitBtn = document.getElementById("submit-btn");
const message = document.getElementById("message");
const levelInfo = document.getElementById("level-info");
const successMessage = document.getElementById("success-message");
const successText = document.getElementById("success-text");
const nextLevelBtn = document.getElementById("next-level-btn");

function generateRandomNumber() {
  return Math.floor(Math.random() * (level * 10)) + 1;
}

function resetGame() {
  salah = 0;
  rahasia = generateRandomNumber();
  levelInfo.textContent = `Level ${level} [1..${level * 10}]`;

  // Mengatur ulang elemen form tebakan
  tebakanInput.value = ""; // Reset input value
  message.textContent = ""; // Kosongkan pesan
  successMessage.classList.add("hide"); // Menyembunyikan pesan keberhasilan

  // Menampilkan kembali elemen form
  document.getElementById("question").classList.remove("hide");
  tebakanInput.classList.remove("hide");
  submitBtn.classList.remove("hide");
}

function startGame() {
  if (gameover) {
    level = 1; // Reset level ke 1
    gameover = false;
  }
  controls.classList.add("hide");
  container.classList.remove("hide");
  resetGame();
}

function stopGame(resultText) {
  result.innerHTML = resultText;
  startBtn.innerText = "Mulai lagi?";
  controls.classList.remove("hide");
  container.classList.add("hide");
  gameover = true; // Set gameover status
}

startBtn.addEventListener("click", () => {
  startGame();
});

submitBtn.addEventListener("click", () => {
  const tebakan = parseInt(tebakanInput.value);
  const minTebakan = 1;
  const maxTebakan = level * 10;

  if (!gameover) {
    if (isNaN(tebakan)) {
      message.textContent = "Tebakan tidak valid. Masukkan angka yang benar.";
      return;
    }

    if (tebakan < minTebakan || tebakan > maxTebakan) {
      message.textContent = `Tebak angka sesuai angka yang ditentukan antara ${minTebakan} dan ${maxTebakan}.`;
      return;
    }

    if (tebakan === rahasia) {
      // Tampilkan pesan keberhasilan dan tombol "Mulai Level Selanjutnya"
      successText.textContent = `Tebakan Anda Benar! Anda melaju ke level ${
        level + 1
      }.`;
      successMessage.classList.remove("hide");
      // Menyembunyikan container dan form tebakan
      container.classList.add("hide");
      document.getElementById("question").classList.add("hide");
      tebakanInput.classList.add("hide");
      submitBtn.classList.add("hide");
    } else {
      if (tebakan < rahasia) {
        message.textContent = "Tebakan Anda Terlalu Kecil.";
      } else if (tebakan > rahasia) {
        message.textContent = "Tebakan Anda Terlalu Besar.";
      }
      salah++;

      const kesempatanSisa = maxKesempatan - salah;
      if (kesempatanSisa > 0 && tebakan !== rahasia) {
        message.textContent += ` Kesempatan menebak tinggal ${kesempatanSisa} kali lagi.`;
      }

      if (salah >= maxKesempatan) {
        stopGame("Game Over. Anda sudah salah sebanyak 5 kali.");
      }
    }
  }
});

nextLevelBtn.addEventListener("click", () => {
  successMessage.classList.add("hide");
  level++; // Increment level when moving to the next level
  startGame();
});
