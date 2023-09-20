const dotenv = require('dotenv');
dotenv.config();
const express = require('express');

const server = express();

// Middlewares
server.use(express.json());

server.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`El servidor está escuchando en: http://${process.env.HOST}:${process.env.PORT}`);
})
