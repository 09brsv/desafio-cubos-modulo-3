module.exports = {
  campos: (pegaSchema) => async (req, res, next) => {
    try {
      const schema = pegaSchema((schema) => schema);

      await schema.validateAsync(req.body);
      return next();
    } catch (error) {
      const [resultado] = error.details.map(({ message }) => {
        return message;
      });
      return res.status(400).json({ mensagem: resultado });
    }
  },
};
