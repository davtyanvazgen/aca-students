import React from "react";
import {
  ButtonToolbar,
  ToggleButton,
  ToggleButtonGroup
} from "react-bootstrap";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

function CourcesButton(props) {
  return (
    <ButtonToolbar>
      <ToggleButtonGroup
        style={{ width: "100%" }}
        type="checkbox"
        defaultValue={[...props.selectedCources]}
      >
        {props.cources &&
          props.cources.map(cource => (
            <ToggleButton
              variant="primary"
              value={cource.id}
              key={cource.id}
              id={cource.id}
              onChange={() => {
                props.courceStudents(undefined, cource);
              }}
            >
              {cource.name}
            </ToggleButton>
          ))}
      </ToggleButtonGroup>
    </ButtonToolbar>
  );
}

export default compose(
  firestoreConnect(() => ["cources"]),
  connect((state, props) => ({
    cources: state.firestore.ordered.cources,
    selectedCources: state.filter.selectedCources
  }))
)(CourcesButton);
