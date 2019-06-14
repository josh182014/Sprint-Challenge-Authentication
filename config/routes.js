const axios = require('axios');
const express = require('express');
const router = express.Router()

const { authenticate } = require('../auth/authenticate');
const Users = require('../users/users-model')

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  Users.add(req.body)
  .then(response => {
    console.log(response)
    res.status(200).json(response)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json(error)
  })

}

function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
