import { registrarUsuario, iniciarSesion } from './usuarios/autenticacion.js'

// Registrar
await registrarUsuario(
    'Juan',
    'juan@gmail.com',
    'MiPassword123'
)
