
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('stock', t => {
        t.increments('id').primary();
        t.string('ad', ['', 'A']); // A: on AutoTrader.ca
        t.string('year', 4).notNullable();
        t.string('make').notNullable();
        t.string('model').notNullable();
        t.integer('odometer').nullable();
        t.integer('km').nullable();
        t.string('color').nullable();
        t.integer('price').nullable();
        t.string('vin').unique().notNullable();
        t.string('description').nullable();
        t.timestamp('register_date').defaultTo(knex.fn.now()).notNullable();
        t.date('dateOfSold').nullable();
        t.integer('status', [0,1,2,3]).defaultTo(0).notNullable(); // 0:live, 1:sold, 2:delivered, 3:deleted
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('stock')
};
