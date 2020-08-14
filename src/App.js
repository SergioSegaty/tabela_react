import React from "react";
import "./App.css";
import Table from "./View/Table/Table";
import NavMenu from "./View/NavMenu/NavMenu";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <NavMenu></NavMenu>
        <header className="App-header">
          <Table tarefas={this.props.tarefas}></Table>
        </header>
      </div>
    );
  }
}

export default App;
