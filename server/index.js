const express = require('express');
const app = express();
const port = 80;

app.use(express.static('src'));

app.all('*', (req, res) => res.sendFile(`${__dirname}/../src/index.html`));

app.listen(port);
