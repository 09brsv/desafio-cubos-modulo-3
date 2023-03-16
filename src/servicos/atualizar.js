const { consulta } = require("../conexao");

const atualizarUsuario = async (dadosUsuario) => {
  const { nome, email, senha, id } = dadosUsuario;
  return await consulta(
    "update usuarios set nome = $1, email = $2, senha = $3 where id = $4",
    [nome, email, senha, id]
  );
};

const atualizarTransacao = async (dadosTransacao) => {
  const { descricao, valor, data, categoria_id, usuario_id, tipo, id } = dadosTransacao;
  return await consulta(
    "update transacoes set descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5 where id = $6 and usuario_id = $7",
    [descricao, valor, data, categoria_id, tipo, id, usuario_id]
  );
};

module.exports = { atualizarUsuario, atualizarTransacao };
