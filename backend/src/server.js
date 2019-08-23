const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
  console.log('Nova conexao', socket.id);
});

const mongooseURL = 'mongodb+srv://diego:diego@flashprestesapi-tqbua.mongodb.net/omnistack8?retryWrites=true&w=majority';
mongoose.connect(mongooseURL, { useNewUrlParser: true })
  .then(() => {
    console.info("DB Connected");
  });

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);