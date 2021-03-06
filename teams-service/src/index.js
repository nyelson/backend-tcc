const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

const app = express();
mongoose.connect(
   'mongodb+srv://admin:admin@tcc-database-ftyyo.mongodb.net/test?retryWrites=true&w=majority',
   {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   }
);

app.use(express.json());
app.use(routes);

app.listen(3334);
