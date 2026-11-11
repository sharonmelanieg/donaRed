import express from 'express';

const app = express();

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


/* Nuevo usuario
{
    "name": "Pedro",
    "producto": "Lapicera",
    "estado": "reservado"
}
*/




app.get('/', (req, res) => {
    res.json(donaciones)
})




const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ Servidor Express corriendo en http://localhost:${PORT}`);
});


