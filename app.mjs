import express from 'express';
import indexRouter from './routes/index.mjs';

const app = express();

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware para analizar el cuerpo de las solicitudes JSON
app.use(express.json());

app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

