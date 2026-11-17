import express from 'express';
import { users } from '../data/usuarios.js';
import { donaciones } from '../data/publicaciones.js';
import { camposPermitidos } from '../data/publicaciones.js'

const publicacionRouter = express.Router();



publicacionRouter.use((req, res, next) => {
    console.log(`📦 Middleware → ${req.method} ${req.url}`);
    next();
});




publicacionRouter.get('/', (req, res) => {
    res.send(donaciones);
});
publicacionRouter.get('/disponibles', (req, res) => {
    const publicacionesDisponibles = donaciones.filter(publicacion => publicacion.estado === "disponible");
    res.json(publicacionesDisponibles);
});
publicacionRouter.get('/usuario/:usuarioId', (req, res) => {
    const usuarioId = Number(req.params.usuarioId);
    const publicacionesUsuario = donaciones.filter(publicacion => publicacion.usuarioId === usuarioId);
    res.json(publicacionesUsuario);
});
publicacionRouter.get('/categoria/:categoria', (req, res) => {
    const categoria = req.params.categoria;
    const publicacionesCategoria = donaciones.filter( publicacion => publicacion.categoria.toLowerCase() === categoria.toLowerCase());
    res.json(publicacionesCategoria);
});
publicacionRouter.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const publicacion = donaciones.find(donacion => donacion.id === id);
    if (!publicacion) {
        return res.status(404).json({ mensaje: "Publicacion no encontrada" });
    }
    res.json(publicacion);
});





publicacionRouter.post('/', (req, res) => {
    const {titulo, descripcion, categoria, imagen, ubicacion } = req.body;
   
     if (!titulo || !descripcion || !categoria || !ubicacion) {
        return res.status(400).json({
            mensaje: "Debes completar el título, descripción, categoría y ubicación"
        });
    }
    const idUsuario = Number(usuarioId);
     if (!Number.isInteger(idUsuario) || idUsuario <= 0) {
        return res.status(400).json({
            mensaje: "El usuario indicado no es válido"
        });
    }

    // 5. Buscamos si existe el usuario
    const usuario = users.find(user => user.id === idUsuario);

    if (!usuario) {
        return res.status(404).json({
            mensaje: "El usuario no existe"
        });
    }

    // 6. Creamos la nueva publicación
    const nuevaDonacion = {
        id: Math.max(0, ...donaciones.map(donacion => donacion.id)) + 1,
        titulo,
        descripcion,
        categoria,
        imagen: imagen || null,
        ubicacion,
        usuarioId: idUsuario,
        estado: "publicada"
    };

    // 7. Guardamos la publicación en el array
    donaciones.push(nuevaDonacion);

    // 8. Respondemos que se creó correctamente
    res.status(201).json({
        mensaje: "Publicación creada correctamente",
        publicacion: nuevaDonacion
    });
});


publicacionRouter.patch('/:id', (req, res) => {
    const id = Number(req.params.id);
    
    const donacion = donaciones.find(producto => producto.id === id);
    if (!donacion) {
        return res.status(404).json({mensaje: "La publicación no existe"});
    }
   
    const camposRecibidos = Object.keys(req.body);
    
 //QUE HACE EL SOME? lo que hace es recorrer el array de camposRecibidos y verifica si alguno de 
    // los campos recibidos no está incluido en el array de camposPermitidos.
    if (camposRecibidos.length === 0 || camposRecibidos.some(campo => !camposPermitidos.includes(campo))) {
    return res.status(400).json({
        mensaje: "No envíaste campos válidos para modificar"
    });
}
//aca lo que hace el Object.assign(donacion, req.body) es tomar el objeto donacion y actualizar 
// sus propiedades con los valores del objeto req.body.
    Object.assign(donacion, req.body);
    res.json({
    mensaje: "Publicación modificada correctamente",
    publicacion: donacion
    });
})

publicacionRouter.delete('/:id', (req, res) => {
    const idProducto=parseInt(req.params.id)
    const publicacion=donaciones.findIndex(producto=> producto.id=== idProducto)
    if (publicacion==-1) {
        return res.status(404).json({
            mensaje: "Error en eliminar la publicacion"
        })}
    donaciones.splice(publicacion,1)
    res.json({donaciones: donaciones});
    
    

})
export default publicacionRouter;



/*Endpoints DE PUBLICACIONES
Método	Endpoint	Función



PUT	/publicaciones/:id	Modificar una publicación
DELETE	/publicaciones/:id	Eliminar una publicación

También agregaría:
Método	Endpoint	Función
GET	/publicaciones/disponibles	Mostrar objetos disponibles
GET	/publicaciones/usuario/:usuarioId	Mostrar publicaciones de un usuario
GET	/publicaciones/categoria/:categoria	Filtrar por categoría



*/