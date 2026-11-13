import express from 'express';
import { users } from '../data/usuarios.js';
import { donaciones } from '../data/publicaciones.js';

const publicacionRouter = express.Router();
//realizar un crud: 
// c: create --> POST
// r: read--> con este usamos el GET 
// u: update --> PUT -- PATCH. put modifica todo lo que contiene y el patch solo lo que necesitas puntualmente
// d: delete --> DELETE



publicacionRouter.use((req, res, next) => {
    console.log(`📦 Middleware → ${req.method} ${req.url}`);
    next();
});



// Datos de ejemplo (simulando una base de datos)


publicacionRouter.get('/publicaciones', (req, res) => {
    res.send(donaciones);
});


publicacionRouter.post('/publicaciones', (req, res) => {
    const nuevaDonacion=req.body;
    console.log("Nuevo publicacion: ", nuevaDonacion);
    if (!nuevaDonacion || Object.keys(nuevaDonacion).length === 0) {
        return res.status(400).json({
            mensaje: "Debes enviar los datos del pedido"
        });
    }
    const usuario = users.find(user => user.id === nuevaDonacion.usuarioId);
    if (!usuario) {
        return res.status(404).json({
            mensaje: 'El usuario no existe'
        });
    }
    nuevaDonacion.id = donaciones.length + 1;
    donaciones.push(nuevaDonacion);
    res.status(201).json(donaciones);
});


publicacionRouter.patch('/publicaciones/:id', (req, res) => {
    const id=parseInt(req.params.id)
    const donacion = donaciones.find(producto => producto.id === id);
    if (!donacion) {
        return res.status(400).json({
            mensaje: "Debes enviar los datos del producto a donar"
        })
    }
    Object.assign(donacion, req.body)
    res.json(donacion)

})

publicacionRouter.delete('/publicaciones/:id', (req, res) => {
    const idProducto=parseInt(req.params.id)
    const publicacion=donaciones.findIndex(producto=> producto.id=== idProducto)
    if (publicacion==-1) {
        return res.status(400).json({
            mensaje: "Error en eliminar la publicacion"
        })}
    donaciones.splice(publicacion,1)
    res.json({donaciones: donaciones});
    

})
export default publicacionRouter;