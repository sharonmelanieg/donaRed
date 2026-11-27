import supabase from '../config/supabase.js';

export async function todosLosUsuarios() {
    const { data, error } = await supabase
        .from('usuarios')
        .select('*');

    if (error) {
        throw error;
    }

    return data;
}
export async function modificarUsuario(id, datos) {
     const { data, error } = await supabase
        .from('usuarios')
        .update(datos)
        .eq('id', id)
        .select()
        .single();
    if (error) {
        throw error;
    }

    return data;
        

}

export async function eliminarUsuario(id) {

    const { data, error } = await supabase
        .from('usuarios')
        .delete()
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;

    return data;
}