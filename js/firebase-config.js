// Inicialización Modular Firebase v10+ (/js/firebase-config.js)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  initializeFirestore,
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export const firebaseConfig = {
  apiKey: "AIzaSyDIh89TkCXgtqxAisrmAAWJAhoDdePs4Y0",
  authDomain: "data-variable.firebaseapp.com",
  projectId: "data-variable",
  storageBucket: "data-variable.firebasestorage.app",
  messagingSenderId: "812390101147",
  appId: "1:812390101147:web:848ff76f02b1675b14963e"
};

export const AUTHORIZED_ADMIN_EMAILS = [
  "hola@hola.com",
  "admin@copaharry.com",
  "harrygymcenter@gmail.com"
];

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = initializeFirestore(app, { experimentalAutoDetectLongPolling: true });
export const REGISTROS_COLLECTION = "registros_eventos";

export async function ensureAnonymousSession() {
  if (auth.currentUser) return auth.currentUser;
  const cred = await signInAnonymously(auth);
  return cred.user;
}

export async function verifyAdminPrivileges(user) {
  if (!user || user.isAnonymous) return false;
  const tokenResult = await user.getIdTokenResult(true);
  if (tokenResult.claims && tokenResult.claims.admin === true) return true;
  return AUTHORIZED_ADMIN_EMAILS.includes((user.email || "").toLowerCase());
}

export { signInWithEmailAndPassword, signOut, onAuthStateChanged, collection, doc, setDoc, updateDoc, deleteDoc, onSnapshot };
