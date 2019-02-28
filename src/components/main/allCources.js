import React, { Component } from "react";
import { Button } from "reactstrap";

class AllCources extends Component {
  render() {
    const { cources } = this.props;
    return (
      <>
        {cources.map(cource => (
          <Button key={cource.id}>{cource.name}</Button>
        ))}
      </>
    );
  }
}

export default AllCources;
