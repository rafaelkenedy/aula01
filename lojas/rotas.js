const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const { logRequest, validateRequestBody, logSuccess } = require('../middlewares');

let lojas = [];

function validarLoja(loja) {
    let erros = [];

    if (!loja.tipo || typeof loja.tipo !== 'string') erros.push("tipo inválido ou ausente");
    if (!loja.nome || typeof loja.nome !== 'string') erros.push("nome inválido ou ausente");
    if (!loja.descricao || typeof loja.descricao !== 'string') erros.push("descricao inválida ou ausente");
    if (typeof loja.id_dono !== 'number') erros.push("id_dono inválido ou ausente");
    if (!loja.localizacao || typeof loja.localizacao !== 'object') erros.push("localizacao inválida ou ausente");
    if (typeof loja.localizacao.numero !== 'number') erros.push("numero inválido ou ausente na localizacao");
    if (!loja.localizacao.rua || typeof loja.localizacao.rua !== 'string') erros.push("rua inválida ou ausente na localizacao");
    if (!loja.localizacao.bairro || typeof loja.localizacao.bairro !== 'string') erros.push("bairro inválido ou ausente na localizacao");
    if (!loja.localizacao.cidade || typeof loja.localizacao.cidade !== 'string') erros.push("cidade inválida ou ausente na localizacao");
    if (!loja.localizacao.estado || typeof loja.localizacao.estado !== 'string') erros.push("estado inválido ou ausente na localizacao");
    if (!Array.isArray(loja.itens)) erros.push("itens devem ser uma lista");

    return erros;
}

router.post('/cadastrar-loja', logRequest, validateRequestBody, logSuccess, (req, res) => {
    const loja = req.body;
    const erros = validarLoja(loja);

    if (erros.length) {
        return res.status(400).send({ mensagem: "Corpo da requisição inválido", erros });
    }

    const novaLoja = {
        id: crypto.randomUUID(),
        ...loja
    };

    lojas.push(novaLoja);
    res.status(201).send({ id: novaLoja.id });
});

router.get('/listar-lojas', logRequest, logSuccess, (req, res) => {
    res.send(lojas);
});

module.exports = router;
