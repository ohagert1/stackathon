const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./routes/api');
const db = require('./db');
const app = express();
const PORT = 8080;


app.use(morgan('dev'));

//maybe don't need static?
// app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', router);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public'));
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

db.sync()
.then(() => {
  app.listen(PORT, () => console.log(`serving up history on ${PORT}`));
});

module.exports = app;
