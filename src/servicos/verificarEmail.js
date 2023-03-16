const { consulta } = require("../conexao");

module.exports = {
  emailExiste: async (email) => {
    const { rows } = await consulta(`select * from usuarios where email = $1`, [email]);
    if (rows[0]) {
      return rows[0]
    }
  },
};
