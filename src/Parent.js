import React, { Component } from 'react'

export default class Parent extends Component {

    constructor () {
        super()
        this.state = {
            title: '',
            description: '',
            isEdit:false,
            currentIndex:0,
            todolist:[]
        }

    }

    save = () => {
        let todolist = Object.assign([],this.state.todolist);
        todolist.push({ title: this.state.title, description: this.state.description, status:false })
        this.setState({todolist:todolist , title:'', description: ''})
    }

    toggleToDo =(index) => {
        let todolist = Object.assign([],this.state.todolist);
        todolist[index].status=!todolist[index].status;
        this.setState({todolist:todolist , title:'', description: ''})
    }

    onEdit = (index) => {
        this.setState({title: this.state.todolist[index].title, description: this.state.todolist[index].description , isEdit:true , currentIndex:index})
    }

    onUpdate = () => {
        let todolist = Object.assign([],this.state.todolist);
        todolist[this.state.currentIndex].title=this.state.title;
        todolist[this.state.currentIndex].description=this.state.description;
        this.setState({todolist:todolist , title:'', description: '',isEdit:false})
    }


    onCancel = () => {
        this.setState({title:'', description: '',isEdit:false})
    }
    render() {
        return (
            <div>
                <input  placeholder="Title" value={this.state.title} onChange={ (e) => {this.setState({title:e.target.value})} } />
                <input placeholder="Description" value={this.state.description} onChange={ (e) => {this.setState({description:e.target.value})} } />
                {
                    this.state.isEdit ?  
                       <> <button onClick={this.onUpdate} >Update</button> 
                       <button onClick={this.onCancel} >Cancel</button>
                       </> :  <button onClick={this.save} >Save</button>
                }
                
                <h4>Completed</h4>
                <ul>
                    {
                        this.state.todolist.map((todoItem,index) => {
                            if(todoItem.status) {
                            return (
                                <li key = {index}>
                                    <h3>{todoItem.title}</h3>
                                    <p>{todoItem.description}</p>
                                    <input type="checkbox" checked={ todoItem.status } onChange={ () => { this.toggleToDo(index)}} />
                     
                                </li>
                            )
                            }
                        })
                    }
                    
                </ul>

                <h4> Un completed</h4>
                <ul>
                    {
                        this.state.todolist.map((todoItem,index) => {
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
                        })
                    }
                    
                </ul>

            </div>
        )
    }
}
