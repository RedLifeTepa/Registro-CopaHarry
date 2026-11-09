// Lógica de formularios, folios dinámicos, validación y guardado en Google Sheets + Firebase (/js/app.js)
import { db, ensureAnonymousSession, REGISTROS_COLLECTION, GOOGLE_SHEETS_WEBAPP_URL, doc, setDoc } from "./firebase-config.js";

export function generateDynamicFolio(prefix) {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const rnd = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${yyyy}${mm}${dd}-${rnd}`;
}

export async function sendRegistrationToGoogleSheets(record, action = "create") {
  if (!GOOGLE_SHEETS_WEBAPP_URL) return false;
  const payload = {
    action,
    ...record,
    timestamp: record.timestamp || Date.now()
  };
  try {
    await fetch(GOOGLE_SHEETS_WEBAPP_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });
    return true;
  } catch (err) {
    console.warn("Error enviando a Google Sheets:", err);
    return false;
  }
}

export async function saveAthleteRegistration(record) {
  const payload = {
    ...record,
    timestamp: Date.now()
  };
  await sendRegistrationToGoogleSheets(payload, "create");
  try {
    const user = await ensureAnonymousSession();
    payload.uidCreador = user ? user.uid : "anon";
    await setDoc(doc(db, REGISTROS_COLLECTION, record.id), payload);
  } catch (err) {
    console.warn("Firebase save fallback:", err);
  }
  return payload;
}
