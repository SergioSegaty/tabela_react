import React, {useEffect} from "react";
import "./Table.css";
import TodoInput from "../TodoInput/TodoInput";
import TarefaDB from "../../js/IndexedDB-DAO";
import { connect } from 'react-redux'

const indexedDb = new TarefaDB("TarefaDb", "TableTarefa");

const Table = (props) => {

   useEffect(() => {
     async function fetchData() {
       if(props.items === undefined){
         let newItems = await indexedDb.getAll();
         props.dispatch({type: 'get/all', items: newItems})
        }
     }
     fetchData();
  })

  const salvarItem = async () => {
    let item = {
      status: document.getElementById("inputStatus").value,
      desc: document.getElementById("inputDesc").value,
      data: document.getElementById("inputData").value,
    };
    let novoItem = await indexedDb.insertToDB(item);
    cleanInputs();
    props.dispatch({type: 'save/item', item: novoItem })
  };

  const removeitem = async (id) => {
    await indexedDb.removeFromDB(id);
    await indexedDb.getAll();
    props.dispatch({type: 'delete/item', id})
  };

 const cleanInputs = () => {
    document.getElementById("inputStatus").value = "";
    document.getElementById("inputDesc").value = "";
    document.getElementById("inputData").value = "";
  };

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
          {props.items && props.items.map((item) => {
            return (
              <tr key={item.id} id={item.id}>
                <td>{item.status}</td>
                <td>{item.desc}</td>
                <td>{item.data}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={(e) => {
                      removeitem(e.target.parentNode.parentNode.id);
                    }}
                  >
                    Apagar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <TodoInput salvarItem={salvarItem}></TodoInput>
    </div>
  );
};


const MapStateToProps = (state) => {
  return {
    ...state,
    items: state.items,
  }
}

export default connect(MapStateToProps)(Table);