const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const server = express();

const mongooseURL = 'mongodb+srv://diego:diego@flashprestesapi-tqbua.mongodb.net/omnistack8?retryWrites=true&w=majority';
mongoose.connect(mongooseURL, { useNewUrlParser: true })
  .then(() => {
    console.info("DB Connected");
  });

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3333);