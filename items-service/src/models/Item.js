const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
   id: mongoose.Types.ObjectId,
   titulo: String,
   descricao: String,
   prioridade: Number,
   dificuldade: Number,
   dataCadastro: Date,
   dataInicio: Date,
   dataFinalizacao: Date,
   usuarioDesignado: { type: mongoose.Types.ObjectId, ref: 'Usuario' },
});

module.exports = mongoose.model('Item', ItemSchema);
