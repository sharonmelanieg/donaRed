import supabase from '../config/supabase.js'

export async function reservas() {
     const { data, error } = await supabase
        .from('reserva')
        .select('*');

    if (error) {
        throw error;
    }

    return data;
}


export async function reservasPorId(id) {
    const { data, error } = await supabase
        .from('publicaciones')
        .select()
        .eq('id', id)
        .single()

    if (error) throw error;

    return data;
}

export async function reservasPorUsuario(usuarioId) {

    const { data, error } = await supabase
        .from('publicaciones')
        .select('*')
        .eq('usuario_id', usuarioId);

    if (error) throw error;

    return data;
}

export async function crearPublicacion(reservas) {
const { data, error } = await supabase
        .from('publicaciones')
        .insert(publicaciones)
        .select()
        .single()

    if (error) throw error;

    return data;
    
}
