const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UsuarioSchema = new mongoose.Schema({
   id: mongoose.Types.ObjectId,
   nome: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true, select: false },
   cargo: String,
   tecnologias: [String],
   times: [{ type: mongoose.Types.ObjectId, ref: 'Time' }],
});

UsuarioSchema.pre('save', async function(next) {
   const hash = await bcrypt.hash(this.password, 10);
   this.password = hash;

   next();
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
