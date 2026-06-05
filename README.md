# Podporné IKT riešenie v doméne BOZP

Webová aplikácia (PWA) na správu bezpečnosti a ochrany zdravia pri práci. Obsahuje správu spoločností, používateľov, hlásenie incidentov, e-learningové testy a učebné materiály.

---

## Štruktúra projektu

```
pwa-bozp/
├── frontend/   # Vue 3 SPA/PWA (Vite, Tailwind CSS v4, Vue Router)
└── backend/    # Node.js REST API (Express 5, PostgreSQL)
```

---

## Požiadavky

| Nástroj | Minimálna verzia |
|---|---|
| [Node.js](https://nodejs.org/) | 18+ |
| [npm](https://www.npmjs.com/) | 9+ |
| PostgreSQL databáza | 14+ |
| Cloudinary účet | — |

> PostgreSQL môže bežať lokálne alebo ako cloudová služba (napr. Render, Supabase, Neon).  
> Cloudinary je potrebný na ukladanie fotografií z hlásení incidentov.

---

## Lokálne spustenie

### 1. Klonovanie repozitára

```bash
git clone <url-repozitara>
cd pwa-bozp
```

### 2. Nastavenie backendu

```bash
cd backend
npm install
```

Vytvor súbor `.env` v priečinku `backend/` podľa šablóny `backend/.env.example` a vyplň hodnoty (viď sekcia **Premenné prostredia**).

Spustenie vývojového servera:

```bash
npm run dev
```

Backend pobeží na `http://localhost:3000`.

### 3. Nastavenie frontendu

```bash
cd frontend
npm install
```

Vytvor súbor `.env` v priečinku `frontend/` podľa šablóny `frontend/.env.example`.

Spustenie vývojového servera:

```bash
npm run dev
```

Frontend pobeží na `http://localhost:5173`.

### 4. Databáza

Aplikácia používa PostgreSQL s raw SQL bez ORM. Databázové tabuľky je potrebné vytvoriť manuálne. Schéma pokrýva tieto entity:

- `users` – používateľské účty (role: admin, manažér, zamestnanec, študent)
- `companies` – spoločnosti
- `reports` – záznamy o incidentoch
- `report_images` – fotografie k incidentom
- `tests` – e-learningové testy
- `questions` – otázky testov
- `answers` – odpovede na otázky
- `assigned_tests` – priradenie testov používateľom
- `resources` – učebné materiály

---

## Premenné prostredia

### `backend/.env`

```env
# Pripojenie k PostgreSQL databáze (connection string)
DATABASE_URL=

# Tajný kľúč pre podpisovanie JWT tokenov (náhodný dlhý reťazec)
JWT_SECRET=

# URL adresa frontendu – povolená pre CORS (napr. http://localhost:5173)
FRONTEND_URL=

# Cloudinary – názov cloudu (nájdeš v Cloudinary dashboarde)
CLOUDINARY_CLOUD_NAME=

# Cloudinary – API kľúč
CLOUDINARY_API_KEY=

# Cloudinary – API tajný kľúč
CLOUDINARY_API_SECRET=
```

### `frontend/.env`

```env
# URL adresa backendu (bez lomky na konci)
VITE_API_URL=
```

---

## Produkčné buildovanie

### Frontend

```bash
cd frontend
npm run build
```

Výstup sa uloží do `frontend/dist/` — tento priečinok nasaď na statický hosting (napr. Netlify, Vercel, Render Static Site).

### Backend

```bash
cd backend
npm start
```

Backend nasaď na Node.js hosting (napr. Render Web Service, Railway, Fly.io). Nezabudni nastaviť premenné prostredia aj na produkčnom serveri.

---

## Technológie

| Vrstva | Technológie |
|---|---|
| Frontend | Vue 3, Vue Router 4, Tailwind CSS v4, Axios, Vite 7, vite-plugin-pwa |
| Backend | Node.js, Express 5, PostgreSQL (pg), bcrypt, jsonwebtoken, multer, Cloudinary |
