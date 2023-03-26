const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { recipiesRouter } = require('../routes');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/recipies', recipiesRouter);
module.exports = server;
