import React, { Component } from 'react'

class TodoBanner extends Component{
  render(){
    return(
      <h5 className="bg-primary text-white text-center p-2">
        {this.props.name}'s To Do List
        ({this.props.tasks.filter(t => !t.done).length} items to do) 
      </h5>
    )
  }
}

export default TodoBanner