
import supabase from '../config/supabase.js'

export async function iniciarSesion(email, password) {

const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
})

if (error) {
    console.log("Error:", error.message)
    alert("La contraseña o usuario es incorrecto")
    return
}


console.log("Inicio de sesión exitoso")
console.log(data.user)

}

