const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http')

const routes = require('./routes')

const { setWebSocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setWebSocket(server);

mongoose.connect('mongodb+srv://omnistack10:omnistack10@cluster0-fukiy.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
})
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);