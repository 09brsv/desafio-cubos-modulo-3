const { hashSync, compareSync } = require("bcrypt");

const comparaSenha = (senha, senhaBanco) => {
  return compareSync(senha.toString(), senhaBanco)
}

const criptografia = (senha, valor = 10) => {
      return hashSync(senha.toString(), valor);
    };

module.exports = {
  comparaSenha,
  criptografia
}