import React from "react";
import "./App.css";
import TodoComponent from "./components/TodoComponent";
import TodoForm from "./components/TodoForm";
import { Todo } from "./interfaces/todo.interface";

type AppState = {
  todoList: Todo[];
};

class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      todoList: [],
    };

    this.handleAddNewTodo = this.handleAddNewTodo.bind(this);
    this.handleDeleteFunction = this.handleDeleteFunction.bind(this);
    this.handleUpdateFunction = this.handleUpdateFunction.bind(this);
  }

  state: Readonly<AppState>;

  handleDeleteFunction(idx: number): void {
    // delete 1 item starting from index = idx
    this.state.todoList.splice(idx, 1);
    // replace the old list with the new list
    this.setState({ todoList: [...this.state.todoList] });
  }

  handleUpdateFunction(idx: number, newTodo: Todo): void {
    // Replace list in index = idx to a new Todo
    let temporaryList = this.state.todoList;
    temporaryList[idx] = newTodo;
    // replace the old list with the new list
    this.setState({ todoList: [...temporaryList] });
  }

  handleAddNewTodo(newTodo: Todo): void {
    // Validate if user has added title
    if (newTodo.title != null && newTodo.title !== "") {
      // Add new todo to the list
      this.setState({ todoList: [...this.state.todoList, newTodo] });
    } else alert("Please fill in a Todo title before submitting a new Todo");
  }

  render() {
    return (
      <div className="container">
        <h1 className="title">Todo List</h1>
        {this.state.todoList.length >= 1 ? (
          this.state.todoList.map((todo, idx) => (
            <TodoComponent
              key={idx}
              idx={idx}
              todo={todo}
              onDeleteFunction={() => this.handleDeleteFunction(idx)}
              onUpdateFunction={this.handleUpdateFunction}
            />
          ))
        ) : (
          <h3>
            <strong>Add new todo</strong>
          </h3>
        )}
        <TodoForm handleAddNewTodo={this.handleAddNewTodo} />
      </div>
    );
  }
}

export default App;
