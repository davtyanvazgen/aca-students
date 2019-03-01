import React from "react";

export default function StatusesButton(props) {
  return (
    <div
      className="btn-group-vertical border border-primary"
      role="group"
      aria-label="Basic example"
    >
      {props.statuses.map(status => (
        <button
          type="button"
          onClick={() => {
            props.statuseStudents(status);
          }}
          className="btn btn-secondary border border-primary"
          key={status.id}
        >
          {status.name}
        </button>
      ))}
    </div>
  );
}
