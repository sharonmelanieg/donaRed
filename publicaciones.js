app.use(express.json());

//realizar un crud: 
// c: create --> POST
// r: read--> con este usamos el GET 
// u: update --> PUT -- PATCH. put modifica todo lo que contiene y el patch solo lo que necesitas puntualmente
// d: delete --> DELETE



app.use((req, res, next) => {
    console.log(`📦 Middleware → ${req.method} ${req.url}`);
  next(); // ¡Importante! next() continúa hacia la siguiente función o ruta.
});



// Datos de ejemplo (simulando una base de datos)

const donaciones=[
    {
        id: 1,
        producto: "Mochila",
        categoria: "Útiles escolares",
        descripcion: "Mochila escolar en buen estado",
        estado: "disponible",
        usuarioId: 1
    },
    {
        id: 2,
        producto: "Cuadernos",
        categoria: "Librería",
        descripcion: "Cuadernos de 48 hojas nuevos",
        estado: "reservado",
        usuarioId: 2
    },
    {
        id: 3,
        producto: "Cartuchera",
        categoria: "Útiles escolares",
        descripcion: "Cartuchera con cierre en buen estado",
        estado: "disponible",
        usuarioId: 3
    },
    {
        id: 4,
        producto: "Lápices",
        categoria: "Librería",
        descripcion: "Caja de lápices de colores",
        estado: "disponible",
        usuarioId: 1
    },
    {
        id: 5,
        producto: "Zapatillas",
        categoria: "Calzado",
        descripcion: "Zapatillas talle 36 en buen estado",
        estado: "reservado",
        usuarioId: 2
    }
]
app.get('/publicaciones', (req, res) => {
    res.send(donaciones);
});
app.patch('/publicaciones/:id', (req, res) => {
    const id=parseInt(req.params.id)
    const donacion=users.find(user => user.id===id) //usuario=donacion
    if (!donacion) {
        return res.status(400).json({
            mensaje: "Debes enviar los datos del producto a donar"
        })
    }
    Object.assign(donacion, req.body)
    res.json(donacion)

})

app.delete('/publicaciones/:id', (req, res) => {
    const idProducto=parseInt(req.params.id)
    const publicacion=donaciones.findIndex(producto=> producto.id=== idProducto)
    if (publicacion==-1) {
        return res.status(400).json({
            mensaje: "Error en eliminar la publicacion"
        })}
    donaciones.splice(publicacion,1)
    res.json({donaciones: donaciones});
    

})
