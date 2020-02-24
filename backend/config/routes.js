//const user = require('../api/user')

module.exports = app => {

    //Login API
    //.all(app.config.passport.authenticate()) -> método para barrar a entrada em rotas sem login
    app.post('/login', app.api.auth.login)
    app.post('/register/user', app.api.user.save)
    app.post('/validateToken', app.api.auth.validateToken)

    //Users API
    app.route('/users')
        //.all(app.config.passport.authenticate())
        .post(app.api.user.save)
        //.get(app.api.user.list)

    //Tasks API
    app.route('/tasks').all(app.config.passport.authenticate())
    app.post('/tasks', app.api.task.save)
    app.get('/tasks', app.api.task.list)
    app.get('/tasks/:id/', app.api.task.list)
    app.put('/tasks/:idtask/:totype', app.api.task.updateType)
    app.delete('/tasks/:id', app.api.task.deleteTask)

    //Money API
    app.route('/money').all(app.config.passport.authenticate())
    app.post('/money', app.api.money.save)
    app.get('/money/last/:id', app.api.money.listlast)
    app.get('/money/:id', app.api.money.list)
}