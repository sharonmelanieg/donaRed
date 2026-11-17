import express from 'express';
import { donaciones } from '../data/publicaciones.js';
import { users } from '../data/users.js';
import {reservasProductos} from '../data/reservas.js';
import {estadosPermitidos} from '../data/reservas.js';
const reservas = express.Router();


reservas.use((req, res, next) => {
    console.log(`📦 Middleware → ${req.method} ${req.url}`);
    next(); 
});

reservas.get('/', (req, res) => {
    res.send(reservasProductos);
});


reservas.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const reserva = reservasProductos.find(reservado => reservado.id === id);
    if (!reserva) {
        return res.status(404).json({ mensaje: "Reserva no encontrada" });
    }
    res.json(reserva);
});
//aca lo que hago es mostrar todas las reservas de un usuario en particular por id
reservas.get('/usuarios/:usuarioId', (req, res) => {
    const usuarioId = Number(req.params.usuarioId);
    const reservasUsuario = reservasProductos.filter(reserva => reserva.usuarioId === usuarioId);
    res.json(reservasUsuario);

});
//aca lo que hago es mostrar todas las reservas de una publicacion en particular

reservas.get('/publicaciones/:publicacionId', (req, res) => {
    const publicacionId = Number(req.params.publicacionId);
    const reservasPublicacion = reservasProductos.filter(reserva => reserva.publicacionId === publicacionId);
    res.json(reservasPublicacion);

});
//aca hago un post para crear una reserva, primero verifico que el usuario y la publicacion existan, 
// luego verifico que el usuario no sea el mismo que creo la publicacion y
//  que la publicacion este disponible para reservar
// y cuando se cumplen todas las condiciones creo la reserva y la agrego al array de reservasProductos

reservas.post('/', (req, res) => {
        const usuarioId = Number(req.body.usuarioId);
        const publicacionId = Number(req.body.publicacionId);
        //lo que hace este if es verificar que el usuarioId y publicacionId sean numeros enteros positivos, 
        // si no lo son devuelve un error 400
        if (!Number.isInteger(usuarioId) || usuarioId <= 0 || !Number.isInteger(publicacionId) || publicacionId <= 0) 
            {
                return res.status(400).json({mensaje: "Debes indicar el usuario y la publicación"});
            }
        const usuario = users.find(user => user.id === usuarioId);

        if (!usuario) {
                return res.status(404).json({mensaje: "El usuario no existe"});
        }
        const publicacion = donaciones.find(publicacion => publicacion.id === publicacionId);

        if (!publicacion) {
                return res.status(404).json({mensaje: "La publicación no existe"});
        }
        if (publicacion.usuarioId === usuarioId) {
            return res.status(400).json({
                mensaje: "No puedes reservar tu propia publicación"
            });
        }
        if (publicacion.estado !== "publicada") {
            return res.status(400).json({
                mensaje: "Esta publicación no está disponible"
            });
        }

        const nuevaReserva = {
            id: Math.max(0, ...reservasProductos.map(r => r.id)) + 1,
            usuarioId,
            publicacionId,
            fechaReserva: new Date().toISOString(),
            estado: "pendiente"
        };

        reservasProductos.push(nuevaReserva);

        res.status(201).json({
            mensaje: "Solicitud de reserva creada correctamente",
            reserva: nuevaReserva
        });
})
//aca hago un patch para modificar el estado de una reserva, primero verifico que la reserva exista, 
// luego verifico que el estado enviado sea valido y una vez que se cumplen las condiciones verifico 
// el estado de la reserva y de la publicacion para poder cambiar el estado de la reserva y
//  de la publicacion segun corresponda
reservas.patch('/:id', (req, res) => {
    const id = Number(req.params.id);
    const reserva = reservasProductos.find(reserva => reserva.id === id);
    if (!reserva){
        return res.status(404).json({mensaje: "La reserva no existe"});
        }
    const { estado } = req.body;
    if (!estadosPermitidos.includes(estado)) {
        return res.status(400).json({mensaje: "El estado enviado no es válido"});
    }
    const publicacion = donaciones.find(publicacion => publicacion.id === reserva.publicacionId);
    if (!publicacion) {
        return res.status(404).json({mensaje: "La publicación no existe"});
    }
    if (estado === "aceptada") {
        if (reserva.estado !== "pendiente") {
            return res.status(400).json({mensaje: "Esta reserva ya fue procesada"});
        }
        if (publicacion.estado !== "publicada") {
            return res.status(400).json({mensaje: "La publicación ya no está disponible"});
        }
        publicacion.estado = "reservada";
        //El forEach recorre todas las reservas y cambia el estado de las reservas pendientes de 
        // la misma publicación a "rechazada"
        reservasProductos.forEach(otraReserva => {
            if (
                otraReserva.publicacionId === reserva.publicacionId &&
                otraReserva.id !== reserva.id &&
                otraReserva.estado === "pendiente"
            ) {
                otraReserva.estado = "rechazada";
            }
        });
    }
    if (estado === "rechazada" || estado === "cancelada") {
        if (reserva.estado !== "pendiente" && reserva.estado !== "aceptada") {
            return res.status(400).json({
                mensaje: "No se puede modificar esta reserva"
            });
        }
        if (reserva.estado === "aceptada") {
            publicacion.estado = "publicada";
        }
    }

    if (estado === "completada") {
        if (reserva.estado !== "aceptada") {
            return res.status(400).json({
                mensaje: "Solo puedes completar una reserva aceptada"
            });
        }
        publicacion.estado = "entregada";
    }
    reserva.estado = estado;

    res.json({mensaje: "Reserva actualizada correctamente",reserva,publicacion});
})



export default reservas;