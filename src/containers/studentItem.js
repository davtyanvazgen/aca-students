import React, { PureComponent } from "react";
import FireManager from "../firebase/FireManager";
import StudentCard from "../components/students/studentCard";
import { withFirestore } from "react-redux-firebase";

class StudentItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: true,
      dropdownOpenCource: false,
      dropdownOpenStatus: false,
      selectedCource: this.props.student.courceName,
      selectedStatuse: this.props.student.statusName
    };
  }

  toggleHidden = () => {
    this.setState({
      isHidden: !this.state.isHidden
    });
  };

  render() {
    const { selectedCource, selectedStatuse, isHidden, modalShow } = this.state;
    const { student, allCources, allStatuses } = this.props;
    return (
      <StudentCard
        allCources={allCources}
        allStatuses={allStatuses}
        selectedCource={selectedCource}
        selectedStatuse={selectedStatuse}
        student={student}
        handleSelectCourceChange={this.handleSelectCourceChange}
        handleSelectStatusChange={this.handleSelectStatusChange}
        toggleHidden={this.toggleHidden}
        isHidden={isHidden}
        modalShow={modalShow}
        setModalShow={this.setModalShow}
        modalClose={this.setModalClose}
        removeStudent={this.props.removeStudent}
      />
    );
  }
}

export default withFirestore(StudentItem);
