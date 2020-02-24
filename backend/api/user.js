const bcrypt = require('bcrypt-nodejs')
const { passEquals, existsOrError, notExists } = require('./validator')

module.exports = app => {

    const encrypt = senha => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(senha, salt)
    }

    const save = async (req, res) => {
        const user = { ...req.body }
        try {
            existsOrError(user.nome, 'Informe seu Nome!')
            existsOrError(user.email, 'Informe seu Email!')
            existsOrError(user.senha, 'Informe uma Senha!')
            existsOrError(user.confsenha, 'Confirme sua Senha!')
            passEquals(user.senha, user.confsenha, 'Senhas não conferem!')

            const userFromDb = await app.db('USUARIO')
                .where({ email: user.email }).first()
            notExists(userFromDb, 'Usuário já cadastrado!')

        } catch(e) {
            return res.status(400).send(e)
        }

        user.senha = encrypt(user.senha)
        delete user.confsenha
        app.db('USUARIO').insert(user)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }

    const list = async (req, res, next) => {
        await app.db.select('nome', 'email')
        .from('USUARIO')
        .then((dados) => {
            try {
                const msg = 'Nenhum encontrado!'
                existsOrError(dados, msg)
            } catch (e) {
                res.status(500).send(e)
            }
            res.send(dados)
        }, next)
    }

    return { save, list }
}