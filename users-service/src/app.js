const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
mongoose.connect(
   process.env.MONGO_URL ||
      'mongodb+srv://admin:admin@tcc-database-ftyyo.mongodb.net/test?retryWrites=true&w=majority',
   {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   }
);

app.use(express.json());
app.use(routes);

module.exports = app;
