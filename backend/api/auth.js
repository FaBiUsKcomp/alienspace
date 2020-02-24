const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const login = async (req, res) => {
        if(!req.body.email || !req.body.senha) {
            return res.status(400).send('Informe usuário e senha!')
        }

        const user = await app.db('USUARIO')
            .where({email: req.body.email}).first()

        if(!user) return res.status(400).send('Usuario não encontrado!')
        const isMatch = bcrypt.compareSync(req.body.senha, user.senha)
        if(!isMatch) return res.status(401).send('Email/Senha inválido!')

        const now = Math.floor(Date.now() / 1000)

        const payload = {
            id: user.id,
            nome: user.nome,
            email: user.email,
            iat: now, //Data de geração do token (emitido em)
            exp: now + (60 * 60 * 24 * 3), //O token tem data de 3 dias
        }

        res.status(200).send({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })
    }

    const validateToken = (req, res) => {
        const userData = req.body || null
        try {
            if(userData) {
                const token = jwt.decode(userData.token, authSecret)
                if(new Date(token.exp * 1000) > new Date()) {
                    return res.json({ message: true })
                }
            }
        } catch (e) {
            //problema com token
        }
        res.json({ message: false })
    }

    return { login, validateToken }
}