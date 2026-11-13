import express from 'express';
import userRouter from './router/usuariosRouter.js';
import publicacionRouter from './router/publicacionesRouter.js';
const app = express();

app.use(express.json());


app.use((req, res, next) => {
    console.log(`📦 Middleware → ${req.method} ${req.url}`);
    next();
});


app.use('/api', userRouter);
app.use('/api', publicacionRouter)

app.get('/', (req, res) => {
    res.send('🏠 Bienvenido! Visitá /api/users para probar el router.');
});


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`✅ Servidor Express corriendo en http://localhost:${PORT}`);
});