const path = require('path');
const express = require('express');

const app = express();
const port = 3000;

app.use(express.static('src'));

app.all('*', (req, res) => {
  console.log(req.path);
  res.sendFile(path.resolve('src/index.html'));
});

app.listen(port);
