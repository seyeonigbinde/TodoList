const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const router = require('express').Router()

const User = require('../users/users_model')
const { JWT_SECRET } = require("../secrets/index")
const { checkPayload,
  checkEmailFree,
  checkEmailExists,
}= require('../middlewares/auth-middleware')


router.post('/register', checkEmailFree, (req, res, next) => {

  const { email, password } = req.body
  const hash = bcrypt.hashSync(password, 8)
  User.addUser({ email, password: hash })
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(next);
})

router.post('/login', checkPayload, checkEmailExists, (req, res, next) => {

  if (bcrypt.compareSync(req.body.password, req.user.password)) {
    const token = tokenBuilder(req.user);
    console.log(token)
    res.status(200).json({
      message: `Welcome ${req.user.email}`,
      token
    });
  } else {
    next({ status: 401, message: "Invalid email or password" })
  }
})

function tokenBuilder(user) {
  const payload = {
    subject: user.user_id,
    email: user.email,
  }
  const options = {
    expiresIn: '1d',
  }
  return jwt.sign(
    payload,
    JWT_SECRET,
    options
  )
}

module.exports = router
