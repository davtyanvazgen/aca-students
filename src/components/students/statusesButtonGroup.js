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
    <ButtonToolbar>
      <ToggleButtonGroup
        style={{ width: "100%", wordWrap: "break-word" }}
        className="btn-group-vertical"
        type="radio"
        name="statuses"
        defaultValue={props.selectedStatuses[0]}
      >
        <ToggleButton
            className="registrationColor"
            value={"all"}
            onChange={() => {
                props.statuseStudents(undefined, undefined, "all");
            }}
        >
          All statuses
        </ToggleButton>
        {props.statuses &&
          props.statuses.map(status => (
            <ToggleButton
                className={status.color}
              style={{ marginLeft: "0px", width: "100%" }}
              value={status.id}
              key={status.id}
              id={status.id}
              onChange={() => {
                props.statuseStudents(undefined, undefined, status);
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
    statuses: state.firestore.ordered.statuses,
    selectedStatuses: state.filter.selectedStatuses
  }))
)(StatusesButton);
