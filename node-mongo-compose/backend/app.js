const bodyParser = require('body-parser');
const express = require('express');
const { mongo } = require('mongoose');
const restful = require('node-restful');
const cors = require('cors');
const server = express();
const mongoose = restful.mongoose;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://db/mydb');

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json())
server.use(cors())

const Client = restful.model('Client', {
  name: {
    type: String, require: true
  }
});

Client.methods(['get', 'post', 'put', 'delete']);
Client.updateOptions({ new: true, runValidators: true });

Client.register(server, '/clients');

server.listen(3000);