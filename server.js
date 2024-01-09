const express = require('express');
const crypto = require('crypto');

const app = express();
app.use(express.json());

let lojas = [];

function validarLoja(loja) {
    if (!loja.tipo || typeof loja.tipo !== 'string') return false;
    if (!loja.nome || typeof loja.nome !== 'string') return false;
    if (!loja.descricao || typeof loja.descricao !== 'string') return false;
    if (typeof loja.id_dono !== 'number') return false;
    if (!loja.localizacao || typeof loja.localizacao !== 'object') return false;
    if (typeof loja.localizacao.numero !== 'number') return false;
    if (!loja.localizacao.rua || typeof loja.localizacao.rua !== 'string') return false;
    if (!loja.localizacao.bairro || typeof loja.localizacao.bairro !== 'string') return false;
    if (!loja.localizacao.cidade || typeof loja.localizacao.cidade !== 'string') return false;
    if (!loja.localizacao.estado || typeof loja.localizacao.estado !== 'string') return false;
    if (!Array.isArray(loja.itens)) return false;

    return true;
}

app.post('/cadastrar-loja', (req, res) => {
    const loja = req.body;
    
    if (!validarLoja(loja)) {
        return res.status(400).send({ mensagem: "Corpo da requisição inválido" });
    }
    
    const novaLoja = {
        id: crypto.randomUUID(),
        ...loja
    };

    lojas.push(novaLoja);
    res.status(201).send({ id: novaLoja.id });
});

app.get('/listar-lojas', (req, res) => {
    res.send(lojas);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
