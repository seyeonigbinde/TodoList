const db = require('../data/db-config')

function findTodo() {
  return db("newtodo as n")
  .select("todo_id", "title", "activity")
  .orderBy("todo_id");
}

function findTodoBy(filter) {
  return db("newtodo").where(filter)
  .orderBy("todo_id")
}

const addTodo = (todo) =>{
  return db("newtodo").insert(todo,["todo_id", "title", "activity"]);
}

function findTodoById(todo_id) {
  return db("newtodo as n")
    .select("todo_id", "title", "activity")
    .where({todo_id})
    .first()
}


module.exports = {
  findTodo,
  addTodo,
  findTodoBy,
  findTodoById,
}