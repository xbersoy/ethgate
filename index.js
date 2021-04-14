const express = require('express');

const app = express();
require('dotenv').config();

const txRoute = require('./routes/transaction.js');
const walletRoute = require('./routes/wallet.js');
// const swaggerRoutes = require('./routes/swagger.js');
// const notFoundRoute = require('./routes/notFound.js');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(txRoute);
app.use(walletRoute);
// app.use(swaggerRoutes);
// app.use(notFoundRoute);

app.use((err, req, res, next) => {
  const status = err.getStatusCode ? err.getStatusCode() : 500
  return res.status(status).json({
    success: false,
    errors: [{message: err.message}],
  });
});

app.listen(3005);