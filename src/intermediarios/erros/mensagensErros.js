module.exports = {
  cadastroUsuárioErro:
  // HTTP Status 400 / 401 / 403 / 404
  {
    mensagem: "Já existe usuário cadastrado com o e-mail informado.",
  },

  loginUsuarioErro:
  // HTTP Status 400 / 401 / 403 / 404
  {
    mensagem: "Usuário e/ou senha inválido(s).",
  },

  verificarTokenErro: {
    mensagem:
      "Para acessar este recurso um token de autenticação válido deve ser enviado.",
  },

  atualizarUsuarioErro: {
    mensagem: "O e-mail informado já está sendo utilizado por outro usuário.",
  },

  detalharUmaTransacaoErro: {
    mensagem: "Transação não encontrada.",
  },

  cadastrarTransacaoErro: {
    mensagem: "Todos os campos obrigatórios devem ser informados.",
  },

  tipoTransacaoErro: {
    mensagem: "O tipo da transação deve ser entrada ou saída.",
  },

  categoriaTransacaoErro: {
    mensagem: "A categoria não existe"
  },

  excluirTransacaoErro: {
    mensagem: "Transação não encontrada.",
  },
  ObterExtratoErro: {
    mensagem: "Transação não encontrada.",
  },
  ValorInvalido: {
    mensagem: "Valor informado não é valido."
  }
};
