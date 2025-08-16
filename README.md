# TerappIA MVP

Prototipo de herramienta web de procesamiento de lenguaje natural para profesionales de la salud mental.
Este MVP incluye:

* Módulo de análisis de sentimientos ABSA con **Gemini Flash**.
* Módulo OCR con **Google Cloud Vision API** para digitalizar texto manuscrito o impreso.
* Interfaz web sencilla en React con TailwindCSS.

---

## 🚀 Instalación y ejecución

### 1. Clonar repositorio

```bash
git clone https://github.com/TU_USUARIO/terappia-mvp
cd terappia-mvp
```

### 2. Configurar Backend

```bash
cd backend
npm install
```

**Variables de entorno:**
Crea un archivo `.env` en `backend/` con:

```
GEMINI_API_KEY=tu_api_key_de_gemini
```

**Credenciales Google Cloud Vision:**

* Guarda tu archivo JSON de credenciales en `backend/credentials/vision-key.json`.
* Este archivo **no** se sube a GitHub (`.gitignore` lo protege).

**Iniciar backend:**

```bash
node index.js
```

El backend estará en: `http://localhost:3001`

---

### 3. Configurar Frontend

```bash
cd ../frontend
npm install
npm run dev
```

El frontend estará en: `http://localhost:5173`

---

## 📂 Estructura del proyecto

```
terappia-mvp/
├── backend/           # API Node.js (Gemini + OCR)
├── frontend/          # React + TailwindCSS
├── docs/              # Documentación LaTeX y PDF
├── README.md
└── .gitignore
```

---

## ✨ Funcionalidades actuales

* **Análisis de sentimientos**: Procesa texto y devuelve JSON estructurado con aspectos, emociones y nivel de confianza.
* **OCR + Análisis**: Sube una imagen, extrae texto con Google Cloud Vision y analiza sentimientos.
* **Interfaz limpia** con diseño en azul y visualización estilizada del JSON.

---

## 🛠 Tecnologías utilizadas

* **Backend**: Node.js, Express, Google Generative AI, Google Cloud Vision.
* **Frontend**: React, TailwindCSS, react-json-pretty.
* **Otros**: Multer para subida de imágenes, dotenv para manejo de credenciales.

---

## 📄 Documentación

La documentación técnica completa del avance está en `docs/`:

* `informe.tex` → Documento LaTeX.
* `informe.pdf` → Versión en PDF para lectura rápida.
* `img/` → Imágenes de capturas del MVP.

---

## 👥 Autores

* Jair Alejandro García Cruz
* Edmundo Said Jimeno González
