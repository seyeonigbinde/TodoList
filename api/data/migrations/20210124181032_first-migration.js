exports.up = function (knex) {
  return knex.schema
    .createTable('users', table => {
      table.increments('user_id')
      table.string('email', 138)
        .notNullable().unique()
      table.string('password', 138)
        .notNullable()
      table.timestamps(false, true)
    })
    .createTable('mytodo', table => {
      table.increments('todo_id')
      table.string('title', 138)
        .notNullable()
      table.string('activity', 150)
        .notNullable()
      table.timestamp('created_at', { precision: 6 })
        .defaultTo(knex.fn.now(6));
      table.integer('user_id')
        .unsigned()
        .references('user_id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
}

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('mytodo')
    .dropTableIfExists('users')
}
