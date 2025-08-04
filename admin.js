import {
  db,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from './firebase.js';

const PIN_ADMIN = "23451";
const logEl = document.getElementById("log");
const dashboard = document.getElementById("dashboard");
const loginSection = document.getElementById("login-section");

window.checkPin = function () {
  const pin = document.getElementById("adminPin").value;
  if (pin === PIN_ADMIN) {
    dashboard.style.display = "block";
    loginSection.style.display = "none";
    log("🔐 Akses diterima.");
  } else {
    alert("PIN salah!");
  }
};

window.tambahPeserta = async function () {
  try {
    await addDoc(collection(db, "participants"), {
      createdAt: Date.now()
    });
    log("✅ Slot peserta ditambahkan");
  } catch (e) {
    log("❌ Gagal menambah peserta");
  }
};

window.resetSemua = async function () {
  if (!confirm("Yakin ingin reset semua peserta & pemenang?")) return;
  const colls = ["winners", "participants"];
  for (let name of colls) {
    const docs = await getDocs(collection(db, name));
    docs.forEach(async (docSnap) => {
      await deleteDoc(doc(db, name, docSnap.id));
    });
  }
  log("♻️ Semua data telah direset");
};

function log(msg) {
  const li = document.createElement("li");
  li.textContent = `${new Date().toLocaleTimeString()} - ${msg}`;
  logEl.prepend(li);
}