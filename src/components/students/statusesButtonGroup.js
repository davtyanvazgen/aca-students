import React, { useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Button, Col } from "reactstrap";

const StatusesButton = ({ statuses, selectedStatuses, statuseStudents }) => {
  const [rSelected, setSelected] = useState(selectedStatuses[0]);

  const onRadioBtnClick = selected => {
    setSelected(selected);
  };

  return (
    <>
      <Col>
        <Button
          color="dark"
          onClick={() => {
            onRadioBtnClick("all");
            statuseStudents(undefined, undefined, "all");
          }}
          active={rSelected === "all"}
          className="statusButton"
        >
          Show all
        </Button>
      </Col>
      {statuses &&
        statuses
          .sort(function(a, b) {
            return a.sort - b.sort;
          })
          .map(status => (
            <Col key={status.id}>
              <Button
                className="activeButtonColor statusButton"
                style={{
                  backgroundColor: status.color,
                  borderColor: status.color
                }}
                color="dark"
                id={status.id}
                key={status.id}
                onClick={() => {
                  onRadioBtnClick(status.id);
                  statuseStudents(undefined, undefined, status);
                }}
                active={rSelected === status.id}
              >
                {status.name}
              </Button>
            </Col>
          ))}
    </>
  );
};

export default compose(
  firestoreConnect(() => ["statuses"]),
  connect((state, props) => ({
    statuses: state.firestore.ordered.statuses,
    selectedStatuses: state.filter.selectedStatuses
  }))
)(StatusesButton);
