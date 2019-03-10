import React from "react";
import {
  ButtonToolbar,
  ToggleButton,
  ToggleButtonGroup
} from "react-bootstrap";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

function StatusesButton(props) {
  return (
    <ButtonToolbar style={{ margin: "auto", padding: "10px 25%" }}>
      <ToggleButtonGroup
        className="btn-group-vertical"
        type="radio"
        name="statuses"
      >
        <ToggleButton
          variant="danger"
          value={"all"}
          onChange={() => {
            props.statuseStudents("all");
          }}
        >
          All statuses
        </ToggleButton>
        {props.statuses &&
          props.statuses.map(status => (
            <ToggleButton
              variant="danger"
              value={status.name}
              key={status.id}
              id={status.id}
              onChange={() => {
                props.statuseStudents(status);
              }}
            >
              {status.name}
            </ToggleButton>
          ))}
      </ToggleButtonGroup>
    </ButtonToolbar>
  );
}

export default compose(
  firestoreConnect(() => ["statuses"]),
  connect((state, props) => ({
    statuses: state.firestore.ordered.statuses
  }))
)(StatusesButton);
