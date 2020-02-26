const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
   id: mongoose.Types.ObjectId,
   descricao: String,
   prioridade: Number,
   dificuldade: Number,
   dataCadastro: Date,
   dataInicio: Date,
   dataFinalizacao: Date,
});

module.exports = mongoose.model('Item', ItemSchema);
