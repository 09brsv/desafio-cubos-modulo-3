const { consulta } = require("../conexao");


const salvarUsuario = async (nome, email, senha) => {
  return await consulta(
    "insert into usuarios (nome,email,senha) values($1,$2,$3) returning id, nome, email",
    [nome, email, senha]
  );
}

const salvarTransacao = async(descricao, valor, data, categoria_id, usuario_id, tipo) => {
  return await consulta(
    "insert into transacoes (descricao, valor, data, categoria_id, usuario_id, tipo) values($1,$2,$3,$4,$5,$6) returning *",
    [descricao, valor, data, categoria_id,usuario_id, tipo]
  );
}

module.exports = {
  salvarUsuario,
  salvarTransacao
}