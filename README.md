# 🍕 La Masa — Pizzería Online

Aplicación web desarrollada como proyecto integrador de **Programación en Nuevas Tecnologías 2 (PNT2)**.

La Masa es una plataforma de una pizzería que permite a los clientes consultar productos, gestionar su carrito de compras, confirmar pedidos, registrarse, iniciar sesión, administrar su perfil y consultar su historial de compras. Además, incorpora un panel administrativo para gestionar productos (incluyendo activación y desactivación mediante borrado lógico) y clientes.

El proyecto utiliza Vue 3, Vue Router, Pinia y Supabase. También incorpora funcionalidades de Progressive Web App (PWA) y automatización de integración y despliegue continuo mediante GitHub Actions y Render.

---

## 📑 Tabla de contenidos

- [Descripción del proyecto](#-descripción-del-proyecto)
- [Objetivos](#-objetivos)
- [Tecnologías utilizadas](#-tecnologías-utilizadas)
- [Funcionalidades](#-funcionalidades)
- [Roles y permisos](#-roles-y-permisos)
- [Arquitectura](#-arquitectura)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Instalación y ejecución local](#-instalación-y-ejecución-local)
- [Configuración de Supabase](#-configuración-de-supabase)
- [Variables de entorno](#-variables-de-entorno)
- [Progressive Web App (PWA)](#-progressive-web-app-pwa)
- [Integración y despliegue continuo (CI/CD)](#-integración-y-despliegue-continuo-cicd)
- [Despliegue](#-despliegue)
- [Autores](#-autores)

---

## 📖 Descripción del proyecto

La Masa es una aplicación web orientada a la comercialización y gestión de productos de una pizzería.

Permite a los clientes navegar por el catálogo de productos activos, filtrarlos por categoría o nombre, agregarlos al carrito, confirmar su compra y gestionar su cuenta junto con su historial de pedidos.

También cuenta con funcionalidades administrativas que permiten gestionar el catálogo de productos y los clientes registrados.

La aplicación utiliza Supabase como Backend as a Service (BaaS), proporcionando autenticación, persistencia de datos y funcionalidades administrativas.

---

## 🎯 Objetivos

- Desarrollar una aplicación web utilizando Vue 3 y Composition API.
- Implementar navegación mediante Vue Router.
- Gestionar estados compartidos utilizando Pinia.
- Implementar autenticación y roles de usuario.
- Permitir la confirmación de compras y el registro de pedidos.
- Ofrecer al cliente la consulta de su historial de pedidos realizados.
- Realizar operaciones de alta, modificación y borrado lógico (activar/desactivar) de productos.
- Gestionar la administración de clientes registrados.
- Integrar una base de datos mediante Supabase.
- Implementar una Progressive Web App (PWA).
- Automatizar la integración y el despliegue mediante GitHub Actions.
- Publicar la aplicación utilizando Render.

---

## 🛠️ Tecnologías utilizadas

| Tecnología | Utilización |
|---|---|
| Vue 3 | Desarrollo de interfaces de usuario |
| Composition API | Organización de la lógica de componentes |
| Vite | Desarrollo y compilación |
| Vue Router | Navegación entre vistas |
| Pinia | Gestión de estado compartido |
| Supabase | Backend as a Service |
| Supabase Auth | Autenticación |
| Supabase Database | Persistencia de datos |
| Supabase Edge Functions | Operaciones administrativas |
| Row Level Security (RLS) | Seguridad y autorización de datos |
| Vite PWA Plugin | Implementación de PWA |
| Git | Control de versiones |
| GitHub | Repositorio y colaboración |
| GitHub Actions | Automatización CI/CD |
| Render | Hosting y despliegue |

---

## ✨ Funcionalidades

### 🛍️ Catálogo de productos

- Visualización del catálogo de pizzas activas.
- Filtro por categoría y búsqueda por nombre.
- Consulta de información de los productos.
- Obtención de productos desde Supabase.

### 🛒 Carrito de compras y confirmación de pedido

- Agregar productos al carrito.
- Incrementar y disminuir cantidades.
- Eliminar productos.
- Vaciar el carrito.
- Visualizar la cantidad total de productos.
- Calcular el importe total.
- Mostrar un mensaje cuando el carrito está vacío.
- Confirmar la compra, registrando el pedido en Supabase y vaciando el carrito automáticamente.

El estado del carrito se administra mediante Pinia, permitiendo compartir la información entre los componentes que lo utilizan.

### 🔐 Autenticación

- Registro de usuarios.
- Inicio de sesión.
- Recuperación de la sesión.
- Cierre de sesión.
- Diferenciación de accesos según el rol.

La autenticación se realiza mediante Supabase Auth.

### 📦 Administración de productos y borrado lógico

El administrador puede gestionar el catálogo de productos mediante operaciones de:

- Alta de nuevos productos.
- Modificación de productos existentes.
- Borrado lógico: activación y desactivación de productos sin eliminarlos físicamente de la base de datos.

Los productos desactivados dejan de mostrarse en el catálogo público pero permanecen almacenados en Supabase.

### 👥 Administración de clientes

El panel administrativo permite:

- Visualizar clientes registrados.
- Modificar nombre, teléfono y dirección.
- Modificar el email de un cliente.
- Eliminar clientes registrados.

Las operaciones que afectan a los usuarios de autenticación se realizan mediante una Supabase Edge Function.

### 👤 Perfil de usuario e historial de pedidos

Los usuarios autenticados pueden acceder a la sección **Mi perfil** para:

- Consultar y actualizar la información personal correspondiente a su cuenta (nombre, teléfono y dirección).
- Consultar su **historial de pedidos**, visualizando el número de pedido, la fecha, el detalle de productos comprados y el importe total de cada compra.

---

## 👤 Roles y permisos

La aplicación contempla dos roles principales.

### Cliente

Puede:

- Navegar por el catálogo de productos activos.
- Consultar y filtrar productos.
- Gestionar el carrito y confirmar compras.
- Registrarse e iniciar sesión.
- Administrar su perfil personal.
- Consultar su historial de pedidos.

### Administrador

Puede:

- Acceder al panel administrativo.
- Crear y editar productos.
- Activar y desactivar productos (borrado lógico).
- Consultar clientes registrados.
- Modificar información de clientes.
- Modificar emails de usuarios.
- Eliminar clientes.

Los permisos se complementan con políticas de seguridad implementadas en Supabase.

---

## 🏗️ Arquitectura

La Masa está desarrollada como una **SPA (Single Page Application)** utilizando Vue 3.

El frontend se comunica directamente con Supabase para consultar y modificar información.

La aplicación organiza su código en componentes, composables, servicios, stores y vistas.

### Componentes

Los componentes permiten reutilizar partes de la interfaz.

- `AppHeader.vue`: encabezado de la aplicación.
- `AppFooter.vue`: pie de página.
- `ProductoCard.vue`: representación de un producto.

### Composables

Los composables permiten reutilizar lógica de Vue entre diferentes componentes.

| Composable | Responsabilidad |
|---|---|
| `useAuth.js` | Lógica relacionada con la autenticación. |
| `useCarrito.js` | Acceso a las funcionalidades del carrito. |
| `useClientes.js` | Lógica relacionada con clientes. |
| `useProductos.js` | Lógica relacionada con productos y su estado activo/inactivo. |
| `usePedidos.js` | Lógica relacionada con el registro y la consulta de pedidos. |

### Services

La carpeta `services` centraliza las operaciones relacionadas con la comunicación con Supabase.

| Archivo | Responsabilidad |
|---|---|
| `supabase.js` | Configuración del cliente de Supabase. |
| `authService.js` | Operaciones de autenticación. |
| `productosService.js` | Operaciones relacionadas con productos y borrado lógico. |
| `clientesService.js` | Operaciones relacionadas con clientes. |
| `pedidosService.js` | Creación de pedidos y obtención del historial por cliente. |

### Store

Pinia permite administrar el estado compartido del carrito.

`carritoStore.js` contiene:

- `items`: productos agregados al carrito.
- `cantidadTotal`: cantidad total de unidades.
- `total`: importe total del carrito.
- Acciones para agregar, aumentar, disminuir, eliminar y vaciar productos.

### Router

Vue Router permite navegar entre las diferentes vistas de la aplicación y proteger las rutas que requieren autenticación o permisos de administrador.

---

## 📁 Estructura del proyecto

```text
pizzeria-inicial/
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── cd.yml
│
├── public/
│   ├── icon-192.png
│   └── icon-512.png
│
├── src/
│   ├── assets/
│   │   └── main.css
│   │
│   ├── components/
│   │   ├── AppFooter.vue
│   │   ├── AppHeader.vue
│   │   └── ProductoCard.vue
│   │
│   ├── composables/
│   │   ├── useAuth.js
│   │   ├── useCarrito.js
│   │   ├── useClientes.js
│   │   ├── usePedidos.js
│   │   └── useProductos.js
│   │
│   ├── router/
│   │   └── index.js
│   │
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── clientesService.js
│   │   ├── pedidosService.js
│   │   ├── productosService.js
│   │   └── supabase.js
│   │
│   ├── stores/
│   │   └── carritoStore.js
│   │
│   ├── views/
│   │   ├── AdminClientesView.vue
│   │   ├── AdminView.vue
│   │   ├── CarritoView.vue
│   │   ├── HomeView.vue
│   │   ├── LoginView.vue
│   │   ├── MiPerfilView.vue
│   │   ├── ProductosView.vue
│   │   └── RegistroView.vue
│   │
│   ├── App.vue
│   └── main.js
│
├── .env
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

---

## 🚀 Instalación y ejecución local

### Requisitos previos

- Node.js.
- npm.
- Git.
- Una cuenta de Supabase.

### 1. Clonar el repositorio

```bash
git clone https://github.com/rulioMicaelaOrt/TP2-PNT2-Proyecto-Integrador-Pizzeria.git
```

### 2. Ingresar al proyecto

```bash
cd TP2-PNT2-Proyecto-Integrador-Pizzeria
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto.

```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_PUBLISHABLE_KEY=tu_clave_publishable
```

Completar los valores utilizando las credenciales del proyecto Supabase.

### 5. Ejecutar la aplicación

```bash
npm run dev
```

Vite iniciará el servidor de desarrollo y mostrará la URL local para acceder a la aplicación.

### 6. Compilar para producción

```bash
npm run build
```

Los archivos compilados se generan en la carpeta `dist`.

### 7. Previsualizar la compilación

```bash
npm run preview
```

---

## 🗄️ Configuración de Supabase

Supabase se utiliza como backend de la aplicación.

### Supabase Auth

Se utiliza para:

- Registrar usuarios.
- Iniciar sesión.
- Recuperar sesiones.
- Cerrar sesión.
- Administrar usuarios autenticados.

### Tabla `productos`

Almacena el catálogo de pizzas de la pizzería:

- Identificador del producto.
- Nombre, descripción, categoría, precio, imagen y emoji.
- Indicador de producto destacado (`destacado`).
- Estado de disponibilidad (`activo`), utilizado para el borrado lógico de productos.

### Tabla `clientes`

La tabla pública `clientes` almacena información complementaria de los usuarios.

Entre los datos administrados se encuentran:

- Identificador del usuario.
- Nombre.
- Email.
- Teléfono.
- Dirección.

### Tabla `pedidos`

Registra las compras confirmadas por los clientes:

- Identificador del pedido (`id`).
- Fecha y hora de creación (`created_at`).
- Identificador del cliente (`cliente_id`).
- Importe total del pedido (`total`).
- Detalle de los productos comprados (`items` en formato JSON).

### Row Level Security (RLS)

Se implementan políticas de seguridad para controlar el acceso a los datos.

Las políticas contemplan:

- Consulta del perfil propio.
- Inserción y modificación del perfil propio.
- Registro y consulta de los pedidos propios del cliente autenticado.
- Acceso administrativo a productos y clientes.
- Operaciones administrativas autorizadas.

### Edge Function `administrar-clientes`

La aplicación utiliza una Supabase Edge Function para operaciones administrativas sobre usuarios.

Entre sus responsabilidades se encuentran:

- Modificación del email de un usuario.
- Eliminación de usuarios de autenticación.
- Mantenimiento de la información asociada en la tabla pública de clientes.

Las operaciones privilegiadas se realizan del lado servidor.

**Importante:** las claves privilegiadas de Supabase nunca deben incluirse en el frontend ni subirse al repositorio.

---

## 🔐 Variables de entorno

El archivo `.env.example` permite conocer las variables necesarias para configurar el proyecto.

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

Las variables reales se configuran en `.env` localmente y en Render para producción.

El archivo `.env` debe permanecer fuera del repositorio.

---

## 📱 Progressive Web App (PWA)

La aplicación incorpora funcionalidades de Progressive Web App mediante `vite-plugin-pwa`.

Características implementadas:

- Manifest de la aplicación.
- Nombre y nombre corto.
- Iconos de 192x192 y 512x512.
- Configuración de colores.
- Modo de visualización standalone.
- Service Worker.
- Precaching de recursos estáticos.
- Actualización automática del Service Worker.
- Instalación desde el navegador.

La aplicación puede instalarse en dispositivos compatibles y utilizarse como una aplicación independiente.

---

## 🔄 Integración y despliegue continuo (CI/CD)

El proyecto utiliza GitHub Actions para automatizar la integración y el despliegue.

Los workflows se encuentran en:

```text
.github/workflows/
├── ci.yml
└── cd.yml
```

### Continuous Integration (CI)

El workflow `ci.yml` se ejecuta ante:

- Push a la rama `master`.
- Pull Requests dirigidos a `master`.

Sus tareas son:

1. Descargar el código del repositorio.
2. Configurar Node.js.
3. Instalar dependencias.
4. Compilar la aplicación.
5. Verificar que la compilación finalice correctamente.

La compilación se realiza mediante:

```bash
npm ci
npm run build
```

### Continuous Deployment (CD)

El workflow `cd.yml` se ejecuta cuando finaliza el workflow `CI - La Masa`.

El despliegue se realiza únicamente cuando el CI finaliza exitosamente.

Sus tareas son:

1. Esperar la finalización del CI.
2. Verificar que el CI haya terminado correctamente.
3. Activar el Deploy Hook de Render.
4. Iniciar el despliegue de la aplicación.

El Deploy Hook se almacena como secreto de GitHub Actions:

```text
RENDER_DEPLOY_HOOK
```

La URL del Deploy Hook no se almacena directamente en el código del repositorio.

---

## 🌐 Despliegue

La aplicación se encuentra desplegada en Render como Static Site.

### URL de producción

https://tp2-pnt2-proyecto-integrador-pizzeria.onrender.com

### Configuración de Render

| Parámetro | Valor |
|---|---|
| Tipo de servicio | Static Site |
| Rama | master |
| Build Command | `npm install && npm run build` |
| Publish Directory | `dist` |

Render publica los archivos generados por Vite y permite acceder a la aplicación desde internet.

El despliegue también puede activarse desde GitHub Actions mediante el workflow de CD.

---

## 👩‍💻 Autores

Proyecto desarrollado para la materia Programación en Nuevas Tecnologías 2 (PNT2).

- Micaela Rulio
- Salomón Duek

---

## 📄 Licencia

Proyecto académico desarrollado con fines educativos.
