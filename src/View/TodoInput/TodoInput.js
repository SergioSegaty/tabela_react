import React, { Component } from "react";
import "./TodoInput.css";

export class TodoInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="main">
        <div className="inputs">
          <input placeholder="Status" id="inputStatus"></input>
          <input placeholder="Descrição" id="inputDesc"></input>
          <input placeholder="Data" id="inputData"></input>
        </div>
        <button className="btn btn-success" onClick={this.props.salvarItem}>
          Salvar
        </button>
      </div>
    );
  }
}

export default TodoInput;
