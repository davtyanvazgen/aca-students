import React, { Component } from "react";
import "./style.css";
import Cource from "./cource";
import AddForm from "./addCourceForm";
import DeleteStudentModal from "./deleteCourceModal";
// import { connect } from "react-redux";

class AddCource extends Component {
  state = {
    modalShow: false
  };

  render() {
    let modalClose = () => this.setState({ modalShow: false });
    return (
      <>
        <div id="containerForm">
          <div className="miniContainerForm">
            <AddForm addNewCource={this.props.addNewCource} />
          </div>
        </div>

        <button onClick={() => this.setState({ modalShow: true })}>ok</button>

        <DeleteStudentModal show={this.state.modalShow} onHide={modalClose} />

        <div className="courceList">
          <h1>Current cources</h1>
          {this.props.cources.map(cource => (
            <Cource
              key={cource.id}
              cource={cource}
              removeCource={this.props.removeCource}
              students={this.props.students}
              removeStudent={this.props.removeStudent}
            />
          ))}
        </div>
      </>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     cources: state.cources
//   };
// };

// export default connect(mapStateToProps)(AddCource);
export default AddCource;
