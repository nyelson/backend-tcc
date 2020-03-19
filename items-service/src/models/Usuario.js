const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
   id: mongoose.Types.ObjectId,
   nome: String,
   cargo: String,
   tecnologias: [String],
   times: [{ type: mongoose.Types.ObjectId, ref: 'Time' }],
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
