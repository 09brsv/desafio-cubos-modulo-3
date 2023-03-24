const express = require("express");
const { autenticar } = require("./intermediarios/autenticacao");
const { transacoesControladores } = require("./controladores/transacao");
const { usuariosControladores } = require("./controladores/usuario");
const { transacoesIntermediarios } = require("./intermediarios/transacoes");
const { usuariosIntermediarios } = require("./intermediarios/usuarios");

const rotas = express.Router();

rotas.post("/usuario", usuariosIntermediarios.validarUsuario, usuariosControladores.cadastrarUsuario);
rotas.post("/login", usuariosIntermediarios.validarLogin, usuariosControladores.login);

rotas.use(autenticar)
rotas.get("/usuario", usuariosControladores.detalhar);
rotas.get("/categoria", transacoesControladores.listarCategorias);
rotas.get("/transacao", transacoesControladores.transacaoUsuario);
rotas.get("/transacao/extrato", transacoesControladores.obterExtrato);
rotas.get("/transacao/:id", transacoesIntermediarios.validarIdTransacao, transacoesControladores.transacaoId);

rotas.post("/transacao", transacoesIntermediarios.validarCamposTransacao, transacoesControladores.cadastrarTransacao);

rotas.put("/usuario", usuariosIntermediarios.validarUsuario, usuariosControladores.atualizar);
rotas.put("/transacao/:id", transacoesIntermediarios.validarTransacao, transacoesControladores.atualizar);

rotas.delete("/transacao/:id",transacoesIntermediarios.validarIdTransacao, transacoesControladores.excluirTransacao);

module.exports = rotas;
