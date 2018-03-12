const functions = require('firebase-functions');
const cors = require('cors');
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();
const keys = functions.config().auth.google.dev;

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.id,
      clientSecret: keys.secret,
      callbackURL: '/api/auth/google/callback'
    },
    accessToken => {
      console.log(accessToken);
    }
  )
);

app.use(cors({ origin: true }));

app
  .get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  )
  .get('/auth/google/callback', (req, res) => {
    res.send({
      data: req.query
    });
  });

const api = functions.https.onRequest((req, res) => {
  if (!req.path) req.url = `/${req.url}`;
  return app(req, res);
});

module.exports = {
  api
};
