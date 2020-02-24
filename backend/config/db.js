/*const db = {
    host: 'localhost',
    database: 'alienspace',
    user: 'root',
    password: 'fabiuskcomp'
}

module.exports = db*/
const knexconfig = require('../knexfile')
const db = require('knex')(knexconfig)

module.exports = db