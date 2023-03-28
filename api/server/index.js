const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { recipesRouter } = require('../routes');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/recipies', recipesRouter);
module.exports = server;
