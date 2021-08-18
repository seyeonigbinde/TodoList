const db = require('../data/db-config')

function findTodo() {
  return db("mytodo")
  .select("todo_id", "title", "activity", "created_at")
  .orderBy("todo_id");
}

function findTodoBy(filter) {
  return db("mytodo").where(filter)
  .orderBy("todo_id")
}

function addTodo(todo) {
  return db("mytodo")
  .insert(todo,["todo_id", "title", "activity"]);
}

function findTodoById(todo_id) {
  return db("mytodo")
    .select("todo_id", "title", "activity", "created_at")
    .where({todo_id})
    .first()
}
function editTodo(todo_id) {
    return db("mytodo")
    .select("todo_id", "title", "activity")
    .where({todo_id})
    .update()
  }
function deleteTodo(todo_id) {
    return db("mytodo")
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