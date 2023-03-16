const { consulta } = require("../conexao")

const perfilUsuario = async (id) => {
    return await consulta('select * from usuarios where id = $1', [id])
}

module.exports = { perfilUsuario }