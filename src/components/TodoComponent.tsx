import React, { ChangeEvent, Component } from "react";
import { Todo } from "../interfaces/todo.interface";
import "./TodoComponent.css";

type TodoComponentProps = {
  idx: number;
  todo: Todo;
  onDeleteFunction: VoidFunction;
  onUpdateFunction: (idx: number, newTodo: Todo) => void;
};

type TodoComponentState = {
  todo: Todo;
  newTodo: Todo;
  isUpdating: boolean;
};

export class TodoComponent extends Component<
  TodoComponentProps,
  TodoComponentState
> {
  constructor(props: TodoComponentProps) {
    super(props);

    // Get properties
    this.idx = props.idx;
    this.onHandleDelete = props.onDeleteFunction;
    this.onHandleUpdate = props.onUpdateFunction;

    // Initialize state
    this.state = {
      todo: props.todo,
      newTodo: props.todo,
      isUpdating: false,
    };

    // Bind forms
    this.setUpdate = this.setUpdate.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmitUpdate = this.onSubmitUpdate.bind(this);
    this.onHandleDelete = this.onHandleDelete.bind(this);
  }

  /**
   * Attributes
   */
  idx: number;

  state: Readonly<TodoComponentState>;

  /**
   * Methods
   */
  setUpdate(): void {
    this.setState({
      isUpdating: !this.state.isUpdating,
    });
  }

  onChangeTitle(event: ChangeEvent<HTMLInputElement>): void {
    this.setState({
      newTodo: {
        title: event.target.value,
        description: this.state.newTodo.description,
      },
    });
  }

  onChangeDescription(event: ChangeEvent<HTMLInputElement>): void {
    this.setState({
      newTodo: {
        title: this.state.newTodo.title,
        description: event.target.value,
      },
    });
  }

  onSubmitUpdate(): void {
    this.onHandleUpdate(this.idx, this.state.newTodo);
    this.setUpdate();
  }

  onHandleDelete: VoidFunction;

  onHandleUpdate: (idx: number, newTodo: Todo) => void;

  render() {
    return (
      <div className="list">
        <div>
          {!this.state.isUpdating ? (
            <React.Fragment>
              <strong>{this.state.todo.title}</strong>
              <p>{this.state.todo.description}</p>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <input
                type="text"
                value={this.state.newTodo.title}
                onChange={this.onChangeTitle}
              />
              <br />
              <input
                type="text"
                value={this.state.newTodo.description}
                onChange={this.onChangeDescription}
              />
              <br />
              <button onClick={this.onSubmitUpdate}>Update</button>
            </React.Fragment>
          )}
        </div>
        <section className="editbutton">
          <button onClick={this.onHandleDelete}>Delete</button>
          <button onClick={this.setUpdate}>Update</button>
        </section>
      </div>
    );
  }
}

export default TodoComponent;
