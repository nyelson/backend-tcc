const mongoose = require('mongoose');

const TimeSchema = new mongoose.Schema({
   nome: String,
   usuarios: [{ type: mongoose.Types.ObjectId, ref: 'Usuario' }],
});

module.exports = mongoose.model('Time', TimeSchema);
