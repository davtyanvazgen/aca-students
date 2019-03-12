import React, { Component } from "react";
import "./style.css";
import Cource from "./cource";
import AddCourceForm from "./addCourceForm";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

const AddCource = props => {
  return (
    <>
      <div id="containerForm">
        <div className="miniContainerForm">
          <AddCourceForm />
        </div>
      </div>
      <div className="courceList">
        <h1>Current cources</h1>
        {props.cources ? (
          props.cources.map(cource => (
            <Cource key={cource.id} cource={cource} students={props.students} />
          ))
        ) : (
          <div className="loader" />
        )}
      </div>
    </>
  );
};

export default compose(
  firestoreConnect(() => ["cources", "students"]),
  connect((state, props) => ({
    cources: state.firestore.ordered.cources,
    students: state.firestore.ordered.students
  }))
)(AddCource);
