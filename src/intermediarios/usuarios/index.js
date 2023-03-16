const validalogin = require("./validaLogin");
const validaUsuario = require("./validaUsuario");

const usuariosIntermediarios = {
  ...validalogin,
  ...validaUsuario,
};

module.exports = { usuariosIntermediarios };
