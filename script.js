function undi() {
  const peserta = ["Tim A", "Tim B", "Tim C", "Tim D"];
  const hasil = peserta[Math.floor(Math.random() * peserta.length)];
  document.getElementById("hasil").textContent = `Pemenang: ${hasil}`;
}