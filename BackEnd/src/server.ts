import express from 'express';
import cors from 'cors';
import curriculoRoutes from './routes/curriculoRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/curriculos', curriculoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
