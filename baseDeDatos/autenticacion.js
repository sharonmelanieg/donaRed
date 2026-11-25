import { supabase } from './supabase.js'

async function registrarUsuario(nombre, email, password) {

const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password
})

if (error) {
    console.log("Error:", error.message)
    return
}

console.log("Usuario registrado:", data.user)



if (data.user) {
    const { error: errorPerfil } = await supabase
        .from('usuarios')
        .insert({
                id: data.user.id,
                nombre: nombre,
                email: email
            })

        if (errorPerfil) {
            console.error(errorPerfil.message)
            alert('La cuenta se creó, pero hubo un problema al guardar el perfil.')
            return
        }
    }

    alert('Registro realizado correctamente')
}



