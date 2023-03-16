const { perfilUsuario } = require("../../servicos/detalhar")

const detalhar = async (req, res) => {
    const usuario = await perfilUsuario(req.usuario)

    const filtra = {
        id: usuario.rows[0].id,
        nome: usuario.rows[0].nome,
        email: usuario.rows[0].email
    }

    return res.json(filtra)
}

module.exports = { detalhar }