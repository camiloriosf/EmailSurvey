const functions = require('firebase-functions');
const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors({ origin: true }));
app.get('*', (req, res) => {
  res.send({ hi: 'there' });
});

const api = functions.https.onRequest((req, res) => {
  if (!req.path) req.url = `/${req.url}`;
  return app(req, res);
});

module.exports = {
  api
};
