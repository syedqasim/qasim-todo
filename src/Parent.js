import React, { Component } from 'react'
import { connect } from 'react-redux'

class Parent extends Component {

    constructor () {
        super()
        this.state = {
            title: '',
            description: '',
            isEdit:false,
            currentIndex:0,
            todolist:[],
            filter: ''
        }

    }

    save = () => {
        this.props.AddToTheTodos({ title: this.state.title, description: this.state.description, status:false })
        this.setState({ title:'', description: '' })
    }

    toggleToDo =(index) => {
        this.props.toggleToDo(index)
    }

    onEdit = (index) => {
        this.setState({title: this.props.todolist[index].title, description: this.props.todolist[index].description , isEdit:true , currentIndex:index})
    }

    onUpdate = () => {
        this.props.UpdateTodo(this.state.currentIndex, this.state.title, this.state.description)
        this.setState({ title:'', description: '',isEdit:false})
    }


    onCancel = () => {
        this.setState({title:'', description: '',isEdit:false})
    }
    render() {
        return (
            <div>
                <input  placeholder="Title" value={this.state.title} onChange={ (e) => {this.setState({title:e.target.value})} } />
                <input placeholder="Description" value={this.state.description} onChange={ (e) => {this.setState({description:e.target.value})} } />
                <input type="text" placeholder="Search your Todos" onChange={(e) => { this.setState({ filter: e.target.value })}}/>
                {
                    this.state.isEdit ?  
                       <> <button onClick={this.onUpdate} >Update</button> 
                       <button onClick={this.onCancel} >Cancel</button>
                       </> :  <button onClick={this.save} >Save</button>
                }
                
                <h4>Completed</h4>
                <ul>
                    {
                        this.props.todolist.map((todoItem,index) => {
                            if(this.state.filter !== '') {
                                if(todoItem.title.toLowerCase().includes(this.state.filter)) {
                                    if(todoItem.status) {
                                        return (
                                            <li key = {index}>
                                                <h3>{todoItem.title}</h3>
                                                <p>{todoItem.description}</p>
                                                <input type="checkbox" checked={ todoItem.status } onChange={ () => { this.toggleToDo(index)}} />
                                
                                            </li>
                                        )
                                    }
                                }
                            } else {
                                if(todoItem.status) {
                                    return (
                                        <li key = {index}>
                                            <h3>{todoItem.title}</h3>
                                            <p>{todoItem.description}</p>
                                            <input type="checkbox" checked={ todoItem.status } onChange={ () => { this.toggleToDo(index)}} />
                            
                                        </li>
                                    )
                                }
                            }
                            
                        })
                    }
                    
                </ul>

                <h4> Un completed</h4>
                <ul>
                    {
                        this.props.todolist.map((todoItem,index) => {
                            if(this.state.filter !== '') {
                                if(todoItem.title.toLowerCase().includes(this.state.filter)) {
                                    if(!todoItem.status) {
                                        return (
                                            <li key = {index}>
                                                <h3>{todoItem.title}</h3>
                                                <p>{todoItem.description}</p>
                                                <input type="checkbox" checked={ todoItem.status } onChange={ () => { this.toggleToDo(index)}} />
                                                <button onClick={() =>{this.onEdit(index)}} >Edit</button>
                                            </li>
                                            
                                        )
                                    }
                                }
                            } else {
                                if(!todoItem.status) {
                                    return (
                                        <li key = {index}>
                                            <h3>{todoItem.title}</h3>
                                            <p>{todoItem.description}</p>
                                            <input type="checkbox" checked={ todoItem.status } onChange={ () => { this.toggleToDo(index)}} />
                                            <button onClick={() =>{this.onEdit(index)}} >Edit</button>
                                        </li>
                                        
                                    )
                                }
                            }
                            
                        })
                    }
                    
                </ul>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    // In case of Thunk
    // return(dispatch) => {
    //     dispatch({type: '',ajsdlkjasd,aksdjalksd,aksdjald})
    // }
    return {
        todolist: state.todolist
    }
}
const AddToTheTodos = (todo) => {
    return {
        type: 'ADD_TODO',
        todo
    }
}
const toggleToDo = (index) => {
    return {
        type: 'CHANGE_THE_STATUS',
        index
    }
}

const UpdateTodo = (index, title, description) => {
    return {
        type: 'UPDATE_TODO',
        index,
        title,
        description
    }
}

export default connect(mapStateToProps, { AddToTheTodos, toggleToDo, UpdateTodo })(Parent)


