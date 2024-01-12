const express = require('express');
const lojaRoutes = require('./lojas/rotas'); 
const usuarioRoutes = require('./usuarios/rotas');

const app = express();
app.use(express.json());

app.use(lojaRoutes);
app.use(usuarioRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
