const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const userRouter = require('./users/users_router')
const authRouter = require('./auth/auth-router')
const todoRouter = require('./todos/todos_router')

const server = express()

server.use(express.json())
// server.use(helmet())
server.use(cors())
server.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

server.use('/api/auth', authRouter)
server.use('/api', userRouter)
server.use('/api/app', todoRouter)

server.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = server

