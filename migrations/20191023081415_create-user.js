
exports.up = function(knex, Promise) {
    return knex.schema
        .createTable('user', t => {
            t.increments();
            t.string('email').unique().notNullable();
            t.string('password').notNullable();
            t.timestamp('singup_date').notNullable().defaultTo(knex.fn.now());
            t.boolean('is_active').notNullable().defaultTo(true);
            t.string('role', ['admin', 'modifier', 'reader']).defaultTo('reader');
    });
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('user')
};
