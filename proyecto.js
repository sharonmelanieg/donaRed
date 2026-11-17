import express from 'express';
import userRouter from './router/usuariosRouter.js';
import publicacionRouter from './router/publicacionesRouter.js';
import reservasRouter from './router/reservasRouter.js';
const app = express();

app.use(express.json());


app.use((req, res, next) => {
    console.log(`📦 Middleware → ${req.method} ${req.url}`);
    next();
});


app.use('/api/usuarios', userRouter);
app.use('/api/publicaciones', publicacionRouter);
app.use('/api/reservas', reservasRouter);

app.get('/', (req, res) => {
    res.send('🏠 Bienvenido! Visitá /api/usuarios para probar el router.');
});


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`✅ Servidor Express corriendo en http://localhost:${PORT}`);
});