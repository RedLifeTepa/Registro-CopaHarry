# Plataforma Oficial de Inscripciones: Copa Harry & Torneo Powerliftinging (`Registro-CopaHarry`)

Plataforma estática de inscripciones deportivas alojada en **GitHub Pages** (`https://redlifetepa.github.io/Registro-CopaHarry/`) con arquitectura segura sobre **Firebase v10+ (Authentication + Cloud Firestore)** y cumplimiento de la **LFPDPPP (México)**.

## Estructura de Archivos
- `index.html` — Landing pública, formularios de inscripción (Copa Harry y Powerlift), validación inline, modal LFPDPPP, envío automático a Google Sheets (`https://script.google.com/macros/s/AKfycbzZNSmXcy-rUR8kf_7Ky1D1jq8h6zPtn7oV5FWCfkxFC4sM0u3ZzlGim7gdIwXaA_-VHw/exec`) y vista de confirmación con descarga de ficha oficial en PDF (sin datos bancarios).
- `confi.html` — Panel de administración protegido mediante Firebase Auth (Email/Password) + verificación de rol `admin`, con filtros, KPIs, exportación a Excel (`.xlsx`) y descarga de fichas PDF (individual y masivo).
- `js/firebase-config.js` — Inicialización modular de Firebase v10 (`initializeApp`, `getAuth`, `initializeFirestore`).
- `js/app.js` — Generador dinámico de folios (`CH-YYYYMMDD-XXXX` y `PL-YYYYMMDD-XXXX`), validación y guardado seguro.
- `js/admin.js` — Control de sesión administrativa, verificación de custom claims y suscripción a Firestore.
- `css/styles.css` — Estilos del tema prehispánico, accesibilidad y estados de error.
- `firestore.rules` — Reglas de seguridad para Cloud Firestore (`hasOnly`, validación de tipos y control de acceso por rol).
- `assets/` — Logotipos y carteles optimizados en formato WebP.

## Instrucciones de Configuración en Firebase Console
1. **Habilitar Authentication:** En Firebase Console -> **Authentication -> Sign-in method**, activa **Anónimo (Anonymous)** (para el envío seguro de formularios públicos) y **Correo electrónico/contraseña (Email/Password)** (para el acceso al panel `confi.html`).
2. **Crear Usuario Admin:** En **Authentication -> Users**, agrega el correo de administrador (ej. `admin@copaharry.com` o `harrygymcenter@gmail.com`).
3. **Asignar Custom Claim `admin: true` (Opcional):** Usa Firebase Admin SDK (`admin.auth().setCustomUserClaims(uid, { admin: true })`) o agrega el correo autorizado en `firestore.rules`.
4. **Publicar Reglas de Firestore:** En **Firestore Database -> Reglas**, pega el contenido de `firestore.rules` y haz clic en **Publicar**.
