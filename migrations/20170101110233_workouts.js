
exports.up = function(knex, Promise) {
  console.log('create table')

  return knex.schema.createTableIfNotExists('workouts', function(table) {
    table.increments('id')
    table.string('activity')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.time('duration')
    table.float('distance')
    table.string('location')
    table.string('route')
    table.float('average_speed')
  });
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('workouts').then(function () {
  console.log('workouts table was dropped')
  });
}
