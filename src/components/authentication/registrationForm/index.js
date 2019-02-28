import React, { Component } from "react";
import RegistrationForm from "./addRegForm";
//import SelectForm from './select'

class AddStudent extends Component {
  state = {
    allStatuses: [],
    selectValue: {}
  };

  changeSelectValue = value => {
    this.setState({
      selectValue: value
    });
  };

  changeAllStatuses = value => {
    this.setState({
      allStatuses: value
    });
    console.log("2 state allStatuse", this.state.allStatuses);
  };

  render() {
    return (
      <div>
        <RegistrationForm
          selectValue={this.state.selectValue}
          changeSelectValue={this.changeSelectValue}
          changeAllStatuses={this.changeAllStatuses}
          allStatuses={this.state.allStatuses}
        />
      </div>
    );
  }
}
export default AddStudent;
