import React, { Component } from "react";
import { Alert } from "reactstrap";
import FireManager from "../../firebase/FireManager";

class Cource extends Component {
  handleRemove = cource => {
    this.props.removeCource(cource);
    FireManager.removeCource(cource);
  };

  render() {
    const { cource } = this.props;

    return (
      <div>
        <Alert key={cource.id} color="warning">
          {cource.name}
          <button
            onClick={() => {
              this.handleRemove(cource);
            }}
          >
            Delete
          </button>
        </Alert>
      </div>
    );
  }
}

export default Cource;
