import React, { Component } from 'react'

export class Todo extends Component {
    constructor(){
        super();
        this.state={
            tasks:[{task:'check mails',id:1},{task:'Read article',id:2},{task:'complete hw',id:3}],
            currentTask:''
        }
    }

    handleChange=(e)=>{
        console.log(e.target.value)
        this.setState({currentTask:e.target.value})
    }
    handleSubmit=()=>{
        this.setState({
            tasks:[...this.state.tasks,{task:this.state.currentTask,id:this.state.tasks.length+1}],
            currentTask:''
        })
    }
    handleDelete=(id)=>{
        let narr=this.state.tasks.filter((taskObj)=>{
            return taskObj.id!=id;
        })
        this.setState({
            tasks:[...narr]
        })
    }
  render() {
      console.log("render")
    return (
      <div>
          <input type="text" value={this.state.currentTask} onChange={this.handleChange}/>
          <button onClick={this.handleSubmit}>Submit</button>
          <ul>
          {
              this.state.tasks.map((taskObj)=>(
                  <li key={taskObj.id}>
                      <p>{taskObj.task}</p>
                      <button onClick={()=> this.handleDelete(taskObj.id)}>Delete</button>
                  </li>
              ))
          }
          </ul>

      </div>
    )
  }
}

export default Todo