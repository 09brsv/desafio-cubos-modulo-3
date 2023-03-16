module.exports = camposObrigatorios = (campos) => {
  let campoInvalido = [];

  Object.entries(campos).forEach(([chave, valor]) => {
    if (!valor) return campoInvalido.push(chave);
  });

  if (!campoInvalido[0]) return;

  return `Campo(s) que você precisa preencher: ${campoInvalido
    .join(", ")
    .toUpperCase()}`;
};
