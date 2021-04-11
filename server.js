const path = require('path');
const fs = require('fs');
const express = require('express');
const https = require('https');


const port = process.env.PORT || 3000;
const options = {
  key: fs.readFileSync(`${process.env.HOME}/.ssl/selfsigned.key`),
  cert: fs.readFileSync( `${process.env.HOME}/.ssl/selfsigned.crt`),
};

const app = express();

app.use(express.static('src'));

app.all('*', (req, res) => {
  res.sendFile(path.resolve('src/index.html'));
});

const server = https.createServer(options, app);

server.listen(port, () => console.log('server starting on port : ', port));
