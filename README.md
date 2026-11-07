# Ecococteles: tienda web de cócteles con pedido por correo

Catálogo de cócteles con carrito de compras y formulario de pedido. Al confirmar, un pequeño servidor Express envía el pedido por correo (SMTP) para coordinar la entrega y el pago contra entrega; no hay pagos en línea ni registro de usuarios.

**Demo:** https://pagina-cocteles-lina.vercel.app

> La demo publica solo el frontend. El envío del pedido llama a `http://localhost:3000/api/send-order`, así que para probarlo de punta a punta hay que levantar el servidor localmente (ver [Cómo correrlo](#cómo-correrlo)).

## Qué hace

- Muestra un catálogo de 6 cócteles con imagen, descripción y precio, definidos en `src/data/products.js`.
- Permite agregar productos al carrito, cambiar cantidades, quitar productos y vaciarlo; el total se calcula en el store.
- Conserva el carrito entre recargas de página guardándolo en `localStorage`.
- Pide nombre, teléfono, correo y dirección de entrega, y valida el formato del correo y del teléfono (mínimo 10 dígitos) antes de enviar.
- Envía el pedido a `POST /api/send-order`; el servidor arma el detalle (productos, cantidades, total) y lo manda por correo con Nodemailer.
- Incluye secciones de inicio, visión y misión, y sobre nosotros, con diseño responsive y modo oscuro según el sistema.

## Stack

| Parte | Tecnología |
| --- | --- |
| Frontend | Vue 3.5 (`<script setup>`), Vite 7, Tailwind CSS 3.4, PostCSS + Autoprefixer |
| Estado | Pinia 2.3 |
| Servidor de correo | Node.js con Express 4.18, Nodemailer 6.9, cors y dotenv |

Las versiones exactas están en [`package.json`](package.json).

## Estructura

```
├─ server/
│  └─ index.js            # Express: GET /ping y POST /api/send-order (SMTP)
├─ src/
│  ├─ App.vue             # Navegación, secciones de contenido y apertura del carrito
│  ├─ components/
│  │  ├─ ProductList.vue  # Grilla del catálogo
│  │  ├─ ProductCard.vue  # Tarjeta de producto con botón "Agregar"
│  │  ├─ Cart.vue         # Modal del carrito y formulario de pedido
│  │  └─ CartItem.vue     # Fila del carrito con control de cantidad
│  ├─ stores/cart.js      # Store de Pinia con persistencia en localStorage
│  └─ data/products.js    # Catálogo de productos
├─ docs/                  # Documentación ampliada
└─ .env.example           # Variables SMTP necesarias para el servidor
```

## Cómo correrlo

Requisitos: Node.js y npm.

```bash
npm install
cp .env.example .env      # completa los datos SMTP
npm run server            # servidor de correo en http://localhost:3000
npm run dev               # en otra terminal: frontend con Vite
```

Otros comandos: `npm run build` (compilación de producción) y `npm run preview` (sirve la compilación).

Variables del servidor (`.env`): `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_TO` (destinatario de los pedidos), `FROM_EMAIL` (opcional) y `PORT` (opcional, 3000 por defecto). Con Gmail y verificación en dos pasos, `SMTP_PASS` debe ser una contraseña de aplicación.

Al iniciar, el servidor verifica la conexión SMTP y escribe en consola `SMTP transporter verified` o el motivo del fallo (credenciales, host o puerto incorrectos).

## Decisiones técnicas

- **El correo se envía desde el servidor, no desde el navegador.** Reemplaza un flujo anterior con `mailto:` que dependía del cliente de correo del usuario y mantiene las credenciales SMTP fuera del frontend.
- **Pinia con persistencia manual en `localStorage`.** El store guarda el carrito tras cada cambio (clave `cocteles_cart_v1`), sin librerías adicionales.
- **Catálogo como datos estáticos.** Los productos viven en un archivo JS, suficiente para un catálogo pequeño y fácil de reemplazar por una API más adelante.
- **Validación en dos capas.** El formulario valida correo y teléfono; el servidor rechaza con `400` los pedidos sin nombre, correo o teléfono.

## Documentación

- [Arquitectura](docs/ARCHITECTURE.md): componentes, flujo de datos y sistema de pedidos.
- [Componentes](docs/COMPONENTS.md): props, eventos y ejemplos de uso.
- [Historia del desarrollo](docs/HISTORY.md): fases y decisiones del proyecto.

---

Hecho por [Joan Mateo Cardona](https://github.com/JoanMateo77).
