const db = require('../database/dbConfig')

module.exports = {
    add,
}

function add(user) {
    return db('users')
    .insert(user, 'id')
    .then(([id]) => {
        return db('users')
        .where({id})
        .first()
    })
}