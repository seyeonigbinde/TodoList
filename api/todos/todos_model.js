const db = require('../data/db-config')

function findTodo() {
  return db("myTodo as m")
  .select("todo_id", "title", "activity")
  .orderBy("todo_id");
}

function findTodoBy(filter) {
  return db("myTodo").where(filter)
  .orderBy("todo_id")
}

function addTodo(todo) {
  return db("myTodo")
  .insert(todo,["todo_id", "title", "activity"]);
}

function findTodoById(todo_id) {
  return db("myTodo as n")
    .select("todo_id", "title", "activity")
    .where({todo_id})
    .first()
}
function editTodo(todo_id) {
    return db("myTodo as n")
    .select("todo_id", "title", "activity")
    .where({todo_id})
    .update()
  }
function deleteTodo(todo_id) {
    return db("myTodo as n")
    .select("todo_id", "title", "activity")
    .where({todo_id})
    .delete()
}

module.exports = {
  findTodo,
  addTodo,
  findTodoBy,
  findTodoById,
  editTodo,
  deleteTodo
}