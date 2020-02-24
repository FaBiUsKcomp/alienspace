module.exports = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        database: 'alienspace',
        user: 'root',
        password: 'fabiuskcomp'
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'knex_migrations'
    }
};