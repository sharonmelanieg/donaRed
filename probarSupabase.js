
import { supabase } from './supabase.js';

const { data, error } = await supabase
    .from('publicaciones')
    .select('*');

if (error) {
    console.log('Error al conectar:', error.message);
} else {
    console.log('¡Consulta exitosa a Supabase!');
    console.log(data);
}
