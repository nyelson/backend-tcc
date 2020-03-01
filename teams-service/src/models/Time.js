const mongoose = require('mongoose');

const TimeSchema = new mongoose.Schema({
   id: mongoose.Types.ObjectId,
   nome: String,
   usuarios: [{ type: mongoose.Types.ObjectId, ref: 'Usuario' }],
});

module.exports = mongoose.model('Time', TimeSchema);
