import React, { Component } from 'react';
import { useState, useEffect } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      todos : [],
    }
  }

  handleClick (e) {
    e.preventDefault();
    const text = document.getElementById('todo-text').value;
    const priority = document.getElementById('priority').value;

    const todo = {
      text,
      priority
    }
    this.setState({todos: [...this.state.todos, todo]});
  }

  handleDelete (e, text) {
    e.preventDefault();
    const index = this.state.todos.map(object => object.text).indexOf(text);
    this.setState({todos: this.state.todos.filter(todo => todo.text !== text)});
  }

  render() {
    return (
      <div className='container'>
        <div className="jumbotron jumbotron-fluid"
        style={{"background": "transparent", "color": "white",
        "borderBottom": "2px solid white",
        "borderRadius": "0"}}>
          <h1>Very Simple Todo App</h1>
          <p className='lead'>Track all of the things</p>
        </div>

        <div className='row'>
          <CreateTodo handleClick={this.handleClick.bind(this)} />
          <Todos todos={this.state.todos} deleteTodo={this.handleDelete.bind(this)} />

        </div>
      </div>
    );
  }
}


const CreateTodo = (props) => {
  return (
    <div className='col-sm-4'>
      <div className='add-todo panel panel-default'>
        <div className='panel-heading'>Add a todo</div>

        <div className="panel-body">
          <span className='panel-span'>I want to...</span>
          <textarea className='create-todo-text' id='todo-text'>
          </textarea>
          <span className='panel-span' >How much of a priority is this?</span>
          <div className="form-group">

            <div className="col-sm-8 col-md-4">
              <select className='create-todo-priority form-control' id='priority'>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
          </div>
          <button className='btn btn-success btn-block create-todo'
            onClick={ (e) => props.handleClick(e) }>Add
          </button>
        </div>
      </div>
    </div>
  );
}
// todos will take a list of todos and render them
const Todos = (props) => {
  const [todos, setTodos] = useState();

  useEffect( () => {
    setTodos(props.todos);
  }, [props])

  return (
    <div className='col-sm-8'>
      <div className='panel panel-default'>
        <div className='panel-heading'>View Todos</div>
        <div className='panel-body'>
          {
            !todos ? 
            <div>
              <h4>Welcome to the Simple Todo App!</h4>
              <h5>Get Started now by adding a new todo on the left.</h5>
            </div> :
            <ul className='list-group list-group-flush'>
              {
                todos.map( todo => {
                  return (
                    <li key={todo.text} 
                      className={`list-group-item ${
                        todo.priority === '1' ? 'list-group-item-success':
                        todo.priority === '2' ? 'list-group-item-warning':
                        'list-group-item-danger'
                      }`}>
                        <input type="checkbox"></input>
                        <span className='panel-span'>{todo.text}</span>
                        <button type='buttton' className='btn btn-default badge edit-todo'>
                          <span className='glyphicon glyphicon-edit'></span>
                        </button>
                        <button type='button' className='btn btn-default badge delete-todo'
                        onClick={ (e) => props.deleteTodo(e, todo.text)}>
                          <span className='glyphicon glyphicon-trash' aria-hidden="true"></span>
                        </button>
                    </li>
                  );
                })
              }
            </ul>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
