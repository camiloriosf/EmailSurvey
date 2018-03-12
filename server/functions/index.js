const functions = require('firebase-functions');
const cors = require('cors');
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

passport.use(new GoogleStrategy());

app.use(cors({ origin: true }));
app.get('*', (req, res) => {
  res.send({ oops: 'invalid endpoint' });
});

const api = functions.https.onRequest((req, res) => {
  if (!req.path) req.url = `/${req.url}`;
  return app(req, res);
});

module.exports = {
  api
};
