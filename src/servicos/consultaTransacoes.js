const { consulta } = require("../conexao")


// Recebe os dados necessários em formato de objeto e faz a consulta no banco de dados
const consultarTransacoes = async (params) => {
  try {

    if (params.idTransacao) {
      return await consulta(
        `select * from transacoes where id = $1 and usuario_id = $2`,
        [params.idTransacao, params.id]
      );
    }

    if (params.idCategoria) {
      return await consulta(`select * from categorias where id = $1`, [
        params.idCategoria,
      ]);
    }

    // Enviar um objeto com a propriedade categorias com o valor true
    if (params.categorias) return await consulta("select * from categorias");

    // Enviar um objeto com a propriedade transacoes com o valor true
    if (params.transacoes)
      return await consulta("select transacoes.*, categorias.descricao as categoria_nome  from transacoes inner join categorias on transacoes.categoria_id = categorias.id where usuario_id = $1", [
        params.id,
      ]);

    if (params.excluirTransacoes)
      return await consulta("delete from transacoes where id = $1 and usuario_id = $2", [
        params.excluirTransacoes, params.id
      ]);

    if (params.filtro) {
      let consultaPorFiltro = `select t.*, c.descricao as categoria_nome from transacoes t inner join categorias c on t.categoria_id = c.id and t.usuario_id = $1 where c.descricao ilike '${params.filtro[0]}'`;

      for (let i = 1; i < params.filtro.length; i++) {
        consultaPorFiltro += ` or c.descricao ilike '${params.filtro[i]}'`;
      }

      return await consulta(consultaPorFiltro, [params.id]);
    }

  } catch (error) {
    return new Error(error.message);
  }

}

module.exports = {
  consultarTransacoes
}