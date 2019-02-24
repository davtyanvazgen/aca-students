import React from "react";
import { Alert } from "reactstrap";

export default function Cource(props) {
  const handleRemove = cource => {
    props.removeCource(cource);
  };

  const { cource } = props;

  return (
    <div>
      <Alert key={cource.id} color="warning">
        {cource.name}
        <button
          onClick={() => {
            handleRemove(cource);
          }}
        >
          Delete
        </button>
      </Alert>
    </div>
  );
}
