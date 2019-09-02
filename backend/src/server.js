const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const connectedUsers = {
  
};

io.on('connection', socket => {
  const { user } = socket.handshake.query;
  connectedUsers[user] = socket.id;

  // socket io how to use examples
  // socket.on('hello', message => {
  //   console.log('Received: ', message);
  // });

  // setTimeout(() => {
  //   socket.emit('world', {
  //     message: 'Send to frontend'
  //   });
  // }, 3000);
});

const mongooseURL = 'mongodb+srv://diego:diego@flashprestesapi-tqbua.mongodb.net/omnistack8?retryWrites=true&w=majority';
mongoose.connect(mongooseURL, { useNewUrlParser: true })
  .then(() => {
    console.info("DB Connected");
  });


app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);