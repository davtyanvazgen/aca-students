import React from "react";

export default function CourcesButton(props) {
  const toggleSubmitButton = e => {
    let button = document.getElementById(e);
    let color =
      button.style.background === "yellowgreen" ? "gray" : "yellowgreen";
    button.style.background = color;
  };

  return (
    <div
      className="btn-group border border-primary"
      style={{ margin: "auto", padding: "10px 25%" }}
      role="group"
      aria-label="Basic example"
    >
      {props.cources.map(cources => (
        <button
          type="button"
          id={cources.id}
          style={{ background: "yellowgreen" }}
          onClick={() => {
            props.courceStudents(cources);
            toggleSubmitButton(cources.id);
          }}
          className="btn btn-secondary border border-primary"
          key={cources.id}
        >
          {cources.name}
        </button>
      ))}
    </div>
  );
}
