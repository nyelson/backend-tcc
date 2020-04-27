const mongoose = require('mongoose');

const TimeSchema = new mongoose.Schema({
   id: mongoose.Types.ObjectId,
   nome: String,
});

module.exports = mongoose.model('Time', TimeSchema);
