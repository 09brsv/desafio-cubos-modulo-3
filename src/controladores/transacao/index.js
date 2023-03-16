const transacao = require("./transacao");
const categorias = require("./categorias");
const editarTransacao = require("./editarTransacao");
const excluir = require("./excluir");
const extratoUsuario = require("./extratoUsuario");
const cadastrar = require("./cadastrar");

const transacoesControladores = {
  ...categorias,
  ...transacao,
  ...editarTransacao,
  ...excluir,
  ...extratoUsuario,
  ...cadastrar
};

module.exports = { transacoesControladores };
