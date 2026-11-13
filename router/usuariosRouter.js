import express from 'express';
import { users } from '../data/usuarios.js';
const userRouter = express.Router();


userRouter.use((req, res, next) => {
    console.log(`📦 Middleware → ${req.method} ${req.url}`);
    next(); 
});



userRouter.get('/usuarios', (req, res) => {
    res.send(users);
});

userRouter.patch('/usuarios/:id', (req, res) => {
    const id=parseInt(req.params.id)
    const usuario=users.find(user => user.id===id)
    if (!usuario) {
        return res.status(400).json({
            mensaje: "Debes enviar los datos del pedido"
        })
    }
    Object.assign(usuario, req.body)
    res.json(usuario)

})
userRouter.post('/miCuenta', (req, res) => {
    const nuevoUsuario = req.body;
    console.log("Nuevo usuario: ", nuevoUsuario);
    if (!nuevoUsuario || Object.keys(nuevoUsuario).length === 0) {
        return res.status(400).json({
            mensaje: "Debes enviar los datos del pedido"
        });
    }
    nuevoUsuario.id = users.length + 1;
    users.push(nuevoUsuario);
    res.status(201).json(users);
});

userRouter.delete('/miCuenta/:id', (req, res) => {
    const idUsuario=parseInt(req.params.id)
    const miCuenta=users.findIndex(usuario=> usuario.id=== idUsuario)
    if (miCuenta==-1) {
        return res.status(400).json({mensaje: "Error en eliminar la cuenta"
        })}
    users.splice(miCuenta,1)
    res.json({users: users});
    
})

export default userRouter;