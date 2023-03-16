const { sign } = require("jsonwebtoken")


const login = (req, res) => {
  const { id, nome, email, senha } = req.usuario
  const token = sign({ id, nome }, process.env.SECRET_KEY, {
    expiresIn: "3h",
  });

  const usuario = { id, nome, email }

  return res.json({ usuario, token })
}

module.exports = { login }