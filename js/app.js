// Lógica de formularios, folios dinámicos, validación y guardado (/js/app.js)
import { db, ensureAnonymousSession, REGISTROS_COLLECTION, doc, setDoc } from "./firebase-config.js";

export function generateDynamicFolio(prefix) {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const rnd = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${yyyy}${mm}${dd}-${rnd}`;
}

export async function saveAthleteRegistration(record) {
  const user = await ensureAnonymousSession();
  const payload = {
    ...record,
    uidCreador: user ? user.uid : "anon",
    timestamp: Date.now()
  };
  await setDoc(doc(db, REGISTROS_COLLECTION, record.id), payload);
  return payload;
}
