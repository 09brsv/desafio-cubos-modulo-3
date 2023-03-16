const { StatusCodes } = require("http-status-codes");
const { atualizarUsuario } = require("../../servicos/atualizar");
const { criptografia } = require("../../metodos/criptografiaSenha");


const atualizar = async (req, res) => {
  const { nome, email, senha } = req.body;
  const senhaCriptografada = criptografia(senha);

  const novoUsuario = {
    nome,
    email,
    senha: senhaCriptografada,
    id: req.usuario
  }
  await atualizarUsuario(novoUsuario);

  return res.status(StatusCodes.NO_CONTENT).send();

}

module.exports = { atualizar }