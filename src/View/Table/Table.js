import React, { useEffect } from "react";
import "./Table.css";
import TarefaDB from "../../js/IndexedDB-DAO";
import InputModal from "../InputModal/InputModal";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPlusSquare,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

const indexedDb = new TarefaDB("TarefaDb", "TableTarefa");

const Table = (props) => {
  useEffect(() => {
    fetchData();
    setupModal();
  });

  let modal = document.querySelector(".modal");

  async function fetchData() {
    if (props.items === undefined) {
      let newItems = await indexedDb.getAll();
      props.dispatch({ type: "get/all", items: newItems });
    }
  }

  const setupModal = () => {
    let modal = document.querySelector(".modal");

    modal.onclick = (e) => {
      if (e.target.classList.contains("modal")) {
        modal.classList.remove("open");
      }
    };
  };

  const openModal = (element) => {
    let modal = document.querySelector(".modal");

    let inputs = {
      status: document.querySelector("#inputStatus"),
      desc: document.querySelector("#inputDesc"),
      data: document.querySelector("#inputData"),
      id: document.querySelector("#inputId"),
    };

    if (!element) {
      modal.classList.toggle("open", true);

      console.log("entrou sem taks");
    } else {
      let task = JSON.parse(element.getAttribute("dados"));

      inputs.desc.value = task.desc;
      inputs.status.value = task.status;
      inputs.data.value = task.data;
      inputs.id.innerHTML = task.id;

      modal.classList.toggle("open", true);
    }
  };

  const atualizar = async (item) => {
    await indexedDb.updateById(item);
    props.dispatch({ type: "update/item", item });
    modal.classList.toggle("open", false);
  };

  const salvarNovo = async (item) => {
    let novoItem = await indexedDb.insertToDB(item);
    cleanInputs();
    modal.classList.toggle("open", false);
    props.dispatch({ type: "save/item", item: novoItem });
  };

  const removeitem = async (id) => {
    await indexedDb.removeFromDB(id);
    await indexedDb.getAll();
    props.dispatch({ type: "delete/item", id });
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
          {props.items &&
            props.items.map((item) => {
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
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button
                      dados={JSON.stringify(item)}
                      className="btn btn-primary"
                      onClick={(e) => {
                        openModal(e.target);
                      }}
                    ><FontAwesomeIcon icon={faEdit}/>
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="row">
        <button
          id="btn-add"
          className="btn btn-success"
          onClick={() => {
            openModal();
            cleanInputs();
          }}
        >
          <FontAwesomeIcon icon={faPlusSquare}/>
        </button>
      </div>
      <InputModal salvar={salvarNovo} atualizar={atualizar}></InputModal>
    </div>
  );
};

const MapStateToProps = (state) => {
  return {
    ...state,
    items: state.items,
  };
};

export default connect(MapStateToProps)(Table);
