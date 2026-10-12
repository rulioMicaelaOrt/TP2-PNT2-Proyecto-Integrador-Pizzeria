// Cliente Axios preparado para TP2.
// Cuando exista la API de Express, configurá VITE_API_URL en el archivo .env.
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
