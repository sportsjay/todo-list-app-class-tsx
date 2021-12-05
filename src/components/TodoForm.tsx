import React, { ChangeEvent, Component } from "react";
import { Todo } from "../interfaces/todo.interface";
import "./TodoForm.css";

interface TodoFormProps {
  handleAddNewTodo: (newTodo: Todo) => void;
}

interface TodoFormState {
  form: Todo;
}

export class TodoForm extends Component<TodoFormProps, TodoFormState> {
  constructor(props: TodoFormProps) {
    super(props);

    this.handleSubmitNewTodo = props.handleAddNewTodo;

    this.state = {
      form: {
        title: "",
        description: "",
      },
    };

    this.onChangeNewTodoTitle = this.onChangeNewTodoTitle.bind(this);
    this.onChangeNewTodoDescription =
      this.onChangeNewTodoDescription.bind(this);
    this.onSubmitNewTodo = this.onSubmitNewTodo.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.handleSubmitNewTodo = this.handleSubmitNewTodo.bind(this);
  }

  state: Readonly<TodoFormState>;

  handleSubmitNewTodo: (newTodo: Todo) => void;

  onChangeNewTodoTitle(event: ChangeEvent<HTMLInputElement>): void {
    this.setState({
      form: {
        ...this.state.form,
        title: event.target.value,
      },
    });
  }

  onChangeNewTodoDescription(event: ChangeEvent<HTMLInputElement>): void {
    this.setState({
      form: {
        ...this.state.form,
        description: event.target.value,
      },
    });
  }

  resetForm(): void {
    this.setState({
      form: {
        title: "",
        description: "",
      },
    });
  }

  onSubmitNewTodo(): void {
    this.handleSubmitNewTodo(this.state.form);
    this.resetForm();
  }

  render() {
    return (
      <div className="form">
        <h2 style={{ textAlign: "center", margin: 0 }}>Input Form</h2>
        <label>Todo title</label>
        <input
          type="text"
          value={this.state.form.title}
          onChange={this.onChangeNewTodoTitle}
        />
        <br />
        <label>Todo description</label>
        <input
          type="text"
          value={this.state.form.description}
          onChange={this.onChangeNewTodoDescription}
        />
        <button onClick={this.onSubmitNewTodo}>Submit</button>
      </div>
    );
  }
}

export default TodoForm;
