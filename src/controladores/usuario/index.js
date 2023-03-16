const login = require("./login");
const usuario = require("./cadastrarUsuario");
const detalharUsuario = require("./detalharUsuario");
const editarUsuario = require("./editarUsuario");

const usuariosControladores = {
  ...login,
  ...usuario,
  ...detalharUsuario,
  ...editarUsuario
};

module.exports = { usuariosControladores };
