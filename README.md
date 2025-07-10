# 🐶 Lupimon IA Merch — README

## 💡 Descripción del proyecto

**Lupimon IA Merch** es una plataforma para personalizar productos (camisetas, tazas, tote bags, etc.) con imágenes generadas por IA a partir de fotos de perros, especialmente enfocada en la comunidad de perros salchicha.

El usuario podrá:
- Subir una foto de su perro.
- Elegir un estilo de arte (caricatura, anime, digital clásico).
- Ver varias versiones generadas.
- Seleccionar el diseño final y aplicarlo a diferentes productos.
- Realizar el pago y enviar el pedido.

---

## 🎯 Objetivo principal (MVP)

✅ Validar la funcionalidad de personalización y generación de arte con IA.\
✅ Permitir mockups visuales para cada producto.\
✅ Gestionar pedidos manualmente al inicio (automatización parcial en fases futuras).

---

## 💻 Stack tecnológico

### Frontend
- Carpeta: `frontend/`
- Framework: **Next.js** (TypeScript, App Directory)
- Estilos: Tailwind CSS
- Calidad de código: ESLint
- Manejo de estado: Zustand
- Librerías adicionales sugeridas:
  - react-dropzone
  - react-konva
  - react-query o TanStack Query

### Backend / IA
- Carpeta: `backend/` (vacía por ahora, pendiente de definir stack)
- API IA: **Replicate API** (Stable Diffusion + ControlNet para estilos custom)
- Almacenamiento: Cloudinary o Amazon S3
- Pagos: Stripe, Sinpe QR (opcional)

---

## 🧑‍🎨 Flujo de usuario

1️⃣ Página de bienvenida con CTA "Empieza ahora".\
2️⃣ Subir foto del perro (con instrucciones claras).\
3️⃣ Seleccionar estilo: caricatura, anime, digital clásico.\
4️⃣ Recibir 2-3 versiones generadas automáticamente.\
5️⃣ Elegir diseño final y aplicar a mockup (camiseta, taza, tote bag).\
6️⃣ Ver precio actualizado y finalizar pedido.\
7️⃣ Pagar vía Stripe.\
8️⃣ Pedido se recibe y se gestiona manualmente.

---

## ⚙️ Arquitectura de carpetas actual

```
/lupimon
├── frontend/
│   ├── public/
│   │   ├── images/
│   │   └── mockups/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   ├── UploadPhoto.tsx
│   │   │   ├── StyleSelector.tsx
│   │   │   ├── PreviewCanvas.tsx
│   │   │   ├── ProductMockup.tsx
│   │   │   └── CheckoutForm.tsx
│   │   ├── app/
│   │   │   ├── page.tsx
│   │   │   └── customize/
│   │   │       └── page.tsx
│   │   ├── store/
│   │   │   └── useStore.ts
│   │   ├── utils/
│   │   │   ├── replicateClient.ts
│   │   │   ├── cloudinaryUpload.ts
│   │   │   └── promptTemplates.ts
│   │   └── styles/
│   │       └── globals.css
│   ├── .env.local
│   ├── tailwind.config.js
│   ├── next.config.js
│   ├── package.json
│   └── README.md
├── backend/
│   └── (vacío por ahora)
├── .gitignore
├── README.md
└── ai_context/ (privado, ignorado por git)
```

---

## 🤖 IA — Configuración y prompts iniciales

**API recomendada:** Replicate (Stable Diffusion + ControlNet).

### Prompt caricatura
```
A cute cartoon illustration of a dachshund dog, front view, bright colors, vector style, clean lines, white background
```
### Prompt anime
```
Anime-style portrait of a dachshund dog, big expressive eyes, soft colors, pastel background, highly detailed
```
### Prompt digital clásico
```
Digital painting of a dachshund dog, realistic but stylized, soft shadows, minimal background, high quality
```

---

## 💸 Modelo de monetización
- Precio base camiseta (ej. $25) + extra por arte personalizado (ej. $10).
- Productos extra: tazas, tote bags, stickers.
- Futuro: SaaS para otros negocios.

---

## 🚀 Roadmap técnico resumido

### Semana 1
- Setup Next.js + Tailwind + Zustand.
- Estructura inicial de páginas y componentes.

### Semana 2
- Subida de imágenes y preview (react-dropzone + react-konva).
- Lógica inicial de estilos.

### Semana 3
- Conexión a API IA.
- Generación de múltiples versiones.

### Semana 4
- Mockups y flujo de pago (Stripe).

### Semana 5
- Panel básico de pedidos.
- Pruebas y ajustes UX.

---

## 📄 Variables de entorno sugeridas
```
REPLICATE_API_TOKEN=your_token_here
CLOUDINARY_URL=your_cloudinary_url
STRIPE_SECRET_KEY=your_stripe_key
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

---

## 💬 Notas adicionales
- Pedidos se gestionan manualmente al inicio.
- Incluir instrucciones claras para la foto.
- Posibilidad de añadir estilos y simulaciones 3D en futuras fases.

---

### 🚀 ¡A crear merch increíble con IA! 🐶✨

