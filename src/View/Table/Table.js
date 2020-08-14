import React, { Component } from "react";
import "./Table.css";
import TodoInput from "../TodoInput/TodoInput";
import TarefaDB from "../../js/IndexedDB-DAO";
import ReactDOM from 'react-dom';

const indexedDb = new TarefaDB('TarefaDb', 'TableTarefa');
export default class Table extends Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.state = {
      isLoaded: false,
      error: null,
      items: props.tarefas,
    };

    this.saveItem = async () => {
      let item = {
        status: document.getElementById("inputStatus").value,
        desc: document.getElementById("inputDesc").value,
        data: document.getElementById("inputData").value,
      };
      let novoItem = await indexedDb.insertToDB(item);
      let itemsAtualizados = this.state.items;
      itemsAtualizados.push(novoItem);
      this.setState({
        items: itemsAtualizados
      });
      document.getElementById("inputStatus").value = '';
      document.getElementById("inputDesc").value = '';
      document.getElementById("inputData").value = '';
    };

    this.removeitem = async (id) => {
      await indexedDb.removeFromDB(id);
      let itemsAtualizados = await indexedDb.getAll();
      this.setState({
        items: itemsAtualizados
      })
    }
  }



  render() {
    return (
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Descrição</th>
              <th>Data</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {this.state.items.map((item) => {
              return (<tr key={item.id} id={item.id} ref={this.wrapper}>
                <td>{item.status}</td>
                <td>{item.desc}</td>
                <td>{item.data}</td>
                <td><button className='btn btn-danger' onClick={(e) => {
                  this.removeitem(e.target.parentNode.parentNode.id);
                }}>Apagar</button></td>
              </tr>);
            })}
          </tbody>
        </table>
        <TodoInput salvarItem={this.saveItem}></TodoInput>
      </div>
    );
  }
}
