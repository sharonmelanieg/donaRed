import supabase from '../config/supabase.js'

export async function publicacion() {
     const { data, error } = await supabase
        .from('publicaciones')
        .select('*');

    if (error) {
        throw error;
    }

    return data;
}
export async function publicacionesPorId(id) {
    const { data, error } = await supabase
        .from('publicaciones')
        .select()
        .eq('id', id)
        .single()

    if (error) throw error;

    return data;
}
export async function publicacionPorUsuario(usuarioId) {

    const { data, error } = await supabase
        .from('publicaciones')
        .select('*')
        .eq('usuario_id', usuarioId);

    if (error) throw error;

    return data;
}

export async function publicacionDisponibles() {

    const { data, error } = await supabase
        .from('publicaciones')
        .select('*')
        .eq('estado', 'disponible');

    if (error) throw error;

    return data;
}

export async function publicacionReservada() {

    const { data, error } = await supabase
        .from('publicaciones')
        .select('*')
        .eq('estado', 'reservada');

    if (error) throw error;

    return data;
}


export async function publicacionCategoria(categoria) {

    const { data, error } = await supabase
        .from('publicaciones')
        .select('*')
        .eq('estado', categoria);

    if (error) throw error;

    return data;
}


export async function modificarPublicacion(id, datos) {
     const { data, error } = await supabase
        .from('publicaciones')
        .update(datos)
        .eq('id', id)
        .select()
        .single();
    if (error) {
        throw error;
    }

    return data;
        

}

export async function eliminarPublicacion(id) {

    const { data, error } = await supabase
        .from('publicaciones')
        .delete()
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;

    return data;
}

export async function crearPublicacion(publicacion) {
const { data, error } = await supabase
        .from('publicaciones')
        .insert(publicaciones)
        .select()
        .single()

    if (error) throw error;

    return data;
    
}