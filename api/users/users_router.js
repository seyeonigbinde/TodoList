const express = require('express')
const helpers = require('./users_model')
const restricted = require('../middlewares/restricted')

const User = require('../users/users_model')

const router = express.Router()

router.get('/users', (req, res, next) => {
  helpers.find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(next); 
});


router.get('/user/:id', (req, res) => {
  const user_id = req.params.id 
  User.findById(user_id)
  .then(user => {
      res.json(user);
  })
  .catch(err => res.status(500).json({ 
      message: err.message, 
      stack: err.stack 
  }))
});

router.post('/users', (req, res, next) => {
  User.addUser(req.body)
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(next);
})

module.exports = router
