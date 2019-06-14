const db = require('../database/dbConfig')

module.exports = {
    add,
    findByUsername
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

function findByUsername(username) {
    return db('users')
    .where({username})
    .first()
}