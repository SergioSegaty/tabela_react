import React, { Component } from "react";
import "./InputModal.css";

const tratar = (props) => {
  debugger;
  let values = {
    desc: document.querySelector("#inputDesc").value,
    status: document.querySelector("#inputStatus").value,
    data: document.querySelector("#inputData").value,
    id: parseInt(document.querySelector("#inputId").innerHTML),
  };

  if(values.id === 0){
    let item = {
      desc: values.desc,
      status: values.status,
      data: values.data,
    }
    props.salvar(item);
  } else {
    props.atualizar(values);
  }

};

export class InputModal extends Component {
  render() {
    return (
      <div className="modal">
        <div className="container">
          <label>
            Descrição <br />
            <input id="inputDesc" placeholder="Tarefa"></input>
          </label>

          <label>
            Status <br />
            <input id="inputStatus" placeholder="A fazer..."></input>
          </label>

          <label>
            Data <br />
            <input id="inputData" placeholder="27/01/2021"></input>
          </label>
          <span id="inputId" hidden={true}>
            0
          </span>

          <div className="row">
            <button className="btn btn-success" onClick={() => tratar(this.props)}>
              Salvar
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default InputModal;
