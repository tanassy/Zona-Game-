import {
  db, auth, signInAnonim, onAuthStateChanged,
  collection, addDoc, getDocs, doc, updateDoc, onSnapshot
} from './firebase.js';

const spinBtn = document.getElementById("spinBtn");
const resultDiv = document.getElementById("result");
const toast = document.getElementById("toast");
const winnerList = document.getElementById("winnerList");

let currentUserId = null;

signInAnonim();
onAuthStateChanged(auth, user => {
  if (user) {
    currentUserId = user.uid;
    checkIfAlreadySpun();
    listenWinners();
  }
});

function showToast(msg) {
  toast.innerText = msg;
  toast.style.display = 'block';
  setTimeout(() => toast.style.display = 'none', 3000);
}

async function checkIfAlreadySpun() {
  const snapshot = await getDocs(collection(db, "winners"));
  const exists = snapshot.docs.find(doc => doc.data().uid === currentUserId);
  if (exists) {
    spinBtn.disabled = true;
    resultDiv.innerText = `Kamu sudah mengundi: ${exists.data().result}`;
    showToast("Kamu sudah melakukan undian");
  }
}

spinBtn.addEventListener("click", async () => {
  spinBtn.disabled = true;
  const hadiah = randomPrize();

  try {
    await addDoc(collection(db, "winners"), {
      uid: currentUserId,
      result: hadiah,
      timestamp: Date.now()
    });
    resultDiv.innerText = `🎉 Selamat! Kamu mendapatkan ${hadiah}`;
    showToast("Undian berhasil!");
  } catch (e) {
    console.error(e);
    showToast("Gagal mengundi. Coba lagi nanti");
    spinBtn.disabled = false;
  }
});

function randomPrize() {
  const prizes = ["Voucher 50K", "Kaos", "Stiker", "Pulpen", "Gelas"];
  return prizes[Math.floor(Math.random() * prizes.length)];
}

function listenWinners() {
  const q = collection(db, "winners");
  onSnapshot(q, snapshot => {
    winnerList.innerHTML = "";
    snapshot.docs.slice(-5).reverse().forEach(doc => {
      const li = document.createElement("li");
      li.textContent = doc.data().result;
      winnerList.appendChild(li);
    });
  });
}