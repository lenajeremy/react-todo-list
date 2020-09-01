import React, { Component } from 'react';
import TodoBanner from './TodoBanner';
import TodoCreator from './TodoCreator';
import TodoRow from './TodoRow';
import VisibilityControl from './VisibilityControl';
import 'bootstrap/dist/css/bootstrap.css'


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: 'King',
      todoItems:
        [{ action: 'Buy Flowers', done: true },
        { action: 'Get Shoes', done: false },
        { action: 'Collect Tickets', done: false },
        { action: "Call Joe", done: true }
        ],
      // newItemText: ''
      showCompleted: true
    }
  }

  updateNewTextValue = (event) => {
    this.setState({ newItemText: event.target.value })
  }

  createNewTodo = (task) => {
    if (!this.state.todoItems.find(item => item.action === task)) {
      this.setState({
        todoItems: [...this.state.todoItems, { action: task, done: false }],
        newItemText: ''
      },() => localStorage.setItem('todos', JSON.stringify(this.state)) );
    }
  }

  componentDidMount = () =>{
    console.log('component has been mounted')
    let data = localStorage.getItem('todos');
    this.setState(data != null ? JSON.parse(data) : {
      userName: "Jeremiah",
      todoItems: [{action: 'Buy Flowers', done: false},
      {action: "Get Shoes", done: false},
      {action: "Collect Tickets", done: true},
      {action: "Call Joe", done: false}
    ], showCompleted: true
    });
  }

  toggleTodo = (todo) => {
    this.setState({ todoItems: this.state.todoItems.map(item => item.action === todo.action ? { ...item, done: !item.done } : item) });
  }

  todoTableRows = (donevalue) => this.state.todoItems
    .filter(item => item.done === donevalue).map(item =>
    <TodoRow key = {item.action} item={item} callback ={this.toggleTodo} />
  );

  render() {
    return (
      <div>
        <TodoBanner name = {this.state.userName} tasks ={this.state.todoItems} />
        <div className="container-fluid">
          <TodoCreator callback = {this.createNewTodo}/>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
              </tr>
              <tbody>
                {this.todoTableRows(false)}
              </tbody>
            </thead>
          </table>
          <div className="bg-secondary text-white text-center p-2">
            <VisibilityControl description = 'Completed Tasks' isChecked ={this.state.showCompleted}
              callback = {(checked) => this.setState({showCompleted: checked})}/>
          </div>
          {this.state.showCompleted &&
            <table className = 'table table-striped table-bordered'>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Done</th>
                </tr>
              </thead>
              <tbody>{this.todoTableRows(true)}</tbody>
            </table>
          }
        </div>
      </div>
    )
  }
}
export default App;
