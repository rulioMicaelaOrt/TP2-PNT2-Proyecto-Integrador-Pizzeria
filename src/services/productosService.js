// Acceso a productos.
// Por ahora usamos datos de ejemplo para poder construir la interfaz sin configurar
// todavía la base de datos. Más adelante podemos reemplazar esto por consultas a
// Supabase o por llamadas a la API de Express.
const productosIniciales = [
  {
    id: 1,
    nombre: 'Muzzarella',
    descripcion: 'Salsa de tomate, mozzarella y aceitunas.',
    precio: 8500,
    categoria: 'Clásicas',
    emoji: '🍕',
    destacado: true,
  },
  {
    id: 2,
    nombre: 'Napolitana',
    descripcion: 'Mozzarella, tomate fresco, ajo y albahaca.',
    precio: 9800,
    categoria: 'Clásicas',
    emoji: '🍅',
    destacado: true,
  },
  {
    id: 3,
    nombre: 'Jamón y morrones',
    descripcion: 'Mozzarella, jamón cocido y morrones asados.',
    precio: 10500,
    categoria: 'Especiales',
    emoji: '🫑',
    destacado: false,
  },
  {
    id: 4,
    nombre: 'Cuatro quesos',
    descripcion: 'Una combinación cremosa de cuatro quesos.',
    precio: 11200,
    categoria: 'Especiales',
    emoji: '🧀',
    destacado: true,
  },
  {
    id: 5,
    nombre: 'Fugazzeta',
    descripcion: 'Mozzarella abundante y cebolla dorada.',
    precio: 10200,
    categoria: 'Especiales',
    emoji: '🧅',
    destacado: false,
  },
  {
    id: 6,
    nombre: 'Rúcula y parmesano',
    descripcion: 'Mozzarella, rúcula fresca y parmesano.',
    precio: 11000,
    categoria: 'Especiales',
    emoji: '🌿',
    destacado: false,
  },
]

export async function obtenerProductos() {
  // Simula una función asíncrona: luego se conectará a una fuente real.
  return productosIniciales
}
