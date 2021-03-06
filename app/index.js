const path = require('path');
const express = require('express');
const cors = require('cors');

const router = require('./routers');

const app = express();
require('./helpers/apiDocs')(app);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// use JSON ?
app.use(express.json());
// use BODY ?
app.use(express.urlencoded({ extended: true }));

// remove CORS policy ?
const corsOptions = {
  exposedHeaders: 'Authorization',
};
app.use(cors(corsOptions));

app.use(router);

module.exports = app;
