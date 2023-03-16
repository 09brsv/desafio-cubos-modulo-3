const { StatusCodes } = require("http-status-codes");
const { criptografia } = require("../../metodos/criptografiaSenha");
const { salvarUsuario } = require("../../servicos/cadastro");

module.exports = {
  cadastrarUsuario: async (req, res) => {
    const { nome, email, senha } = req.body;

    const senhaCriptografada = criptografia(senha);

    const { rows } = await salvarUsuario(nome, email, senhaCriptografada)

    return res.status(StatusCodes.CREATED).json(rows[0]);
  },
};
