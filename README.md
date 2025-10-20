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
