import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore, collection, addDoc, doc, onSnapshot,
  getDocs, deleteDoc, updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import {
  getAuth, signInAnonymously, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAeg-8WgPYIvDWKkRCArttMoaeEdwPGBJ0",
  authDomain: "zona-game-tour.firebaseapp.com",
  projectId: "zona-game-tour",
  storageBucket: "zona-game-tour.appspot.com",
  messagingSenderId: "1008038779589",
  appId: "1:1008038779589:web:bc69049f5d26a5ea8db8e4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

function signInAnonim() {
  signInAnonymously(auth)
    .then(() => console.log("Signed in anonymously"))
    .catch((error) => console.error("Anon auth error:", error));
}

export {
  db, auth, signInAnonim, onAuthStateChanged,
  collection, addDoc, getDocs, doc, deleteDoc,
  updateDoc, onSnapshot
};