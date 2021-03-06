const db = require('../data/db-config')

function findTodo() {
  return db("mytodo as my")
//   .leftJoin("users as u", "u.user_id", "=", "my.user_id")
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

function editTodo(todo_id, changes) {
    return db("mytodo")
      .where("todo_id", todo_id)
      .update(changes)
      .then(count => (count > 0 ? findTodoById(todo_id) : null));
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