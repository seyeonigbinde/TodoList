const db = require('../data/db-config')

function find() {
  return db("users as u")
  .select("user_id", "email", "password")
  .orderBy("user_id");
}

function findBy(filter) {
  return db("users").where(filter)
  .orderBy("user_id")
}

const addUser = (user) =>{
  return db("users").insert(user,["user_id", "email", "password"]);
}

function findById(user_id) {
  return db("users as u")
    .select("user_id", "email", "password")
    .where({user_id})
    .first()
}


module.exports = {
  find,
  addUser,
  findBy,
  findById,
}
