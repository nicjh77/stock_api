const knex = require('./knex');

module.exports = {
    getAll() {
        return knex('stock');
    },
    getOne(id) {
        return knex('stock').where('id', parseInt(id)).first();
    },
    create(stock) {
        return knex('stock').insert(stock, '*');
    },
    update(id, stock) {
        return knex('stock').where('id', id).update(stock, '*');
    },
    delete(id) {
        return knex('stock').where('id', id).del();
    }
}