import React from "react";
import { Alert } from "reactstrap";

export default function Statuse(props) {
  const handleRemove = statuse => {
    props.removeStatuse(statuse);
  };

  const { statuse } = props;

  return (
    <div>
      <Alert key={statuse.id} color="warning">
        {statuse.name}
        <button
          onClick={() => {
            handleRemove(statuse);
          }}
        >
          Delete
        </button>
      </Alert>
    </div>
  );
}
