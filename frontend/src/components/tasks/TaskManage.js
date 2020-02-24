import React from 'react'

export default class TaskManage extends React.Component {

    drop = async (e) => {
        e.preventDefault()

        const fromTable = this.props.id //A div em que a tarefa esta indo
        const taskId = e.dataTransfer.getData('transfer') //Id da div conteudo

        this.props.func(fromTable, taskId)
    }

    allowDrop = (e) => {
        e.preventDefault()
    }

    render() {

        if(!this.props.children) {
            return 
        }

        return (
            <div id={this.props.id} className='taskmanage' onDrop={this.drop} onDragOver={this.allowDrop}>
                <p><i className={`fa fa-${this.props.ico}`}></i> {this.props.tittle}</p>
                <hr />
                {this.props.children}
            </div>
        )
    }
}


    