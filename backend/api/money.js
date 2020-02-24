const { existsOrError, notExists } = require('./validator')

module.exports = app => {

    const list = async (req, res) => {

        if(req.params.id){
            await app.db('TRANSACAO')
                .select('id','local','valor', 'mes', 'ano', 'tipo')
                .where({ user_id: req.params.id })
                .then(dados => {
                    try {
                        existsOrError(dados, 'Nenhum encontrado!')
                    } catch (e) {
                        res.status(500).send(e)
                    }

                    res.status(200).send(dados)
                })
        } else {
            res.status(400).send('Você não está autenticado!')
        }

    }

    const listlast = async (req, res) => {
        if(req.params.id) {
            await app.db('TRANSACAO').select('id','local','valor', 'mes', 'ano', 'tipo')
                .where({ user_id: req.params.id })
                .orderBy('id', 'desc').first()
                .then(data => {

                    try {
                        existsOrError(data, 'Nenhum resgistro!')
                    } catch (e) {
                        res.status(500).send(e)
                    }

                    res.status(200).send(data)
                })
        } else {
            res.status(400).send('Você não está autenticado!')
        }
    }

    const save = async (req, res) => {

        const transaction = { ...req.body }

        try {
            existsOrError(transaction.local, 'Local indefinido!')
            existsOrError(transaction.valor, 'Valor indefinido!')
            existsOrError(transaction.mes, 'Mes indefinido!')
            existsOrError(transaction.ano, 'Ano indefinido!')
            existsOrError(transaction.tipo, 'Tipo indefinido!')
            existsOrError(transaction.user_id, 'Usuário indefinido!')

        } catch (e) {
            res.status(400).send(e)
        }

        await app.db('TRANSACAO').insert(transaction).then(_ => res.status(201).send())
            .catch(err => res.status(500).send(err))

    }

    return { list, listlast, save }
}