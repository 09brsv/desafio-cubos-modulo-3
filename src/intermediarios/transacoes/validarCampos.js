module.exports = { campos : (pegaSchema) => async (req, res, next) => {
  const schema = pegaSchema(schema => schema)
  console.log(schema);
  const resultado = await schema.validateAsync(req.body);
  return res.send(resultado);
}
};
