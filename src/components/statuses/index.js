import React, { Component } from "react";
import "./style.css";
import Statuse from "./statuse";
import AddStatuseForm from "./addStatuseForm";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

class AddStatuse extends Component {
  render() {
    return (
      <>
        <div id="containerFormStatuse">
          <div className="miniContainerFormStatuse">
            <AddStatuseForm />
          </div>
        </div>

        <div className="statuseList">
          <h1>All statuses</h1>
          {this.props.statuses &&
            this.props.statuses.map(statuse => (
              <Statuse key={statuse.id} statuse={statuse} />
            ))}
        </div>
      </>
    );
  }
}

export default compose(
  firestoreConnect(() => ["statuses"]), // or { collection: 'todos' }
  connect((state, props) => ({
    statuses: state.firestore.ordered.statuses
  }))
)(AddStatuse);
