const path = require('path');
const express = require('express');


const port = process.env.PORT || 3000;

const app = express();

app.use(express.static('dist'));

app.all('*', (req, res) => {
  res.sendFile(path.resolve('dist/index.html'));
});

app.listen(port);
