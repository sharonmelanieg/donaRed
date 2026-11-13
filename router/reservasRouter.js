import express from 'express';

const reservas = express.Router();


reservas.use((req, res, next) => {
    console.log(`📦 Middleware → ${req.method} ${req.url}`);
    next(); 
});



export const reservasProductos = [
    {
        id: 1,
        usuarioId: 3,
        publicacionId: 1,
        fechaReserva: "2026-11-13",
        estado: "pendiente"
    },
    {
        id: 2,
        usuarioId: 2,
        publicacionId: 4,
        fechaReserva: "2026-11-13",
        estado: "aceptada"
    }
];


reservas.get('/reservas', (req, res) => {
    res.send(reservasProductos);
});


reservas.post('/reservas', (req, res) => {
    const nuevaReserva=req.body;
        console.log("Nuevo publicacion: ", nuevaReserva);
        if (!nuevaReserva || Object.keys(nuevaReserva).length === 0) {
            return res.status(400).json({
                mensaje: "Debes enviar los datos del pedido"
            });
        }
        
        nuevaReserva.id = reservasProductos.length + 1;
        reservasProductos.push(nuevaReserva);
        res.status(201).json(reservasProductos);
})

reservas.patch('/reservas/:id', (req, res) => {
    const id=parseInt(req.params.id)
        const modificacionReserva = reservasProductos.find(producto => producto.id === id);
        if (!modificacionReserva) {
            return res.status(400).json({
                mensaje: "Debes enviar los datos del producto a reservar"
            })
        }
        //primero aca tengo que verificar que datos realmento quiero cambiar para no modificar todo
        //
        if (condition) {
            
        }
        Object.assign(reservasProductos, req.body)
        res.json(reservasProductos)


})
//no uso un delete porque realmente cambia de estado las publicianes de estado publicado a reservadio


//realizar un crud: 
// c: create --> POST
// r: read--> con este usamos el GET 
// u: update --> PUT -- PATCH. put modifica todo lo que contiene y el patch solo lo que necesitas puntualmente
// d: delete --> DELETE
