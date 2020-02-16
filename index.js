const express = require('express');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb+srv://admin:admin@tcc-database-ftyyo.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());

app.get('/users', (request, response) => {
    console.log(request.query);

    return response.json({
        message: 'Hello!'
    });
});

app.delete('/users/:id', (request, response) => {
    console.log(request.params);

    return response.json({
        message: 'Hello!'
    });
});

app.post('/users', (request, response) => {
    console.log(request.body);

    return response.json({
        message: 'Hello!'
    });
});

app.listen(3333);