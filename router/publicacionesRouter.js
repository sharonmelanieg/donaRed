import express from 'express';
import { users } from '../data/usuarios.js';
import { donaciones } from '../data/publicaciones.js';
import { camposPermitidos } from '../data/publicaciones.js'
import { publicacion, publicacionDisponibles, publicacionReservada,publicacionCategoria, modificarPublicacion, eliminarPublicacion} from "../baseDeDatos/publicacion.js";

const publicacionRouter = express.Router();



publicacionRouter.use((req, res, next) => {
    console.log(`📦 Middleware → ${req.method} ${req.url}`);
    next();
});


publicacionRouter.get('/', (req, res) => {
    try {
        const publicaciones= await publicacion();
        res.status(201).json({ publicaciones});
    } catch (error) {
        console.error("Error:", error.message);

        res.status(500).json({mensaje: "Error al obtener todos las publicaciones"});
        
    };
});
publicacionRouter.get('/disponibles', async(req, res) => {
    try {
        const disponible= await publicacionDisponibles();
        res.status(201).json({ publicaciones});  
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({mensaje: "Error al obtener todos las publicaciones disponibles"});
    }
});

publicacionRouter.get('/reservadas', async(req, res) => {
    try {
        const reservada= await publicacionReservada();
        res.status(201).json({ reservada});  
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({mensaje: "Error al obtener todos las publicaciones disponibles"});
    }
});

//VERIFICAR BIEN COMO HACERLO
publicacionRouter.get('/usuario/:usuarioId', async(req, res) => {
    try {
        const publicacion=await publicacionPorUsuario(req.params.usuarioId)
        res.status(200).json(publicacion)
        
    } catch (error) {
         console.error("Error:", error.message);
        res.status(500).json({mensaje: "Error al obtener todos las publicaciones de ese usuario"});
    }
});
publicacionRouter.get('/categoria/:categoria', async(req, res) => {
    try {
        const categoria = req.params.categoria;
        const publicacionesCategoria = await publicacionCategoria(categoria);
        res.status(201).json({ publicacionesCategoria});
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({mensaje: "Error al obtener todos las publicaciones de esa categoria"});
    }
});
publicacionRouter.get('/:id', (req, res) => {
    try {
        const id=req.params.id;
        const publicacionId= await publicacionesPorId(id);
        res.status(500).json(publicacionId);

    } catch (error) {
         console.error("Error:", error.message);
        res.status(500).json({mensaje: "Error al obtener la publicacion de ese ID"});
    }
});





publicacionRouter.post('/', async(req, res) => {
    try {
        const {titulo, descripcion, categoria, imagen, ubicacion } = req.body;
        if (!titulo || !descripcion || !categoria || !ubicacion) {
                return res.status(400).json({
                    mensaje: "Debes completar el título, descripción, categoría y ubicación"
                });
            }
          const nuevaPublicacion = await crearPublicacion({
            titulo,
            descripcion,
            categoria,
            ubicacion,
            usuario_id,
            estado: "disponible"
        });

        res.status(201).json({
            mensaje: "Publicación creada correctamente",
            publicacion: nuevaPublicacion
        });


    } catch (error) {
        console.error(error.message);
        res.status(400).json({mensaje: error.message});
}
    });
    
   

publicacionRouter.patch('/:id', async(req, res) => {
    try {
      const id=req.params.id;
      const camposPermitidos=Object.keys(req.body)
      const modificar=await modificarPublicacion(id, camposPermitidos)
       if (camposRecibidos.length === 0 || camposRecibidos.some(campo =>!camposPermitidos.includes(campo))) 
        {
            return res.status(400).json({
                mensaje: "No enviaste campos válidos para modificar"
            });
        }

        const publicacion = await modificarPublicacion(req.params.id,req.body);
        res.status(200).json({
            mensaje: "Publicación modificada correctamente",
            publicacion
        });

    } catch (error) {
        res.status(400).json({
            mensaje: error.message
        });
    }
    
})

publicacionRouter.delete('/:id', async(req, res) => {
    try {
        const id= req.params.id;
        const eliminar= await eliminarPublicacion;
        res.status(200).json({ 
        mensaje: "Usuario eliminado correctamente",
        eliminar
    });
    } catch (error) {
    console.error("Error:", error.message);
    res.status(400).json({mensaje: error.message});
    }
})
export default publicacionRouter;



