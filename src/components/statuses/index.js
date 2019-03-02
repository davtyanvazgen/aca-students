import React, { Component } from "react";
import "./style.css";
import Statuse from "./statuse";
import AddStatusForm from "./addStatuseForm";

export default class AddStatuse extends Component {

  render() {
    return (
      <>
        <div id="containerFormStatuse">
          <div className="miniContainerFormStatuse">
            <AddStatusForm
              addNewStatuse={this.props.addNewStatuse}
            />
          </div>
        </div>

        <div className="statuseList">
          <h1>All statuses</h1>
          {this.props.statuses.map(statuse => (
            <Statuse
              key={statuse.id}
              statuse={statuse}
              removeStatuse={this.props.removeStatuse}
              editStatuse={this.props.editStatuse}
            />
          ))}
        </div>
      </>
    );
  }
}
