
exports.up = function(knex) {
  return knex.schema
    .createTable('stock', t => {
        t.increments('id').primary();
        t.enu('ad', ['', 'A']); // A: on AutoTrader.ca
        t.string('year', 4).notNull();
        t.string('make').notNull();
        t.string('model').notNull();
        t.integer('odometer').nullable();
        t.integer('km').nullable();
        t.string('color').nullable();
        t.integer('price').nullable();
        t.string('vin').unique().notNull();
        t.string('description').nullable();
        t.timestamp('register_date').defaultTo(knex.fn.now())
        t.date('dateOfSold');
        t.integer('status', [0,1,2,3]).defaultTo(0).notNull(); // 0:live, 1:sold, 2:deleted, 3:staging
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('stock')
};
