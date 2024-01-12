const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const { logRequest, validateRequestBody, logSuccess } = require('../middlewares');

let usuarios = [];

function validarUsuario(usuario) {
    let erros = [];

    if (!usuario.nome || typeof usuario.nome !== 'string') erros.push("nome inválido ou ausente");
    if (!usuario.email || typeof usuario.email !== 'string') erros.push("email inválido ou ausente");
    if (!usuario.pedido || typeof usuario.pedido !== 'string') erros.push("pedido inválido ou ausente");  

    return erros;
}

router.post('/cadastrar-usuario', logRequest, validateRequestBody, logSuccess, (req, res) => {
    const usuario = req.body;
    const erros = validarUsuario(usuario);

    if (erros.length) {
        return res.status(400).send({ mensagem: "Corpo da requisição inválido", erros });
    }

    const novoUsuario = {
        id: crypto.randomUUID(),
        ...usuario
    };

    usuarios.push(novoUsuario);
    res.status(201).send({ id: novoUsuario.id });
});

router.get('/listar-usuarios', logRequest, logSuccess, (req, res) => {
    res.send(usuarios);
});

module.exports = router;
