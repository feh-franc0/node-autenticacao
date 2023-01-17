const mongoose = require('mongoose');

const Client = mongoose.model('Client', {
  nome: String,
  email: String,
  telefone: String,
  endereço: String,
  cpf: String,
})

module.exports = Client