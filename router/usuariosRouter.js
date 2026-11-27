import express from 'express';
import {registrarUsuarios} from "../baseDeDatos/registrarUsuario.js";
import {publicaciones } from "../baseDeDatos/loginUsuarios.js";
import {todosLosUsuarios, modificarUsuario, eliminarUsuario} from "../baseDeDatos/usuarios.js";
const userRouter = express.Router();


userRouter.use((req, res, next) => {
    console.log(`📦 Middleware → ${req.method} ${req.url}`);
    next(); 
});



userRouter.get('/usuarios', async(req, res) => {
    try {
        const todosUsuarios= await usuario();
        res.status(201).json({ todosLosUsuarios});

    } catch (error) {
         console.error("Error:", error.message);

        res.status(500).json({mensaje: "Error al obtener todos los usuarios"});
    }
});

userRouter.patch('/usuarios/:id', async(req, res) => {
    try {
        const id= req.params.id;
        const modificaUsuario= await modificarUsuario(id);
        res.status(200).json({
            mensaje: "Usuario modificado correctamente",
            usuario: nuevoUsuario
        });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(400).json({mensaje: error.message});
    }

})
userRouter.post('/registrarse', async (req, res) => {
     try {
        const { nombre, email, password } = req.body;

        if (!nombre || !email || !password) {
            return res.status(400).json({mensaje: "Debes completar todos los campos"});
        }

        const nuevoUsuario = await registrarUsuarios(nombre,email,password);

        res.status(201).json({
            mensaje: "Usuario registrado correctamente",
            usuario: nuevoUsuario
        });

    } catch (error) {

        console.error("Error:", error.message);

        res.status(400).json({mensaje: error.message});
    }
});

userRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
         if (!email || !password) {
            return res.status(400).json({mensaje: "Debes completar los campos"});
        }
         const data = await loginUsuarios(email, password);
         res.status(200).json({
            mensaje: "Inicio de sesión exitoso",
            usuario: data.user,
            token: data.session.access_token
        });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(400).json({mensaje: error.message});
        
    }

});


userRouter.delete('/login/:id', async (req, res) => {
   try {
    const id= req.params.id;
    const eliminar= await eliminarUsuario;
    res.status(200).json({ 
        mensaje: "Usuario eliminado correctamente",
        eliminar
    });
   } catch (error) {
    console.error("Error:", error.message);
    res.status(400).json({mensaje: error.message});
   }
    
})


export default userRouter;