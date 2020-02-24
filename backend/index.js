const app = require('express')()
const consign = require('consign')
const db = require('./config/db')
//const mysql = require('mysql').createConnection(db)

app.db = db

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.listen(5000)