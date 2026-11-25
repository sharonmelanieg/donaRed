
import express from 'express';
import {reservasProductos } from "'../data/pedidos.js'";

const reservas = express.Router();

reservas.use((req, res, next) => {
    console.log(`📦 Middleware → ${req.method} ${req.url}`);
    next();
});






// POST: Crear una nueva reserva
reservas.post('/', (req, res) => {
    const { usuarioId, publicacionId } = req.body;

    if (!usuarioId || !publicacionId) {
        return res.status(400).json({
            mensaje: "Debes indicar el usuario y la publicación"
        });
    }

    const nuevaReserva = {
        //el id se genera automáticamente como el siguiente número entero disponible
        //MATh.max(0, ...reservasProductos.map(r => r.id)) + 1, quiere decir, se toma el id más alto de las reservas existentes
        //  y se le suma 1 para generar un nuevo id único
        id: Math.max(0, ...reservasProductos.map(r => r.id)) + 1,
        usuarioId,
        publicacionId,
        fechaReserva: new Date().toISOString(),
        estado: "pendiente"
    };

    reservasProductos.push(nuevaReserva);

    res.status(201).json({
        mensaje: "Reserva creada correctamente",
        reserva: nuevaReserva
    });
});

// PATCH: Modificar una reserva
reservas.patch('/:id', (req, res) => {
    const id = Number(req.params.id);

    const reserva = reservasProductos.find(
        reservado => reservado.id === id
    );

    if (!reserva) {
        return res.status(404).json({
            mensaje: "Reserva no encontrada"
        });
    }

    const { estado } = req.body;

    if (!estado) {
        return res.status(400).json({
            mensaje: "Debes indicar el nuevo estado"
        });
    }

    if (!estadosPermitidos.includes(estado)) {
        return res.status(400).json({
            mensaje: "Estado no válido",
            estadosPermitidos
        });
    }

    reserva.estado = estado;

    res.json({
        mensaje: "Reserva modificada correctamente",
        reserva
    });
});

export default reservas;
