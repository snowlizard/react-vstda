import React, { Component } from 'react';

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
      priority,
      edit: false
    }
    this.setState({todos: [...this.state.todos, todo]});
  }

  handleDelete (e, text) {
    e.preventDefault();
    this.setState({todos: this.state.todos.filter(todo => todo.text !== text)});
  }

  handleEdit (e, todo) {
    e.preventDefault();
    todo.edit = true
    this.setState({todos: this.state.todos.map( t => {
      if(t === todo){
        t.edit = true
        return t
      }else{
        return t
      }
    }) })
  }

  saveEdit (e, todo) {
    e.preventDefault();
    const newText = document.getElementById('edit-text').value;
    const newPriority = document.getElementById('new-priority').value;

    this.setState({
      todos: this.state.todos.map( t => {
        if( t === todo){
          return {
            text: newText,
            priority: newPriority,
            edit: false
          }
        }else{
          return t
        }
      })
    })

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
          <Todos todos={this.state.todos} 
            deleteTodo={this.handleDelete.bind(this)} 
            editTodo={ this.handleEdit.bind(this)}
            saveTodo={ this.saveEdit.bind(this)} />
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
          <textarea className="create-todo-text" id='todo-text'
          maxLength={15}
          placeholder='enter text here'></textarea>
          <span className='panel-span' >
            How much of a priority is this?
          </span>
          <div className="form-group">

            <div className="col-sm-8 col-md-4">
              <select className='create-todo-priority form-control' 
              id='priority'>
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

  return (
    <div className='col-sm-8'>
      <div className='panel panel-default'>
        <div className='panel-heading'>View Todos</div>
        {
            !props.todos ? 
            <div className='panel-body'>
              <h3>Hell world</h3>
            </div>
            :
            <ul className='list-group list-group-flush panel-body'>
              {
                props.todos.map( todo => {
                  return (
                    !todo.edit ? 
                    <li key={todo.text} 
                      className={`list-group-item ${
                        todo.priority === '1' ? 'list-group-item-success':
                        todo.priority === '2' ? 'list-group-item-warning':
                        'list-group-item-danger'
                      }`}>
                        <input type="checkbox"></input>
                        <span className='panel-span'>{todo.text}</span>
                        <button type='buttton' className='btn btn-default badge edit-todo'
                        onClick={ (e) => props.editTodo(e, todo)}>
                          <span className='glyphicon glyphicon-edit'></span>
                        </button>
                        <button type='button' className='btn btn-default badge delete-todo'
                        onClick={ (e) => props.deleteTodo(e, todo.text)}>
                          <span className='glyphicon glyphicon-trash' aria-hidden="true"></span>
                        </button>
                    </li>
                    : 
                    <div className='bg-success form-group' key={todo.text + 'editmode'}
                      style={{"padding": "1em"}}>
                      <label htmlFor="edit-text">Description</label>
                      <textarea className='update-todo-text' name="edit-text" id="edit-text" ></textarea>
                      <label htmlFor="prio">Priority</label>
                      <select className='update-todo-priority form-control' id='new-priority' name='prio'>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                      <button className='btn btn-success btn-block update-todo'
                      onClick={ (e) => props.saveTodo(e, todo) }>Save
                      </button>
                    </div>
                  );
                })
              }
            </ul>
          }
      </div>
    </div>
  );
}

export default App;
