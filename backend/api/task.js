const { existsOrError, notExists } = require('./validator')

module.exports = app => {

    const deleteTask = async (req, res) => {
        await app.db('TAREFA')
            .where({ id: req.params.id })
            .del()
            .then(res.status(200).send())
            .catch(res.status(500).send('Não encontrado!'))
    }

    const updateType = async (req, res) => {
        await app.db('TAREFA')
            .where({ id: req.params.idtask })
            .update({ tipo: req.params.totype })
            .then(res.status(201).send())
            .catch(res.status(500).send())
    }

    const list = async (req, res) => {

        if(req.params.id){
            await app.db('TAREFA')
                .select('id','descricao', 'tipo')
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

    const save = async (req, res) => {
        const task = { ...req.body }
        try {
            existsOrError(task.descricao, 'Descrição inválida!')
            existsOrError(task.tipo, 'Tipo inválido!')
            existsOrError(task.user_id, 'Usuário não identificado!')

            const taskFromDb = await app.db('TAREFA')
            .where({ descricao: task.descricao }).first()

            notExists(taskFromDb, 'Tarefa já cadastrada!')

        } catch (msg) {
            res.status(400).send(msg)
        }

        await app.db('TAREFA').insert(task).then(_ => res.status(201).send())
            .catch(err => res.status(500).send(err))
    }
    
    return { deleteTask, updateType, list, save }
}