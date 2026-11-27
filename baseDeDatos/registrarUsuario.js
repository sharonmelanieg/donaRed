
import supabase from '../config/supabase.js';

export async function registrarUsuarios(nombre, email, password) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password
    });

    if (error) {
        throw error;
    }

    if (data.user) {
        const { error: errorPerfil } = await supabase
            .from('usuarios')
            .insert({
                id: data.user.id,
                nombre,
                email
            });

        if (errorPerfil) {
            throw errorPerfil;
        }
    }

    return data.user;
}


