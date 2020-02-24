const { autoSecret } = require('../.env') //Importando a chave
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt')

module.exports = app => {

    //Função de signin
    const signin = async (req,res) => {
        if(!req.body.email || !req.body.password) {
            return res.status(400).send('Informe Usuário e a Senha!')
        }

        app.db.connect()
        const consult = `SELECT email FROM USUARIO WHERE email = ${req.body.email}`
        const user = await app.db.query(consult, (error, results) => {
            if(error) return res.status(400).send('Usuario não existe!')
            return results[0].email
        })
        app.db.end()
        if(!user) return res.status(400).send('Usuário não cadastrado!')

        const isMatch = bcrypt.compareSync(req.body.password, user.senha)
        if(!isMatch) return res.status(401).send('Email/Senha inválidos!')
    }
}

