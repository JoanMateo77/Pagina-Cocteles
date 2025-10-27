# Componentes Vue 

Guía simple de los componentes de la Tienda de Cocteles, explicada de manera clara y práctica.

##  Componentes Principales

### ProductList.vue
**¿Qué es?** Como un estante de productos en una tienda.

```vue
<ProductList>
    └── Muestra todos los productos disponibles
        └── Usa <ProductCard> para cada producto
```

**Cómo usarlo:**
```vue
<template>
  <ProductList />
</template>
```

### ProductCard.vue
**¿Qué es?** Como una etiqueta de producto con foto y botón de comprar.

```vue
<ProductCard>
    ├── Imagen del coctel
    ├── Nombre y descripción
    ├── Precio
    └── Botón "Agregar"
```

**Cómo usarlo:**
```vue
<template>
  <ProductCard 
    :product="{ 
      id: 'margarita',
      name: 'Margarita',
      price: 8.50,
      image: '/margarita.jpg',
      description: 'Clásico coctel...'
    }" 
  />
</template>
```

### Cart.vue
**¿Qué es?** Como una ventana de checkout en una tienda online.

```vue
<Cart>
    ├── Lista de productos elegidos
    │   └── Usa <CartItem> para cada producto
    ├── Formulario de pedido
    └── Botones (Vaciar/Comprar)
```

**Cómo usarlo:**
```vue
<template>
  <Cart 
    :visible="showCart"
    @close="showCart = false"
  />
</template>
```

### CartItem.vue
**¿Qué es?** Como una línea en tu ticket de compra.

```vue
<CartItem>
    ├── Imagen miniatura
    ├── Nombre y precio
    ├── Control de cantidad
    └── Botón eliminar
```

**Cómo usarlo:**
```vue
<template>
  <CartItem 
    :item="{ 
      id: 'margarita',
      name: 'Margarita',
      price: 8.50,
      quantity: 2
    }"
    @update="updateQuantity"
    @remove="removeItem"
  />
</template>
```

##  Flujo de Datos

### 1. Añadir al Carrito
```
ProductCard
    │
    ▼
Pinia Store ───► localStorage
    │
    ▼
Actualiza Cart
```

### 2. Actualizar Cantidad
```
CartItem
    │
    ▼
Pinia Store ───► localStorage
    │
    ▼
Actualiza total
```

### 3. Hacer Pedido
```
Cart
  │
  ▼
Validar formulario
  │
  ▼
Generar email (cuerpo del mensaje)
  │
  ▼
POST /api/send-order  --->  Backend (Nodemailer) ---> Email destinatario
```

Notas:
- El componente `Cart.vue` ahora hace un POST a `/api/send-order` con los campos del formulario y los items del carrito.
- El backend (archivo `server/index.js`) envía el correo usando SMTP; ver `.env.example` para variables requeridas.

##  Eventos

### ProductCard
- **@click="addToCart"** → Añade producto al store

### CartItem
- **@update** → Actualiza cantidad
- **@remove** → Elimina item

### Cart
- **@close** → Cierra modal
- **@submit** → Envía pedido

##  Estilos (Tailwind)

### Clases Comunes
```html
<!-- Cards -->
<div class="rounded-lg shadow-md p-4">

<!-- Botones -->
<button class="bg-blue-500 text-white px-4 py-2 rounded">

<!-- Inputs -->
<input class="border rounded px-2 py-1">
```

##  Props y Eventos

### ProductCard
```typescript
Props:
  product: {
    id: string
    name: string
    price: number
    image: string
    description: string
  }

Eventos:
  ninguno (usa store directamente)
```

### CartItem
```typescript
Props:
  item: {
    id: string
    name: string
    price: number
    quantity: number
    image?: string
  }

Eventos:
  update(id: string, quantity: number)
  remove(id: string)
```

### Cart
```typescript
Props:
  visible: boolean

Eventos:
  close()
```

##  Estado (Pinia Store)

```typescript
// Estructura del carrito
interface CartState {
  items: {
    id: string
    name: string
    price: number
    quantity: number
    image?: string
  }[]
}

// Getters
totalItems: number
totalPrice: number

// Actions
addItem(product)
removeItem(id)
updateQuantity(id, qty)
clearCart()
```

##  Ejemplos de Uso

### 1. Página Principal
```vue
<template>
  <ProductList />
  <Cart 
    :visible="showCart"
    @close="showCart = false"
  />
</template>
```

### 2. Carrito con Items
```vue
<template>
  <div v-for="item in cartItems" :key="item.id">
    <CartItem 
      :item="item"
      @update="updateItem"
      @remove="removeItem"
    />
  </div>
</template>
```

### 3. Formulario de Pedido
```vue
<template>
  <form @submit.prevent="submitOrder">
    <input v-model="name" required>
    <input v-model="email" type="email" required>
    <textarea v-model="address"></textarea>
    <button type="submit">Enviar Pedido</button>
  </form>
</template>
```

##  Depuración

### Verificar Estado
```javascript
const cart = useCartStore()
console.log(cart.items)
console.log(cart.totalPrice)
```

### Eventos Comunes
1. Carrito vacío
2. Email inválido
3. Cantidad < 1
4. localStorage lleno

##  Mantenimiento

### Actualizar Productos
```javascript
// src/data/products.js
export default [
  {
    id: 'nuevo-coctel',
    name: 'Nuevo Coctel',
    price: 9.99,
    // ...
  }
]
```

### Modificar Estilos
```vue
<!-- Usar clases Tailwind -->
<div class="nuevo-estilo">
  <!-- contenido -->
</div>
```

##  Responsive

### Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Media Queries (Tailwind)
```html
<div class="
  w-full          <!-- Mobile -->
  md:w-1/2       <!-- Tablet -->
  lg:w-1/3       <!-- Desktop -->
">
```

##  Validaciones

### Formulario
- Nombre: requerido
- Email: formato válido
- Dirección: opcional
-telefono : requerido

### Cantidades
- Mínimo: 1
- Máximo: stock disponible