const express = require('express');
require('express-async-errors');
require('dotenv').config();
const app = express();
const rotas = require('./rotas');
const { errosServidor } = require('./intermediarios/erros/errosInternosServidor')

app.use(express.json());
app.use(rotas);
app.use(errosServidor);

app.listen(3000);