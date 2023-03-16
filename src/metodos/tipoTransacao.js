

const tipoTransacaoValida = (params) => {
  const tipo = params.toLowerCase();
  if (tipo === 'entrada' || tipo === 'saida' || tipo === 'saída') {
    return true;
  }
}

module.exports = { tipoTransacaoValida }