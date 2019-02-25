import React, { Component } from "react";
import { Alert } from "reactstrap";
import FireManager from "../../firebase/FireManager";

class Cource extends Component {
  removeCource = () => {
    const {cource} = this.props;
    const {cources} = this.props.state;
    const{ changeState }= this.props;
  
   let  indexOfcourse = cources.findIndex(i => i.name === cource.name);
   cources.splice(indexOfcourse,1);
   changeState(cources)
    FireManager.removeCource(cource).then(()=>this.setState());
  };

  render() {
    const { cource } = this.props;

    return (
      <div>
        {/* revise key */}
        <Alert key={cource.name} color="warning">
          {cource.name}
          <button onClick={this.removeCource}>Delete</button>
        </Alert>
      </div>
    );
  }
}

export default Cource;