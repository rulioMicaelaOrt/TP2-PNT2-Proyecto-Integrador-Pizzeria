// Cliente de Supabase para PNT 2.
// Completá VITE_SUPABASE_URL y VITE_SUPABASE_PUBLISHABLE_KEY en .env.
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null
