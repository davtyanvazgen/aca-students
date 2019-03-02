import React, { Component } from "react";
import "./style.css";
import Cource from "./cource";
import AddForm from "./addCourceForm";

export default class AddCource extends Component {

  render() {
    return (
      <>
        <div id="containerForm">
          <div className="miniContainerForm">
            <AddForm
                addNewCource={this.props.addNewCource}
            />
          </div>
        </div>

        <div className="courceList">
          <h1>Current cources</h1>
          {this.props.cources.map(cource => (
            <Cource
              key={cource.id}
              cource={cource}
              removeCource={this.props.removeCource}
            />
          ))}
        </div>
      </>
    );
  }
}
