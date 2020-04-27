const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
   id: mongoose.Types.ObjectId,
   nome: String,
   email: String,
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
