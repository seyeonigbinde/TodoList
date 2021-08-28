const Todo = require('../todos/todos_model')

function validateTodoId(req, res, next) {
  console.log('validateTodoId middleware')
  Todo.get(req.params.id)
    .then(todo => {
      if (!todo) {
        res.status(404).json({
          error: `project not found`
        })
      } else {
        req.todos = todo
        next()
      }
    })
    .catch(err => {
      next(err)
    })
}

function validateTodo(req, res, next) {
 
  const { title , activity} = req.body
  if ( !title || !activity ) {
    // validation fails
    next({
      message: 'missing required title and activity field',
      status: 400,
    })

  } else {
    req.todos = { name: req.body.title.trim() }
    req.todos = { name: req.body.activity.trim() }
    next()
    // validation succeed
  }
}


  
module.exports = {
  validateTodo,
  validateTodoId
}