import React from 'react'

export default class TaskUnity extends React.Component {

    drag = (e) => {
        e.dataTransfer.setData('transfer', e.target.id)
    } 

    noAllowDrop = (e) => {
        e.stopPropagation()
    }

    handleDelete = () => {
        this.props.deleteSelf(this.props.id)
    }

    render() {

        return( 
            
            <div className={this.props.status ? `taskunity ${this.props.status}` : 'taskunity'}
                id={this.props.id} draggable="true" 
                onDragStart={this.drag} onDragOver={this.noAllowDrop}>
                <p>{this.props.desc}</p>
                <span><i onClick={this.handleDelete} className="fa fa-minus-circle" aria-hidden="true"></i></span>
            </div>
        );
    }

    //Before -> this.props.status ? `taskunity ${this.props.status}` : 'taskunity'
}