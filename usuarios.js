import express from 'express';

const app = express();

app.use(express.json());


app.use((req, res, next) => {
    console.log(`📦 Middleware → ${req.method} ${req.url}`);
  next(); // ¡Importante! next() continúa hacia la siguiente función o ruta.
});

// Datos de ejemplo (simulando una base de datos)
const users = [
    { id: 1, name: 'Ana' , producto:'mochila'},
    { id: 2, name: 'Luis', producto:'cuaderno'},
    { id: 3, name: 'Carla', producto:'cartuchera'},
    ];

app.get('/usuarios', (req, res) => {
    res.send(users);
});

app.patch('/usuarios/:id', (req, res) => {
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
app.post('/miCuenta', (req, res) => {
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

app.delete('/miCuenta/:id', (req, res) => {
    const idUsuario=parseInt(req.params.id)
    const miCuenta=users.findIndex(usuario=> usuario.id=== idUsuario)
    if (miCuenta==-1) {
        return res.status(400).json({mensaje: "Error en eliminar la cuenta"
        })}
    users.splice(miCuenta,1)
    res.json({users: users});
    
})