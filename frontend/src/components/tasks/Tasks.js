import React from 'react'
import axios from '../../config/axios'
import TaskContainer from './TaskContainer'
import TaskManage from './TaskManage.js'
import TaskUnity from './TaskUnity'
import Content from '../template/Content'
import './Task.css'

const defaultState = {
    desc: '',
    status: '',
    allUserTasks: [],
}

const selectTaskFromType = (task, type) => task.tipo === type
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('@token')}`

export default class Tasks extends React.Component {

    state = { ...defaultState }

    componentDidMount() {
        this.getAllUserTasksFromDb()
    }

    setTask = (e) => {
        this.setState({ desc: e.target.value, status: '' })
    }

    reset = (e) => {
        this.setState({ desc: '', status: '' })
    }

    addNewTask = async (e) => {
        e.preventDefault()

        if(!this.state.desc || !isNaN(this.state.desc)){
            this.setState({ desc: '', status: 'Digite uma descrição válida!' })
            return
        }

        const user_id = localStorage.getItem('@user_id')

        const data = { descricao: this.state.desc, tipo: 'afazer', user_id }

        const result = await axios.post('/tasks', data)

        if(result.status === 201) {
            this.componentDidMount()
            this.setState({ desc: '', status: ''})
        } else {
            this.setState({ status: 'Falha no Cadastro!' })
        }
    }

    changeTypeTaskFromDb = async (fromTable, taskId) => {

        if(fromTable === 'afazer') {
            await axios.put(`/tasks/${taskId}/afazer`)
            .then(data => console.log())
        }
        if(fromTable === 'fazendo') {
            await axios.put(`/tasks/${taskId}/fazendo`)
            .then(data => console.log())
        }
        if(fromTable === 'feito') {
            await axios.put(`/tasks/${taskId}/feito`)
            .then(data => console.log())
        }

        this.componentDidMount()
    }

    deleteTaskFromDb = async (id) => {

        const allUserTasks = this.state.allUserTasks.filter(task => task.id !== id)
        this.setState({ allUserTasks })

        const reqResult = await axios.delete(`/tasks/${id}`)
            .then(result => reqResult.status)
            .catch(e => e)
        if(!reqResult === 200){
            console.log(reqResult)
        }
    }

    async getAllUserTasksFromDb() {
        const user_id = localStorage.getItem('@user_id')
        
        const allUserTasks =  await axios.get(`/tasks/${user_id}`)
            .then(tasks => {
                return tasks.data.map(task => task)
            })
            .catch(this.setState({ allUserTasks: [] }))
        if(allUserTasks) this.setState({ allUserTasks })
    }

    render() {
        return (
            <Content>
                <div className='tasks'>
                    <div className='taskmenu'>
                        <h2><i className="fa fa-sticky-note-o" aria-hidden="true"></i> Adicionar Tarefa</h2>
                        <p className='err'>  {this.state.status}</p>
                        <hr />
                        <div className='taskcreate'>
                            <form name='taskcreate' autoComplete='off'>
                                <input onChange={this.setTask} value={this.state.desc}
                                type='text' name='task' placeholder='Descrição da sua nova tarefa...'></input>
                                
                                <button onClick={this.reset} 
                                    className='taskclear' type='reset'><i className="fa fa-times" aria-hidden="true"></i> Limpar</button>
                                <button 
                                    onClick={this.addNewTask}
                                    className='tasksubmit' type='submit'>
                                    <i className="fa fa-plus" aria-hidden="true">
                                    </i> Adicionar</button>
                            </form>
                        </div>
                    </div>
                    <TaskContainer mt={'mt-3'} >

                        <TaskManage func={this.changeTypeTaskFromDb.bind(this)} id='afazer' tittle={'A fazer'} ico={'stop-circle-o'}>
                            {
                                this.state.allUserTasks
                                .filter(task => selectTaskFromType(task, 'afazer'))
                                .map(task => {
                                    return <TaskUnity deleteSelf={this.deleteTaskFromDb.bind(this)} 
                                    key={task.id} id={task.id}  status={task.tipo}  desc={task.descricao} />
                                })
                            }
                        </TaskManage>

                        <TaskManage func={this.changeTypeTaskFromDb.bind(this)} id='fazendo' tittle={'Fazendo'} ico={'play-circle-o'}>
                            {
                                this.state.allUserTasks
                                .filter(task => selectTaskFromType(task, 'fazendo'))
                                .map(task => {
                                    return <TaskUnity deleteSelf={this.deleteTaskFromDb.bind(this)} 
                                    key={task.id} id={task.id}  status={task.tipo}  desc={task.descricao} />
                                })
                            }
                        </TaskManage>

                        <TaskManage func={this.changeTypeTaskFromDb.bind(this)} id='feito' tittle={'Feito'} ico={'check-circle-o'}>
                            {
                                this.state.allUserTasks
                                .filter(task => selectTaskFromType(task, 'feito'))
                                .map(task => {
                                    return <TaskUnity deleteSelf={this.deleteTaskFromDb.bind(this)} 
                                    key={task.id} id={task.id}  status={task.tipo}  desc={task.descricao} />
                                })
                            }
                        </TaskManage>
                        
                    </TaskContainer>
                </div>
            </Content>
        )
    }
}