import React, { Component } from "react";
import { Alert } from "reactstrap";
import FireManager from "../../firebase/FireManager";

class Status extends Component {
  removeStatus = () => {
    const s = this.props.status;
    FireManager.removeStatus(s);
  };

  render() {
    const { status} = this.props;

    return (
      <div>
        {/* revise key */}
        <Alert key={status.name} color="warning">
          {status.name}
          <button onClick={this.removeStatus}>Delete</button>
        </Alert>
      </div>
    );
  }
}

export default Status;