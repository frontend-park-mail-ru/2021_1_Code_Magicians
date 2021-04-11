const path = require('path');
const express = require('express');


const port = process.env.PORT || 3000;

const app = express();

app.use(express.static('src'));

app.all('*', (req, res) => {
  res.sendFile(path.resolve('src/index.html'));
});

app.listen(port);
