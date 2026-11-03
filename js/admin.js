// Lógica de autenticación de administradores, filtros y exportación (/js/admin.js)
import {
  auth, db, REGISTROS_COLLECTION,
  signInWithEmailAndPassword, signOut, onAuthStateChanged,
  verifyAdminPrivileges, collection, doc, updateDoc, deleteDoc, onSnapshot
} from "./firebase-config.js";

export async function loginAdmin(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
  const isAdmin = await verifyAdminPrivileges(cred.user);
  if (!isAdmin) {
    await signOut(auth);
    throw new Error("UNAUTHORIZED_ROLE");
  }
  return cred.user;
}

export async function logoutAdmin() {
  await signOut(auth);
}
