const axios = require('axios');
const express = require('express');
const bcrypt = require('bcryptjs')

const { authenticate } = require('../auth/authenticate');
const Users = require('../users/users-model')
const generateToken = require('./generateToken')

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration

  let user = req.body
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  Users.add(req.body)
  .then(user => {
    const token = generateToken(user)
    res.status(200).json({user: user, token})
  })
  .catch(error => {
    console.log(error)
    res.status(500).json(error)
  })

}

function login(req, res) {
  // implement user login
  let { username, password } = req.body;
  Users.findByUsername(req.body.username)
  .then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user)
      res.status(200).json({user: user, token})
    }
    else {
      res.status(401).json('Please enter valid credentials')
    }
  })
  .catch(error => {
    res.status(500).json(error)
  })
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
