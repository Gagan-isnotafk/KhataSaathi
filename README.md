# KhataSaathi — Voice-First Digital Ledger

**Tagline:** Your Voice. Your Khata. Your Business.

KhataSaathi is a React + TypeScript app with an Express API for a voice-first digital credit ledger (Udhaar Khata) built for Indian shopkeepers.

## Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4
- **Routing:** React Router (`react-router-dom`)
- **Charts:** Recharts
- **Icons:** Lucide React
- **State & Persistence:** React Context + `localStorage`
- **Browser APIs:** `MediaRecorder`, `AudioContext` (live waveform), `SpeechSynthesis` (spoken feedback)

## Key Features

1. **Welcome & OTP Login / Registration:** Mobile number login, simulated OTP verification, and multilingual interface selection (English, Hindi, Kannada).
2. **Shop Setup:** Configure shop name, owner name, business category, language, and optional address.
3. **Dashboard:** Real-time totals in integer paise (Total Outstanding, Today's Credit, Today's Repayments, Active Customers), 7-day credit vs repayment chart, quick actions, and prominent Voice Assistant shortcut.
4. **Voice Assistant:**
   - Uses browser `MediaRecorder` + live audio waveform visualizer.
   - Uses Gnani for speech-to-text and spoken replies, and Gemini for understanding approved transcripts.
   - A transcript approval creates new customer names and logs their credits or repayments automatically; a unique existing customer name gets a name-only confirmation. A repayment for a new customer starts their balance below zero, representing an advance.
5. **Customers & Duplicate Detection:** Search, filter, sort, view profiles, and create customers with live duplicate name/phone warnings.
6. **Customer Ledger:** Chronological ledger with opening balance, credits, repayments, reversals, running balance, and audit-safe transaction reversal (no silent deletion).
7. **Transactions:** Add credit, record repayment, filter by customer/type/source/date/amount range.
8. **Reports:** Daily, Weekly, and Monthly summaries, top outstanding customers chart & table, and CSV ledger export.
9. **Settings:** Edit shop/owner profile, switch language, toggle voice speech feedback, inspect audit logs, reset demo data, or logout.

## Running Locally

Copy `.env.example` to `.env`. Set `GEMINI_API_KEY` for voice intent
understanding and `GNANI_API_KEY` to a key with **STT and TTS** access. Gemini
is required to interpret voice transactions; without it, the app reports a
configuration error rather than silently using another parser. Keep both keys
server-side; do not put them in frontend code.

```bash
npm install
npm run dev
```

For local Google sign-in, open the app at `http://localhost:3000`. In Firebase
Console, enable Google under **Authentication → Sign-in method** and ensure
`localhost` is listed under **Authentication → Settings → Authorized domains**.

Build for production:

```bash
npm run build
```

## Android APK

The Android app is a Capacitor wrapper around the built web app. Install Android
Studio with its Android SDK, then connect an Android phone with USB debugging
enabled (or use an emulator).

For local testing, copy `.env.mobile.example` to `.env.mobile.local` and set
`VITE_API_BASE_URL` to this computer's Wi-Fi/LAN address and port, for example
`http://192.168.1.50:3000`. Keep the phone and computer on the same network and
leave `npm run dev` running on the computer. Allow port 3000 through the Windows
firewall if the phone cannot connect.

The local APK allows unencrypted HTTP so it can reach a development server on
the LAN. Use an HTTPS backend and disable cleartext traffic before distributing
an APK outside a trusted development network.

```bash
npm run android:sync
npm run android:open
```

In Android Studio, build the debug APK. It will be at
`android/app/build/outputs/apk/debug/app-debug.apk`. Alternatively, with a
connected phone and Android SDK configured, run `npm run android:run` to build
and install it directly.

