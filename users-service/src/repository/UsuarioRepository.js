const Usuario = require('../models/Usuario');
const Time = require('../models/Time');

module.exports = {
   async addUser(nome, email, password, cargo, tecnologias) {
      const user = await Usuario.create({
         nome,
         email,
         password,
         cargo,
         tecnologias,
      });
      return user;
   },
   async findUserByEmail(email) {
      const user = await Usuario.findOne({ email });
      return user;
   },
   async findUserCredentials(email) {
      const user = await Usuario.findOne({ email }).select('+password');
      return user;
   },
   async findUserByName(name) {
      const user = await Usuario.findOne({ nome: name }, () => {});
      return user;
   },
   async findUserById(id) {
      console.log(id);
      const user = await Usuario.findById(id);
      return user;
   },
   async findUserByTime(nomeTime) {
      const time = await Time.find({ nome: nomeTime });
      const user = await Usuario.find({ times: time.id });
      return user;
   },
   async deleteUserById(id) {
      const result = await Usuario.deleteOne({ _id: id });
      return result.deletedCount === 1;
   },
};
