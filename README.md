# 🥂 Ecococteles — Plataforma de pedidos de cócteles

Proyecto web modular para mostrar un catálogo de cócteles, agregar productos a un carrito y gestionar pedidos para confirmar contra entrega. El enfoque es limpio, escalable y pensado para implementar formularios de contacto y agendamiento sin pagos en línea.

---

## Objetivo del proyecto

Crear una página web donde los usuarios puedan:

- Ver un catálogo de cócteles disponibles.
- Agregar productos al carrito de compras.
- Enviar un formulario para agendar pedidos.
- Confirmar la entrega mediante llamada o mensaje.
- Visualizar todo en diseño responsive.

El sistema se construye para permitir futuro crecimiento (más categorías, reservas, componentes reutilizables).

---

## Arquitectura del proyecto

El proyecto utiliza una arquitectura modular basada en componentes para mantener orden y escalabilidad. La estructura actual es:
```
ecococteles/
├─ .vscode/
│ └─ extensions.json
├─ node_modules/
├─ public/
│ └─ vite.svg
├─ src/
│ ├─ assets/
│ ├─ components/
│ │ └─ HelloWorld.vue (u otros)
│ ├─ App.vue
│ ├─ main.js
│ └─ style.css
├─ .gitignore
├─ index.html
├─ package.json
├─ package-lock.json
├─ postcss.config.js
├─ tailwind.config.js
├─ vite.config.js
└─ README.md
```

---

## ✅ Funcionalidades planeadas

✔ Catálogo de cócteles  
✔ Carrito de compras  
✔ Formularios para agendar pedidos  
✔ Confirmación contra entrega  
✔ Estilos con Tailwind CSS  
✔ Diseño responsive  
✔ Arquitectura modular

*(No se incluirá registro de usuarios en esta versión.)*

---

## 🛠️ Tecnologías usadas

- **Vite** – entorno rápido de desarrollo  
- **Vue.js** – estructura principal del frontend  
- **Tailwind CSS** – estilos utilitarios  
- **PostCSS + Autoprefixer** – procesamiento de estilos  
- **JavaScript (ESM)** – lógica del frontend  
- **HTML5 & CSS3** – base del proyecto

---

## 📦 Instalación y ejecución

Clonar el proyecto:

```bash
git clone https://github.com/tu-usuario/ecococteles.git
cd ecococteles

Instalar dependencias:

npm install


Modo desarrollo:

npm run dev


Compilación para producción:

npm run build


```
This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

 Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

---

## 📨 Envío automático de pedidos (SMTP local)

Se añadió un pequeño servidor Node/Express que recibe las órdenes desde el frontend y envía un correo automáticamente usando Nodemailer (SMTP). Esto reemplaza el flujo anterior `mailto:` que abría el cliente de correo del usuario.

Archivos clave:
- `server/index.js` — endpoint POST `/api/send-order` que envía correos.
- `.env.example` — ejemplo de variables de entorno necesarias.
- `src/components/Cart.vue` — ahora hace `fetch` al endpoint para enviar la orden.

Pasos para probar localmente
1. Copia `.env.example` a `.env` y completa los valores SMTP:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu_correo@gmail.com
SMTP_PASS=TU_APP_PASSWORD_O_CONTRASEÑA
EMAIL_TO=destino@example.com
FROM_EMAIL="Tu Nombre <tu_correo@gmail.com>"
PORT=3000
```

2. Instala dependencias (si no lo hiciste):
```powershell
npm install
```

3. Inicia el servidor SMTP local (Express):
```powershell
npm run server
```

Verás en la consola un mensaje de verificación del transporter: `SMTP transporter verified` o un error que te indicará por qué falló la conexión (credenciales, bloqueo del proveedor, etc.).

4. En otra terminal, inicia el frontend:
```powershell
npm run dev
```

5. Prueba la app: añade productos al carrito, abre el Checkout y pulsa "Enviar orden". Si todo está bien, el backend enviará el correo a `EMAIL_TO` y la UI mostrará una confirmación.

Notas de seguridad y límites
- No subas tu `.env` a repositorios públicos.
- Para Gmail, si tienes 2FA debes crear una App Password y usarla en `SMTP_PASS`.
- En producción es recomendable desplegar el endpoint en un servidor/función (Vercel, Render, etc.) y guardar credenciales en secretos.

Problemas comunes
- `SMTP transporter verification failed` o `535 Authentication failed`: credenciales incorrectas o bloqueo del proveedor; revisa `SMTP_USER`/`SMTP_PASS` y usa App Password si corresponde.
- `ECONNECTION` o `ENOTFOUND`: revisa `SMTP_HOST`/`SMTP_PORT` y tu conexión a Internet.

Si quieres que despliegue el endpoint como función serverless o que integre un proveedor como SendGrid, dime y lo preparo.
