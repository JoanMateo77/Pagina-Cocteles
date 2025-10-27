# Arquitectura de Componentes 

Este documento explica la arquitectura de la Tienda de Cocteles usando el método Feynman (explicación simple y práctica).

##  Vista General

Imagina construir una casa:
- **Cimientos** = Vue 3 + Vite (framework y herramientas base)
- **Estructura** = Componentes (las habitaciones de la casa)
- **Almacén** = Pinia Store (donde guardamos cosas)
- **Decoración** = Tailwind CSS (como se ve todo)

##  Componentes (Como Habitaciones)

### 1. App.vue (El Plano General)
```
Entrada (Navbar)
    │
    ├── Sección Inicio
    ├── Sección Visión
    ├── Sección Sobre Nosotros
    └── Sección Productos
         │
         └── Lista de Productos
```

### 2. ProductList y ProductCard (El Escaparate)
```
ProductList (Estante)
    │
    ├── ProductCard (Producto 1)
    ├── ProductCard (Producto 2)
    └── ProductCard (Producto 3)
```

### 3. Cart y CartItem (El Carrito)
```
Cart (Ventana Modal)
    │
    ├── Lista de CartItems
    │     ├── CartItem 1
    │     └── CartItem 2
    │
    └── Formulario de Pedido
```

##  Gestión de Estado (El Almacén)

### Pinia Store (cart.js)
Como una caja registradora que:
- Guarda qué productos eligió el cliente
- Calcula el total
- Recuerda todo aunque cierres la página

```javascript
Carrito
  │
  ├── Estado (items[])
  ├── Acciones (addItem, removeItem)
  └── Getters (total, cantidad)
```

##  Flujo de Datos

```
Usuario interactúa
      │
      v
  Componente
      │
      v
  Pinia Store
      │
      v
 LocalStorage
```

## Sistema de Pedidos

```
Usuario → Formulario
  │
  v
Validación
  │
  v
Generar Email
  │
  v
Enviar a endpoint: POST /api/send-order (servidor Node/Express que usa Nodemailer)
```

Detalles:
- El frontend valida el formulario y envía los datos al endpoint `/api/send-order`.
- El servidor (archivo `server/index.js`) crea un transporter Nodemailer usando credenciales SMTP (definidas en `.env`) y envía el correo al `EMAIL_TO` configurado.
- Este flujo permite envío automático sin intervención del usuario (a diferencia de `mailto:`).

## Tecnologías (Como Herramientas)

- **Vue 3** = Martillo y clavos (estructura básica)
- **Pinia** = Caja de herramientas (guardar cosas)
- **Tailwind** = Brocha y pintura (hacer que se vea bien)
- **localStorage** = Armario (guardar cosas para después)

##  Estructura de Archivos (El Plano)

```
src/
├── components/   (Piezas prefabricadas)
├── stores/      (Almacén)
├── data/        (Catálogo)
└── assets/      (Decoración)
```

## Cómo Se Usa Cada Pieza

### 1. Componentes Vue
```vue
<!-- Como bloques de LEGO -->
<template>
  <!-- Aquí va lo que se ve -->
</template>

<script setup>
  // Aquí va lo que hace
</script>
```

### 2. Store de Pinia
```javascript
// Como una caja con compartimentos
defineStore({
  state: {},     // Qué hay dentro
  actions: {},   // Qué podemos hacer
  getters: {}    // Qué información podemos obtener
})
```

### 3. Tailwind CSS
```html
<!-- Como etiquetas en la ropa -->
<div class="text-lg">  <!-- Texto grande -->
<div class="bg-blue">  <!-- Fondo azul -->
```

##  Decisiones de Diseño

1. **¿Por qué una sola página?**
   - Más rápido de cargar
   - Navegación suave
   - Más fácil de mantener

2. **¿Por qué Pinia?**
   - Más simple que Vuex
   - Perfecto para carritos
   - Fácil de persistir

3. **¿Por qué Tailwind?**
   - Desarrollo rápido
   - Consistencia
   - Responsive por defecto

## Escalabilidad

La arquitectura permite fácilmente:
1. Añadir más productos
2. Agregar categorías
3. Implementar usuarios
4. Añadir un backend real

##  Seguridad

Consideraciones:
- Validación de formularios
- Sanitización de datos
- Protección contra XSS
- Manejo seguro de localStorage

##  Responsive

El diseño se adapta a:
- 📱 Móvil (< 640px)
- 💻 Tablet (640px - 1024px)
- 🖥️ Desktop (> 1024px)

##  Mejoras Futuras

1. Backend real para emails
2. Sistema de usuarios
3. Panel de administración
4. Análisis de ventas
5. Integración con pagos