'use strict';

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const app = express();

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'src')));
app.use(body.json());
app.use(cookie());

app.all('/', (req, res) => res.sendFile(`${__dirname}/src/index.html`));

const port = process.env.PORT || 8081;

app.listen(port, '0.0.0.0', function () {
  console.log(`Server listening port ${port}`);
});
