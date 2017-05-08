require('dotenv').config();

const express = require('express');
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db.sql');

const urls = require('./urls');
const requests = require('./requests');

app.get('/access_token', function (req, res) {
  const code = req.query.code;

  if (!code) {
    res.status(500).send('Unable to authenticate via GitHub.');
  }

  // POST to GitHub to get an access token.
  requests.getAccessToken(code)
    .then((accessToken) => {
      const stmt = db.prepare('INSERT INTO users (access_token) VALUES(?)');
      stmt.run(accessToken);
      stmt.finalize();
    });

  // We're all authenticated, redirect to the profile page.
  res.redirect('/profile');
});

app.get('/profile', function (req, res) {
  res.send("You're authenticated!");
});

app.listen(3000);