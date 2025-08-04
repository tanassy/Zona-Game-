import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore, collection, addDoc, doc, onSnapshot,
  getDocs, deleteDoc, updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import {
  getAuth, signInAnonymously, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDpXGoEUzxsbrOcx0setbHqlnpTV9iatno",
  authDomain: "undian-turnamen-bola.firebaseapp.com",
  projectId: "undian-turnamen-bola",
  storageBucket: "undian-turnamen-bola.appspot.com",
  messagingSenderId: "384938435714",
  appId: "1:384938435714:web:53be08a328c101e020c09b",
  measurementId: "G-R62T6BZQ77"
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