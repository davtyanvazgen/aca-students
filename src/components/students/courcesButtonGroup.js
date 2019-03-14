import React from "react";
import {
  ButtonToolbar,
  ToggleButton,
  ToggleButtonGroup
} from "react-bootstrap";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

const CourcesButton = props => (
  <ButtonToolbar>
    <ToggleButtonGroup
      style={{ width: "100%", overflow: " auto " }}
      type="checkbox"
      defaultValue={[...props.selectedCources]}
    >
      {props.cources &&
        props.cources.map(cource => (
          <ToggleButton
            style={{ color: "black" }}
            variant="info"
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

export default compose(
  firestoreConnect(() => ["cources"]),
  connect((state, props) => ({
    cources: state.firestore.ordered.cources,
    selectedCources: state.filter.selectedCources
  }))
)(CourcesButton);
