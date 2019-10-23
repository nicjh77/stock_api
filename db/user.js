const knex = require('./knex');

module.exports = {
    
    getOne(id) {
        return knex('user').where('id', id).first();
    },
    getOneByEmail(email){
        return knex('user').where('email', email).first();
    },
    create(user) {
        return knex('user').insert(user, 'id').then(ids => {
            return ids[0];
        });
    }
}